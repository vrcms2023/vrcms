import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";
import { useSelector } from "react-redux";

// Components
import Title from "../../Common/Title";
import DeleteDialog from "../../Common/DeleteDialog";
import ModelBg from "../../Common/ModelBg";
import AddEditAdminNews from "../../Admin/Components/News/index";
import { useAdminLoginStatus } from "../../Common/customhook/useAdminLoginStatus";

import { getBaseURL } from "../../util/ulrUtil";
import { getImagePath } from "../../util/commonUtil";
import { sortCreatedDateByDesc } from "../../util/dataFormatUtil";
import {
  axiosClientServiceApi,
  axiosFileUploadServiceApi,
} from "../../util/axiosUtil";
import { getNewslFields } from "../../util/dynamicFormFields";
import moment from "moment";

// Images
import EditIcon from "../../Common/AdminEditIcon";

// Styles
import { NewsStyled } from "../../Common/StyledComponents/Styled-News";
import Ancher from "../../Common/Ancher";
import SkeletonNews from "../../Common/Skeltons/SkeltonNews";

const HomeNews = ({
  addNewsState,
  news,
  setNews,
  setPageloadResults,
  pagetype,
}) => {
  const location = useLocation();
  const baseURL = getBaseURL();
  const editComponentObj = {
    news: false,
  };

  const pageType = "homeNew";
  const { isLoading } = useSelector((state) => state.loader);
  const { isAdmin, hasPermission } = useAdminLoginStatus();
  const [componentEdit, SetComponentEdit] = useState(editComponentObj);
  const [show, setShow] = useState(false);

  const [editNews, setEditNews] = useState({});

  const [obj, setObj] = useState({});
  const [showModel, setShowModel] = useState(false);
  const [showModelBg, setShowModelBg] = useState(false);

  const editHandler = (name, value, item) => {
    setEditNews(item);
    SetComponentEdit((prevFormData) => ({ ...prevFormData, [name]: value }));
    setShow(!show);
    document.body.style.overflow = "hidden";
  };

  useEffect(() => {
    const getNews = async () => {
      try {
        const response = await axiosClientServiceApi.get(
          `/appNews/clientAppNews/`,
        );
        // console.log(response.data.results, "News Component");
        if (response?.status === 200) {
          //const data = sortCreatedDateByDesc(response.data.appNews);

          setPageloadResults(true);
          const data =
            pagetype === "home"
              ? response.data.results.slice(0, 4)
              : response.data.results;
          setNews(data);
        }
      } catch (error) {
        console.log("unable to access ulr because of server is down");
      }
    };
    if (!componentEdit.news || !addNewsState) {
      getNews();
    }
  }, [componentEdit.news, addNewsState]);

  /**
   *
   * Delete News
   */
  const DeleteNews = (id, name) => {
    const deleteImageByID = async () => {
      const response = await axiosFileUploadServiceApi.delete(
        `appNews/updateAppNews/${id}/`,
      );
      if (response.status == 204) {
        const list = news.filter((item) => item.id !== id);
        setNews(list);
      }
    };

    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <DeleteDialog
            onClose={onClose}
            callback={deleteImageByID}
            message={`deleting the ${name} News?`}
          />
        );
      },
    });
  };

  const handleModel = (obj) => {
    setObj(obj);
    setShowModel(true);
    setShowModelBg(true);
  };

  const closeModel = () => {
    setShowModel(false);
    setShowModelBg(false);
  };

  return (
    <>
      {isLoading ? (
        <div className="row">
          {[1, 2, 3, 4].map((item, index) => (
            <div className="col-md-6 col-lg-3 mb-4 mb-lg-0" key={index}>
              <SkeletonNews />
            </div>
          ))}
        </div>
      ) : (
        ""
      )}

      {news.length > 0 ? (
        news.map((item) => (
          <div className="col-md-6 col-lg-3 mb-4 mb-lg-0" key={item.id}>
            <NewsStyled>
              <div className="card homeNews">
                {/* Edit News */}
                {isAdmin && hasPermission && (
                  <div className="d-flex justify-content-end gap-2">
                    {/* <EditIcon editHandler={() => editHandler("news", true, item)} /> */}
                    <Link
                      onClick={() => editHandler("news", true, item)}
                      className=" p-2"
                    >
                      <i
                        className="fa fa-pencil fs-5 text-warning"
                        aria-hidden="true"
                      ></i>
                    </Link>

                    <Link
                      onClick={(event) => DeleteNews(item.id, item.news_title)}
                      className=" p-2"
                    >
                      <i
                        className="fa fa-trash-o fs-5 text-danger"
                        aria-hidden="true"
                      ></i>
                    </Link>
                  </div>
                )}

                <img
                  src={item.path}
                  className="img-fluid"
                  alt={item.alternitivetext}
                />
                <div className="card-body p-3">
                  <Title
                    title={
                      item.news_title ? item.news_title : "Update news Title"
                    }
                    cssClass="fs-5 fw-bold lh-sm mb-2 lineClamp lc1"
                  />
                  <div className="card-text mb-4 lineClamp lc2">
                    {item.news_description ? (
                      <div
                        dangerouslySetInnerHTML={{
                          __html: item.news_description,
                        }}
                      ></div>
                    ) : (
                      "update new description"
                    )}
                  </div>
                  {/* <p>{moment(item.created_at).format('DD-MM-YYYY hh:mm:ss')}</p> */}
                  <Ancher
                    AncherLabel="Read more"
                    Ancherpath="/news"
                    AncherClass="btn btn-more d-flex justify-content-center align-items-center gap-2"
                    AnchersvgColor="#17427C"
                    handleModel={() => handleModel(item)}
                  />
                </div>
              </div>
            </NewsStyled>
          </div>
        ))
      ) : (
        <div className="text-center">
          {isAdmin && hasPermission ? (
            <>
              {location.pathname === "/news" ? (
                <p className="text-center fs-6">Please add news items</p>
              ) : (
                <>
                  <p className="text-center fs-6">
                    Currently there are no news items found.
                  </p>
                  <Ancher
                    AncherLabel="Go To News"
                    Ancherpath="/news"
                    AncherClass="btn btn-secondary d-flex justify-content-center align-items-center gap-3"
                    AnchersvgColor="#ffffff"
                  />
                  {/* <Link to="/news" className="btn btn-primary fs-6">
                    Go To News
                  </Link> */}
                </>
              )}
            </>
          ) : (
            <p className="text-center fs-6">
              {!isLoading && "Currently there are no news items found."}
            </p>
          )}
        </div>
      )}

      {componentEdit.news ? (
        <div className="adminEditTestmonial">
          <AddEditAdminNews
            editHandler={editHandler}
            editCarousel={editNews}
            setEditCarousel={setEditNews}
            componentType="news"
            imageGetURL="appNews/createAppNews/"
            imagePostURL="appNews/createAppNews/"
            imageUpdateURL="appNews/updateAppNews/"
            imageDeleteURL="appNews/updateAppNews/"
            imageLabel="Add News Image"
            showDescription={false}
            showExtraFormFields={getNewslFields()}
          />
        </div>
      ) : (
        ""
      )}

      {showModel ? (
        <div className="newsModel">
          <div className="newsModalWrapper p-4 bg-white shadow-lg">
            <div className="d-flex justify-content-between align-items-center gap-4 mb-1 pb-2 border-bottom">
              <Title title={obj.news_title} cssClass="fw-bold fs-6" />
              <Link
                onClick={closeModel}
                className="text-danger text-uppercase d-flex gap-2 justify-content-center align-items-center"
              >
                <span className="d-none d-lg-block">Close</span>
                <i className="fa fa-times fs-3" aria-hidden="true"></i>
              </Link>
            </div>
            <div>
              <img className="w-100" src={obj.path} alt={obj.news_title} />
            </div>
            <div className="my-3 newsDetails">
              {obj.news_description ? (
                <div
                  dangerouslySetInnerHTML={{ __html: obj.news_description }}
                ></div>
              ) : (
                "update new description"
              )}
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
      {showModelBg && <ModelBg />}

      {show && <ModelBg />}
    </>
  );
};

export default HomeNews;
