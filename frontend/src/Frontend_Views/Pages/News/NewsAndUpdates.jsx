import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// Components

import Title from "../../../Common/Title";
import Model from "../../../Common/Model";
import ModelBg from "../../../Common/ModelBg";
import Banner from "../../../Common/Banner";
import { useAdminLoginStatus } from "../../../Common/customhook/useAdminLoginStatus";
import Search from "../../../Common/Search";
import EditIcon from "../../../Common/AdminEditIcon";
import HomeNews from "../../Components/HomeNews";
import ImageInputsForm from "../../../Frontend_Admin/Components/forms/ImgTitleIntoForm";
import AddEditAdminNews from "../../../Frontend_Admin/Components/News/index";
import ShareButtons from "../../../Common/Share";

import { removeActiveClass } from "../../../util/ulrUtil";
import {
  getFormDynamicFields,
  getNewslFields,
  imageDimensionsJson,
} from "../../../util/dynamicFormFields";

// Styles
import CustomPagination from "../../../Common/CustomPagination";
import {
  getObjectPositionKey,
  paginationDataFormat,
  sortByFieldName,
} from "../../../util/commonUtil";
import NoteComponent from "../../../Common/NoteComponent";
import { getObjectsByKey } from "../../../util/showHideComponentUtil";
import {
  createShowHideComponent,
  getAllShowHideComponentsList,
  getShowHideComponentsListByPage,
  updateShowHideComponent,
} from "../../../redux/showHideComponent/showHideActions";
import BriefIntroFrontend from "../../../Common/BriefIntro";
import ShowHideToggle from "../../../Common/ShowHideToggle";
import BriefIntroAdmin from "../../../Frontend_Admin/Components/BriefIntro";
import PageBannerComponent from "../../../Common/Banner/PageBannerComponent";
import AdminSingleRecordUpload from "../../../Frontend_Admin/Components/forms/V2/AdminSingleRecordUpload";
import BriefWithShowHideToggleComponent from "../../../Common/Brief/BriefWithShowHideToggleComponent";

