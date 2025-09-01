import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";
import DeleteDialog from "../../../../Common/DeleteDialog";

import EditAdminPopupHeader from "../../EditAdminPopupHeader";
import {
  getObjectTitle,
  getObjectDescription,
  getListStyle,
  reorder,
  updateArrIndex,
  getObjectPositionKey,
  sortByFieldName,
  getImageURL,
} from "../../../../util/commonUtil";
import { axiosFileUploadServiceApi, axiosServiceApi } from "../../../../util/axiosUtil";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import useAdminLoginStatus from "../../../../Common/customhook/useAdminLoginStatus";
import NoteComponent from "../../../../Common/NoteComponent";
import RichTextView from "../../../../Common/RichTextView";
import ImageUploadForm from "../../V2/ImageUploadForm";

/**
 * This component for upload list of images with drag and drop functionality
 */

const AdminListOfRecordsUpload = ({
  editHandler,
  componentType,
  popupTitle,
  getImageListURL,
  deleteImageURL,
  imagePostURL,
  imageUpdateURL,
  imageIndexURL,
  imageLabel = "Add Images",
  showExtraFormFields,
  dimensions,
  validTypes = "image/png,image/jpeg",
  sideDeck,
  isclosePopup = false,
}) => {
  const [newObject, setNewObject] = useState({});
  const [objectList, setCurrentObjectList] = useState([]);

  const [editObject, setEditObject] = useState({});

  const closeHandler = () => {
    editHandler(componentType, false);
    document.body.style.overflow = "";
  };

  useEffect(() => {
    const getObjectListData = async () => {
      try {
        const response = await axiosFileUploadServiceApi.get(getImageListURL);
        if (response?.status === 200) {
          let key = Object.keys(response.data);
          if (key.length > 1) {
            const _positionKey = getObjectPositionKey(response.data.results[0]);
            const _carouselList = sortByFieldName(response.data.results, _positionKey);
            setCurrentObjectList(_carouselList);
          } else {
            const _positionKey = getObjectPositionKey(response.data[key][0]);
            const _carouselList = sortByFieldName(response.data[key], _positionKey);
            setCurrentObjectList(_carouselList);
          }
        }
      } catch (e) {
        console.log("unable to access ulr because of server is down");
      }
    };

    getObjectListData();
  }, [newObject, getImageListURL]);

  const handleObjectEdit = (event, object) => {
    event.preventDefault();
    window.scrollTo(0, 0);
    setEditObject(object);
  };

  /**
   *
   * Delete image
   */
  const thumbDelete = (id, name) => {
    const deleteImageByID = async () => {
      const response = await axiosFileUploadServiceApi.delete(`${deleteImageURL}${id}/`);
      if (response.status === 204) {
        const list = objectList.filter((item) => item.id !== id);
        setCurrentObjectList(list);
        setEditObject({});
      }
    };

    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <DeleteDialog
            onClose={onClose}
            callback={deleteImageByID}
            message={
              <>
                Confirm deletion of <span>{name}</span> image?
              </>
            }
          />
        );
      },
    });
  };

  const onDragEnd = async (result) => {
    const { source, destination } = result;
    if (!destination) return true;
    const _positionKey = getObjectPositionKey(objectList[0]);

    const _items = reorder(objectList, source.index, destination.index);
    const _parentObjects = updateArrIndex(_items, _positionKey);
    const response = await updateObjectsIndex(_parentObjects);
    if (response?.length > 0) {
      setCurrentObjectList(response);
    }
  };

  const updateObjectsIndex = async (data) => {
    try {
      let response = await axiosServiceApi.put(imageIndexURL, data);
      let key = Object.keys(response?.data);
      if (key.length > 0) {
        return response.data[key];
      }
    } catch (error) {
      console.log("unable to save clinet position");
    }
  };

  // console.log(Object.keys(editObject).length, "editObject");
  return (
    <div>
      <EditAdminPopupHeader closeHandler={closeHandler} title={popupTitle} />

      <div className="container mt-2">
        <NoteComponent note="Shuffle order" />

        <div className="row mt-2 d-flex flex-row-reverse">
          {objectList?.length > 0 ? (
            <div className="heightCtrl imglist p-0">
              <div className="container p-0">
                <DragDropContext onDragEnd={onDragEnd}>
                  {objectList?.map((item, index) => (
                    <Droppable key={index} droppableId={item.id}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          style={getListStyle(snapshot.isDraggingOver)}
                          {...provided.droppableProps}
                        >
                          <AdminObjectItem
                            item={item}
                            index={index}
                            key={index}
                            componentType={componentType}
                            handleObjectEdit={handleObjectEdit}
                            thumbDelete={thumbDelete}
                          />
                          {provided.placeholder}
                        </div>
                      )}
                    </Droppable>
                  ))}
                </DragDropContext>
              </div>
            </div>
          ) : (
            ""
          )}

          <small
            className={`text-center py-1 fw-medium text-white ${Object.keys(editObject).length > 0 ? "bg-warning " : "bg-secondary"}`}
          >
            {Object.keys(editObject).length > 0 ? "EDIT" : "ADD NEW"}
          </small>

          <div
            className={`mb-5 mb-md-0 border border-2 p-2 ${Object.keys(editObject).length > 0 ? " border-warning" : "border-secondary"}`}
          >
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
  );
};

const AdminObjectItem = ({ item, index, componentType, handleObjectEdit, thumbDelete }) => {
  const { isAdmin, hasPermission } = useAdminLoginStatus();

  return (
    <Draggable
      isDragDisabled={!isAdmin ? true : false}
      key={item.id}
      draggableId={item.id}
      index={index}
      id={item.id}
    >
      {(provided) => (
        <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
          <div className="row mb-1 p-1 slideItem" key={index}>
            <div className="col-2 col-md-2">
              {/* <i className="fa fa-picture-o fs-2 d-lg-none" aria-hidden="true"></i> */}

              <img
                src={getImageURL(item)}
                alt={item.alternitivetext}
                className="w-100  d-lg-block"
              />
            </div>
            <div className="col col-md-8 text-left ps-0">
              <h6 className="fw-medium lc1 mb-1 lineClamp">
                {getObjectTitle(componentType, item)}
              </h6>
              <small className="description text-muted d-none d-md-block">
                <RichTextView
                  data={getObjectDescription(componentType, item)}
                  className={""}
                  showMorelink={false}
                />
              </small>
            </div>
            <div className="col-4 col-md-2 d-flex justify-content-around align-items-center flex-md-row gap-1">
              <Link onClick={(event) => handleObjectEdit(event, item)}>
                <i className="fa fa-pencil fs-5 text-secondary" aria-hidden="true"></i>
              </Link>
              <Link onClick={(event) => thumbDelete(item.id, getObjectTitle(componentType, item))}>
                <i className="fa fa-trash fs-5 text-secondary" aria-hidden="true"></i>
              </Link>
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default AdminListOfRecordsUpload;
