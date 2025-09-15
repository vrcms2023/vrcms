import React, { useEffect, useState } from "react";
import FileUpload from "../Frontend_Admin/Components/FileUpload";
import ImageUploadForm from "../Frontend_Admin/Components/V2/ImageUploadForm";
import { getProjectCategoryGalleryFields, imageDimensionsJson } from "../util/dynamicFormFields";
import { getSelectedImage } from "../util/commonUtil";

const FileUploadModel = ({
  ModelTitle,
  closeModel,
  project,
  category = "thumbnail",
  maxFiles,
  imageLabel = "Upload Image",
  imagePostURL = "/project/projectImages/",
  imageGetURL = "/project/projectImages/",
  imageUpdateURL = "/project/projectImages/",
  imageDeleteURL = "/project/projectImages/",
  validTypes = "image/png,image/jpeg",
  isclosePopup = true,
  sideDeck = "Project image gallery",
  saveState,
  dimensions = true,
}) => {
  const [editObject, setEditObject] = useState({});
  const [newObject, setNewObject] = useState({});

  useEffect(() => {
    if (newObject?.id) {
      saveState(true);
      closeModel();
    }
  }, [newObject]);

  const closeHandler = () => {
    setEditObject({});
  };

  // useEffect(() => {
  //   if (project?.id) {
  //     const selectedImage = getSelectedImage(project?.ProjectGallery, category);
  //     setEditObject(selectedImage[0]);
  //   }
  // }, [project]);

  return (
    <div
      className="modal d-block modal-lg"
      tabIndex="-1"
      style={{ position: "absolute", zIndex: 99999 }}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title text-dark fw-bold">{ModelTitle}</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={closeModel}
            ></button>
          </div>
          <div className="modal-body px-4 py-3">
            <div className="m-3">
              <ImageUploadForm
                title={ModelTitle}
                newObjectsetState={setNewObject}
                editImage={editObject}
                setEditObject={setEditObject}
                maxFiles={maxFiles}
                validTypes={validTypes}
                imagePostURL={imagePostURL}
                imageUpdateURL={imageUpdateURL}
                showExtraFormFields={getProjectCategoryGalleryFields(category, project?.id)}
                dimensions={dimensions ? imageDimensionsJson("imageGallery") : false}
                closeHandler={closeHandler}
                scrollEnable={editObject?.lengh > 0 ? true : false}
                isclosePopup={isclosePopup}
                sideDeck={sideDeck}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default FileUploadModel;
