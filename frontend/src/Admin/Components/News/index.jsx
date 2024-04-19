import React, { useEffect, useState } from "react";
import { getCookie } from "../../../util/cookieUtil";
import EditAdminPopupHeader from "../EditAdminPopupHeader";
import FileUpload from "../FileUpload";

export const News = ({
  editHandler,
  componentType,
  category = "news",
  extraFormParamas,
  showExtraFormFields,
  imageLabel = "Add Image",
  imagePostURL = "banner/createBannerIntro/",
  imageGetURL = "appNews/createAppNews/",
  imageUpdateURL = "banner/updateBannerIntro/",
  imageDeleteURL = "banner/updateBannerIntro/",
  pageType,
  type,
  editCarousel,
  setEditCarousel,
  showDescription = true,
  dimensions,
}) => {
  const projectID = "a62d7759-a e6b-4e49-a129-1ee208c6789d";
  const [userName, setUserName] = useState("");
  const [imgGallery, setImgGallery] = useState([]);
  const [saveState, setSaveState] = useState(false);
  const [project, setProject] = useState({ id: projectID });
  const closeHandler = () => {
    editHandler(componentType, false);
    document.body.style.overflow = "";
  };
  useEffect(() => {
    setUserName(getCookie("userName"));
  }, []);

  useEffect(() => {
    if (imgGallery.length > 0) {
      closeHandler();
    }
  }, [imgGallery]);

  return (
    <>
      <EditAdminPopupHeader
        closeHandler={closeHandler}
        title={componentType}
        type={type}
      />
      <hr className="m-0" />
      <div className="container my-3">
        <div className="row py-0 pb-md-5">
          <div className="col-md-12 mb-5 mb-md-0">
            <div className="container">
              <FileUpload
                title={imageLabel}
                project={project}
                updated_by={userName}
                category={category}
                gallerysetState={setImgGallery}
                maxFiles={1}
                galleryState={imgGallery}
                validTypes="image/png,image/jpeg"
                descriptionTitle="Caption"
                titleTitle="Title"
                alternitivetextTitle="Image Alt Text"
                saveState={setSaveState}
                showDescription={showDescription}
                buttonLable="Save"
                editImage={editCarousel}
                setEditCarousel={setEditCarousel}
                imagePostURL={imagePostURL}
                imageUpdateURL={imageUpdateURL}
                extraFormParamas={extraFormParamas}
                showExtraFormFields={showExtraFormFields}
                dimensions={dimensions}
                closeHandler={closeHandler}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default News;
