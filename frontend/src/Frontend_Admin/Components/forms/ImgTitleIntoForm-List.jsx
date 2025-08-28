import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";
import FileUpload from "../../Components/FileUpload";
import DeleteDialog from "../../../Common/DeleteDialog";

import EditAdminPopupHeader from "../EditAdminPopupHeader";
import { getCookie } from "../../../util/cookieUtil";
import {
  getObjectTitle,
  getObjectDescription,
  getImagePath,
  getDummyImage,
  getListStyle,
  reorder,
  updateArrIndex,
  getObjectPositionKey,
  sortByFieldName,
  getImageURL,
} from "../../../util/commonUtil";
import { axiosFileUploadServiceApi, axiosServiceApi } from "../../../util/axiosUtil";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import useAdminLoginStatus from "../../../Common/customhook/useAdminLoginStatus";
import NoteComponent from "../../../Common/NoteComponent";
import RichTextView from "../../../Common/RichTextView";

const AdminBanner = ({
  editHandler,
  componentType,
  popupTitle,
  getImageListURL,
  deleteImageURL,
  imagePostURL,
  imageUpdateURL,
  imageIndexURL,
  imageLabel = "Add Images",
  extraFormParamas,
  titleTitle = "Title",
  descriptionTitle = "Description",
  showDescription,
  showExtraFormFields,
  dimensions,
  validTypes = "image/png,image/jpeg",
  sideDeck,
}) => {
  const projectID = "a62d7759-a e6b-4e49-a129-1ee208c6789d";
  const [userName, setUserName] = useState("");
  const [imgGallery, setImgGallery] = useState([]);
  const [saveState, setSaveState] = useState(false);
  const [carousel, setcarouseData] = useState([]);
  const [project, setProject] = useState({ id: projectID });

  const [editCarousel, setEditCarousel] = useState({});

  const closeHandler = () => {
    editHandler(componentType, false);
    document.body.style.overflow = "";
  };

  useEffect(() => {
    setUserName(getCookie("userName"));
  }, []);

  useEffect(() => {
    const getCarouselData = async () => {
      try {
        const response = await axiosFileUploadServiceApi.get(getImageListURL);
        if (response?.status === 200) {
          let key = Object.keys(response.data);
          if (key.length > 1) {
            const _positionKey = getObjectPositionKey(response.data.results[0]);
            const _carouselList = sortByFieldName(response.data.results, _positionKey);
            setcarouseData(_carouselList);
          } else {
            const _positionKey = getObjectPositionKey(response.data[key][0]);
            const _carouselList = sortByFieldName(response.data[key], _positionKey);
            setcarouseData(_carouselList);
          }
        }
      } catch (e) {
        console.log("unable to access ulr because of server is down");
      }
    };

    getCarouselData();
  }, [imgGallery, getImageListURL]);

  const handleCarouselEdit = (event, carousel) => {
    event.preventDefault();
    window.scrollTo(0, 0);
    setEditCarousel(carousel);
  };

  /**
   *
   * Delete image
   */
  const thumbDelete = (id, name) => {
    const deleteImageByID = async () => {
      const response = await axiosFileUploadServiceApi.delete(`${deleteImageURL}${id}/`);
      if (response.status === 204) {
        const list = imgGallery.filter((item) => item.id !== id);
        setImgGallery(list);
        setEditCarousel({});
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
    const _positionKey = getObjectPositionKey(carousel[0]);

    const _items = reorder(carousel, source.index, destination.index);
    const _parentObjects = updateArrIndex(_items, _positionKey);
    const response = await updateObjectsIndex(_parentObjects);
    if (response?.length > 0) {
      setcarouseData(response);
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

  console.log(Object.keys(editCarousel).length, "editCarousel")
  return (
    <div>
      <EditAdminPopupHeader closeHandler={closeHandler} title={popupTitle} />

      {/* <hr className="m-0" /> */}

      <div className="container mt-2">
        <NoteComponent note="Shuffle order" />

        <div className="row mt-2 d-flex flex-row-reverse">
          {carousel?.length > 0 ? (
            <div className="heightCtrl imglist p-0">
              <div className="container p-0">
                <DragDropContext onDragEnd={onDragEnd}>
                  {carousel?.map((item, index) => (
                    <Droppable key={index} droppableId={item.id}>
                      {(provided, snapshot) => (
                        <div ref={provided.innerRef} style={getListStyle(snapshot.isDraggingOver)} {...provided.droppableProps}>
                          <AdminCarouselItem
                            item={item}
                            index={index}
                            key={index}
                            componentType={componentType}
                            handleCarouselEdit={handleCarouselEdit}
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
          

        <small className={`text-center py-1 fw-medium text-white ${Object.keys(editCarousel).length > 0 ? "bg-warning " : "bg-secondary"}`}>
          {Object.keys(editCarousel).length > 0 ? "EDIT" : "ADD NEW"}
        </small>
        {/* <hr className="border-1 border-white" /> */}
          <div
            className={`mb-5 mb-md-0 border border-2 p-2 ${
              Object.keys(editCarousel).length > 0  ? " border-warning" : "border-secondary"
            }`}
          >
            <FileUpload
              title={imageLabel}
              project={project}
              updated_by={userName}
              category={componentType}
              gallerysetState={setImgGallery}
              maxFiles={1}
              galleryState={imgGallery}
              validTypes={validTypes}
              descriptionTitle={descriptionTitle}
              titleTitle={titleTitle}
              alternitivetextTitle="Seo title"
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
              scrollEnable={carousel.lengh > 0 ? true : false}
              isclosePopup={false}
              sideDeck={sideDeck}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const AdminCarouselItem = ({ item, index, componentType, handleCarouselEdit, thumbDelete }) => {
  const { isAdmin, hasPermission } = useAdminLoginStatus();

  return (
    <Draggable isDragDisabled={!isAdmin ? true : false} key={item.id} draggableId={item.id} index={index} id={item.id}>
      {(provided) => (
        <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
          <div className="row mb-1 p-1 slideItem" key={index}>
            <div className="col-2 col-md-2">
              {/* <i className="fa fa-picture-o fs-2 d-lg-none" aria-hidden="true"></i> */}

              <img src={getImageURL(item)} alt={item.alternitivetext} className="w-100  d-lg-block" />
            </div>
            <div className="col col-md-8 text-left ps-0">
              <h6 className="fw-medium lc1 mb-1 lineClamp">{getObjectTitle(componentType, item)}</h6>
              <small className="description text-muted d-none d-md-block">
                {/* {getObjectDescription(componentType, item)} */}
                {/* {item.carouseDescription && item.carouseDescription}
                {item.image_description && item.image_description} */}
                <RichTextView data={getObjectDescription(componentType, item)} className={""} showMorelink={false} />
                {/* <RichTextView
                    data={item.carouseDescription && item.carouseDescription}
                    className={""}
                    showMorelink={false}
                  />
                  <RichTextView
                    data={item.image_description && item.image_description}
                    className={""}
                    showMorelink={false}
                  /> */}
              </small>
            </div>
            <div className="col-4 col-md-2 d-flex justify-content-around align-items-center flex-md-row gap-1">
              <Link onClick={(event) => handleCarouselEdit(event, item)}>
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

export default AdminBanner;
