import React, { useEffect, useState } from "react";
import EditAdminPopupHeader from "../../EditAdminPopupHeader";
import { toast } from "react-toastify";

import { axiosFileUploadServiceApi } from "../../../../util/axiosUtil";
import { confirmAlert } from "react-confirm-alert";
import DeleteDialog from "../../../../Common/DeleteDialog";
import ImageUploadForm from "../../V2/ImageUploadForm";

const AdminSingleRecordUpload = ({
  editHandler,
  componentType,
  popupTitle,
  pageType,
  showExtraFormFields,
  dimensions,
  imageLabel = "Upload Image",
  imagePostURL = "banners/createBanner/",
  imageGetURL = "banners/by-page-and-category/",
  imageUpdateURL = "banners/updateBanner/",
  imageDeleteURL = "banners/updateBanner/",
  validTypes = "image/png,image/jpeg",
  isclosePopup = true,
  sideDeck,
  category = { category },
}) => {
  const [newObject, setNewObject] = useState({});
  const [objectList, setCurrentObjectList] = useState([]);
  const [editObject, setEditObject] = useState({});

  const closeHandler = () => {
    editHandler(componentType, false);
    document.body.style.overflow = "";
  };

  useEffect(() => {
    const getBannerData = async () => {
      try {
        const response = await axiosFileUploadServiceApi.get(
          `${imageGetURL}${pageType}/category/${category}/`
        );
        if (response?.status === 200 && response.data?.length > 0) {
          setCurrentObjectList(response.data[0]);
          setEditObject(response.data[0]);
        }
      } catch (e) {
        console.log("unable to access ulr because of server is down");
      }
    };

    getBannerData();
  }, [newObject]);

  /**
   *
   * Delete image
   */
  const thumbDelete = (id, name) => {
    const deleteImageByID = async () => {
      const response = await axiosFileUploadServiceApi.delete(`${imageDeleteURL}${id}/`);
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
              {/* <FileUpload
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
              /> */}
              <ImageUploadForm
                title={imageLabel}
                newObjectsetState={setNewObject}
                editImage={editObject}
                setEditObject={setEditObject}
                maxFiles={1}
                validTypes={validTypes}
                imagePostURL={imagePostURL}
                imageUpdateURL={imageUpdateURL}
                showExtraFormFields={showExtraFormFields}
                dimensions={dimensions}
                closeHandler={closeHandler}
                scrollEnable={objectList.lengh > 0 ? true : false}
                isclosePopup={isclosePopup}
                sideDeck={sideDeck}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    // ):''}</>
  );
};

export default AdminSingleRecordUpload;
