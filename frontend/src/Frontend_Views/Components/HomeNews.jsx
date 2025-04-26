import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";
import { useSelector } from "react-redux";

// Components
import Title from "../../Common/Title";
import DeleteDialog from "../../Common/DeleteDialog";
import ModelBg from "../../Common/ModelBg";
import AddEditAdminNews from "../../Frontend_Admin/Components/News/index";
import { useAdminLoginStatus } from "../../Common/customhook/useAdminLoginStatus";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";

import {
  axiosClientServiceApi,
  axiosFileUploadServiceApi,
  axiosServiceApi,
} from "../../util/axiosUtil";
import { getNewslFields } from "../../util/dynamicFormFields";

// Styles
import { NewsStyled } from "../../Common/StyledComponents/Styled-News";
import Ancher from "../../Common/Ancher";
import SkeletonNews from "../../Common/Skeltons/SkeltonNews";
import {
  getImagePath,
  getListStyle,
  reorder,
  sortByFieldName,
  updateArrIndex,
} from "../../util/commonUtil";
import moment from "moment";

const HomeNews = ({
  addNewsState,
  news,
  setNews,
  setResponseData,
  pagetype,
}) => {
  const location = useLocation();
  const editComponentObj = {
    news: false,
  };

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
          `/appNews/clientAppNews/`
        );
        // console.log(response.data.results, "News Component");
        if (response?.status === 200) {
          //const data = sortCreatedDateByDesc(response.data.appNews);

          //setPageloadResults(true);
          //const _list = sortByFieldName(response.data.results, "news_position");
          //const data = pagetype === "home" ? _list.slice(0, 4) : _list;
          if (pagetype === "home") {
            setNews(response?.data);
          } else {
            setResponseData(response?.data);
          }
        }
      } catch (error) {
        console.log("unable to access ulr because of server is down");
      }
    };
    if (componentEdit.news || !addNewsState) {
      getNews();
    }
  }, [componentEdit.news, addNewsState, pagetype]);

  /**
   *
   * Delete News
   */
  const DeleteNews = (id, name) => {
    const deleteImageByID = async () => {
      const response = await axiosFileUploadServiceApi.delete(
        `appNews/updateAppNews/${id}/`
      );
      if (response.status === 204) {
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

  const onDragEnd = async (result) => {
    const { source, destination } = result;
    if (!destination) return true;

    const _items = reorder(news, source.index, destination.index);
    const _parentObjects = updateArrIndex(_items, "news_position");
    const response = await updateObjectsIndex(_parentObjects);
    if (response.length > 0) {
      setNews(response);
    }
  };

  const updateObjectsIndex = async (data) => {
    try {
      let response = await axiosServiceApi.put(
        `/appNews/updateNewsIndex/`,
        data
      );
      if (response?.data?.appNews) {
        return response.data.appNews;
      }
    } catch (error) {
      console.log("unable to save news position");
    }
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

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId={"NewsList"} id="newsList">
          {(provided, snapshot) => (
            <div
              className="row"
              ref={provided.innerRef}
              // style={getListStyle(snapshot.isDraggingOver)}
              {...provided.droppableProps}
            >
              {news.length > 0 ? (
                news.map((item, index) => {
                  return (
                    <NewsItem
                      item={item}
                      key={item.id}
                      index={index}
                      handleModel={handleModel}
                      DeleteNews={DeleteNews}
                      editHandler={editHandler}
                    />
                  );
                })
              ) : (
                <div className="text-center">
                  {isAdmin && hasPermission ? (
                    <>
                      {location.pathname === "/news" ? (
                        <p className="text-center fs-6">
                          Please add news items
                        </p>
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
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      {componentEdit.news && (
        <div className={`adminEditTestmonial  selected`}>
          <AddEditAdminNews
            editHandler={editHandler}
            editCarousel={editNews}
            setEditCarousel={setEditNews}
            componentType="news"
            popupTitle="News"
            imageGetURL="appNews/createAppNews/"
            imagePostURL="appNews/createAppNews/"
            imageUpdateURL="appNews/updateAppNews/"
            imageDeleteURL="appNews/updateAppNews/"
            imageLabel="Add News Image"
            showDescription={false}
            showExtraFormFields={getNewslFields()}
          />
        </div>
      )}

      {showModel ? (
        <div className="newsModel ">
          <div className="newsModalWrapper p-4 bg-white shadow-lg">
            <div className="d-flex justify-content-between align-items-center gap-4 mb-1 pb-2 border-bottom">
              <Title title={obj.news_title} cssClass="fw-medium" />
              <Link onClick={closeModel} className="text-secondary ">
                {/* <span className="d-none d-lg-block">Close</span> */}
                <i className="fa fa-times fs-4" aria-hidden="true"></i>
              </Link>
            </div>
            <div className="my-3 newsDetails">
              <div className="text-center">
                <img
                  className="w-auto mb-3"
                  style={{ height: "240px", objectFit: "cover" }}
                  src={getImagePath(obj.path)}
                  alt={obj.news_title}
                />
              </div>
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

const NewsItem = ({ item, index, handleModel, DeleteNews, editHandler }) => {
  const { isAdmin, hasPermission } = useAdminLoginStatus();
  return (
    <Draggable
      isDragDisabled={isAdmin ? false : true}
      key={item.id}
      index={index}
      draggableId={item.id}
      id={item.id}
    >
      {(provided) => (
        <div
          className={`${isAdmin ? "col-12" : "col-sm-6 col-lg-4 px-2 px-md-4 px-lg-5"} image`}
          ref={provided.innerRef}
          {...provided.draggableProps}
        >
          {/* <div className="col-md-12 col-lg-12 mb-4 mb-lg-0 border border-1" key={item.id}> */}
          <div
            className={`col-md-12 col-lg-12 ${isAdmin ? "px-3" : ""}`}
            key={item.id}
          >
            <NewsStyled>
              <div
                className={`card homeNews ${isAdmin ? "adminView" : ""}`}
                style={{ minHeight: isAdmin ? "auto" : "" }}
              >
                <div
                  className={`${isAdmin ? "d-flex align-items-center p-2 px-3 mb-3 border rounded" : ""} `}
                >
                  {!isAdmin && (
                    <img
                      src={getImagePath(item.path)}
                      className="img-fluid rounded-3"
                      alt={item.alternitivetext}
                    />
                  )}
                  {isAdmin && hasPermission ? (
                    <i
                      className="fa fa-bars text-secondary"
                      aria-hidden="true"
                      {...provided.dragHandleProps}
                    ></i>
                  ) : (
                    ""
                  )}
                  <div
                    className="w-100"
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <div className={`${isAdmin ? "px-3" : "py-3"}`}>
                      <Title
                        title={
                          item.news_title
                            ? item.news_title
                            : "Update news Title"
                        }
                        cssClass={`fs-6 lineClamp lc2 ${!isAdmin && "fw-bold"}`}
                        mainTitleClassess={` fw-medium lh-sm lineClamp lc1 ${isAdmin ? "fs-6" : "fs-5"}`}
                        subTitleClassess=""
                      />
                      {/* <small className="d-block my-2">{moment(item.created_at).format('DD-MM-YYYY hh:mm:ss')}</small> */}
                      {!isAdmin && (
                        <small className="d-block mb-3">
                          {moment(item.created_at).format("MMM DD, YYYY")}
                        </small>
                      )}
                      {!isAdmin && (
                        <div
                          className={`card-text  ${isAdmin ? "mb-0" : "mb-2"}`}
                        >
                          {item.news_description ? (
                            <div
                              className={`lineClamp ${isAdmin ? "lc1" : "lc2"}`}
                              dangerouslySetInnerHTML={{
                                __html: item.news_description,
                              }}
                            ></div>
                          ) : (
                            "update new description"
                          )}
                        </div>
                      )}
                      <Link
                        className="moreLink"
                        onClick={() => handleModel(item)}
                      >
                        More..
                      </Link>
                    </div>

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
                          onClick={(event) =>
                            DeleteNews(item.id, item.news_title)
                          }
                          className="p-2"
                        >
                          <i
                            className="fa fa-trash-o fs-5 text-danger"
                            aria-hidden="true"
                          ></i>
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </NewsStyled>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default HomeNews;
