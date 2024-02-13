import React, { useState, useEffect } from "react";
import CatageoryImgC from "../../../Common/CatageoryImgC";
import { useNavigate } from "react-router-dom";
import FileUpload from "../../Components/FileUpload";
import Button from "../../../Common/Button";
import { v4 as uuidv4 } from "uuid";
import { Link } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";
import DeleteDialog from "../../../Common/DeleteDialog";
import Title from "../../../Common/Title";
import { axiosServiceApi } from "../../../util/axiosUtil";
import { toast } from "react-toastify";
import { getCookie } from "../../../util/cookieUtil";
import Error from "../../Components/Error";
import { sortByDate } from "../../../util/dataFormatUtil";
import { getBaseURL } from "../../../util/ulrUtil";

export const AdminNews = () => {
  const navigate = useNavigate();
  const [newsObject, setNewsObject] = useState([]);
  const [newProject, setNewProject] = useState({ id: uuidv4() });
  const newsKeys = { newstitle: "", description: "" };
  const [newsState, setnewsState] = useState(newsKeys);
  const [errorMessage, setErrorMessage] = useState("");
  const [editState, setEditState] = useState(false);
  const [id, setID] = useState(0);
  const [userName, setUserName] = useState("");
  const baseurl = getBaseURL();
  const [saveState, setSaveState] = useState(false);

  useEffect(() => {
    setUserName(getCookie("userName"));
  }, []);

  const generateUUID = () => {
    return uuidv4();
  };

  const changeHandler = (e) => {
    setErrorMessage("");
    setnewsState({ ...newsState, [e.target.name]: e.target.value });
  };

  const cancelHandler = () => {
    setnewsState(newsKeys);
    setNewProject({
      id: generateUUID(),
    });
    setEditState(false);
    setNewsObject([]);
    setID(0);
  };

  const [newsList, setNewsList] = useState([]);

  const getNewList = async () => {
    const response = await axiosServiceApi.get(`/appNews/createAppNews/`);
    if (response?.status == 200 && response.data?.appNews?.length > 0) {
      const listReverseOrder = response.data.appNews;
      const sortData = sortByDate(listReverseOrder);
      setNewsList(sortData);
    } else {
      setNewsList([]);
    }
  };

  useEffect(() => {
    getNewList();
  }, []);

  const saveProject = async () => {
    if (newsState.newstitle === "") {
      setErrorMessage("Please add title");
      return;
    }

    if (newsState.description === "") {
      setErrorMessage("Please add description");
      return;
    }

    const news = {
      projectID: newProject.id,
      newstitle: newsState.newstitle,
      description: newsState.description,
      imageIds: newsObject.map(function (item) {
        return item.id;
      }),
      originalnames: newsObject.map(function (item) {
        return item.originalname;
      }),
      imageUrls: newsObject.map(function (item) {
        return item.path;
      }),
      updated_by: userName,
      created_by: newsState?.created_by ? newsState?.created_by : userName,
      id: id,
    };

    try {
      let response = "";
      if (editState) {
        news.updated_by = userName;
        response = await axiosServiceApi.put(`/appNews/updateAppNews/${id}/`, {
          ...news,
        });
      } else {
        response = await axiosServiceApi.post(`/appNews/createAppNews/`, {
          ...news,
        });
      }

      if (response?.status == 200 || response?.status == 201) {
        toast.success(
          `${newsState.newstitle} news ${editState ? "Update" : "created"}`,
        );
        setEditState(false);
        setnewsState(newsKeys);
        setNewProject({
          id: generateUUID(),
        });
        setNewsObject([]);
        getNewList();
        setID(0);
      } else {
        setErrorMessage(response.data.message);
      }
    } catch (error) {
      toast.error("Unable to save the news");
    }
  };

  const handleNewsEdit = (event, news) => {
    event.preventDefault();
    const {
      imageId,
      projectID,
      originalname,
      imageUrl,
      description,
      newstitle,
      id,
    } = news;
    setNewsObject([]);
    const newsObj = {
      newstitle: newstitle,
      description: description,
    };
    const newsObject = {
      id: projectID,
      category: "news",
    };
    setNewProject(newsObject);
    setnewsState(newsObj);
    setEditState(true);
    setID(id);
    window.scrollTo(0, 0);
  };

  const handleNewsDelete = (event, news) => {
    event.preventDefault();
    const deleteSelectedNews = async () => {
      try {
        const response = await axiosServiceApi.delete(
          `/appNews/updateAppNews/${news.id}/`,
        );

        if (response.status !== 204) {
          setErrorMessage(response.data.message);
          toast.error("Unable to Delete news");
        }
        if (response.status == 204) {
          toast.success(`${news.newstitle} news deleted`);
          setEditState(false);
          setnewsState(newsKeys);
          setNewsObject([]);
          getNewList();
        }
      } catch (error) {
        toast.error("Unable to Delete news");
      }
    };
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <DeleteDialog
            onClose={onClose}
            callback={deleteSelectedNews}
            message={`deleting the ${news.newstitle} news?`}
          />
        );
      },
    });
  };

  return (
    <div className="container-fluid pt-5" style={{ marginTop: "100px" }}>
      <div className="row px-3">
        <div className="text-end d-flex justify-content-between">
          <Title
            title={"News And Update"}
            cssClass="text-center blue-500 fs-4"
          />
          <Button
            type="submit"
            cssClass="btn btn-secondary"
            label="Back to Menu"
            handlerChange={() => navigate("/main")}
          />
        </div>
      </div>

      <div className="row px-3 mt-4 ">
        <div className="col-12 col-md-5 col-lg-4 ">
          <div
            className={`${
              editState ? "editModeBorder" : "border border-1"
            }  p-4 mb-4 bg-light shadow-lg`}
          >
            {errorMessage && <Error>{errorMessage}</Error>}
            {editState ? (
              <div className="mb-2 text-center fs-5 blue-500 ">Edit Mode</div>
            ) : (
              ""
            )}
            <div className="mb-3">
              <label htmlFor="projectDescription" className="form-label  ">
                News Title <span className="text-danger"> *</span>
              </label>
              <input
                type="text"
                className="form-control"
                name="newstitle"
                value={newsState.newstitle}
                onChange={changeHandler}
                id="newstitle"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="projectDescription" className="form-label  ">
                News Description <span className="text-danger"> *</span>
              </label>
              <textarea
                className="form-control"
                name="description"
                value={newsState.description}
                onChange={changeHandler}
                id="projectDescription"
                rows="3"
              ></textarea>
            </div>
            <div className="mb-3">
              <FileUpload
                title="News Images (Upload multiple images)"
                project={newProject}
                updatedBy={userName}
                category="news"
                gallerysetState={setNewsObject}
                galleryState={newsObject}
                saveState={setSaveState}
                validTypes="image/png,image/jpeg"
              />
              <CatageoryImgC
                title={`News Image`}
                catategoryImgs={newsObject}
                catategoryImgState={setNewsObject}
                project={newProject}
                category="news"
                cssClass="thumb75 mb-5 shadow-lg border border-5 border-warning rounded-5"
              />
            </div>
            <div className="text-center">
              {editState ? (
                <Button
                  type="submit"
                  cssClass="btn btn-secondary me-3"
                  label="Cancel"
                  handlerChange={cancelHandler}
                />
              ) : (
                ""
              )}
              <Button
                type="submit"
                disabled={saveState}
                cssClass="btn btn-primary"
                label={editState ? "Update News" : "Save News"}
                handlerChange={saveProject}
              />
            </div>
          </div>
        </div>
        <div className="col-12 col-md-7 col-lg-8">
          {newsList.length > 0 ? (
            <div className="row px-2 table-responsive">
              <table className="table table-hover border align-middle">
                <thead>
                  <tr>
                    <th>News Title</th>
                    <th>Description</th>
                    <th>Image</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {newsList?.map((news) => (
                    <tr
                      key={news.id}
                      className={`${news.id === id ? "editModeBorder" : ""}`}
                    >
                      <td className="description">
                        <span className="m-0">{news.newstitle} </span>
                      </td>
                      <td className="description">
                        <p className="m-0">{news.description}</p>
                      </td>
                      <td>
                        {" "}
                        {news?.imageUrls.length > 0 ? (
                          <>
                            <img
                              width={"60"}
                              height={"60"}
                              src={`${baseurl}${news.imageUrls[0]}`}
                              alt=" "
                            />{" "}
                            <span className="badge text-bg-secondary">
                              {news?.imageUrls.length > 1
                                ? `${news?.imageUrls.length} img's`
                                : ""}
                            </span>
                          </>
                        ) : (
                          <img
                            width={"60"}
                            height={"60"}
                            src={`${baseurl}/media/images/dummy-image-square.png`}
                            alt=""
                          />
                        )}{" "}
                      </td>
                      <td>
                        <Link onClick={(event) => handleNewsEdit(event, news)}>
                          <i
                            className="fa fa-pencil-square-o fs-4 text-muted me-3"
                            aria-hidden="true"
                          ></i>
                        </Link>
                        <Link
                          onClick={(event) => handleNewsDelete(event, news)}
                        >
                          <i
                            className="fa fa-trash-o fs-4 text-danger"
                            aria-hidden="true"
                          ></i>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminNews;
