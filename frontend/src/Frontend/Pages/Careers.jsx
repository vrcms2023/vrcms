import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// Components
import BriefIntroFrontend from "../../Common/BriefIntro";
import ImageInputsForm from "../../Admin/Components/forms/ImgTitleIntoForm";
import AdminBriefIntro from "../../Admin/Components/BriefIntro/index";
import EditIcon from "../../Common/AdminEditIcon";
import ModelBg from "../../Common/ModelBg";
import Banner from "../../Common/Banner";
import CustomPagination from "../../Common/CustomPagination";

import { removeActiveClass } from "../../util/ulrUtil";
import {
  getFormDynamicFields,
  imageDimensionsJson,
} from "../../util/dynamicFormFields";
import { paginationDataFormat } from "../../util/commonUtil";
import { sortCreatedDateByDesc } from "../../util/dataFormatUtil";
import { useAdminLoginStatus } from "../../Common/customhook/useAdminLoginStatus";

// Images Imports
import Title from "../../Common/Title";
import Search from "../../Common/Search";

// Styles
import JobPost from "../Components/JobPost";
import JobPostFrom from "../../Admin/Components/forms/JobpostForm";
import { CareersPageStyled } from "../../Common/StyledComponents/Styled-CareersPage";

const Careers = () => {
  const editComponentObj = {
    addjob: false,
    banner: false,
    briefIntro: false,
    about: false,
    vision: false,
    mission: false,
  };

  const pageType = "careers";
  const { isAdmin, hasPermission } = useAdminLoginStatus();
  const [componentEdit, SetComponentEdit] = useState(editComponentObj);
  const [show, setShow] = useState(false);
  const [posts, setPosts] = useState([]);

  const [paginationData, setPaginationData] = useState({});
  const [pageLoadResult, setPageloadResults] = useState(false);
  const [searchQuery, setSearchquery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    removeActiveClass();
  }, []);

  const editHandler = (name, value) => {
    SetComponentEdit((prevFormData) => ({ ...prevFormData, [name]: value }));
    setShow(!show);
    document.body.style.overflow = "hidden";
  };

  const setResponseData = (data) => {
    setPosts(
      data.results.length > 0 ? sortCreatedDateByDesc(data.results) : [],
    );
    setPaginationData(paginationDataFormat(data));
    setCurrentPage(1);
  };

  return (
    <>
      {/* Page Banner Component */}
      <div className="position-relative careersPage">
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

      {/* Introduction */}
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

      <div className="container mt-4 my-md-5 careerItems">
        {isAdmin && hasPermission && (
          <div className="text-end mb-4">
            <Link
              to="#"
              className="btn btn-primary"
              onClick={() => editHandler("addjob", true)}
            >
              Add New Career{" "}
              <i className="fa fa-plus ms-2" aria-hidden="true"></i>
            </Link>
          </div>
        )}

        {componentEdit.addjob ? (
          <div className="adminEditTestmonial">
            <JobPostFrom
              editHandler={editHandler}
              componentType="addjob"
              type="add"
            />
          </div>
        ) : (
          ""
        )}
        <div>
          <CareersPageStyled>
            <div className="row mb-4 py-4">
              <div className="col-md-6">
                <Title title="Careers" cssClass="fs-3 pageTitle" />
              </div>

              <div className="col-md-6">
                <Search
                  setObject={setResponseData}
                  clientSearchURL={"/careers/searchCareers/"}
                  adminSearchURL={"/careers/createCareer/"}
                  clientDefaultURL={"/careers/clientCareersList/"}
                  searchfiledDeatails={"Job Title / Comapny Name / Location "}
                  setPageloadResults={setPageloadResults}
                  setSearchquery={setSearchquery}
                  searchQuery={searchQuery}
                />
              </div>
            </div>

            <div className="row">
              <JobPost
                addJobs={componentEdit.addjob}
                posts={posts}
                setPosts={setResponseData}
                setPageloadResults={setPageloadResults}
              />
            </div>
              
          </CareersPageStyled>
          <div>
                {paginationData?.total_count ? (
                  <CustomPagination
                    paginationData={paginationData}
                    paginationURL={
                      isAdmin
                        ? "/careers/createCareer/"
                        : "/careers/clientCareersList/"
                    }
                    paginationSearchURL={
                      searchQuery
                        ? `/careers/searchCareers/${searchQuery}/`
                        : isAdmin
                        ? "/careers/createCareer/"
                        : "/careers/clientCareersList/"
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

        {show && <ModelBg />}
      </div>
    </>
  );
};

export default Careers;
