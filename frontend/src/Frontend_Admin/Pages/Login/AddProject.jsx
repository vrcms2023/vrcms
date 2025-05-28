import React, { useState, useEffect } from "react";
import Title from "../../../Common/Title";
import Button from "../../../Common/Button";
import { useNavigate } from "react-router-dom";
import FileUpload from "../../Components/FileUpload";
import Specifications from "../../Components/Specifications";
import { Amenities, AmenitiesList } from "../../Components/Amenities";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

import CatageoryImgC from "../../../Common/CatageoryImgC";
import { axiosServiceApi } from "../../../util/axiosUtil";
import { getCookie } from "../../../util/cookieUtil";
import Error from "../../Components/Error";

import { confirmAlert } from "react-confirm-alert";
import DeleteDialog from "../../../Common/DeleteDialog";
import CSRFToken from "../../../Frontend_Views/Components/CRSFToken";

import "./AddProject.css";
import FileUploadModel from "../../../Common/fileUploadModel";
import ModelBg from "../../../Common/ModelBg";

const AddProject = () => {
  const navigate = useNavigate();

  const [show, setShow] = useState(false);
  const [projectType, setProjectType] = useState({});
  const [projectName, setProjectName] = useState("");
  const [defaultProjectType, setDefaultProjectType] = useState([]);

  const [errorMessage, setErrorMessage] = useState("");
  const [newProject, setNewProject] = useState({});
  const [readOnlyTitle, setreadOnlyTitle] = useState("");

  const [selected, setSelected] = useState("");

  const [obj, setObj] = useState({});
  const [showModel, setShowModel] = useState(false);
  const [showModelBg, setShowModelBg] = useState(false);
  const [fileuploadType, setfFileuploadType] = useState("");

  const about = {
    aboutstitle: null,
    aboutussubtitle: null,
    description: null,
    imageDescription: null,
  };
  const [aboutUs, setAboutUs] = useState(about);
  const specificationKeys = { title: null, feature: null };
  const amenitieKeys = {
    id: "",
    amenitie: null,
    feature: null,
    googleMap: null,
  };
  const seo = {
    seo_title: null,
    seo_description: null,
    seo_link: null,
    seo_author: null,
    seo_keywords: null,
  };
  const [seofields, setSeofields] = useState(seo);
  const [specifications, setSpecifications] = useState([specificationKeys]);
  const [amenities, setAmenities] = useState(amenitieKeys);
  const [pdfObject, setPdfObject] = useState([]);
  const [thumbnailObject, setThumbnailObject] = useState([]);
  const [planObject, setPlanObject] = useState([]);
  const [availabileObject, setAvailabileObject] = useState([]);
  const [priceObject, setPriceObject] = useState([]);
  const [imgGallery, setImgGallery] = useState([]);
  const [projectStatus, setProjectStatus] = useState("");
  const [userName, setUserName] = useState("");
  const [projectTitleErrorMessage, setProjectTitleErrorMessage] = useState("");
  const [projectPublish, setProjectPublish] = useState(false);
  const [saveState, setSaveState] = useState(false);

  const { id } = useParams();

  const [percentValue, setPercentValue] = useState(null);
  const options = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100];

  const handleSelectChange = (event) => {
    setPercentValue(event.target.value);
  };

  /**
   * Get project type object
   */
  useEffect(() => {
    const getPorjectCategory = async () => {
      const response = await axiosServiceApi.get(`/project/categorylist/`);
      if (response?.status === 200) {
        setDefaultProjectType(response.data);
      } else {
        navigate("/login");
      }
    };
    getPorjectCategory();
  }, [navigate]);

  useEffect(() => {
    setUserName(getCookie("userName"));
  }, []);

  /**
   * Select Porject type handler
   */
  const handleChange = (e) => {
    setErrorMessage("");
    setSelected(e.target.value);
    const value = e.target.value.toLowerCase();
    const obj = defaultProjectType.filter((obj) => {
      return obj.projectValue === value;
    });
    if (obj.length > 0) {
      setProjectType(obj);
    } else {
      setProjectType({});
      setErrorMessage("Please select Project Type");
    }
  };

  /**
   *  Project input title handler
   */
  const titleInputHandleChange = (e) => {
    setProjectTitleErrorMessage("");
    const title = e.target.value;
    setProjectName(title);
  };

  const changeHandler = (e) => {
    setAboutUs({ ...aboutUs, [e.target.name]: e.target.value });
  };

  const changeSeoHandler = (e) => {
    setSeofields({ ...seofields, [e.target.name]: e.target.value });
  };

  /**
   * project status object
   */

  const getProjectStatus = () => {
    return {
      projectCategoryID: projectType[0].idprojectcategories,
      projectCategoryName: projectType[0].projectLabel,
      projectCategoryValue: projectType[0].projectValue,
    };
  };

  /**
   * about us status  object
   */

  const getAboutUsStatus = () => {
    return {
      aboutstitle: aboutUs.aboutstitle,
      aboutussubtitle: aboutUs.aboutussubtitle,
      description: aboutUs.description,
      imageDescription: aboutUs.imageDescription,
    };
  };

  const getSEOStatus = () => {
    return {
      seo_title: seofields.seo_title,
      seo_author: seofields.seo_author,
      seo_description: seofields.seo_description,
      seo_keywords: seofields.seo_keywords,
      seo_link: seofields.seo_link,
    };
  };

  /**
   * Add project handler
   */
  async function addNewProject(event) {
    if (projectName === "") {
      setProjectTitleErrorMessage("Please add a project name");
      return;
    }
    try {
      const response = await axiosServiceApi.post(`/project/addProject/`, {
        ...getProjectStatus(),
        projectTitle: projectName,
        created_by: userName,
        updated_by: userName,
        userID: getCookie("userId"),
        status: projectType[0].projectLabel,
        isActive: true,
        publish: false,
      });
      if (response?.status === 400) {
        setErrorMessage(response.data.message);
      }
      if (response?.status === 201) {
        const project = response.data;
        toast.success(`${project.projectTitle} Project created`);
        setNewProject(project);
        setProjectStatus(project.projectCategoryName);
        setreadOnlyTitle(project.projectTitle);
        setProjectPublish(false);
        setShow(true);
      } else {
        setErrorMessage(response.data.message);
      }
    } catch (error) {
      setProjectTitleErrorMessage(`${projectName} is already register`);
      toast.error(`${projectName} is already register`);
    }
  }

  /**
   * get selected Project for edit
   */
  useEffect(() => {
    const getSelectedProject = async () => {
      const response = await axiosServiceApi.get(`/project/editProject/${id}/`);

      if (response.status !== 200) {
        setErrorMessage(response.data.message);
        toast.error("Unable to Process your request");
      }
      if (response.status === 200) {
        const project = response.data.project;
        setProjectType([
          {
            projectLabel: project.projectCategoryName,
            projectValue: project.projectCategoryValue,
            idprojectcategories: project.projectCategoryID,
          },
        ]);
        setProjectStatus(project.projectCategoryName);
        setNewProject(project);

        setreadOnlyTitle(project.projectTitle);
        setProjectName(project.projectTitle);
        const aboutus = {
          aboutstitle: project.aboutstitle,
          aboutussubtitle: project.aboutussubtitle,
          description: project.description,
          imageDescription: project.imageDescription,
        };
        setAboutUs(aboutus);
        const seolist = {
          seo_title: project.seo_title,
          seo_author: project.seo_author,
          seo_description: project.seo_description,
          seo_keywords: project.seo_keywords,
          seo_link: project.seo_link,
        };
        setSeofields(seolist);
        setPercentValue(
          project.percentValue ? JSON.parse(project.percentValue) : null
        );
        setProjectPublish(
          project.publish ? JSON.parse(project.publish) : false
        );
        setShow(true);
      } else {
        setErrorMessage(response.data.message);
      }
    };
    if (id) {
      getSelectedProject();
    }
  }, [id]);

  async function saveProject() {
    const basicDetail = {
      ...newProject,
      ...getProjectStatus(),
      ...getAboutUsStatus(),
      ...getSEOStatus(),
      projectTitle: projectName,
      updated_by: userName,
      percentValue: percentValue,
      publish: projectPublish,
    };
    const basicProjectDetails = axiosServiceApi.put(
      `/project/editProject/${newProject.id}/`,
      basicDetail
    );

    const amenitiesData = {
      projectID: newProject.id,
      updated_by: userName,
      amenitie: amenities.amenitie,
      feature: amenities.feature,
      googleMap: amenities.googleMap,
    };

    let amenitiesDeatils = "";

    if (amenities.id === "") {
      amenitiesDeatils = axiosServiceApi.post(
        `/project/amenities/`,
        amenitiesData
      );
    } else {
      amenitiesDeatils = axiosServiceApi.put(
        `/project/getAmenitiesById/${newProject.id}/`,
        amenitiesData
      );
    }

    let listOfexitSpecifications = [];
    let listOfnewSpecifications = [];
    specifications.forEach((item) => {
      if (item.id) {
        const specification = {
          id: item.id,
          projectID: newProject.id,
          updated_by: userName,
          title: item.title,
          feature: item.feature,
        };
        listOfexitSpecifications.push(specification);
      } else {
        const specification = {
          projectID: newProject.id,
          updated_by: userName,
          created_by: userName,
          title: item.title,
          feature: item.feature,
        };
        listOfnewSpecifications.push(specification);
      }
    });
    const url = [basicProjectDetails, amenitiesDeatils];

    let newspecification = null;
    let exitSpecification = null;
    if (listOfnewSpecifications.length > 0) {
      newspecification = axiosServiceApi.post(
        `/project/specification/`,
        listOfnewSpecifications
      );
      url.push(newspecification);
    }
    if (listOfexitSpecifications.length > 0) {
      exitSpecification = axiosServiceApi.put(
        `/project/updatespecification/${newProject.id}/`,
        listOfexitSpecifications
      );
      url.push(exitSpecification);
    }

    try {
      const [projects, amenitie, specification, updateSpecification] =
        await Promise.all(url);
      // console.log({
      //   projects : projects,
      //   amenitie : amenitie,
      //   specification :specification,
      //   updateSpecification:updateSpecification
      // })
      const project = projects?.data?.project;
      toast.success(`${project.projectTitle} Project Update`);
      setProjectName(project.projectTitle);
      setAmenities(amenitie?.data?.amenitie);
      const newSpecification = [];
      mapList(newSpecification, specification?.data?.specification);
      mapList(newSpecification, updateSpecification?.data?.specification);
      setSpecifications(newSpecification);
      window.scrollTo(0, 0);
    } catch (error) {
      console.log(error);
    }

    function mapList(arr, list) {
      if (list && list.length > 0) {
        list.forEach((item) => {
          arr.push(item);
        });
      }
    }
  }

  const publishHandler = async () => {
    const publishProject = async () => {
      const data = {
        publish: !projectPublish,
        isActive: true,
      };
      const response = await axiosServiceApi.patch(
        `/project/publishProject/${newProject.id}/`,
        data
      );
      if (response.status === 200) {
        const publisher = JSON.parse(response.data.project.publish);
        setProjectPublish(publisher);
        toast.success(
          `${readOnlyTitle} ${publisher ? "published" : "unPublished"}`
        );
      }
    };

    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <DeleteDialog
            onClose={onClose}
            callback={publishProject}
            message={`you wish to ${
              projectPublish ? "unPublished" : "published"
            } the project without savign your changes`}
            label={projectPublish ? "unPublished" : "published"}
          />
        );
      },
    });
  };

  const handleModel = (type) => {
    setfFileuploadType(type);
    setShowModel(true);
    setShowModelBg(true);
  };

  const closeModel = () => {
    setShowModel(false);
    setShowModelBg(false);
  };
  return (
    <div className="container-fluid pt-4">
      <CSRFToken />
      <div className="row px-3 px-lg-5">
        <div className="text-end d-flex justify-content-between align-items-center flex-column flex-md-row">
          <Title
            title={`${id ? "Edit Project" : "Add Project"}`}
            cssClass="text-center blue-500 fs-5 mb-3 mb-md-0"
          />
          <div className="d-flex gap-1 justify-content-center align-items-center">
            <Button
              type=""
              cssClass="btn btn-outline"
              label="Dashboard"
              handlerChange={() => navigate("/admin/dashboard")}
            />
            {/* <Button
              type=""
              cssClass="btn btn-secondary "
              label="Back"
              handlerChange={() => navigate("/main")}
            /> */}
          </div>
        </div>
      </div>
      {/* <hr /> */}

      {/* <Alert mesg="Project Added Successfully" cssClass="alert alert-success text-center m-auto fs-5 w-50 "/> */}

      <>
        {errorMessage ? (
          <div className="mt-5 pt-5">
            <Error>{errorMessage}</Error>
          </div>
        ) : (
          ""
        )}
        {!id && !show ? (
          <div className="pt-5 mt-5 select-project-type">
            <select
              // className="form-select border p-3 px-4 m-auto d-block rounded-0"
              aria-label="Default select example"
              id="projectStatus"
              onChange={(e) => handleChange(e)}
              className={`custom-select form-select border p-3 px-4 m-auto d-block rounded-0 ${selected ? "active" : ""}`}
            >
              <option>Select Project Type</option>
              {defaultProjectType?.length
                ? defaultProjectType?.map((option, index) => {
                    return (
                      <option
                        key={option.idprojectcategories}
                        value={option.projectValue}
                      >
                        {option.projectLabel}
                      </option>
                    );
                  })
                : ""}
            </select>
            {/* <hr /> */}
          </div>
        ) : (
          ""
        )}
      </>

      {projectType.length > 0 && !show ? (
        <div className="row" id="projectTitle">
          <div className="mt-4 p-0">
            <div className="">
              {/* <label htmlFor="projectName" className="form-label text-center d-block fs-5 mb-3 fw-normal">Add project name</label> */}
              <div className="">
                {projectTitleErrorMessage ? (
                  <Error>{projectTitleErrorMessage}</Error>
                ) : (
                  ""
                )}
                <input
                  type="text"
                  className="form-control p-4 px-0 text-center border rounded-0"
                  name="projectName"
                  value={projectName}
                  onChange={titleInputHandleChange}
                  id="projectName"
                  placeholder="Your input please..."
                />
                <div className="d-flex justify-content-center mt-4">
                  <Button
                    label="Cancel"
                    cssClass="btn btn-outline me-2"
                    handlerChange={() => {
                      navigate("/admin/dashboard");
                    }}
                  />
                  <Button
                    label="Save"
                    cssClass="btn btn-primary ms-2"
                    handlerChange={addNewProject}
                  />
                </div>
              </div>
              <small id="projectValidation" className="d-none error">
                Project name should not be empty.
              </small>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}

      {show ? (
        <>
          <div className="row px-3 mt-3">
            {/* <div className="d-flex justify-content-center align-items-center"> */}
            <div className="">
              {readOnlyTitle && (
                <h3 className="mb-4 fs-5 text-center border-bottom pt-0 pb-3 py-md-3">
                  {readOnlyTitle}
                  <span
                    className="badge bg-warning text-dark px-2 ms-2"
                    style={{ fontSize: ".7rem", fontWeight: "500" }}
                  >
                    {projectStatus.toUpperCase()}
                  </span>
                </h3>
              )}
              {/* <div className="d-flex justify-content-center align-items-center gap-1">
                <Button
                  type="submit"
                  disabled={saveState}
                  cssClass="btn btn-secondary"
                  label={id ? "Update Project" : "Save Project"}
                  handlerChange={saveProject}
                />
                {projectPublish ? (
                  <Button
                    type="submit"
                    cssClass="btn btn-sm btn-danger"
                    label={"UNPUBLISH"}
                    handlerChange={publishHandler}
                  />
                ) : (
                  <Button
                    type="submit"
                    cssClass="btn btn-sm btn-success"
                    label={"PUBLISH"}
                    handlerChange={publishHandler}
                  />
                )}
              </div> */}
            </div>

            <div className="col-md-4 col-lg-2 pb-2 project-page-tab-links">
              <div className="d-flex justify-content-end flex-column gap-2 p-0 project-sublish-status">
                {projectPublish ? (
                  <Button
                    type="submit"
                    cssClass="btn btn-sm btn-success text-white"
                    label={"PUBLISHED"}
                    handlerChange={publishHandler}
                  />
                ) : (
                  <Button
                    type="submit"
                    cssClass="btn btn-sm btn-outline"
                    label={"PUBLISH"}
                    handlerChange={publishHandler}
                  />
                )}

                <Button
                  type="submit"
                  cssClass="btn btn-sm btn-outline me-1"
                  label={"PUBLISH"}
                  icon={"fa-calendar"}
                  handlerChange={publishHandler}
                />
              </div>

              <div
                className="nav flex-column nav-pills mt-3 project-pills"
                id="v-pills-tab"
                role="tablist"
                aria-orientation="vertical"
              >
                <button
                  className="nav-link active"
                  id="v-pills-home-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#v-pills-home"
                  type="button"
                  role="tab"
                  aria-controls="v-pills-home"
                  aria-selected="true"
                >
                  Info
                </button>
                <button
                  className="nav-link"
                  id="v-pills-profile-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#v-pills-profile"
                  type="button"
                  role="tab"
                  aria-controls="v-pills-profile"
                  aria-selected="false"
                >
                  Pdfs / Plan / Map / Cost / Availability
                </button>
                <button
                  className="nav-link"
                  id="v-pills-googlemap-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#v-pills-googlemap"
                  type="button"
                  role="tab"
                  aria-controls="v-pill-googlemap"
                  aria-selected="false"
                >
                  Google Map
                </button>
                <button
                  className="nav-link"
                  id="v-pills-messages-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#v-pills-messages"
                  type="button"
                  role="tab"
                  aria-controls="v-pills-messages"
                  aria-selected="false"
                >
                  Specifications
                </button>
                <button
                  className="nav-link"
                  id="v-pills-settings-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#v-pills-settings"
                  type="button"
                  role="tab"
                  aria-controls="v-pills-settings"
                  aria-selected="false"
                >
                  Features / Amenities
                </button>

                <button
                  className="nav-link"
                  id="v-pills-settings-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#v-pills-gallery"
                  type="button"
                  role="tab"
                  aria-controls="v-pills-gallery"
                  aria-selected="false"
                >
                  Image Gallery
                </button>

                <button
                  className="nav-link"
                  id="v-pills-settings-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#v-pills-seo"
                  type="button"
                  role="tab"
                  aria-controls="v-pills-seo"
                  aria-selected="false"
                >
                  SEO
                </button>

                {/* <button className="nav-link mb-3" id="v-pills-settings-tab" data-bs-toggle="pill" data-bs-target="#v-pills-cost" type="button" role="tab" aria-controls="v-pills-cost" aria-selected="false">Cost</button>
                <button className="nav-link mb-3" id="v-pills-settings-tab" data-bs-toggle="pill" data-bs-target="#v-pills-availability" type="button" role="tab" aria-controls="v-pills-availability" aria-selected="false">Availability</button> */}
              </div>
            </div>
            <div className="col-md-8 col-lg-10 px-4  projectDetails">
              <div className="tab-content" id="v-pills-tabContent">
                <div
                  className="tab-pane fade show active projectInfo"
                  id="v-pills-home"
                  role="tabpanel"
                  aria-labelledby="v-pills-home-tab"
                >
                  <div className="">
                    <div className="mb-3">
                      <label htmlFor="projectName" className="form-label  ">
                        Project Name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        value={projectName ? projectName : ""}
                        onChange={titleInputHandleChange}
                        id="projectName"
                        placeholder="Add Project Name"
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="projectStatus" className="form-label  ">
                        Status
                      </label>
                      <select
                        value={projectType[0]?.projectValue}
                        className="form-select mb-3 w-100"
                        aria-label="Default select example"
                        id="projectStatus"
                        onChange={(e) => handleChange(e)}
                      >
                        <option>Select Status</option>
                        {defaultProjectType?.length
                          ? defaultProjectType?.map((option, index) => {
                              return (
                                <option
                                  key={option.idprojectcategories}
                                  value={option.projectValue}
                                >
                                  {option.projectLabel}
                                </option>
                              );
                            })
                          : ""}
                      </select>
                    </div>
                    <div className="mb-3">
                      <label htmlFor="projectStatus" className="form-label  ">
                        Project % Completed
                      </label>
                      <select
                        defaultValue={percentValue}
                        className="form-select mb-3 w-100"
                        aria-label="Default select example"
                        id="projectStatus"
                        onChange={(e) => handleSelectChange(e)}
                      >
                        <option value={"Select Status"}>Select Status</option>
                        {options.map((option, index) => (
                          <option key={index} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="mb-3">
                      <label
                        htmlFor="projectDescription"
                        className="form-label"
                      >
                        Title
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name="aboutstitle"
                        value={aboutUs.aboutstitle ? aboutUs.aboutstitle : ""}
                        onChange={changeHandler}
                        id="aboutstitle"
                      />
                    </div>
                    <div className="mb-3">
                      <label
                        htmlFor="projectDescription"
                        className="form-label"
                      >
                        Sub Title
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name="aboutussubtitle"
                        value={
                          aboutUs.aboutussubtitle ? aboutUs.aboutussubtitle : ""
                        }
                        onChange={changeHandler}
                        id="aboutussubtitle"
                      />
                    </div>
                    <div className="mb-3">
                      <label
                        htmlFor="projectDescription"
                        className="form-label  "
                      >
                        Description
                      </label>
                      <textarea
                        className="form-control"
                        name="description"
                        value={aboutUs.description ? aboutUs.description : ""}
                        onChange={changeHandler}
                        id="projectDescription"
                        rows="3"
                      ></textarea>
                    </div>
                    <div className="mb-3">
                      <div className="mb-3">
                        <Link
                          className="moreLink text-decoration-underline"
                          onClick={() => handleModel("thumbnail")}
                        >
                          {/* Click here to upload Project Home Thumbnail */}
                          Upload Images
                          <i
                            class="fa fa-upload ms-2 fs-5 text-primary"
                            aria-hidden="true"
                          ></i>
                        </Link>
                      </div>

                      {showModel && fileuploadType === "thumbnail" && (
                        <FileUploadModel
                          ModelTitle="Upload Image"
                          closeModel={closeModel}
                          project={newProject}
                          updated_By={userName}
                          category="thumbnail"
                          gallerysetState={setThumbnailObject}
                          galleryState={thumbnailObject}
                          validTypes="image/png,image/jpeg"
                          descriptionTitle="Plan Description"
                          showDescription={false}
                          saveState={setSaveState}
                          buttonLable="Upload Plan"
                          maxFiles={1}
                          scrollEnable={true}
                        />
                      )}

                      <CatageoryImgC
                        title={`${readOnlyTitle} Thumbnail`}
                        catategoryImgs={thumbnailObject}
                        catategoryImgState={setThumbnailObject}
                        project={newProject}
                        category="thumbnail"
                        cssClass="thumb75 shadow-lg border border-0 border-warning rounded"
                      />
                      <div className="">
                        <small className="text-info">
                          Click on the image to delete
                        </small>
                      </div>
                    </div>
                  </div>
                </div>

                {/* DOCUMENTS */}
                <div
                  className="tab-pane fade collateralUpload"
                  id="v-pills-profile"
                  role="tabpanel"
                  aria-labelledby="v-pills-profile-tab"
                >
                  <div className="mb-4">
                    <div className="mb-3 border p-3 text-center">
                      <Link
                        className="moreLink text-decoration-underline"
                        onClick={() => handleModel("PDF")}
                      >
                        Upload <strong>PDF's</strong>{" "}
                        <i class="fa fa-upload" aria-hidden="true"></i>
                      </Link>
                    </div>

                    {showModel && fileuploadType === "PDF" && (
                      <FileUploadModel
                        ModelTitle="Add PDF's (Upload PDF)"
                        closeModel={closeModel}
                        project={newProject}
                        updated_By={userName}
                        category="PDF"
                        gallerysetState={setPdfObject}
                        galleryState={pdfObject}
                        validTypes="application/pdf"
                        descriptionTitle="PDF Description"
                        showDescription={false}
                        saveState={setSaveState}
                        buttonLable="Upload PDF"
                        maxFiles={1}
                        scrollEnable={true}
                      />
                    )}
                    <CatageoryImgC
                      title={`${readOnlyTitle} PDF's`}
                      catategoryImgs={pdfObject}
                      catategoryImgState={setPdfObject}
                      project={newProject}
                      category="PDF"
                      cssClass="thumb75 mb-5 shadow-lg"
                    />
                  </div>

                  <div className="mb-4">
                    <div className="mb-3 border p-3 text-center">
                      <Link
                        className="moreLink text-decoration-underline"
                        onClick={() => handleModel("Plans")}
                      >
                        Upload Plan <strong>Image</strong>{" "}
                        <i class="fa fa-upload" aria-hidden="true"></i>
                      </Link>
                    </div>

                    {showModel && fileuploadType === "Plans" && (
                      <FileUploadModel
                        ModelTitle=" Add Plan (Upload image)"
                        closeModel={closeModel}
                        project={newProject}
                        updated_By={userName}
                        category="Plans"
                        gallerysetState={setPlanObject}
                        galleryState={planObject}
                        validTypes="image/png,image/jpeg,application/pdf"
                        descriptionTitle="Plan Description"
                        showDescription={false}
                        saveState={setSaveState}
                        buttonLable="Upload Plan"
                        maxFiles={1}
                        scrollEnable={true}
                      />
                    )}
                    <CatageoryImgC
                      title={`${readOnlyTitle} Plans`}
                      catategoryImgs={planObject}
                      catategoryImgState={setPlanObject}
                      project={newProject}
                      category="Plans"
                      cssClass="thumb75 mb-2 shadow-lg rounded-2"
                    />
                    <small className="text-info">
                      Click on the image to delete
                    </small>
                  </div>

                  <div className="mb-4">
                    <div className="mb-3 border p-3 text-center ">
                      <Link
                        className="moreLink text-decoration-underline"
                        onClick={() => handleModel("availability")}
                      >
                        {/* Click here to upload Add Availability (Upload image / PDF) */}
                        Upload Availability <strong>Image's / PDF's</strong>
                        <i class="fa fa-upload ms-2" aria-hidden="true"></i>
                      </Link>
                    </div>

                    {showModel && fileuploadType === "availability" && (
                      <FileUploadModel
                        ModelTitle="Add Availability (Upload image / PDF)"
                        closeModel={closeModel}
                        project={newProject}
                        updated_By={userName}
                        category="availability"
                        gallerysetState={setAvailabileObject}
                        galleryState={availabileObject}
                        validTypes="image/png,image/jpeg,application/pdf"
                        descriptionTitle="Available Description"
                        showDescription={false}
                        saveState={setSaveState}
                        buttonLable="Upload Availability"
                        maxFiles={1}
                        scrollEnable={true}
                      />
                    )}

                    <CatageoryImgC
                      title={`${readOnlyTitle} Availibility`}
                      catategoryImgs={availabileObject}
                      catategoryImgState={setAvailabileObject}
                      project={newProject}
                      category="availability"
                      cssClass="thumb75 mb-5 shadow-lg border border-5 border-warning rounded-5"
                    />
                  </div>

                  <div className="mb-3">
                    <div className="mb-3 border p-3 text-center">
                      <Link
                        className="moreLink text-decoration-underline"
                        onClick={() => handleModel("price")}
                      >
                        {/* Click here to upload Add Price (Upload image / PDF) */}
                        Upload Pricing <strong>Image's / PDF's</strong>
                        <i class="fa fa-upload ms-2" aria-hidden="true"></i>
                      </Link>
                    </div>

                    {showModel && fileuploadType === "price" && (
                      <FileUploadModel
                        ModelTitle="Add Availability (Upload image / PDF)"
                        closeModel={closeModel}
                        project={newProject}
                        updated_By={userName}
                        category="price"
                        gallerysetState={setPriceObject}
                        galleryState={priceObject}
                        validTypes="image/png,image/jpeg,application/pdf"
                        descriptionTitle="Price Description"
                        showDescription={false}
                        saveState={setSaveState}
                        buttonLable="Upload Price Details"
                        maxFiles={1}
                        scrollEnable={true}
                      />
                    )}

                    <CatageoryImgC
                      title={`${readOnlyTitle} Price`}
                      catategoryImgs={priceObject}
                      catategoryImgState={setPriceObject}
                      project={newProject}
                      category="price"
                      cssClass="thumb75 mb-5 shadow-lg border border-5 border-warning rounded-5"
                    />
                  </div>
                </div>
                {/* Add GOOGLE MAP  */}
                <div
                  className="tab-pane fade"
                  id="v-pills-googlemap"
                  role="tabpanel"
                  aria-labelledby="v-pills-googlemap-tab"
                >
                  <div className="mb-4 text-center">
                    <label className="form-label">
                      Add Google Map{" "}
                      <i class="fa fa-map" aria-hidden="true"></i>{" "}
                      <small className="d-block">
                        (Embed a map - source url){" "}
                      </small>
                    </label>
                    <Amenities
                      title=""
                      value={amenities?.googleMap}
                      amenities={amenities}
                      setAmenities={setAmenities}
                      name="googleMap"
                      rows="5"
                    />
                  </div>
                </div>

                <div
                  className="tab-pane fade"
                  id="v-pills-messages"
                  role="tabpanel"
                  aria-labelledby="v-pills-messages-tab"
                >
                  {/* Add SPECIFICATIONS */}
                  <Specifications
                    title="Specifications"
                    project={newProject}
                    setSpecifications={setSpecifications}
                    specifications={specifications}
                  />
                </div>
                <div
                  className="tab-pane fade"
                  id="v-pills-settings"
                  role="tabpanel"
                  aria-labelledby="v-pills-settings-tab"
                >
                  {/* Add AMENITIES */}
                  <AmenitiesList
                    project={newProject}
                    amenities={amenities}
                    setAmenities={setAmenities}
                  />
                </div>

                <div
                  className="tab-pane fade project-image-gallery"
                  id="v-pills-gallery"
                  role="tabpanel"
                  aria-labelledby="v-pills-gallery-tab"
                >
                  <div className="mb-4">
                    <label htmlFor="imageDescription" className="form-label  ">
                      Recent project status description
                    </label>
                    <textarea
                      rows={5}
                      cols={40}
                      className="form-control"
                      name="imageDescription"
                      value={
                        aboutUs.imageDescription ? aboutUs.imageDescription : ""
                      }
                      onChange={changeHandler}
                      id="imageDescription"
                    />
                  </div>

                  <FileUpload
                    title="Add Images"
                    project={newProject}
                    updated_by={userName}
                    category="images"
                    gallerysetState={setImgGallery}
                    galleryState={imgGallery}
                    validTypes="image/png,image/jpeg"
                    descriptionTitle="Image Description"
                    saveState={setSaveState}
                    showDescription={false}
                    scrollEnable={true}
                  />
                  <CatageoryImgC
                    title={`${readOnlyTitle} Image Gallery`}
                    catategoryImgs={imgGallery}
                    catategoryImgState={setImgGallery}
                    project={newProject}
                    category="images"
                    cssClass="thumb75 shadow-lg border border-1 rounded"
                  />
                  <div>
                    <small class="text-warning">
                      Click on the image to delete
                    </small>
                  </div>
                </div>

                <div
                  className="tab-pane fade show  projectInfo"
                  id="v-pills-seo"
                  role="tabpanel"
                  aria-labelledby="v-pills-seo-tab"
                >
                  <div className="">
                    <div className="mb-3">
                      <label htmlFor="projectName" className="form-label  ">
                        SEO Title
                      </label>
                      <input
                        type="text"
                        name="seo_title"
                        className="form-control"
                        value={seofields.seo_title ? seofields.seo_title : ""}
                        onChange={changeSeoHandler}
                        id="seoTitle"
                        placeholder="SEO Title"
                      />
                    </div>
                  </div>
                  <div className="">
                    <div className="mb-3">
                      <label htmlFor="projectName" className="form-label  ">
                        SEO Link
                      </label>
                      <input
                        type="text"
                        name="seo_link"
                        className="form-control"
                        value={seofields.seo_link ? seofields.seo_link : ""}
                        onChange={changeSeoHandler}
                        id="seoLink"
                        placeholder="SEO Link"
                      />
                    </div>
                  </div>
                  <div className="">
                    <div className="mb-3">
                      <label htmlFor="projectName" className="form-label  ">
                        SEO Author
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name="seo_author"
                        value={seofields.seo_author ? seofields.seo_author : ""}
                        onChange={changeSeoHandler}
                        id="seoAuthor"
                        placeholder="SEO Author"
                      />
                    </div>
                  </div>

                  <div className="">
                    <div className="mb-3">
                      <label htmlFor="projectName" className="form-label  ">
                        SEO Keywords
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name="seo_keywords"
                        value={
                          seofields.seo_keywords ? seofields.seo_keywords : ""
                        }
                        onChange={changeSeoHandler}
                        id="seokeywords"
                        placeholder="SEO Keywords"
                      />
                    </div>
                  </div>

                  <div className="">
                    <div className="mb-3">
                      <label htmlFor="projectName" className="form-label  ">
                        SEO Description
                      </label>
                      <textarea
                        className="form-control"
                        name="seo_description"
                        value={
                          seofields.seo_description
                            ? seofields.seo_description
                            : ""
                        }
                        onChange={changeSeoHandler}
                        id="seoDescription"
                        rows="3"
                      ></textarea>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row border-top botder-1">
            <div className="col-lg-12 py-4 d-flex gap-1 justify-content-center align-items-center">
              <Button
                type="submit"
                cssClass="btn btn btn-secondary"
                label="Cancel"
                handlerChange={() => navigate("/admin/dashboard")}
              />
              {/* <Button
                type="submit"
                cssClass="btn btn btn-outline-secondary "
                label="Reset"
              /> */}
              <Button
                type="submit"
                disabled={saveState}
                cssClass="btn btn-primary"
                label={id ? "Update Project" : "Save Project"}
                handlerChange={saveProject}
              />
            </div>
          </div>
        </>
      ) : (
        ""
      )}

      {showModelBg && <ModelBg />}
    </div>
  );
};
export default AddProject;
