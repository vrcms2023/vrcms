import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// Components

import Title from "../../Common/Title";
import Model from "../../Common/Model";
import ModelBg from "../../Common/ModelBg";
import Banner from "../../Common/Banner";
import { useAdminLoginStatus } from "../../Common/customhook/useAdminLoginStatus";
import Search from "../../Common/Search";
import EditIcon from "../../Common/AdminEditIcon";
import HomeNews from "../Components/HomeNews";
import ImageInputsForm from "../../Admin/Components/forms/ImgTitleIntoForm";
import AddEditAdminNews from "../../Admin/Components/News/index";

import { removeActiveClass } from "../../util/ulrUtil";
import {
  getFormDynamicFields,
  getNewslFields,
  imageDimensionsJson,
} from "../../util/dynamicFormFields";

// Styles
import CustomPagination from "../../Common/CustomPagination";
import {
  getObjectPositionKey,
  paginationDataFormat,
  sortByFieldName,
} from "../../util/commonUtil";
import NoteComponent from "../../Common/NoteComponent";

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

  useEffect(() => {
    removeActiveClass();
    const id = document.getElementById("KnowledgeHubnavbarDropdown");
    if (id) {
      id.classList.add("active");
    }
  });

  const setResponseData = (data) => {
    const _positionKey = getObjectPositionKey(data.results[0]);
    const _newslList = sortByFieldName(data.results, _positionKey);
    setNews(_newslList);
    setPaginationData(paginationDataFormat(data));
    setCurrentPage(1);
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

      <div className="container my-4 newsAndUpdates">
        {isAdmin && hasPermission && (
          <div className="text-end mb-4">
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

        <div className="row mb-4 py-4">
          <div className="col-md-6">
            <Title title="News And Updates" cssClass="fs-1 pageTitle" />
          </div>
          <div className="col-md-6">
            <Search
              setObject={setResponseData}
              clientSearchURL={"/appNews/searchAppNews/"}
              adminSearchURL={"/appNews/createAppNews/"}
              clientDefaultURL={"/appNews/clientAppNews/"}
              searchfiledDeatails={"News Title / News Description"}
              setPageloadResults={setPageloadResults}
              setSearchquery={setSearchquery}
              searchQuery={searchQuery}
            />
          </div>
        </div>
        {isAdmin && (
          <NoteComponent note="Use drag option to shuffle the Items" />
        )}

        <div className="row mb-5">
          {componentEdit.addNews ? (
            <div className="adminEditTestmonial">
              <AddEditAdminNews
                editHandler={editHandler}
                componentType="addNews"
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
          ) : (
            ""
          )}

          <HomeNews
            addNewsState={componentEdit.addNews}
            news={news}
            setNews={setResponseData}
            setPageloadResults={setPageloadResults}
            pagetype={pageType}
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
