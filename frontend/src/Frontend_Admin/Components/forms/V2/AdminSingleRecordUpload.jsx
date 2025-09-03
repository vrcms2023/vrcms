import React, { use, useEffect, useState } from "react";
import EditAdminPopupHeader from "../../EditAdminPopupHeader";
import { toast } from "react-toastify";

import { axiosFileUploadServiceApi } from "../../../../util/axiosUtil";
import { confirmAlert } from "react-confirm-alert";
import DeleteDialog from "../../../../Common/DeleteDialog";
import ImageUploadForm from "../../V2/ImageUploadForm";
import { set } from "lodash";

const AdminSingleRecordUpload = ({
  editHandler,
  componentType,
  popupTitle,
  showExtraFormFields,
  dimensions,
  parentEditObject,
  onPageLoadServiceCall = false,
  imageLabel = "Upload Image",
  imagePostURL = "banners/createBanner/",
  imageGetURL = "banners/by-page-and-category/",
  imageUpdateURL = "banners/updateBanner/",
  imageDeleteURL = "banners/updateBanner/",
  validTypes = "image/png,image/jpeg",
  isclosePopup = true,
  sideDeck,
}) => {
  const [newObject, setNewObject] = useState({});
  const [editObject, setEditObject] = useState({});

  const closeHandler = () => {
    editHandler(componentType, false);
    document.body.style.overflow = "";
  };

  useEffect(() => {
    const getRecordData = async () => {
      try {
        const response = await axiosFileUploadServiceApi.get(imageGetURL);
        if (response?.status === 200 && response.data?.length > 0) {
          setEditObject(response.data[0]);
        }
      } catch (e) {
        console.log("unable to access ulr because of server is down");
      }
    };
    if (!parentEditObject?.id && onPageLoadServiceCall) {
      getRecordData();
    }
  }, [newObject, parentEditObject, onPageLoadServiceCall]);

  useEffect(() => {
    if (parentEditObject) {
      setEditObject(parentEditObject);
    }
  }, [parentEditObject]);

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
                scrollEnable={editObject.lengh > 0 ? true : false}
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
