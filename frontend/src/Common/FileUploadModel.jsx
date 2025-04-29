import React, { useState } from "react";
import FileUpload from "../Frontend_Admin/Components/FileUpload";

const FileUploadModel = ({
  ModelTitle,
  closeModel,
  project,
  updated_By,
  category = "thumbnail",
  gallerysetState,
  galleryState,
  validTypes = "image/png,image/jpeg",
  descriptionTitle,
  showDescription,
  saveState,
  buttonLable = "Upload Plan",
  maxFiles,
  scrollEnable,
}) => {
  const [editCarousel, setEditCarousel] = useState({});
  return (
    <div
      className="modal d-block modal-lg"
      tabIndex="-1"
      style={{ position: "absolute", zIndex: 9999 }}
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
              <FileUpload
                project={project}
                updated_By={updated_By}
                category={category}
                gallerysetState={gallerysetState}
                galleryState={galleryState}
                validTypes={validTypes}
                descriptionTitle={descriptionTitle}
                showDescription={showDescription}
                saveState={saveState}
                buttonLable={buttonLable}
                maxFiles={maxFiles}
                scrollEnable={scrollEnable}
                closeHandler={closeModel}
                setEditCarousel={setEditCarousel}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default FileUploadModel;