const NewsAndUpdates = () => {
  const editComponentObj = {
    addNews: false,
    banner: false,
    news: false,
  };
  const pageType = "news";
  const [news, setNews] = useState([]);
  const [show, setShow] = useState(false);
  const [componentEdit, SetComponentEdit] = useState(editComponentObj);
  const { isAdmin, hasPermission } = useAdminLoginStatus();
  const [showModal, setShowModal] = useState(false);
  const [obj, setObj] = useState({});
  const [editCarousel, setEditCarousel] = useState({});

  const [paginationData, setPaginationData] = useState({});
  const [pageLoadResult, setPageloadResults] = useState(false);
  const [searchQuery, setSearchquery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [editNews, setEditNews] = useState(false);

  useEffect(() => {
    removeActiveClass();
    const id = document.getElementById("KnowledgeHubnavbarDropdown");
    if (id) {
      id.classList.add("active");
    }
  });

  const setResponseData = (data) => {
    if (data?.results.length > 0) {
      const _positionKey = getObjectPositionKey(data.results[0]);
      const _newslList = sortByFieldName(data.results, _positionKey);
      setNews(_newslList);
      setPaginationData(paginationDataFormat(data));
      setCurrentPage(1);
    } else {
      setNews([]);
    }
  };

  // const articleHandler = (id) => {
  //   const searchObj = news.find((newsItem) => newsItem.id === id);
  //   setObj(searchObj);
  //   setShowModal(!showModal);
  // };

  const closeModel = () => {
    setShowModal(!showModal);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const editHandler = (name, value) => {
    SetComponentEdit((prevFormData) => ({ ...prevFormData, [name]: value }));
    setShow(!show);
    document.body.style.overflow = "hidden";
  };

  const [showHideCompList, setShowHideCompList] = useState([]);
  const dispatch = useDispatch();
  const { error, showHideList } = useSelector((state) => state.showHide);

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
        category={"news-banner"}
        showHideCompList={showHideCompList}
        showHideHandler={showHideHandler}
        popupTitle={"News Banner"}
        showHideComponentName={"newsandupdatesbanner"}
      />
      <BriefWithShowHideToggleComponent
        editHandler={editHandler}
        componentType="briefIntro"
        popupTitle="News Brief Introduction Component"
        pageType={pageType}
        componentEdit={componentEdit}
        showHideCompList={showHideCompList}
        showHideHandler={showHideHandler}
        editlabel={"briefIntro"}
        showHideComponentName={"newsbriefintro"}
        detailsContainerCss="col-lg-10 offset-lg-1 text-center"
        introTitleCss="fs-3 fw-medium text-md-center"
        introSubTitleCss="fw-medium text-muted text-md-center"
        introDecTitleCss="fs-6 fw-normal w-75 m-auto text-md-center"
        anchorContainer="text-center my-4"
        linkLabel="More.."
        showHideComponentTitle={"News Brief Intro "}
      />

      <div className="container my-4 newsAndUpdates">
        <div className="row mb-2 py-4">
          <div className="col-md-6 d-flex jusitfy-content-start align-items-center">
            <Title
              title="News"
              cssClass="pageTitle fs-4"
              mainTitleClassess=""
              subTitleClassess=""
            />

            {isAdmin && hasPermission && (
              <div className="text-end">
                <Link
                  to="#"
                  className="btn btn-outline ms-2"
                  onClick={() => editHandler("addNews", true)}
                >
                  New
                  <i className="fa fa-plus ms-2" aria-hidden="true"></i>
                </Link>
              </div>
            )}
          </div>
          <div className="col-md-6">
            <Search
              setObject={setResponseData}
              clientSearchURL={"/appNews/searchAppNews/"}
              adminSearchURL={"/appNews/createAppNews/"}
              clientDefaultURL={"/appNews/clientAppNews/"}
              searchfiledDeatails={"News Title"}
              setPageloadResults={setPageloadResults}
              setSearchquery={setSearchquery}
              searchQuery={searchQuery}
              addStateChanges={componentEdit.addNews}
              editStateChanges={editNews}
            />
            <div className="d-flex justify-content-end align-items-end position-relative">
              <ShareButtons />
            </div>
          </div>
        </div>
        {/* {isAdmin && (
          <NoteComponent note="Use drag option to shuffle the Items" />
        )} */}

        <div className="row mb-5">
          {componentEdit.addNews && (
            <div className={`adminEditTestmonial selected`}>
              <AdminSingleRecordUpload
                editHandler={editHandler}
                componentType="addNews"
                popupTitle={"Add News"}
                imageGetURL="appNews/createAppNews/"
                imagePostURL="appNews/createAppNews/"
                imageUpdateURL="appNews/updateAppNews/"
                imageDeleteURL="appNews/updateAppNews/"
                showExtraFormFields={getNewslFields()}
                dimensions={imageDimensionsJson("addNews")}
              />
            </div>
          )}

          <HomeNews
            addNewsState={componentEdit.addNews}
            news={news}
            setNews={setNews}
            setResponseData={setResponseData}
            pageType={pageType}
            searchQuery={searchQuery}
            setNewsEditState={setEditNews}
          />
          <div>
            {paginationData?.total_count ? (
              <CustomPagination
                paginationData={paginationData}
                paginationURL={isAdmin ? "/appNews/createAppNews/" : "/appNews/clientAppNews/"}
                paginationSearchURL={
                  searchQuery
                    ? `appNews/searchAppNews/${searchQuery}/`
                    : isAdmin
                      ? "/appNews/createAppNews/"
                      : "/appNews/clientAppNews/"
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
      </div>
      {showModal && <Model obj={obj} closeModel={closeModel} flag="news" />}
      {showModal && <ModelBg closeModel={closeModel} />}

      {show && <ModelBg />}
    </>
  );
};

export default NewsAndUpdates;
