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
        <div className={`adminEditTestmonial  selected `}>
          <ImageInputsForm
            editHandler={editHandler}
            componentType="banner"
            popupTitle="News Banner"
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
          showHideCompList?.newsbriefintro?.visibility &&
          isAdmin &&
          hasPermission
            ? "border border-info mb-2"
            : ""
        }
      >
        {isAdmin && hasPermission && (
          <ShowHideToggle
            showhideStatus={showHideCompList?.newsbriefintro?.visibility}
            title={"A Brief Introduction Component"}
            componentName={"newsbriefintro"}
            showHideHandler={showHideHandler}
            id={showHideCompList?.newsbriefintro?.id}
          />
        )}

        {/* INTRODUCTION COMPONENT */}
        {showHideCompList?.newsbriefintro?.visibility && (
          <div>
            {/* Introduction */}
            {isAdmin && hasPermission && (
              <EditIcon editHandler={() => editHandler("briefIntro", true)} />
            )}

            <BriefIntroFrontend
              introState={componentEdit.briefIntro}
              pageType={pageType}
              introTitleCss="fs-3 fw-medium text-md-center"
              introSubTitleCss="fw-medium text-muted text-md-center"
              introDecTitleCss="fs-6 fw-normal w-75 m-auto text-md-center"
              anchorContainer="text-center my-4"
              linkLabel="More.."
              showLink={"True"}
            />
            {componentEdit.briefIntro && (
              <div className={`adminEditTestmonial selected `}>
                <BriefIntroAdmin
                  editHandler={editHandler}
                  componentType="briefIntro"
                  pageType={pageType}
                />
              </div>
            )}
          </div>
        )}
      </div>

      <div className="container my-4 newsAndUpdates">
        {isAdmin && hasPermission && (
          <div className="text-end">
            <Link
              to="#"
              className="btn btn-primary"
              onClick={() => editHandler("addNews", true)}
            >
              Add News
              <i className="fa fa-plus ms-2" aria-hidden="true"></i>
            </Link>
          </div>
        )}

        <div className="row mb-2 py-4">
          <div className="col-md-8">
            <Title
              title="News"
              cssClass=""
              mainTitleClassess="fs-4 fw-medium"
              subTitleClassess=""
            />
          </div>
          <div className="col-md-4">
            <Search
              setObject={setResponseData}
              clientSearchURL={"/appNews/searchAppNews/"}
              adminSearchURL={"/appNews/createAppNews/"}
              clientDefaultURL={"/appNews/clientAppNews/"}
              searchfiledDeatails={"News Title / News Description"}
              setPageloadResults={setPageloadResults}
              setSearchquery={setSearchquery}
              searchQuery={searchQuery}
              addStateChanges={componentEdit.addNews}
              editStateChanges={editNews}
            />
          </div>
        </div>
        {/* {isAdmin && (
          <NoteComponent note="Use drag option to shuffle the Items" />
        )} */}

        <div className="row mb-5">
          {componentEdit.addNews && (
            <div className={`adminEditTestmonial selected`}>
              <AddEditAdminNews
                editHandler={editHandler}
                componentType="addNews"
                popupTitle="Add News"
                imageGetURL="appNews/createAppNews/"
                imagePostURL="appNews/createAppNews/"
                imageUpdateURL="appNews/updateAppNews/"
                imageDeleteURL="appNews/updateAppNews/"
                imageLabel="Add News Image"
                showDescription={false}
                showExtraFormFields={getNewslFields("addNews")}
                dimensions={imageDimensionsJson("addNews")}
              />
            </div>
          )}

          <HomeNews
            addNewsState={componentEdit.addNews}
            news={news}
            setNews={setNews}
            setResponseData={setResponseData}
            setPageloadResults={setPageloadResults}
            pagetype={pageType}
            searchQuery={searchQuery}
            setNewsEditState={setEditNews}
          />
          <div>
            {paginationData?.total_count ? (
              <CustomPagination
                paginationData={paginationData}
                paginationURL={
                  isAdmin
                    ? "/appNews/createAppNews/"
                    : "/appNews/clientAppNews/"
                }
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
