import React, { useEffect, useState } from "react";
import EditAdminPopupHeader from "../EditAdminPopupHeader";
import { toast } from "react-toastify";
import FileUpload from "../../Components/FileUpload";
import { getCookie } from "../../../util/cookieUtil";
import { axiosFileUploadServiceApi } from "../../../util/axiosUtil";
import { confirmAlert } from "react-confirm-alert";
import DeleteDialog from "../../../Common/DeleteDialog";

const ImageInputsForm = ({
  editHandler,
  componentType,
  popupTitle,
  pageType,
  category = "banner",
  extraFormParamas,
  showDescription = true,
  showExtraFormFields,
  dimensions,
  imageLabel = "Upload Image",
  imagePostURL = "banner/createBannerIntro/",
  imageGetURL = "banner/clientBannerIntro/",
  imageUpdateURL = "banner/updateBannerIntro/",
  imageDeleteURL = "banner/updateBannerIntro/",
  validTypes = "image/png,image/jpeg",
}) => {
  const projectID = "a62d7759-a e6b-4e49-a129-1ee208c6789d";
  const [userName, setUserName] = useState("");
  const [imgGallery, setImgGallery] = useState([]);
  const [saveState, setSaveState] = useState(false);
  const [project, setProject] = useState({ id: projectID });
  const [editCarousel, setEditCarousel] = useState({});
  const [carousel, setcarouseData] = useState("");

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
          `${imageGetURL}${pageType}/`
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
        `${imageDeleteURL}${id}/`
      );
      if (response.status === 204) {
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
            // message={`deleting the ${name} image?`}
            message={
              <>
                Confirm deletion of <span>${name}</span> image?
              </>
            }
          />
        );
      },
    });
  };

  return (
    // <>
    // {editCarousel.id ? (
    <div className="">
      <EditAdminPopupHeader closeHandler={closeHandler} title={popupTitle} />
      {/* <hr className="m-0 text-black" /> */}
      <div className="container my-3">
        <div className="row py-0">
          <div className="col-md-12">
            <div className="container px-0 px-md-auto">
              <FileUpload
                title={imageLabel}
                project={project}
                updated_by={userName}
                category={category}
                gallerysetState={setImgGallery}
                maxFiles={1}
                galleryState={imgGallery}
                validTypes={validTypes}
                descriptionTitle="Caption"
                titleTitle="Title"
                alternitivetextTitle="SEO title"
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
    </div>
    // ):''}</>
  );
};

export default ImageInputsForm;
