import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ImageInputsForm from "../../../Frontend_Admin/Components/forms/ImgTitleIntoForm";
import {
  getFormDynamicFields,
  getTeamMemberFields,
  imageDimensionsJson,
} from "../../../util/dynamicFormFields";
import Title from "../../../Common/Title";
import Banner from "../../../Common/Banner";
import ModelBg from "../../../Common/ModelBg";
import EditIcon from "../../../Common/AdminEditIcon";
import BriefIntroFrontend from "../../../Common/BriefIntro";
import useAdminLoginStatus from "../../../Common/customhook/useAdminLoginStatus";
import AdminBriefIntro from "../../../Frontend_Admin/Components/BriefIntro/index";
import AddEditTeam from "../../../Frontend_Admin/Components/News";
import {
  getImagePath,
  getListStyle,
  getObjectPositionKey,
  paginationDataFormat,
  reorder,
  sortByFieldName,
  updateArrIndex,
} from "../../../util/commonUtil";
import {
  axiosClientServiceApi,
  axiosServiceApi,
} from "../../../util/axiosUtil";
import { confirmAlert } from "react-confirm-alert";
import DeleteDialog from "../../../Common/DeleteDialog";
import { toast } from "react-toastify";
import Search from "../../../Common/Search";
import CustomPagination from "../../../Common/CustomPagination";
import { removeActiveClass } from "../../../util/ulrUtil";
import { TeamStyled } from "../../../Common/StyledComponents/Styled-Team";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import RichTextView from "../../../Common/RichTextView";
import { getObjectsByKey } from "../../../util/showHideComponentUtil";
import {
  createShowHideComponent,
  getAllShowHideComponentsList,
  updateShowHideComponent,
} from "../../../redux/showHideComponent/showHideActions";
import ShowHideToggle from "../../../Common/ShowHideToggle";

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
    if (data?.results?.length > 0) {
      const _positionKey = getObjectPositionKey(data.results[0]);
      const _teamlList = sortByFieldName(data.results, _positionKey);
      setTeam(_teamlList);

      setPaginationData(paginationDataFormat(data));
      setCurrentPage(1);
    } else {
      setTeam([]);
    }
  };

  useEffect(() => {
    const getTeamMemberDetails = async () => {
      try {
        const response = await axiosClientServiceApi.get(
          `/ourteam/clentViewOurTeamDetails/`
        );
        if (response?.status === 200) {
          setResponseData(response.data);
        }
      } catch (error) {
        console.log("unable to access ulr because of server is down");
      }
    };
    if (
      (!componentEdit.addSection || !componentEdit.editSection) &&
      !searchQuery
    ) {
      getTeamMemberDetails();
    }
  }, [componentEdit.addSection, componentEdit.editSection]);

  const deleteAboutSection = (item) => {
    const id = item.id;
    const name = item.team_member_name;

    const deleteSection = async () => {
      const response = await axiosServiceApi.delete(
        `/ourteam/UpdateOurteamDetail/${id}/`
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

  const onDragEnd = async (result) => {
    const { source, destination } = result;
    if (!destination) return true;

    const _items = reorder(team, source.index, destination.index);
    const _parentObjects = updateArrIndex(_items, "team_member_position");
    const response = await updateObjectsIndex(_parentObjects);
    if (response.length > 0) {
      setTeam(_items);
    }
  };

  const updateObjectsIndex = async (data) => {
    try {
      let response = await axiosServiceApi.put(
        `/ourteam/updateTeamindex/`,
        data
      );
      if (response?.data?.team) {
        return response.data.team;
      }
    } catch (error) {
      console.log("unable to save clinet position");
    }
  };

  const [showHideCompList, setShowHideCompList] = useState([]);
  const showHideCompPageLoad = useRef(true);
  const dispatch = useDispatch();
  const { error, showHideList } = useSelector((state) => state.showHide);

  useEffect(() => {
    if (showHideList.length > 0) {
      setShowHideCompList(getObjectsByKey(showHideList));
    }
  }, [showHideList]);

  useEffect(() => {
    if (showHideList.length === 0 && showHideCompPageLoad.current) {
      dispatch(getAllShowHideComponentsList());
      showHideCompPageLoad.current = false;
    }
  }, [showHideList]);

  const showHideHandler = async (id, compName) => {
    if (id) {
      dispatch(updateShowHideComponent(id));
    } else {
      const newData = {
        componentName: compName.toLowerCase(),
        pageType: pageType,
      };
      dispatch(createShowHideComponent(newData));
    }
  };

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
      {componentEdit.banner && (
        <div className={`adminEditTestmonial selected `}>
          <ImageInputsForm
            editHandler={editHandler}
            componentType="banner"
            popupTitle="Team Banner"
            pageType={`${pageType}-banner`}
            imageLabel="Banner Image"
            showDescription={false}
            showExtraFormFields={getFormDynamicFields(`${pageType}-banner`)}
            dimensions={imageDimensionsJson("banner")}
          />
        </div>
      )}

      <div
        className={
          showHideCompList?.teambriefintro?.visibility &&
          isAdmin &&
          hasPermission
            ? "border border-info mb-2"
            : ""
        }
      >
        {isAdmin && hasPermission && (
          <ShowHideToggle
            showhideStatus={showHideCompList?.teambriefintro?.visibility}
            title={"A Brief Introduction Component"}
            componentName={"teambriefintro"}
            showHideHandler={showHideHandler}
            id={showHideCompList?.teambriefintro?.id}
          />
        )}

        {/* INTRODUCTION COMPONENT */}
        {showHideCompList?.teambriefintro?.visibility && (
          <div>
            {/* Brief Introduction */}
            {isAdmin && hasPermission && (
              <EditIcon editHandler={() => editHandler("briefIntro", true)} />
            )}

            <BriefIntroFrontend
              introState={componentEdit.briefIntro}
              linkCss="btn btn-outline d-flex justify-content-center align-items-center"
              linkLabel="Read More"
              moreLink=""
              showLink={false}
              introTitleCss="fs-3 fw-medium text-md-center"
              introSubTitleCss="fw-medium text-muted text-md-center"
              introDecTitleCss="fs-6 fw-normal w-75 m-auto text-md-center"
              detailsContainerCss="col-md-10 offset-md-1"
              anchorContainer="d-flex justify-content-start align-items-start mt-4"
              anchersvgColor="#17427C"
              pageType={pageType}
            />
            {componentEdit.briefIntro && (
              <div className={`adminEditTestmonial selected `}>
                <AdminBriefIntro
                  editHandler={editHandler}
                  componentType="briefIntro"
                  popupTitle="Team Brief"
                  pageType={pageType}
                />
              </div>
            )}
          </div>
        )}
      </div>

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

        <div className="row mb-0 py-2 py-md-4">
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
              addStateChanges={componentEdit.addSection}
              editStateChanges={!componentEdit.editSection}
            />
          </div>
        </div>

        {componentEdit.editSection || componentEdit.addSection ? (
          <div className="adminEditTestmonial selected">
            <AddEditTeam
              editHandler={editHandler}
              category="team"
              popupTitle="Team"
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
              showExtraFormFields={getTeamMemberFields(
                editCarousel?.team_member_position
              )}
              dimensions={imageDimensionsJson("teams")}
            />
          </div>
        ) : (
          ""
        )}

        <TeamStyled>
          <div className={`${isAdmin ? "" : "teamFrontend"}`}>
            <DragDropContext onDragEnd={onDragEnd}>
              <Droppable droppableId={"teamList"} id="teamList">
                {(provided, snapshot) => (
                  <div
                    className="row"
                    ref={provided.innerRef}
                    // style={getListStyle(snapshot.isDraggingOver)}
                    {...provided.droppableProps}
                  >
                    {team.length > 0 ? (
                      team.map((item, index) => (
                        <TeamItem
                          key={index}
                          item={item}
                          index={index}
                          editHandler={editHandler}
                          deleteAboutSection={deleteAboutSection}
                        />
                      ))
                    ) : (
                      <p className="text-center text-muted py-5">
                        Please add page contents...
                      </p>
                    )}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          </div>
        </TeamStyled>
        <div className="row my-5">
          {paginationData?.total_count && (
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
          )}
        </div>
      </div>
      {show && <ModelBg />}
    </>
  );
};

export default Team;

const TeamItem = ({ item, index, deleteAboutSection, editHandler }) => {
  const { isAdmin, hasPermission } = useAdminLoginStatus();
  return (
    <Draggable
      isDragDisabled={isAdmin ? false : true}
      key={item.id}
      draggableId={item.id}
      index={index}
      id={item.id}
    >
      {(provided) => (
        <div
          className="col-md-6 col-lg-4 px-4 px-md-3"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <div
            key={item.id}
            className={`mx-md-1 mx-lg-1 memberCard border shadow-sm ${
              isAdmin ? "border border-warning position-relative" : ""
            } ${index % 2 === 0 ? "normalCSS" : "flipCSS"}`}
          >
            {isAdmin && hasPermission && (
              <>
                <EditIcon
                  editHandler={() => editHandler("editSection", true, item)}
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
            <div className="text-center p-3">
              <img
                src={getImagePath(item.path)}
                className="rounded rounded-1 mt-2 "
                alt=""
              />
            </div>

            <div className=" text-start py-2 p-4 memberDetails">
              {item.team_member_designation && (
                <small className="mb-1 fw-bold">
                  {item.team_member_designation}
                </small>
              )}

              {item.team_member_name && (
                <Title title={item.team_member_name} cssClass="fs-4 title " />
              )}
              {item.team_member_about_us && (
                <RichTextView
                  data={item.team_member_about_us}
                  className={"strengths"}
                />
                // <div
                //   className="strengths my-3"
                //   dangerouslySetInnerHTML={{
                //     __html: item.team_member_about_us,
                //   }}
                // />
              )}

              {item.team_member_email && (
                <div className="mt-3">
                  <a href={`mailto:${item.team_member_email}`}>
                    {item.team_member_email}
                  </a>
                </div>
              )}
              {item.team_member_phone_number && (
                <p>{item.team_member_phone_number}</p>
              )}

              <div className="social">
                {item.facebook_url && (
                  <Link to={item.facebook_url} target="_blank">
                    <i className="fa fa-facebook-square" aria-hidden="true"></i>
                  </Link>
                )}

                {item.twitter_url && (
                  <Link to={item.twitter_url} target="_blank">
                    <i className="fa fa-twitter-square" aria-hidden="true"></i>
                  </Link>
                )}

                {item.youtube_url && (
                  <Link to={item.youtube_url} target="_blank">
                    <i className="fa fa-youtube-play" aria-hidden="true"></i>
                  </Link>
                )}

                {item.linkedIn_url && (
                  <Link to={item.linkedIn_url} target="_blank">
                    <i className="fa fa-linkedin-square" aria-hidden="true"></i>
                  </Link>
                )}

                {item.instagram_url && (
                  <Link to={item.instagram_url} target="_blank">
                    <i className="fa fa-instagram" aria-hidden="true"></i>
                  </Link>
                )}

                {item.vimeo_url && (
                  <Link to={item.vimeo_url} target="_blank">
                    <i className="fa fa-vimeo" aria-hidden="true"></i>
                  </Link>
                )}

                {item.pinterest_url && (
                  <Link to={item.pinterest_url} target="_blank">
                    <i className="fa fa-pinterest" aria-hidden="true"></i>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
};
