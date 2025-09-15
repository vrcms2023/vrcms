import React, { useState, useEffect } from "react";
import { Controller, useForm, useFieldArray } from "react-hook-form";
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
import Error from "../../Components/Error";

import { confirmAlert } from "react-confirm-alert";
import DeleteDialog from "../../../Common/DeleteDialog";
import CSRFToken from "../../../Frontend_Views/Components/CRSFToken";

import "./AddProject.css";
import FileUploadModel from "../../../Common/fileUploadModel";
import ModelBg from "../../../Common/ModelBg";
import { InputFields, RichTextInputEditor_V2 } from "../../Components/forms/FormFields";
import { fieldValidation } from "../../../util/validationUtil";
import PillButton from "../../../Common/Buttons/PillButton";
import { set } from "lodash";

const AddProject = () => {
  const defaultValues = {
    id: null,
    aboutstitle: null,
    aboutussubtitle: null,
    category: null,
    description: null,
    imageDescription: null,
    isActive: true,
    projectCategoryID: null,
    projectStatus: null,
    projectImage: null,
    projectTitle: null,
    publish: false,
    seo_title: null,
    seo_author: null,
    seo_description: null,
    seo_keywords: null,
    seo_link: null,
    percentValue: null,
    features_amenities: {
      amenitie: null,
      feature: null,
      googleMap: null,
    },
    specifications: [],
  };

  const {
    control,
    register,
    reset,
    handleSubmit,
    clearErrors,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    defaultValues: defaultValues,
  });

  const handleFieldsChange = (fieldName) => {
    clearErrors(fieldName);
  };

  const { fields, append, remove } = useFieldArray({
    control,
    name: "specifications",
    keyName: "_key",
  });

  const navigate = useNavigate();

  const [show, setShow] = useState(false);
  const [projectType, setProjectType] = useState({});
  const [defaultProjectType, setDefaultProjectType] = useState([]);

  const [errorMessage, setErrorMessage] = useState("");
  const [newProject, setNewProject] = useState({});
  const [readOnlyTitle, setreadOnlyTitle] = useState("");

  const [showModel, setShowModel] = useState(false);
  const [showModelBg, setShowModelBg] = useState(false);
  const [fileuploadType, setfFileuploadType] = useState("");

  const [pdfObject, setPdfObject] = useState([]);
  const [thumbnailObject, setThumbnailObject] = useState([]);
  const [planObject, setPlanObject] = useState([]);
  const [availabileObject, setAvailabileObject] = useState([]);
  const [priceObject, setPriceObject] = useState([]);
  const [imgGallery, setImgGallery] = useState([]);
  const [saveState, setSaveState] = useState(false);

  const { id } = useParams();

  const percentageOptions = Array.from({ length: 11 }, (_, i) => {
    const value = i * 10;
    return { value, label: String(value) };
  });

  const updateProjectValues = (newProject) => {
    if (newProject) {
      reset({
        id: newProject.id,
        aboutstitle: newProject.aboutstitle,
        aboutussubtitle: newProject.aboutussubtitle,
        category: newProject.category,
        description: newProject.description,
        imageDescription: newProject.imageDescription,
        isActive: newProject.isActive,
        projectCategoryID: newProject.projectCategoryID,
        projectStatus: newProject.projectStatus,
        projectImage: newProject.projectImage,
        projectTitle: newProject.projectTitle,
        publish: newProject?.publish ? JSON.parse(newProject?.publish) : false,
        seo_title: newProject.seo_title,
        seo_author: newProject.seo_author,
        seo_description: newProject.seo_description,
        seo_keywords: newProject.seo_keywords,
        seo_link: newProject.seo_link,
        percentValue: newProject.percentValue ? JSON.parse(newProject?.percentValue) : null,
        features_amenities: {
          amenitie: newProject.features_amenities?.amenitie || "",
          feature: newProject.features_amenities?.feature || "",
          googleMap: newProject.features_amenities?.googleMap || "",
        },
        specifications: newProject.specifications || [],
      });
    }
  };

  // Prefill when editing
  useEffect(() => {
    updateProjectValues(newProject);
  }, [newProject]);

  /**
   * Get project type object
   */
  useEffect(() => {
    const getPorjectCategory = async () => {
      const response = await axiosServiceApi.get(`/project/createCategory/`);
      if (response?.status === 200) {
        const options = response.data.map((item) => ({
          id: item.id,
          value: item.category_Value,
          label: item.category_Label,
          category_Label: item.category_Label,
          category_Value: item.category_Value,
        }));
        options.unshift({ label: "Select Project Type", value: "" });
        setDefaultProjectType(options);
      } else {
        navigate("/login");
      }
    };
    getPorjectCategory();
  }, [navigate]);

  /**
   * Select Porject type handler
   */
  const handleChange = (e) => {
    setErrorMessage("");
    const value = e.target.value;
    const obj = defaultProjectType.filter((obj) => {
      return obj.value === value;
    });
    if (obj.length > 0) {
      setProjectType(obj);
    } else {
      setProjectType({});
      setErrorMessage("Please select Project Type");
    }
  };

  /**
   * get selected Project for edit
   */

  const getSelectedProject = async () => {
    const response = await axiosServiceApi.get(`/project/addProject/${id}/`);

    if (response.status !== 200) {
      setErrorMessage(response.data.message);
      toast.error("Unable to Process your request");
    }
    if (response.status === 200) {
      const project = response.data;
      setNewProject(project);
      setreadOnlyTitle(project.projectTitle);
      setShow(true);
    } else {
      setErrorMessage(response.data.message);
    }
  };
  useEffect(() => {
    if (id) {
      getSelectedProject();
    }
  }, [id]);

  useEffect(() => {
    if (id && saveState) {
      getSelectedProject();
      setSaveState(false);
    }
  }, [id, saveState]);

  const onFormSubmit = async (data) => {
    data.category = data.category ? data.category : projectType[0]?.id;
    data.projectCategoryID = data.projectCategoryID ? data.projectCategoryID : projectType[0]?.id;
    data.publish = data.publish ? JSON.stringify(data.publish) : false;
    data.isActive = data.isActive ? data.isActive : true;
    let response = "";
    if (data?.id) {
      response = await axiosServiceApi.put(`/project/addProject/${data.id}/`, data);
    } else {
      response = await axiosServiceApi.post(`/project/addProject/`, data);
    }

    if (response?.status === 400) {
      toast.error(`${data.projectTitle} is already register`);
    }
    if (response?.status === 201) {
      toast.success(`${response.data.projectTitle} Project created`);
      setNewProject(response.data);
      setShow(true);
    }
    if (response.status === 200) {
      setNewProject(response.data);
      toast.success(`${response.data.projectTitle} Project Updated`);
    }
  };

  const publishHandler = async () => {
    const publishProject = async () => {
      const data = {
        publish: !newProject?.publish,
        isActive: true,
      };
      const response = await axiosServiceApi.patch(`/project/addProject/${newProject.id}/`, data);
      if (response.status === 200) {
        setNewProject(response.data);
        toast.success(`${readOnlyTitle} ${newProject?.publish ? "published" : "unPublished"}`);
      }
    };

    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <DeleteDialog
            onClose={onClose}
            callback={publishProject}
            message={`you wish to ${
              newProject?.publish ? "unPublished" : "published"
            } the project without saving your changes`}
            label={newProject?.publish ? "unPublished" : "published"}
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

      <div className="row">
        <div className="text-end d-flex justify-content-between align-items-center flex-column flex-md-row">
          <Title title={`${id ? "Edit " : "Add "} Project`} cssClass="fs-4 mb-3 mb-md-0" />
          <div className="d-flex gap-1 justify-content-center align-items-center">
            <Button
              type=""
              icon="fa-chevron-left me-2"
              cssClass="btn btn-outline"
              label="Back"
              handlerChange={() => navigate(-1)}
            />
            <Button
              type=""
              cssClass="btn btn-outline"
              label="Dashboard"
              handlerChange={() => navigate("/dashboard")}
            />
          </div>
        </div>
      </div>
      {/* <hr /> */}

      <>
        {errorMessage ? (
          <div className="mt-5 pt-5">
            <Error>{errorMessage}</Error>
          </div>
        ) : (
          ""
        )}
        {!id && !show && (
          <div className="pt-5 mt-5 select-project-type">
            <InputFields
              label="Status"
              type="dropdown"
              fieldName="projectStatus"
              id="projectStatus"
              register={register}
              options={defaultProjectType}
              onChange={(e) => handleChange(e)}
            />
          </div>
        )}
      </>

      {projectType.length > 0 && !show && (
        <div className="row" id="projectTitle">
          <div className="mt-4 p-0">
            <div className="">
              <div className="">
                <form className="my-2 contactForm" onSubmit={handleSubmit(onFormSubmit)}>
                  <InputFields
                    label="Project Title"
                    fieldName="projectTitle"
                    register={register}
                    isRequired={true}
                    validationObject={fieldValidation.projectTitle}
                    error={errors?.projectTitle?.message}
                    onChange={() => handleFieldsChange("projectTitle")}
                  />

                  <div className="d-flex justify-content-center mt-4">
                    <Button
                      type="button"
                      label="Cancel"
                      cssClass="btn btn-outline me-2"
                      handlerChange={() => {
                        navigate("/dashboard");
                      }}
                    />
                    <Button
                      type="submit"
                      label="Save"
                      cssClass="btn btn-primary ms-2"
                      handlerChange={handleSubmit(onFormSubmit)}
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      {show && (
        <>
          <div className="row px-3 mt-3">
            {/* <div className="d-flex justify-content-center align-items-center"> */}
            <div className="">
              {readOnlyTitle && (
                // <Title title={readOnlyTitle} cssClass="text-center border-bottom fs-5"  />
                <h3 className="mb-4 fs-5 text-center border-bottom pt-0 pb-3 pb-md-3">
                  {readOnlyTitle}
                  <span
                    className="badge bg-light border text-dark px-2 ms-2"
                    style={{ fontSize: ".7rem", fontWeight: "500" }}
                  >
                    {newProject?.projectStatus?.toUpperCase()}
                  </span>
                </h3>
              )}
            </div>

            <div className="col-md-4 col-lg-2 pb-2 project-page-tab-links">
              <div className="d-flex justify-content-end flex-column gap-2 p-0 project-sublish-status">
                {newProject?.publish ? (
                  <Button
                    type="button"
                    cssClass="btn btn-sm btn-success text-white"
                    label={"PUBLISHED"}
                    handlerChange={publishHandler}
                  />
                ) : (
                  <Button
                    type="button"
                    cssClass="btn btn-sm btn-outline"
                    label={"PUBLISH"}
                    handlerChange={publishHandler}
                  />
                )}
              </div>

              <div
                className="nav flex-column nav-pills mt-3 project-pills"
                id="v-pills-tab"
                role="tablist"
                aria-orientation="vertical"
              >
                <PillButton
                  cssClass="active"
                  label="Info"
                  id="v-pills-home-tab"
                  dataBsTarget="#v-pills-home"
                  aria-controls="v-pills-home"
                  aria-selected="true"
                />

                <PillButton
                  label="Pdfs / Plan / Map / Cost / Availability"
                  id="v-pills-profile-tab"
                  dataBsTarget="#v-pills-profile"
                  aria-controls="v-pills-home"
                  aria-selected="false"
                />

                <PillButton
                  label="Specifications"
                  id="v-pills-messages-tab"
                  dataBsTarget="#v-pills-messages"
                  aria-controls="v-pills-messages"
                  aria-selected="false"
                />

                <PillButton
                  label="Features / Amenities"
                  id="v-pills-settings-tab"
                  dataBsTarget="#v-pills-settings"
                  aria-controls="v-pills-settings"
                  aria-selected="false"
                />

                <PillButton
                  label="Image Gallery"
                  id="v-pills-gallery-tab"
                  dataBsTarget="#v-pills-gallery"
                  aria-controls="v-pills-gallery"
                  aria-selected="false"
                />

                <PillButton
                  label="SEO"
                  id="v-pills-seo-tab"
                  dataBsTarget="#v-pills-seo"
                  aria-controls="v-pills-seo"
                  aria-selected="false"
                />

                <PillButton
                  label="Google Map"
                  id="v-pills-googlemap-tab"
                  dataBsTarget="#v-pills-googlemap"
                  aria-controls="v-pills-googlemap"
                  aria-selected="false"
                />

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
                    <InputFields
                      label="Project Name"
                      fieldName="projectTitle"
                      register={register}
                      isRequired={true}
                      validationObject={fieldValidation.projectTitle}
                      error={errors?.projectTitle?.message}
                    />
                    <InputFields
                      label="Status"
                      type="dropdown"
                      fieldName="projectStatus"
                      register={register}
                      options={defaultProjectType}
                      selectedValue={newProject?.projectStatus ? newProject?.projectStatus : ""}
                      onChange={() => handleFieldsChange("projectStatus")}
                    />

                    <InputFields
                      label="Project % Completed"
                      type="dropdown"
                      fieldName="percentValue"
                      register={register}
                      options={percentageOptions}
                      onChange={() => handleFieldsChange("percentValue")}
                    />

                    <InputFields
                      label="Title"
                      fieldName="aboutstitle"
                      register={register}
                      onChange={() => handleFieldsChange("aboutstitle")}
                    />

                    <InputFields
                      label=" Sub Title"
                      fieldName="aboutussubtitle"
                      register={register}
                      onChange={() => handleFieldsChange("aboutussubtitle")}
                    />
                    <RichTextInputEditor_V2
                      label={"Description"}
                      Controller={Controller}
                      name="description"
                      control={control}
                      id={"projectDescription"}
                    />

                    <div className="mb-3">
                      <div className="mb-3">
                        <Link
                          className="moreLink text-decoration-underline"
                          onClick={() => handleModel("thumbnail")}
                        >
                          {/* Click here to upload Project Home Thumbnail */}
                          Upload Images
                          <i className="fa fa-upload ms-2 fs-5 text-primary" aria-hidden="true"></i>
                        </Link>
                      </div>

                      {showModel && fileuploadType === "thumbnail" && (
                        <FileUploadModel
                          ModelTitle="Upload Project Image"
                          closeModel={closeModel}
                          project={newProject}
                          category="thumbnail"
                          saveState={setSaveState}
                          maxFiles={1}
                        />
                      )}

                      <CatageoryImgC
                        title={`${readOnlyTitle} Thumbnail`}
                        project={newProject}
                        category="thumbnail"
                        saveState={setSaveState}
                        cssClass="thumb75 shadow-lg border border-0 border-warning rounded"
                      />
                      {newProject?.id && (
                        <div className="">
                          <small className="text-info">Click on the image to delete</small>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* PDF DOCUMENTS */}
                <div
                  className="tab-pane fade collateralUpload"
                  id="v-pills-profile"
                  role="tabpanel"
                  aria-labelledby="v-pills-profile-tab"
                >
                  <div className="mb-4">
                    <div className="mb-3 border text-center">
                      <div className="text-end p-2 bg-light">
                        <Link
                          className="moreLink text-decoration-underline"
                          onClick={() => handleModel("PDF")}
                        >
                          Add <strong>PDF's</strong>
                          {/* <i className="fa fa-plus ms-2" aria-hidden="true"></i> */}
                        </Link>
                      </div>
                      <CatageoryImgC
                        title={`${readOnlyTitle}  PDF's`}
                        project={newProject}
                        category="PDF"
                        saveState={setSaveState}
                        cssClass="thumb75"
                      />
                    </div>

                    {showModel && fileuploadType === "PDF" && (
                      <FileUploadModel
                        ModelTitle="Add PDF's (Upload PDF)"
                        closeModel={closeModel}
                        project={newProject}
                        category="PDF"
                        saveState={setSaveState}
                        maxFiles={4}
                        validTypes="application/pdf"
                        dimensions={false}
                      />
                    )}
                  </div>

                  {/* PDF DOCUMENTS */}

                  <div className="mb-4">
                    <div className="mb-3 border text-center">
                      <div className="bg-light text-end p-2">
                        <Link
                          className="moreLink text-decoration-underline"
                          onClick={() => handleModel("Plans")}
                        >
                          Add <strong>Plan Image's / PDF's</strong>
                          {/* Add Plan <strong>Image</strong>{" "} */}
                          {/* <i className="fa fa-upload" aria-hidden="true"></i> */}
                        </Link>
                      </div>
                      <CatageoryImgC
                        title={`${readOnlyTitle}  Plans`}
                        project={newProject}
                        category="Plans"
                        saveState={setSaveState}
                        cssClass="thumb75  shadow-lg rounded-2"
                      />
                    </div>

                    {showModel && fileuploadType === "Plans" && (
                      <FileUploadModel
                        ModelTitle=" Add Plan (Upload image)"
                        closeModel={closeModel}
                        project={newProject}
                        category="Plans"
                        saveState={setSaveState}
                        maxFiles={4}
                        validTypes="image/png,image/jpeg,application/pdf"
                        dimensions={false}
                      />
                    )}
                  </div>

                  <div className="mb-4">
                    <div className="mb-3 border text-center ">
                      <div className="text-end p-2 bg-light">
                        <Link
                          className="moreLink text-decoration-underline"
                          onClick={() => handleModel("availability")}
                        >
                          Add <strong>Availability Image's / PDF's</strong>
                        </Link>
                      </div>
                      <CatageoryImgC
                        title={`${readOnlyTitle}  Availability`}
                        project={newProject}
                        category="availability"
                        saveState={setSaveState}
                        cssClass="thumb75 rounded-3"
                      />
                    </div>

                    {showModel && fileuploadType === "availability" && (
                      <FileUploadModel
                        ModelTitle="Add Availability (Upload image / PDF)"
                        closeModel={closeModel}
                        project={newProject}
                        category="availability"
                        saveState={setSaveState}
                        maxFiles={4}
                        validTypes="image/png,image/jpeg,application/pdf"
                        dimensions={false}
                      />
                    )}
                  </div>

                  <div className="mb-3">
                    <div className="mb-3 border text-center">
                      <div className="text-end p-2 bg-light">
                        <Link
                          className="moreLink text-decoration-underline"
                          onClick={() => handleModel("price")}
                        >
                          {/* Click here to upload Add Price (Upload image / PDF) */}
                          Add <strong>Pricing Image's / PDF's</strong>
                          <i className="fa fa-upload ms-2" aria-hidden="true"></i>
                        </Link>
                      </div>

                      <CatageoryImgC
                        title={`${readOnlyTitle}  Price`}
                        project={newProject}
                        category="price"
                        saveState={setSaveState}
                        cssClass="thumb75 rounded-3"
                      />
                    </div>

                    {showModel && fileuploadType === "price" && (
                      <FileUploadModel
                        ModelTitle="Add Price (Upload image / PDF)"
                        closeModel={closeModel}
                        project={newProject}
                        category="price"
                        saveState={setSaveState}
                        maxFiles={4}
                        validTypes="image/png,image/jpeg,application/pdf"
                        dimensions={false}
                      />
                    )}
                  </div>
                </div>

                {/* Add SPECIFICATIONS  */}
                <div
                  className="tab-pane fade"
                  id="v-pills-messages"
                  role="tabpanel"
                  aria-labelledby="v-pills-messages-tab"
                >
                  {/* Add SPECIFICATIONS */}
                  <Specifications
                    title="Specifications"
                    register={register}
                    fields={fields}
                    append={append}
                    remove={remove}
                  />
                </div>

                {/* Add AMENITIES */}
                <div
                  className="tab-pane fade"
                  id="v-pills-settings"
                  role="tabpanel"
                  aria-labelledby="v-pills-settings-tab"
                >
                  {/* Add AMENITIES */}
                  <AmenitiesList register={register} />
                </div>

                {/* Add project status and image gallery */}
                <div
                  className="tab-pane fade project-image-gallery"
                  id="v-pills-gallery"
                  role="tabpanel"
                  aria-labelledby="v-pills-gallery-tab"
                >
                  {/* <RichTextInputEditor_V2
                    label={"Recent project status description"}
                    Controller={Controller}
                    name="imageDescription"
                    control={control}
                  /> */}
                  <div className="mb-3 border text-center">
                    <div className="text-end p-2 bg-light">
                      <Link
                        className="moreLink text-decoration-underline"
                        onClick={() => handleModel("images")}
                      >
                        {/* Click here to upload Add Price (Upload image / PDF) */}
                        Add <strong>Project Gallery Image's </strong>
                        <i className="fa fa-upload ms-2" aria-hidden="true"></i>
                      </Link>
                    </div>

                    <CatageoryImgC
                      title={`${readOnlyTitle}  Image Gallery`}
                      project={newProject}
                      category="images"
                      saveState={setSaveState}
                      cssClass="thumb75 shadow-lg border border-1 rounded"
                    />
                  </div>

                  {showModel && fileuploadType === "images" && (
                    <FileUploadModel
                      ModelTitle="Add Project Gallery"
                      closeModel={closeModel}
                      project={newProject}
                      category="images"
                      saveState={setSaveState}
                      maxFiles={4}
                      validTypes="image/png,image/jpeg"
                      dimensions={false}
                    />
                  )}
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
                      Add Google Map <i className="fa fa-map" aria-hidden="true"></i>{" "}
                      <small className="d-block">(Embed a map - source url) </small>
                    </label>
                    <Amenities
                      register={register}
                      title=""
                      fieldName="features_amenities.googleMap"
                    />
                  </div>
                  <small className="mt-3 mb-2 d-inline-block">
                    Example : Please copy the 'src' URL from Google’s iframe in the{" "}
                    <strong>‘Embed a map’</strong> section, as shown in the highlighted example
                    below.
                    {/* Copy the google "Embed a map" script like below  */}
                  </small>
                  <code className="d-block mt-4">
                    &lt;iframe className="googlemap" src="
                    <strong className="bg-info">
                      https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15226.413145928846!2d78.441906!3d17.430816!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x80e4d67809745a48!2sHPR+INFRA+PROJECTS!5e0!3m2!1sen!2sin!4v1442574301202
                    </strong>
                    " height="450" width="100%" &gt; &;t;/iframe&gt;
                  </code>
                </div>

                <div
                  className="tab-pane fade show  projectInfo"
                  id="v-pills-seo"
                  role="tabpanel"
                  aria-labelledby="v-pills-seo-tab"
                >
                  <InputFields
                    label="SEO Title"
                    fieldName="seo_title"
                    register={register}
                    onChange={() => handleFieldsChange("seo_title")}
                  />
                  <InputFields
                    label="SEO Link"
                    fieldName="seo_link"
                    register={register}
                    onChange={() => handleFieldsChange("seo_link")}
                  />
                  <InputFields
                    label="Author"
                    fieldName="seo_author"
                    register={register}
                    onChange={() => handleFieldsChange("seo_author")}
                  />
                  <RichTextInputEditor_V2
                    label={"Keywords"}
                    Controller={Controller}
                    name="seo_keywords"
                    control={control}
                    onChange={(e) => handleChange(e)}
                  />
                  <RichTextInputEditor_V2
                    label={"Description"}
                    Controller={Controller}
                    name="seo_description"
                    control={control}
                    onChange={(e) => handleChange(e)}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="row border-top botder-1">
            <div className="col-lg-12 py-4 d-flex gap-3 justify-content-center align-items-center">
              <Button
                type="button"
                cssClass="btn btn btn-outline"
                label="Cancel"
                handlerChange={() => navigate("/dashboard")}
              />
              {/* <Button
                type="submit"
                cssClass="btn btn btn-outline-secondary "
                label="Reset"
              /> */}
              <Button
                type="submit"
                // disabled={saveState}
                cssClass="btn btn-primary"
                label={id ? "Update Project" : "Save Project"}
                //handlerChange={saveProject}
                handlerChange={handleSubmit(onFormSubmit)}
              />
            </div>
          </div>
        </>
      )}

      {showModelBg && <ModelBg />}
    </div>
  );
};
export default AddProject;
