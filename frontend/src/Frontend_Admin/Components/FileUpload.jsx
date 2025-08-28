import React, { useEffect, useState, useMemo, useRef } from "react";
import { Controller, useForm } from "react-hook-form";
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
import { InputField, InputFields, RichTextInputEditor_V2 } from "./forms/FormFields";
import { getImageFileFromUrl, getImagePath, getImageURL } from "../../util/commonUtil";

// CSS
import "filepond/dist/filepond.min.css";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import { toast } from "react-toastify";

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
  isclosePopup = true,
  sideDeck = "",
}) => {
  const [files, setFiles] = useState([]);
  const [extTypes, setExtTypes] = useState([]);
  const [pageType, setPageType] = useState("");
  const listofAboutSection = ["aboutDetails", "aboutVision", "aboutMission"];
  const [editorState, setEditorState] = useState("");
  const baseURL = getBaseURL();

  const [error, setError] = useState("");
  const timeoutRef = useRef(null);
  const [hideFileFound, sethideFileFound] = useState(true);

  const {
    control,
    register,
    reset,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
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
    if (editImage?.video_WebURL) {
      sethideFileFound(false);
      showImageVideoInput();
    } else if (editImage?.path) {
      sethideFileFound(true);
      hideImageVideoInput();
    }
  }, [editImage]);

  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      if (error) {
        setError("");
      }
    }, 3000);
  }, [error]);

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
    if (files.length > 0 && !showDescription && showExtraFormFields.length > 0) {
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
        if (showExtraFormFields.hasOwnProperty(key) && showExtraFormFields[key].type !== "hidden") {
          formData.append(key, data[key]);
        }
        if (showExtraFormFields[key].type === "hidden") {
          formData.append(key, showExtraFormFields[key]?.value);
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
    if (editImage.path.split("/")[0] === "http:" || editImage.path.split("/")[0] === "https:") {
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
      return new File([data], `'${editImage.originalname}${editImage.contentType}'`, metadata);
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
        formData.append("path", "");
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
      let errorMessage = "";
      if (error.length > 0) {
        errorMessage = error[0];
      } else {
        errorMessage = error[0];
      }
      toast.error(errorMessage, {
        position: "top-left",
      });
      setError(error);
      window.scrollTo(0, 0);
      console.log(error);
    }
  };

  const getImageWebURL = () => {
    return document.getElementById("image_video_WebURL");
  };

  useEffect(() => {
    const image_WebURL = getImageWebURL();
    if (image_WebURL) {
      image_WebURL.onchange = handleImageUpload;
    }
  }, []);

  const handleImageUpload = () => {
    const FilePondDiv = document.getElementById("FilePondDiv");
    const imageURL = getImageWebURL().value;
    if (imageURL) {
      FilePondDiv.style.display = "none";
    }
  };

  const hideImageVideoInput = () => {
    const imageURL = getImageWebURL();
    if (imageURL) {
      imageURL.parentNode.parentNode.style.display = "none";
    }
  };

  const showImageVideoInput = () => {
    const imageURL = getImageWebURL();
    if (imageURL) {
      imageURL.parentNode.parentNode.style.display = "block";
    }
  };

  const showImageUpload = () => {
    const FilePondDiv = document.getElementById("FilePondDiv");
    if (FilePondDiv) {
      FilePondDiv.style.display = "block";
    }
  };
  /**
   * Post new images
   */
  const postImages = async (data) => {
    const arrURL = [];
    // if (files.length === 0) {
    //   setError("Please add an image ");
    //   return true;
    // }
    data = getFormDataonSubmit(data);

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
      const isValid = validateDataisEmptyornot(data);
      if (!isValid) {
        toast.error("No data has been added", {
          position: "top-center",
        });
        return true;
      }

      arrURL.push(axiosFileUploadServiceApi.post(imagePostURL, formData));
    }

    try {
      await Promise.all(arrURL).then(function (values) {
        updatedFileChnages(values);
        resetFileUploadForm();
        closePopupWindow();
      });
    } catch (error) {
      let errorMessage = "";
      if (error.length > 0) {
        errorMessage = error[0];
      } else {
        errorMessage = error[0];
      }
      toast.error(errorMessage, {
        position: "top-left",
      });
      setError(error);
      window.scrollTo(0, 0);
      console.log(error);
    }
  };

  const validateDataisEmptyornot = (data) => {
    let isValid = false;
    for (const key in data) {
      if (data[key] && key !== "category" && key !== "alternitivetext") {
        isValid = true;
        break;
      }
    }
    return isValid;
  };

  const getFormDataonSubmit = (data) => {
    const adminActionForm = document.getElementById("adminActionForm");
    const getFormData = new FormData(adminActionForm);

    for (const pair of getFormData.entries()) {
      if (pair[0] !== "path") {
        data[pair[0]] = pair[1];
      }
    }
    return data;
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
    //setEditCarousel([...galleryState, ...items]);
    resetFileUploadForm();
  };

  // useEffect(() => {
  //   //resetFileUploadForm();
  // }, [galleryState]);

  /**
   * Reset form
   */
  const resetFileUploadForm = () => {
    sethideFileFound(true);
    showImageUpload();
    showImageVideoInput();
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
    hideImageVideoInput();
  };

  const downloadPDF = (url) => {
    window.open(url, "_blank", "location=yes,height=800,width=600 ,scrollbars=yes,status=yes");
  };

  const closePopupWindow = () => {
    if (isclosePopup && closeHandler && typeof closeHandler === "function") {
      // setTimeout(() =>{
      //   closeHandler()
      // },1000)
      closeHandler();
    }
  };

  return (
    <>
      <form className="" onSubmit={handleSubmit(uploadFile)} id="adminActionForm">
        <div className={`px-0 ${scrollEnable ? "heightCtrl" : "fullHeightCtrl"} ${sideDeck}`}>
          <div className="mb-2 row">
            {title && (
              <label className="col-sm-12 col-form-label requiredField">
                {title}
                {/* <Title title={title} cssClass="requiredField" /> */}
              </label>
            )}
            <div id="FilePondDiv">
              <div className="row">
                <div
                  className={`${editImage?.id && editImage.path ? "col-6 col-md-6 pe-0" : "col-12"}`}
                >
                  <div className={`mb-0 ${!hideFileFound ? "d-none" : ""}`}>
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
                  {maxFiles !== 1 ? (
                    <div className="text-muted">
                      <small className="d-block text-center" style={{ fontSize: ".75rem" }}>
                        You can upload a maximum of {maxFiles ? maxFiles : 4} images at a time.
                      </small>
                    </div>
                  ) : (
                    ""
                  )}

                  {error ? <Error>{error}</Error> : ""}
                </div>
                {editImage?.id && editImage.path && editImage.contentType === ".pdf" && (
                  <div className="col-6 col-md-6">
                    <div className="text-center">
                      <b className="d-block">File name</b>
                      <a
                        href="#!"
                        onClick={() => downloadPDF(`${baseURL}${editImage.path}`)}
                        className="mx-1 text-dark"
                      >
                        {editImage.originalname}
                        <i class="fa fa-file-pdf-o cursor-pointer fs-4 ms-2" aria-hidden="true"></i>
                      </a>
                    </div>
                  </div>
                )}
                {editImage?.id &&
                  (editImage?.path || editImage?.thumbnail_url) &&
                  editImage?.contentType !== ".pdf" && (
                    <div className="col-6 col-md-6">
                      <img
                        src={getImageURL(editImage)}
                        alt={editImage?.alternitivetext}
                        className=""
                        style={{
                          width: "100%",
                          height: "74px",
                          objectFit: "cover",
                          objectPosition: "center",
                          borderRadius: "6px",
                        }}
                      />
                    </div>
                  )}
                {dimensions && (
                  <div className="col-12">
                    <small className="d-block text-center" style={{ fontSize: ".75rem" }}>
                      Recommended size <strong>{dimensions.w}</strong> -{" "}
                      <strong>{dimensions.h}</strong>
                    </small>
                  </div>
                )}
                <div className={`${!hideFileFound ? "d-none" : ""}`}>
                  <InputFields
                    label={alternitivetextTitle}
                    type="text"
                    fieldName={altTitleFieldName}
                    register={register}
                  />
                </div>
              </div>
            </div>
          </div>

          <div>
            {Object.keys(showExtraFormFields).map((e, index) => {
              const { label, type, fieldName, value } = showExtraFormFields[e];

              if (type == "richText") {
                return (
                  <RichTextInputEditor_V2
                    Controller={Controller}
                    control={control}
                    key={index}
                    label={label}
                    name={fieldName}
                    value={value}
                  />
                );
              } else {
                return (
                  <InputFields
                    key={index}
                    label={label}
                    type={type}
                    value={value}
                    error={errors?.[fieldName]?.message}
                    fieldName={fieldName}
                    register={register}
                    {...showExtraFormFields[e]}
                  />
                );
              }
            })}
          </div>
        </div>
        <div className="row my-3">
          <div className="d-flex justify-content-center align-items-center gap-2">
            <button type="button" className="btn btn-sm btn-outline" onClick={clearField}>
              Clear
            </button>

            <button type="submit" className="btn btn-sm btn-primary">
              {editImage?.id ? "Update" : "Save"}
            </button>

            {/* <Button
              type="submit"
              cssClass="btn btn-outline"
              label={"Close"}
              handlerChange={closeHandler}
            /> */}
          </div>
        </div>

        {showDescription ? (
          <>
            <div className={`${scrollEnable ? "heightCtrl" : "fullHeightCtrl"}`}>
              <InputField label={titleTitle} fieldName={imageTitleFieldName} register={register} />
              <RichTextInputEditor_V2
                Controller={Controller}
                control={control}
                label={descriptionTitle}
                name={imageDescriptionFieldName}
                value={value}
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
                <button type="button" className="btn btn-secondary mx-3" onClick={clearField}>
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
