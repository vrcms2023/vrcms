import React, { useState, useEffect } from "react";
import EditIcon from "../../../Common/AdminEditIcon";
import Banner from "../../../Common/Banner";
import BriefIntroFrontend from "../../../Common/BriefIntro";
import ImageInputsForm from "../../../Frontend_Admin/Components/forms/ImgTitleIntoForm";
import AdminBriefIntro from "../../../Frontend_Admin/Components/BriefIntro/index";
import Ancher from "../../../Common/Ancher";
import {
  getFormDynamicFields,
  imageDimensionsJson,
} from "../../../util/dynamicFormFields";
import useAdminLoginStatus from "../../../Common/customhook/useAdminLoginStatus";
import {
  axiosClientServiceApi,
  axiosServiceApi,
} from "../../../util/axiosUtil";
import { getImagePath, paginationDataFormat } from "../../../util/commonUtil";
import Title from "../../../Common/Title";
import { Link } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";
import DeleteDialog from "../../../Common/DeleteDialog";
import AddEditAdminNews from "../../../Frontend_Admin/Components/News";
import { toast } from "react-toastify";
import { getCaseStudiesFields } from "../../../util/dynamicFormFields";
import { removeActiveClass } from "../../../util/ulrUtil";
import Search from "../../../Common/Search";
import CustomPagination from "../../../Common/CustomPagination";
import { sortCreatedDateByDesc } from "../../../util/dataFormatUtil";
import { CaseStudiesPageStyled } from "../../../Common/StyledComponents/Styled-Casestudies";
import { useSelector } from "react-redux";
import SkeletonImage from "../../../Common/Skeltons/SkeletonImage";

import RichTextView from "../../../Common/RichTextView";

