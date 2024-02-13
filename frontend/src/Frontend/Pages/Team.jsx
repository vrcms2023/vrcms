import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ImageInputsForm from "../../Admin/Components/forms/ImgTitleIntoForm";
import {
  getFormDynamicFields,
  getTeamMemberFields,
  imageDimensionsJson,
} from "../../util/dynamicFormFields";
import Title from "../../Common/Title";
import Banner from "../../Common/Banner";
import EditIcon from "../../Common/AdminEditIcon";
import BriefIntroFrontend from "../../Common/BriefIntro";
import useAdminLoginStatus from "../../Common/customhook/useAdminLoginStatus";
import AdminBriefIntro from "../../Admin/Components/BriefIntro/index";
import AddEditTeam from "../../Admin/Components/News";
import { getImagePath, paginationDataFormat } from "../../util/commonUtil";
import { sortCreatedDateByDesc } from "../../util/dataFormatUtil";
import { axiosClientServiceApi, axiosServiceApi } from "../../util/axiosUtil";
import { confirmAlert } from "react-confirm-alert";
import DeleteDialog from "../../Common/DeleteDialog";
import { toast } from "react-toastify";
import Search from "../../Common/Search";
import CustomPagination from "../../Common/CustomPagination";
import { removeActiveClass } from "../../util/ulrUtil";
import { TeamStyled } from "../../Common/StyledComponents/Styled-Team";

