import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// Components
import BriefIntroFrontend from "../../../Common/BriefIntro";
import ImageInputsForm from "../../../Frontend_Admin/Components/forms/ImgTitleIntoForm";
import AdminBriefIntro from "../../../Frontend_Admin/Components/BriefIntro/index";
import EditIcon from "../../../Common/AdminEditIcon";
import ModelBg from "../../../Common/ModelBg";
import Banner from "../../../Common/Banner";
import CustomPagination from "../../../Common/CustomPagination";

import { removeActiveClass } from "../../../util/ulrUtil";
import { getFormDynamicFields, imageDimensionsJson } from "../../../util/dynamicFormFields";
import { paginationDataFormat } from "../../../util/commonUtil";
import { sortCreatedDateByDesc } from "../../../util/dataFormatUtil";
import { useAdminLoginStatus } from "../../../Common/customhook/useAdminLoginStatus";

// Images Imports
import Title from "../../../Common/Title";
import Search from "../../../Common/Search";

// Styles
import JobPost from "../../Components/JobPost";
import JobPostFrom from "../../../Frontend_Admin/Components/forms/JobpostForm";
import { CareersPageStyled } from "../../../Common/StyledComponents/Styled-CareersPage";
import CareersFilter from "../../Components/CareersSearch/CareersFilter";
import { CareerFilterStyled } from "../../../Common/StyledComponents/Styled-CareerFilter";
import {
  createShowHideComponent,
  getAllShowHideComponentsList,
  getShowHideComponentsListByPage,
  updateShowHideComponent,
} from "../../../redux/showHideComponent/showHideActions";
import { getObjectsByKey } from "../../../util/showHideComponentUtil";
import ShowHideToggle from "../../../Common/ShowHideToggle";
import PageBannerComponent from "../../../Common/Banner/PageBannerComponent";
import BriefWithShowHideToggleComponent from "../../../Common/Brief/BriefWithShowHideToggleComponent";

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
  const [editNews, setEditNews] = useState(false);

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
    setPosts(data.results.length > 0 ? sortCreatedDateByDesc(data.results) : []);
    setPaginationData(paginationDataFormat(data));
    setCurrentPage(1);
  };

  const [showHideCompList, setShowHideCompList] = useState([]);
  const dispatch = useDispatch();
  const { error, success, showHideList } = useSelector((state) => state.showHide);

  useEffect(() => {
    if (showHideList.length > 0) {
      setShowHideCompList(getObjectsByKey(showHideList));
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
      {/* Page Banner Component */}
      <PageBannerComponent
        editHandler={editHandler}
        componentEdit={componentEdit}
        pageType={pageType}
        category={"careers-banner"}
        showHideCompList={showHideCompList}
        showHideHandler={showHideHandler}
        popupTitle={"Careers Banner"}
        showHideComponentName={"careerbanner"}
      />

      <BriefWithShowHideToggleComponent
        editHandler={editHandler}
        componentType="briefIntro"
        popupTitle="Career Brief Introduction Component"
        pageType={pageType}
        componentEdit={componentEdit}
        showHideCompList={showHideCompList}
        showHideHandler={showHideHandler}
        editlabel={"briefIntro"}
        showHideComponentName={"careerbriefintro"}
        detailsContainerCss="col-lg-10 offset-lg-1 text-center"
        showHideComponentTitle={"Career Brief Intro "}
      />

      {/* <CareerFilterStyled>
        <div className="container p-5 py-3 careersFilter">
          <CareersFilter />
        </div>
      </CareerFilterStyled> */}

      <div className="container mt-4 my-md-5 careerItems">
        <div>
          <CareersPageStyled>
            <div className="row mb-4 pb-4">
              <div className="col-md-6 d-flex aling-items-center justify-content-between justify-content-md-start">
                <Title title="Careers" cssClass="pageTitle fs-4" />

                {isAdmin && hasPermission && (
                  <div className="">
                    <Link
                      to="#"
                      className="btn btn-outline ms-2"
                      onClick={() => editHandler("addjob", true)}
                    >
                      New
                      <i className="fa fa-plus ms-2" aria-hidden="true"></i>
                    </Link>
                  </div>
                )}
                {componentEdit.addjob && (
                  <div className={`adminEditTestmonial selected `}>
                    <JobPostFrom
                      editHandler={editHandler}
                      componentType="addjob"
                      popupTitle="Add Career Details"
                      type="add"
                    />
                  </div>
                )}
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
                  addStateChanges={componentEdit.addjob}
                  editStateChanges={editNews}
                />
              </div>
            </div>

            <div className="row">
              <JobPost
                addJobs={componentEdit.addjob}
                posts={posts}
                setPosts={setResponseData}
                setPageloadResults={setPageloadResults}
                setEditState={setEditNews}
              />
            </div>
          </CareersPageStyled>
          <div className="my-3">
            {paginationData?.total_count ? (
              <CustomPagination
                paginationData={paginationData}
                paginationURL={isAdmin ? "/careers/createCareer/" : "/careers/clientCareersList/"}
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
