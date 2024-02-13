import React, { useEffect, useState } from "react";
import { confirmAlert } from "react-confirm-alert";
import { toast } from "react-toastify";

// Components
import EditAdminPopupHeader from "../EditAdminPopupHeader";
import FileUpload from "../../Components/FileUpload";
import DeleteDialog from "../../../Common/DeleteDialog";
import { getCookie } from "../../../util/cookieUtil";
import { getBaseURL } from "../../../util/ulrUtil";
import { axiosFileUploadServiceApi } from "../../../util/axiosUtil";

const AboutImageInputsForm = ({
  editHandler,
  componentType,
  pageType,
  category = "banner",
  extraFormParamas,
  showDescription = true,
  showExtraFormFields,
  dimensions,
  imageLabel = "Add Image",
  imagePostURL = "banner/createBannerIntro/",
  imageGetURL = "banner/clientBannerIntro/",
  imageUpdateURL = "banner/updateBannerIntro/",
  imageDeleteURL = "banner/updateBannerIntro/",
}) => {
  const projectID = "a62d7759-a e6b-4e49-a129-1ee208c6789d";
  const [userName, setUserName] = useState("");
  const [imgGallery, setImgGallery] = useState([]);
  const [saveState, setSaveState] = useState(false);
  const [project, setProject] = useState({ id: projectID });
  const [editCarousel, setEditCarousel] = useState({});
  const [carousel, setcarouseData] = useState("");

  const baseURL = getBaseURL();

  const closeHandler = () => {
    editHandler(componentType, false);
    document.body.style.overflow = "";
  };
  useEffect(() => {
    setUserName(getCookie("userName"));
  }, []);

  useEffect(() => {
    const getBannerData = async () => {
      try {
        const response = await axiosFileUploadServiceApi.get(
          `${imageGetURL}${pageType}/`,
        );
        if (response?.status === 200 && response.data.imageModel) {
          setcarouseData(response.data.imageModel);
          setEditCarousel(response.data.imageModel);
        }
      } catch (e) {
        console.log("unable to access ulr because of server is down");
      }
    };

    getBannerData();
  }, [imgGallery]);

  /**
   *
   * Delete image
   */
  const thumbDelete = (id, name) => {
    const deleteImageByID = async () => {
      const response = await axiosFileUploadServiceApi.delete(
        `${imageDeleteURL}${id}/`,
      );
      if (response.status == 204) {
        setcarouseData("");
        toast.success(`Record deleted successfully`);
      }
    };

    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <DeleteDialog
            onClose={onClose}
            callback={deleteImageByID}
            message={`deleting the ${name} image?`}
          />
        );
      },
    });
  };

  return (
    <>
      {/* {editCarousel.id ? ( */}
      <div className="bg-white">
        <EditAdminPopupHeader
          closeHandler={closeHandler}
          title={componentType}
        />
        <div className="container">
          <div className="row py-0 pb-md-5">
            <div className="col-md-8 offset-md-2 mb-5 mb-md-0">
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
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* ) : (
        ""
      )} */}
    </>
  );
};

export default AboutImageInputsForm;
