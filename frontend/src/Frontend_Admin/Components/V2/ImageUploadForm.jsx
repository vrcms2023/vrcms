import React, { useEffect, useState, useMemo, useRef } from "react";
import { Controller, useForm } from "react-hook-form";
import { FilePond, registerPlugin } from "react-filepond";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import { toast } from "react-toastify";

// Components
import Error from "../Error";
import { getBaseURL } from "../../../util/ulrUtil";
import { axiosFileUploadServiceApi } from "../../../util/axiosUtil";
import { InputFields, RichTextInputEditor_V2 } from "../forms/FormFields";
import { buildFormData, getImageURL, validateDataNotEmpty } from "../../../util/commonUtil";

// CSS
import "filepond/dist/filepond.min.css";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";

registerPlugin(
  FilePondPluginFileValidateType,
  FilePondPluginImagePreview,
  FilePondPluginImageExifOrientation
);

const ImageUploadForm = ({
  title,
  newObjectsetState,
  setEditObject,
  validTypes = "image/png,image/jpeg",
  disabledFile = false,
  alternativeTextTitle = "Seo title",
  altTitleFieldName = "alternative_text",
  showExtraFormFields = [],
  maxFiles = 4,
  editImage,
  imagePostURL = "appGallery/createImageGallery/",
  imageUpdateURL = "appGallery/updateImageGallery/",
  dimensions,
  closeHandler,
  scrollEnable = false,
  isclosePopup = true,
  sideDeck = "",
}) => {
  const [files, setFiles] = useState([]);
  const [extTypes, setExtTypes] = useState([]);
  const [error, setError] = useState("");
  const [hideFileFound, sethideFileFound] = useState(true);

  const timeoutRef = useRef(null);
  const baseURL = getBaseURL();

  const {
    control,
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: useMemo(() => {
      return editImage;
    }, [editImage]),
    mode: "onChange",
  });

  /* -------------------- Effects -------------------- */
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
    // if (editImage?.pageType) {
    //   setPageType(editImage.pageType.split("-")[1]);
    // }
  }, [editImage]);

  useEffect(() => {
    let extArr = validTypes.split(",");
    setExtTypes(extArr);
  }, [validTypes]);

  const getImageWebURL = () => {
    return document.getElementById("image_video_WebURL");
  };

  const getFilePondDiv = () => {
    return document.getElementById("FilePondDiv");
  };
  useEffect(() => {
    const image_WebURL = getImageWebURL();
    if (image_WebURL) {
      image_WebURL.onchange = handleImageUpload;
    }
  }, []);

  const handleImageUpload = () => {
    const FilePondDiv = getFilePondDiv();
    const imageURL = getImageWebURL().value;
    if (imageURL) {
      FilePondDiv.style.display = "none";
    }
  };

  const showImageUpload = () => {
    const FilePondDiv = getFilePondDiv();
    if (FilePondDiv) {
      FilePondDiv.style.display = "block";
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

  /* -------------------- API Handlers -------------------- */

  /**
   * Onclick call the upload funciton
   */
  const submitUploadRecord = (data) => {
    editImage?.id ? updateRecord(data) : createRecord(data);
  };

  /**
   * Post new images
   * @param {Object} data - The data object to post
   */
  const createRecord = async (data) => {
    const arrURL = [];

    data = getFormDataonSubmit(data);

    if (files.length > 0) {
      files.forEach((element, index) => {
        let formData = buildFormData(new FormData(), data, showExtraFormFields);
        formData.append("path", element.file);
        arrURL.push(axiosFileUploadServiceApi.post(imagePostURL, formData));
      });
    } else {
      const formData = buildFormData(new FormData(), data, showExtraFormFields);
      formData.append("path", "");

      if (!validateDataNotEmpty(data)) {
        return toast.error("No data has been added", {
          position: "top-center",
        });
      }
      arrURL.push(axiosFileUploadServiceApi.post(imagePostURL, formData));
    }

    try {
      const responses = await Promise.all(arrURL);
      handleSuccess(responses);
    } catch (error) {
      handleApiError(error);
    }
  };

  /**
   * update image
   * @param {Object} data - The data object to update
   */
  const updateRecord = async (data) => {
    try {
      let formData = new FormData();
      if (files.length > 0) {
        formData.append("path", files[0].file);
      } else if (typeof data.path === "string" && data.path.startsWith("http")) {
        formData.delete("path");
      }

      formData.append("id", editImage.id);
      formData = buildFormData(formData, data, showExtraFormFields);
      if (!validateDataNotEmpty(data)) {
        return toast.error("No data has been added", { position: "top-center" });
      }
      const response = await axiosFileUploadServiceApi.patch(
        `${imageUpdateURL}${editImage.id}/`,
        formData
      );
      handleSuccess([response]);
    } catch (error) {
      handleApiError(error);
    }
  };

  /*
   * Handle API errors
   * @param {Object} err - The error object
   */
  const handleApiError = (err) => {
    const msg = err?.[0] || "Something went wrong";
    toast.error(msg, { position: "top-left" });
    setError(msg);
    window.scrollTo(0, 0);
    console.error(err);
  };

  /**
   *
   * @param {response[]} responses object
   */
  const handleSuccess = (responses) => {
    const newFiles = responses.map((res) => {
      const data = res.data[Object.keys(res.data)[0]];
      return {
        id: data.id,
        original_name: data.original_name,
        path: data.path,
        content_type: data.content_type,
      };
    });

    newObjectsetState(newFiles);
    resetFileUploadForm();
    closePopupWindow();
  };

  /**
   * get form data
   * @param {Object} data - The data object to populate
   * @returns {Object} - The populated data object
   */
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
   * Reset form
   */
  const resetFileUploadForm = () => {
    sethideFileFound(true);
    showImageUpload();
    showImageVideoInput();
    reset({});
    setFiles([]);
    setEditObject({});
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
    if (files.length > 0) {
      setError("");
      setFiles(files);
      hideImageVideoInput();
    }
  };

  const downloadPDF = (url) => {
    window.open(url, "_blank", "location=yes,height=800,width=600 ,scrollbars=yes,status=yes");
  };

  const closePopupWindow = () => {
    if (isclosePopup && closeHandler && typeof closeHandler === "function") {
      closeHandler();
    }
  };

  return (
    <>
      <form className="" onSubmit={handleSubmit(submitUploadRecord)} id="adminActionForm">
        <div className={`px-0 ${scrollEnable ? "heightCtrl" : "fullHeightCtrl"} ${sideDeck}`}>
          <div className="mb-2 row">
            {title && <label className="col-sm-12 col-form-label requiredField">{title}</label>}
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
                      maxFiles={maxFiles}
                      maxParallelUploads={maxFiles}
                      disabled={disabledFile}
                      credits={false}
                      acceptedFileTypes={extTypes}
                      instantUpload={false}
                    />
                  </div>
                  {maxFiles !== 1 && (
                    <div className="text-muted">
                      <small className="d-block text-center" style={{ fontSize: ".75rem" }}>
                        You can upload a maximum of {maxFiles} images at a time.
                      </small>
                    </div>
                  )}

                  {error ? <Error>{error}</Error> : ""}
                </div>
                {editImage?.id && editImage.path && editImage.contentType === ".pdf" && (
                  <div className="col-6 col-md-6">
                    <div>
                      <b className="d-block">File name</b>
                      <a
                        href="#!"
                        onClick={() => downloadPDF(`${baseURL}${editImage.path}`)}
                        className="mx-1 text-dark"
                      >
                        {editImage.originalname}
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
                        alt={editImage?.alternative_text}
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
                    label={alternativeTextTitle}
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
          </div>
        </div>
      </form>
    </>
  );
};

export default ImageUploadForm;