const Team = () => {
  const editComponentObj = {
    banner: false,
    briefIntro: false,
    addSection: false,
    editSection: false,
  };

  const pageType = "teams";
  const { isAdmin, hasPermission } = useAdminLoginStatus();
  const [componentEdit, SetComponentEdit] = useState(editComponentObj);
  const [show, setShow] = useState(false);
  const [team, setTeam] = useState([]);
  const [editCarousel, setEditCarousel] = useState({});

  const [paginationData, setPaginationData] = useState({});
  const [pageLoadResult, setPageloadResults] = useState(false);
  const [searchQuery, setSearchquery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const editHandler = (name, value, item) => {
    SetComponentEdit((prevFormData) => ({ ...prevFormData, [name]: value }));
    setShow(!show);
    if (item?.id) {
      setEditCarousel(item);
    } else {
      setEditCarousel({});
    }
    document.body.style.overflow = "hidden";
  };

  const setResponseData = (data) => {
    setTeam(data.results.length > 0 ? sortCreatedDateByDesc(data.results) : []);

    setPaginationData(paginationDataFormat(data));
    setCurrentPage(1);
  };

  useEffect(() => {
    const getTeamMemberDetails = async () => {
      try {
        const response = await axiosClientServiceApi.get(
          `/ourteam/clentViewOurTeamDetails/`,
        );
        console.log("team response", response);
        if (response?.status === 200) {
          setResponseData(response.data);
        }
      } catch (error) {
        console.log("unable to access ulr because of server is down");
      }
    };
    if (!componentEdit.addSection || !componentEdit.editSection) {
      getTeamMemberDetails();
    }
  }, [componentEdit.addSection, componentEdit.editSection]);

  const deleteAboutSection = (item) => {
    const id = item.id;
    const name = item.team_member_name;

    const deleteSection = async () => {
      const response = await axiosServiceApi.delete(
        `/ourteam/UpdateOurteamDetail/${id}/`,
      );
      if (response.status === 204) {
        const list = team.filter((list) => list.id !== id);
        setTeam(list);
        toast.success(`${name} is deleted`);
      }
    };

    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <DeleteDialog
            onClose={onClose}
            callback={deleteSection}
            message={`deleting the ${name} Service?`}
          />
        );
      },
    });
  };
  useEffect(() => {
    removeActiveClass();
  }, []);
  return (
    <>
      <div className="position-relative">
        {isAdmin && hasPermission && (
          <EditIcon editHandler={() => editHandler("banner", true)} />
        )}
        <Banner
          getBannerAPIURL={`banner/clientBannerIntro/${pageType}-banner/`}
          bannerState={componentEdit.banner}
        />
      </div>
      {componentEdit.banner ? (
        <div className="adminEditTestmonial">
          <ImageInputsForm
            editHandler={editHandler}
            componentType="banner"
            pageType={`${pageType}-banner`}
            imageLabel="Banner Image"
            showDescription={false}
            showExtraFormFields={getFormDynamicFields(`${pageType}-banner`)}
            dimensions={imageDimensionsJson("banner")}
          />
        </div>
      ) : (
        ""
      )}

      {/* Brief Introduction */}
      {isAdmin && hasPermission && (
        <EditIcon editHandler={() => editHandler("briefIntro", true)} />
      )}

      <BriefIntroFrontend
        introState={componentEdit.briefIntro}
        pageType={pageType}
      />

      {componentEdit.briefIntro ? (
        <div className="adminEditTestmonial">
          <AdminBriefIntro
            editHandler={editHandler}
            componentType="briefIntro"
            pageType={pageType}
          />
        </div>
      ) : (
        ""
      )}

      <div className="container">
        <div className="row">
          <div className="col-md-12 mt-4">
            {isAdmin && hasPermission && (
              <div className="text-end mb-4">
                <Link
                  to="#"
                  className="btn btn-primary"
                  onClick={() => editHandler("addSection", true)}
                >
                  Add team
                  <i className="fa fa-plus ms-2" aria-hidden="true"></i>
                </Link>
              </div>
            )}
          </div>
        </div>

        <div className="row mb-4 py-4">
          <div className="col-md-6 fs-3 mt-4 mt-md-0">
            <Title title="Our Team" cssClass="fs-1 pageTitle" />
          </div>

          <div className="col-md-6 mb-4">
            <Search
              setObject={setResponseData}
              clientSearchURL={"/ourteam/OurteamSearchAPIView/"}
              adminSearchURL={"/ourteam/createteam/"}
              clientDefaultURL={"/ourteam/clentViewOurTeamDetails/"}
              searchfiledDeatails={"Name"}
              setPageloadResults={setPageloadResults}
              setSearchquery={setSearchquery}
              searchQuery={searchQuery}
            />
          </div>
        </div>

        {componentEdit.editSection || componentEdit.addSection ? (
          <div className="adminEditTestmonial">
            <AddEditTeam
              editHandler={editHandler}
              category="team"
              editCarousel={editCarousel}
              setEditCarousel={setEditCarousel}
              componentType={`${
                componentEdit.editSection ? "editSection" : "addSection"
              }`}
              getImageListURL="ourteam/createteam/"
              deleteImageURL="ourteam/UpdateOurteamDetail/"
              imagePostURL="ourteam/createteam/"
              imageUpdateURL="ourteam/UpdateOurteamDetail/"
              imageLabel="Add Profile Image"
              showDescription={false}
              showExtraFormFields={getTeamMemberFields()}
              dimensions={imageDimensionsJson("teams")}
            />
          </div>
        ) : (
          ""
        )}

        <TeamStyled>
          <div className="row">
            {team.length > 0 ? (
              team.map((item, index) => (
                <div
                  key={item.id}
                  className={`col-md-4 ${
                    isAdmin ? "border border-warning position-relative" : ""
                  } ${index % 2 === 0 ? "normalCSS" : "flipCSS"}`}
                >
                  {isAdmin && hasPermission && (
                    <>
                      <EditIcon
                        editHandler={() =>
                          editHandler("editSection", true, item)
                        }
                      />
                      <Link
                        className="deleteSection"
                        onClick={() => deleteAboutSection(item)}
                      >
                        <i
                          className="fa fa-trash-o text-danger fs-4"
                          aria-hidden="true"
                        ></i>
                      </Link>
                    </>
                  )}
                  <img
                    src={getImagePath(item.path)}
                    alt=""
                    className="img-fluid"
                  />

                  <div className="p-3">
                    {item.team_member_name ? (
                      <Title
                        title={item.team_member_name}
                        cssClass="fs-4 mt-2 title fw-bolder"
                      />
                    ) : (
                      ""
                    )}

                    {item.team_member_designation ? (
                      <small className="mb-1">
                        {item.team_member_designation}
                      </small>
                    ) : (
                      ""
                    )}

                    {item.team_member_about_us ? (
                      <p className="aboutMe lineClamp lc3">
                        {item.team_member_about_us}
                      </p>
                    ) : (
                      ""
                    )}

                    {item.team_member_phone_number || item.team_member_email ? (
                      <hr />
                    ) : (
                      ""
                    )}

                    {item.team_member_email ? (
                      <div className="mb-2">
                        <a href={`mailto:${item.team_member_email}`}>
                          {item.team_member_email}
                        </a>
                      </div>
                    ) : (
                      ""
                    )}
                    {item.team_member_phone_number ? (
                      <p>{item.team_member_phone_number}</p>
                    ) : (
                      ""
                    )}
                    {item.team_member_phone_number || item.team_member_email ? (
                      <hr />
                    ) : (
                      ""
                    )}

                    <div className="social">
                      {item.facebook_url ? (
                        <Link to={item.facebook_url} target="_blank">
                          <i
                            className="fa fa-facebook-square"
                            aria-hidden="true"
                          ></i>
                        </Link>
                      ) : (
                        ""
                      )}

                      {item.twitter_url ? (
                        <Link to={item.twitter_url} target="_blank">
                          <i
                            className="fa fa-twitter-square"
                            aria-hidden="true"
                          ></i>
                        </Link>
                      ) : (
                        ""
                      )}

                      {item.youtube_url ? (
                        <Link to={item.youtube_url} target="_blank">
                          <i
                            className="fa fa-youtube-play"
                            aria-hidden="true"
                          ></i>
                        </Link>
                      ) : (
                        ""
                      )}

                      {item.linkedIn_url ? (
                        <Link to={item.linkedIn_url} target="_blank">
                          <i
                            className="fa fa-linkedin-square"
                            aria-hidden="true"
                          ></i>
                        </Link>
                      ) : (
                        ""
                      )}

                      {item.instagram_url ? (
                        <Link to={item.instagram_url} target="_blank">
                          <i className="fa fa-instagram" aria-hidden="true"></i>
                        </Link>
                      ) : (
                        ""
                      )}

                      {item.vimeo_url ? (
                        <Link to={item.vimeo_url} target="_blank">
                          <i className="fa fa-vimeo" aria-hidden="true"></i>
                        </Link>
                      ) : (
                        ""
                      )}

                      {item.pinterest_url ? (
                        <Link to={item.pinterest_url} target="_blank">
                          <i className="fa fa-pinterest" aria-hidden="true"></i>
                        </Link>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-muted py-5">
                Please add page contents...
              </p>
            )}
          </div>
        </TeamStyled>
        <div className="row mb-4">
          {paginationData?.total_count ? (
            <CustomPagination
              paginationData={paginationData}
              paginationURL={
                isAdmin
                  ? "/ourteam/createteam/"
                  : "/clieourteamnt/clentViewOurTeamDetails/"
              }
              paginationSearchURL={
                searchQuery
                  ? `/ourteam/OurteamSearchAPIView/${searchQuery}/`
                  : isAdmin
                  ? "/ourteam/createteam/"
                  : "/ourteam/clentViewOurTeamDetails/"
              }
              searchQuery={searchQuery}
              setCurrentPage={setCurrentPage}
              currentPage={currentPage}
              setResponseData={setResponseData}
              pageLoadResult={pageLoadResult}
            />
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
};

export default Team;
