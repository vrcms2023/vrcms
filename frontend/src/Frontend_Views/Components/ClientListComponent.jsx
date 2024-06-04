import React from "react";
import { ClientStyled } from "../../Common/StyledComponents/Styled-Clients";
import { useSelector } from "react-redux";
import SkeletonImage from "../../Common/Skeltons/SkeletonImage";
import EditIcon from "../../Common/AdminEditIcon";
import { Link } from "react-router-dom";
import Title from "../../Common/Title";
import {
  getImagePath,
  getListStyle,
  reorder,
  updateArrIndex,
} from "../../util/commonUtil";
import useAdminLoginStatus from "../../Common/customhook/useAdminLoginStatus";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import { axiosServiceApi } from "../../util/axiosUtil";

export const ClientListComponent = ({
  clientsList,
  setClientsList,
  deleteAboutSection,
  editHandler,
}) => {
  const { isLoading } = useSelector((state) => state.loader);

  const onDragEnd = async (result) => {
    const { source, destination } = result;
    if (!destination) return true;

    const _items = reorder(clientsList, source.index, destination.index);
    const _parentObjects = updateArrIndex(_items, "client_position");
    const response = await updateObjectsIndex(_parentObjects);
    if (response.length > 0) {
      setClientsList(response);
    }
  };

  const updateObjectsIndex = async (data) => {
    try {
      let response = await axiosServiceApi.put(`/client/updateindex/`, data);
      if (response?.data?.clientLogo) {
        return response.data.clientLogo;
      }
    } catch (error) {
      console.log("unable to save clinet position");
    }
  };

  return (
    <div>
      <ClientStyled>
        <div className="clients my-5">
          {isLoading && (
            <div className="">
              {[1, 2, 3, 4].map((item, index) => (
                <div className="col-12" key={index}>
                  <SkeletonImage />
                </div>
              ))}
            </div>
          )}
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId={"clientList"} id="clientList">
              {(provided, snapshot) => (
                <div
                  className="row"
                  ref={provided.innerRef}
                  // style={getListStyle(snapshot.isDraggingOver)}
                  {...provided.droppableProps}
                >
                  {clientsList.length > 0 ? (
                    clientsList.map((item, index) => (
                      <Client
                        item={item}
                        key={index}
                        index={index}
                        editHandler={editHandler}
                        deleteAboutSection={deleteAboutSection}
                      />
                    ))
                  ) : (
                    <div className="text-center text-muted py-5">
                      {!isLoading && <p>Please add page contents...</p>}
                    </div>
                  )}

                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>
      </ClientStyled>
    </div>
  );
};

const Client = ({ item, index, editHandler, deleteAboutSection }) => {
  const { isAdmin, hasPermission } = useAdminLoginStatus();
  return (
    <Draggable
      isDragDisabled={isAdmin ? false : true}
      key={item.id}
      draggableId={item.id}
      index={index}
      id={item.id}
    >
      {(provided) => (
        <div
          className={`${
            isAdmin ? "col-12 clientAdmin" : "col-md-3 clientFrontend "
          } image`}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <div
            key={item.id}
            className={`mb-3 ${
              isAdmin
                ? "border border-warning mb-3 position-relative"
                : "clientFrontend overlayContainer p-3 d-flex justify-content-center aling-items-center flex-column"
            } ${index % 2 === 0 ? "normalCSS" : "flipCSS"}`}
          >
            {isAdmin && hasPermission && (
              <>
                <EditIcon
                  editHandler={() => editHandler("editSection", true, item)}
                />
                <Link
                  className="deleteSection"
                  onClick={() => deleteAboutSection(item)}
                >
                  <i
                    className="fa fa-trash-o text-danger fs-4"
                    aria-hidden="true"
                  ></i>
                </Link>
              </>
            )}

            <div className={`${isAdmin ? "d-md-flex p-3" : ""}`}>
              <div className="text-center clientAvatar">
                <img
                  src={getImagePath(item.path)}
                  alt=""
                  className="img-fluid shadow img-thumbnail"
                />
              </div>
              <div className="mt-3 d-flex justify-content-center align-items-center justify-content-md-center align-items-md-center flex-column  clientDetails ms-3">
                {item.client_title && (
                  <Title
                    title={item.client_title}
                    cssClass="fs-5 mb-2 text-center"
                  />
                )}

                <div
                  className={`details ${
                    isAdmin ? "" : "overlay fa fa-map-marker"
                  }`}
                  dangerouslySetInnerHTML={{
                    __html: item.client_description,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
};
