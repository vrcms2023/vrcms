import React, { useEffect, useState, useMemo } from "react";
import { useForm } from "react-hook-form";
import { FilePond, registerPlugin } from "react-filepond";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";

// Components
import Title from "../../Common/Title";
import Button from "../../Common/Button";
import Error from "./Error";
import { getBaseURL } from "../../util/ulrUtil";
import { getCookie } from "../../util/cookieUtil";
import { axiosFileUploadServiceApi } from "../../util/axiosUtil";
import {
  InputField,
  InputFields,
  TextAreaField,
  RichTextInputEditor,
} from "./forms/FormFields";
import { getImagePath } from "../../util/commonUtil";

// CSS
import "filepond/dist/filepond.min.css";
import "./componentsCommonStyes.css";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";

registerPlugin(
  FilePondPluginFileValidateType,
  FilePondPluginImagePreview,
  FilePondPluginImageExifOrientation
);

const FileUpload = ({
  title,
  project,
  category,
  gallerysetState,
  galleryState,
  saveState,
  validTypes = "image/png,image/jpeg",
  disabledFile = false,
  descriptionTitle = "Image desccription",
  titleTitle = "Title",
  alternitivetextTitle = "Alt Text",
  imageDescriptionFieldName = "imageDescription",
  imageTitleFieldName = "imageTitle",
  altTitleFieldName = "alternitivetext",
  showDescription = false,
  showExtraFormFields = [],
  maxFiles,
  editImage,
  setEditCarousel,
  imagePostURL = "/gallery/createGallery/",
  imageUpdateURL = "/gallery/updateGalleryDetails/",
  extraFormParamas = [],
  dimensions,
  closeHandler,
  scrollEnable = false,
}) => {
  const [files, setFiles] = useState([]);
  const [extTypes, setExtTypes] = useState([]);
  const [pageType, setPageType] = useState("");
  const listofAboutSection = ["aboutDetails", "aboutVision", "aboutMission"];
  const [editorState, setEditorState] = useState("");
  const baseURL = getBaseURL();

  const [error, setError] = useState("");

  const { register, reset, handleSubmit } = useForm({
    defaultValues: useMemo(() => {
      return editImage;
    }, [editImage]),
    mode: "onChange",
  });

  useEffect(() => {
    if (!editImage?.id) {
      reset({});
    }
  }, [editImage]);

  useEffect(() => {
    setError("");
    reset(editImage?.id ? editImage : {});
    if (editImage?.pageType) {
      setPageType(editImage.pageType.split("-")[1]);
    }
  }, [editImage]);

  useEffect(() => {
    let extArr = validTypes.split(",");
    setExtTypes(extArr);
  }, [validTypes]);

  const onprocessfile = (error, file) => {
    if (!error) {
      const response = JSON.parse(file.serverId);
      const imageResponse = response.imageModel;
      const img = {
        id: imageResponse.id,
        originalname: imageResponse.originalname,
        path: imageResponse.path,
        contentType: imageResponse.contentType,
      };
      gallerysetState([...galleryState, img]);
      setFiles([]);
    }
  };

  useEffect(() => {
    if (
      files.length > 0 &&
      !showDescription &&
      showExtraFormFields.length > 0
    ) {
      uploadFile();
    }
  }, [files, showDescription, showExtraFormFields]);

  const setFormData = (formData, data) => {
    formData.append("projectID", project?.id);
    formData.append("category", category);
    formData.append("created_by", getCookie("userName"));
    formData.append("updated_by", getCookie("userName"));
    formData.append("imageTitle", "");
    formData.append("imageDescription", "");
    formData.append("alternitivetext", data.alternitivetext);

    if (showExtraFormFields) {
      for (const key in showExtraFormFields) {
        if (showExtraFormFields.hasOwnProperty(key)) {
          if (key === "feature_description") {
            formData.append("feature_description", editorState);
          } else if (key === "news_description") {
            formData.append("news_description", editorState);
          } else if (key === "aboutus_description") {
            formData.append("aboutus_description", editorState);
          } else if (key === "team_member_about_us") {
            formData.append("team_member_about_us", editorState);
          } else if (key === "case_studies_description") {
            formData.append("case_studies_description", editorState);
          } else if (key === "client_description") {
            formData.append("client_description", editorState);
          } else if (key === "description") {
            formData.append("description", editorState);
          } else if (
            key === "banner_descripiton" &&
            listofAboutSection.indexOf(pageType) > -1
          ) {
            formData.append("banner_descripiton", editorState);
          } else {
            formData.append(key, data[key]);
          }
        }
      }
    }

    if (extraFormParamas.length > 0) {
      extraFormParamas.forEach((item) => {
        let key = Object.keys(item);
        let field = item[key];
        if (field.readonly) {
          formData.append(field.fieldName, field.defaultValue);
        }
      });
    }
    return formData;
  };

  /**
   *
   * Create dynamic file image
   */
  const creteFileObj = async () => {
    let imageURL = "";
    if (
      editImage.path.split("/")[0] === "http:" ||
      editImage.path.split("/")[0] === "https:"
    ) {
      imageURL = editImage.path;
    } else {
      imageURL = `${baseURL}${editImage.path}`;
    }
    let response = await fetch(imageURL);
    let data = await response.blob();
    let metadata = "";
    if (editImage.contentType) {
      metadata = {
        type: `image/${editImage.contentType.replace(".", "")}`,
      };
      return new File(
        [data],
        `'${editImage.originalname}${editImage.contentType}'`,
        metadata
      );
    } else {
      return new File([data], editImage.originalname);
    }
  };
  /**
   * update image
   */
  const updatetheImage = async (data) => {
    try {
      let formData = new FormData();
      if (files.length > 0) {
        formData.append("path", files[0].file);
      } else if (editImage.path) {
        let file = await creteFileObj();
        formData.append("path", "");
      } else if (!editImage.path) {
        setError("Please add an image ");
        return true;
      }

      formData.append("id", editImage.id);
      formData = setFormData(formData, data);

      const response = await axiosFileUploadServiceApi.patch(
        `${imageUpdateURL}${editImage.id}/`,
        formData
      );
      if (response?.status === 200) {
        updatedFileChnages([response]);
        closePopupWindow();
      }
    } catch (error) {
      console.log(error);
    }
  };

  /**
   * Post new images
   */
  const postImages = async (data) => {
    const arrURL = [];
    if (files.length === 0) {
      setError("Please add an image ");
      return true;
    }
    if (files.length > 0) {
      files.forEach((element, index) => {
        let formData = new FormData();
        formData.append("path", element.file);
        formData = setFormData(formData, data);

        arrURL.push(axiosFileUploadServiceApi.post(imagePostURL, formData));
      });
    } else {
      let formData = new FormData();
      formData.append("path", "");
      formData = setFormData(formData, data);
      arrURL.push(axiosFileUploadServiceApi.post(imagePostURL, formData));
    }

    try {
      await Promise.all(arrURL).then(function (values) {
        updatedFileChnages(values);
        closePopupWindow();
      });
    } catch (error) {
      console.log(error);
    }
  };

  /**
   * Onclick call the upload funciton
   */
  const uploadFile = (data) => {
    const arrURL = [];
    saveState(true);
    if (editImage?.id) {
      updatetheImage(data);
    } else {
      postImages(data);
    }
  };

  /**
   *
   * After successfully update images
   */
  const updatedFileChnages = (response) => {
    const imgarr = [];
    response.forEach((item, i) => {
      const key = Object.keys(item.data);
      const imageResponse = item.data[key];
      const img = {
        id: imageResponse.id,
        originalname: imageResponse.originalname,
        path: imageResponse.path,
        contentType: imageResponse.contentType,
      };
      imgarr.push(img);
    });

    gallerysetState([...galleryState, ...imgarr]);
    resetFileUploadForm();
  };

  // useEffect(() => {
  //   //resetFileUploadForm();
  // }, [galleryState]);

  /**
   * Reset form
   */
  const resetFileUploadForm = () => {
    reset();
    saveState(false);
    setFiles([]);
    setEditCarousel({});
  };

  const onerror = (error) => {
    if (error.type) {
      console.log("error upload fil");
    }
  };

  const clearField = () => {
    resetFileUploadForm();
  };

  const onUpdateFiles = (files) => {
    setError("");
    setFiles(files);
  };

  const closePopupWindow = () => {
    if (closeHandler && typeof closeHandler === "function") {
      // setTimeout(() =>{
      //   closeHandler()
      // },1000)
      closeHandler();
    }
  };

  return (
    <>
      <form className="" onSubmit={handleSubmit(uploadFile)}>
        <div className={`${scrollEnable ? "heightCtrl" : "fullHeightCtrl"}`}>
          <div className="mb-2 row">
            <label className="col-sm-12 col-form-label">
              <Title title={title} cssClass="requiredField" />
            </label>
            <div className="col-sm-12">
              {error ? <Error>{error}</Error> : ""}
              <div className="border border-3 mb-0 shadow-lg">
                <FilePond
                  labelIdle='Drag & Drop your files or <span className="filepond--label-action">Browse</span>'
                  labelInvalidField="invalid files"
                  name="path"
                  files={files}
                  onerror={onerror}
                  onupdatefiles={onUpdateFiles}
                  allowMultiple={true}
                  maxFiles={maxFiles ? maxFiles : 4}
                  maxParallelUploads={4}
                  disabled={disabledFile}
                  credits={false}
                  acceptedFileTypes={extTypes}
                  instantUpload={false}
                />
              </div>
              {dimensions ? (
                <div>
                  <small className="text-muted">
                    Min. Width - {dimensions.w} & Height - {dimensions.h} will
                    be the good for resolution.{" "}
                  </small>
                </div>
              ) : (
                ""
              )}

              {editImage?.id && editImage.path ? (
                <div>
                  <img
                    src={getImagePath(editImage.path, editImage.contentType)}
                    alt={editImage?.alternitivetext}
                    className=""
                    style={{
                      width: "100%",
                      height: "100px",
                      objectFit: "cover",
                    }}
                  />
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
          <div>
            <InputFields
              label={alternitivetextTitle}
              type="text"
              fieldName={altTitleFieldName}
              register={register}
            />

            {Object.keys(showExtraFormFields).map((e, index) => {
              const { label, type, fieldName, value } = showExtraFormFields[e];

              if (type == "richText") {
                return (
                  <RichTextInputEditor
                    key={index}
                    label={label}
                    editorSetState={setEditorState}
                    initialText={
                      editImage?.feature_description
                        ? editImage?.feature_description
                        : editImage?.news_description
                          ? editImage?.news_description
                          : editImage?.banner_descripiton
                            ? editImage?.banner_descripiton
                            : editImage?.aboutus_description
                              ? editImage?.aboutus_description
                              : editImage?.client_description
                                ? editImage?.client_description
                                : editImage?.case_studies_description
                                  ? editImage?.case_studies_description
                                  : editImage?.team_member_about_us
                                    ? editImage?.team_member_about_us
                                    : editImage?.description
                                      ? editImage?.description
                                      : ""
                    }
                  />
                );
              } else {
                return (
                  <InputFields
                    key={index}
                    label={label}
                    type={type}
                    value={value}
                    fieldName={fieldName}
                    register={register}
                  />
                );
              }
            })}
          </div>
        </div>
        <div className="row">
          <div className="d-flex justify-content-center flex-wrap flex-column flex-sm-row align-items-center gap-2 my-3">
            {!editImage?.id ? (
              <button
                type="button"
                className="btn btn-secondary"
                onClick={clearField}
              >
                Clear
              </button>
            ) : (
              ""
            )}
            <button type="submit" className="btn btn-primary">
              {editImage?.id ? "Update" : "Save"}
            </button>

            <Button
              type="submit"
              cssClass="btn btn-more"
              label={"Close"}
              handlerChange={closeHandler}
            />
          </div>
        </div>

        {showDescription ? (
          <>
            <div
              className={`${scrollEnable ? "heightCtrl" : "fullHeightCtrl"}`}
            >
              <InputField
                label={titleTitle}
                fieldName={imageTitleFieldName}
                register={register}
              />

              <TextAreaField
                label={descriptionTitle}
                fieldName={imageDescriptionFieldName}
                register={register}
              />
              <>
                {extraFormParamas.map((item, index) => {
                  let key = Object.keys(item);
                  let field = item[key];
                  if (field.readonly) return "";
                  return (
                    <InputField
                      key={index}
                      label={field.label}
                      type={field.type}
                      fieldName={field.fieldName}
                      register={register}
                    />
                  );
                })}
              </>
            </div>
            <div className="row">
              <div className="d-flex gap-2 justify-content-center flex-wrap flex-column flex-sm-row align-items-center my-3">
                <button
                  type="button"
                  className="btn btn-secondary mx-3"
                  onClick={clearField}
                >
                  Clear
                </button>
                <button type="submit" className="btn btn-primary">
                  Save
                </button>
              </div>
            </div>
          </>
        ) : (
          ""
        )}
      </form>
    </>
  );
};

export default FileUpload;