const CaseStudies = () => {
  const editComponentObj = {
    banner: false,
    briefIntro: false,
    addSection: false,
    editSection: false,
  };

  const pageType = "casestudies";
  const { isLoading } = useSelector((state) => state.loader);
  const { isAdmin, hasPermission } = useAdminLoginStatus();
  const [componentEdit, SetComponentEdit] = useState(editComponentObj);
  const [clientsList, setClientsList] = useState([]);
  const [show, setShow] = useState(false);
  const [editCarousel, setEditCarousel] = useState({});

  const [paginationData, setPaginationData] = useState({});
  const [pageLoadResult, setPageloadResults] = useState(false);
  const [searchQuery, setSearchquery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const setResponseData = (data) => {
    setClientsList(
      data.results.length > 0 ? sortCreatedDateByDesc(data.results) : []
    );
    setPaginationData(paginationDataFormat(data));
    setCurrentPage(1);
  };

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

  useEffect(() => {
    const getCAseStutiesvalues = async () => {
      try {
        const response = await axiosClientServiceApi.get(
          `/caseStudies/clientCaseStudies/`
        );
        if (response?.status === 200) {
          setResponseData(response.data);
          setPageloadResults(1);
        }
      } catch (error) {
        console.log("unable to access ulr because of server is down");
      }
    };
    if (
      (!componentEdit.addSection || !componentEdit.editSection) &&
      !searchQuery
    ) {
      getCAseStutiesvalues();
    }
  }, [componentEdit.addSection, componentEdit.editSection]);

  useEffect(() => {
    removeActiveClass();
    const id = document.getElementById("KnowledgeHubnavbarDropdown");
    if (id) {
      id.classList.add("active");
    }
  });

  const deleteAboutSection = (item) => {
    const id = item.id;
    const name = item.case_studies_title;

    const deleteSection = async () => {
      const response = await axiosServiceApi.delete(
        `/caseStudies/updateCaseStudies/${id}/`
      );
      if (response.status === 204) {
        const list = clientsList.filter((list) => list.id !== id);
        setClientsList(list);
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

  return (
    <>
      {/* Page Banner Component */}
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
            popupTitle="Case Studies Banner"
            pageType={`${pageType}-banner`}
            imageLabel="Banner Image"
            showDescription={false}
            showExtraFormFields={getFormDynamicFields(`${pageType}-banner`)}
            dimensions={imageDimensionsJson("banner")}
          />
        </div>
      )}

      {/* Brief Introduction */}
      {isAdmin && hasPermission && (
        <EditIcon editHandler={() => editHandler("briefIntro", true)} />
      )}

      <BriefIntroFrontend
        introState={componentEdit.briefIntro}
        pageType={pageType}
        introTitleCss="fs-3 fw-medium text-md-center"
        introSubTitleCss="fw-medium text-muted text-md-center"
        introDecTitleCss="fs-6 fw-normal w-75 m-auto text-md-center"
      />
      {componentEdit.briefIntro && (
        <div className={`adminEditTestmonial selected `}>
          <AdminBriefIntro
            editHandler={editHandler}
            popupTitle="Case Studies"
            componentType="briefIntro"
            pageType={pageType}
          />
        </div>
      )}

      {/* Add Clients */}
      <div className="container-fluid container-lg my-md-5 ">
        {isAdmin && hasPermission && (
          <div className="row">
            <div className="col-md-12">
              <div className="d-flex justify-content-end align-items-center mb-3">
                {/* <span className="fw-bold me-2">Add New </span> */}
                <button
                  type="submit"
                  className="btn btn-primary px-3"
                  onClick={() => editHandler("addSection", true)}
                >
                  Add New Casestudy
                  <i className="fa fa-plus ms-2" aria-hidden="true"></i>
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="row">
          <div className="col-md-6 fs-3 mt-4 mt-md-0">
            <Title title="Case Studies" cssClass="fs-1 pageTitle" />
          </div>

          <div className="col-md-6">
            <Search
              setObject={setResponseData}
              clientSearchURL={"/caseStudies/searchCaseStudies/"}
              adminSearchURL={"/caseStudies/createCaseStudies/"}
              clientDefaultURL={"/caseStudies/clientCaseStudies/"}
              searchfiledDeatails={
                "Case studies Title / Case studies description "
              }
              setPageloadResults={setPageloadResults}
              setSearchquery={setSearchquery}
              searchQuery={searchQuery}
              addStateChanges={componentEdit.addSection}
              editStateChanges={!componentEdit.editSection}
            />
          </div>
        </div>
        {componentEdit.editSection || componentEdit.addSection ? (
          <div className={`adminEditTestmonial selected `}>
            <AddEditAdminNews
              editHandler={editHandler}
              category="about"
              editCarousel={editCarousel}
              setEditCarousel={setEditCarousel}
              componentType={`${
                componentEdit.editSection ? "editSection" : "addSection"
              }`}
              imageGetURL="/caseStudies/createCaseStudies/"
              imagePostURL="/caseStudies/createCaseStudies/"
              imageUpdateURL="/caseStudies/updateCaseStudies/"
              imageDeleteURL="/caseStudies/updateCaseStudies/"
              imageLabel="Image"
              showDescription={false}
              showExtraFormFields={getCaseStudiesFields()}
              dimensions={imageDimensionsJson("aboutus")}
            />
          </div>
        ) : (
          ""
        )}

        <CaseStudiesPageStyled>
          <div className="caseStudie my-5">
            {isLoading ? (
              <div className="row">
                {[1, 2, 3, 4].map((item, index) => (
                  <div className="col-12" key={index}>
                    <SkeletonImage />
                  </div>
                ))}
              </div>
            ) : (
              ""
            )}

            {clientsList.length > 0 ? (
              clientsList.map((item, index) => (
                <div
                  key={item.id}
                  className={`row mb-2 ${
                    isAdmin
                      ? "border border-warning mb-3 position-relative"
                      : ""
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
                  <div className="col-sm-9 p-3 p-md-4 py-md-4 d-flex justify-content-center align-items-start flex-column caseStudieDetails">
                    {item.case_studies_title ? (
                      <Title
                        title={item.case_studies_title}
                        cssClass="fs-4 fw-bold mb-2"
                      />
                    ) : (
                      ""
                    )}
                    <RichTextView
                      data={item.case_studies_description}
                      className={""}
                    />
                    {/* <div
                      dangerouslySetInnerHTML={{
                        __html: item.case_studies_description,
                      }}
                    /> */}

                    <div>
                      <Ancher
                        AncherLabel="More"
                        AncherClass="btn btn-outline d-flex gap-2 justify-content-center align-items-center"
                        Ancherpath={`/clients/casestudies-details/${item.id}/`}
                        AnchersvgColor="#17427C"
                      />
                    </div>
                  </div>

                  <div className="col-sm-3 d-none d-sm-flex justify-content-center p-3">
                    <img
                      src={getImagePath(item.path)}
                      alt=""
                      className="img-fluid rounded-circle border border-3 border-light shadow-lg img-thumbnail caseStudieImg"
                    />
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center text-muted py-5">
                {!isLoading && <p>Please add page contents...</p>}
              </div>
            )}
          </div>
        </CaseStudiesPageStyled>
        <div>
          {paginationData?.total_count ? (
            <CustomPagination
              paginationData={paginationData}
              paginationURL={
                isAdmin
                  ? "/caseStudies/createCaseStudies/"
                  : "/caseStudies/clientCaseStudies/"
              }
              paginationSearchURL={
                searchQuery
                  ? `/caseStudies/searchCaseStudies/${searchQuery}/`
                  : isAdmin
                    ? "/caseStudies/createCaseStudies/"
                    : "/caseStudies/clientCaseStudies/"
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

export default CaseStudies;
