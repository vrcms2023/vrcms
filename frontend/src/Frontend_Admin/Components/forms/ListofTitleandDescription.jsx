import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import { getCookie } from "../../../util/cookieUtil";
import { axiosServiceApi } from "../../../util/axiosUtil";
import EditAdminPopupHeader from "../EditAdminPopupHeader";
import { InputField, InputFields, RichTextInputEditor_V2 } from "./FormFields";
import Button from "../../../Common/Button";
import { useDispatch, useSelector } from "react-redux";

import DeleteDialog from "../../../Common/DeleteDialog";
import { confirmAlert } from "react-confirm-alert";
import { fieldValidation } from "../../../util/validationUtil";
import DraggableHomeIntro from "../HomeIntroList/DraggableHomeIntro";
import DraggableHomeIntroList from "../HomeIntroList/DraggableHomeIntroList";
import {
  getObjectPositionKey,
  reorder,
  sortByFieldName,
  updateArrIndex,
} from "../../../util/commonUtil";
import NoteComponent from "../../../Common/NoteComponent";
import { getHomeIntroList } from "../../../redux/homeintroList/homeIntroListActions";

const ListofTitleandDescription = ({
  editHandler,
  componentType,
  homeintros,
  popupTitle,
  pageType,
}) => {
  const { homeIntroList } = useSelector((state) => state.homeIntroList);
  const [userName, setUserName] = useState("");

  const {
    control,
    register,
    reset,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({});
  const [listofHomeIntros, setListofHomeIntros] = useState(homeintros);

  const dispatch = useDispatch();
  const closeHandler = () => {
    editHandler(componentType, false);
    document.body.style.overflow = "";
  };

  useEffect(() => {
    setUserName(getCookie("userName"));
  }, []);

  const handleCarouselEdit = (event, selectedItem) => {
    event.preventDefault();

    const fieldKeys = Object.keys(selectedItem);

    fieldKeys.forEach((item) => {
      setValue(item, selectedItem[item]);
    });
  };

  /**
   *
   * Delete image
   */
  const thumbDelete = (id, name) => {
    const deleteImageByID = async () => {
      const response = await axiosServiceApi.delete(
        `carousel/updateHomelistIntro/${id}/`
      );
      if (response.status === 204) {
        const list = listofHomeIntros.filter((item) => item.id !== id);
        setListofHomeIntros(list);
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

  /**
   * Save Footer values
   */
  const onSubmit = async (data) => {
    let response = "";
    data["pageType"] = pageType;

    try {
      if (data.id) {
        data["updated_by"] = userName;
        response = await axiosServiceApi.put(
          `/carousel/updateHomelistIntro/${data.id}/`,
          data
        );
      } else {
        data["created_by"] = userName;
        data["intro_position"] = listofHomeIntros.length;
        response = await axiosServiceApi.post(
          `/carousel/createHomeIntro/`,
          data
        );
      }

      if (response.status === 200 || response.status === 201) {
        reset();
        toast.success(`Intro Values are updated successfully `);
        updateAddressList(response.data.intro);
        dispatch(getHomeIntroList());
      }
    } catch (error) {
      console.log("unable to save the Intro form");
    }
  };

  const updateAddressList = (data) => {
    let _arr = JSON.parse(JSON.stringify(listofHomeIntros));
    let foundIndex = _arr.findIndex((x) => x.id === data.id);
    if (foundIndex > -1) {
      _arr[foundIndex] = data;
    } else {
      _arr.push(data);
    }
    const _list = sortByFieldName(_arr, "intro_position");
    setListofHomeIntros(_list);
  };

  /**
   * Drag and drop logic
   */
  const dragEnded = async (param) => {
    const { source, destination } = param;
    if (!destination) return true;
    let _arr = JSON.parse(JSON.stringify(listofHomeIntros));
    const _positionKey = getObjectPositionKey(_arr[0]);
    const _items = reorder(_arr, source.index, destination.index);
    const _parentObjects = updateArrIndex(_items, _positionKey);
    const response = await updateObjectsIndex(_parentObjects);
    if (response?.length > 0) {
      setListofHomeIntros(response);
    }
  };

  useEffect(() => {
    if (homeIntroList?.length > 0) {
      setListofHomeIntros(homeIntroList);
    }
  }, [homeIntroList]);

  const updateObjectsIndex = async (data) => {
    try {
      let response = await axiosServiceApi.put(
        `/carousel/updateIntroindex/`,
        data
      );
      if (response?.data?.homeIntroList) {
        return response.data.homeIntroList;
      }
    } catch (error) {
      console.log("unable to save the Intro form");
    }
  };

  return (
    <div className="">
      <EditAdminPopupHeader closeHandler={closeHandler} title={popupTitle} />
      <hr className="m-0 text-dark" />
      <form className="" onSubmit={handleSubmit(onSubmit)}>
        <div className="container my-3">
          <div className="row">
            <div className="col-md-12 mb-md-0  ">
              <NoteComponent note="Use drag to shuffle" />
              <div className={listofHomeIntros.length > 0 && "heightCtrl"}>
                <DragDropContext onDragEnd={dragEnded}>
                  <Droppable droppableId="address-wrapper">
                    {(provided, snapshot) => (
                      <DraggableHomeIntroList
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                      >
                        {listofHomeIntros.map((_intro, index) => {
                          return (
                            <Draggable
                              draggableId={`${_intro.id}`}
                              index={index}
                              key={_intro.id}
                            >
                              {(_provided, _snapshot) => (
                                <DraggableHomeIntro
                                  ref={_provided.innerRef}
                                  dragHandleProps={_provided.dragHandleProps}
                                  {..._provided.draggableProps}
                                  snapshot={_snapshot}
                                  item={_intro}
                                  thumbDelete={thumbDelete}
                                  handleCarouselEdit={handleCarouselEdit}
                                />
                              )}
                            </Draggable>
                          );
                        })}
                        {provided.placeholder}
                      </DraggableHomeIntroList>
                    )}
                  </Droppable>
                </DragDropContext>
              </div>
            </div>

            <div className="col-md-12">
              <p className="text-dark fw-bold mt-3">Corporate Training Form</p>
              <hr className="mb-3 text-dark" />
            </div>
            <div className="col-md-12 mb-md-0">
              <div className="">
                <InputField
                  label="Title"
                  fieldName="intro_title"
                  register={register}
                  validationObject={fieldValidation.intro_title}
                  error={errors?.intro_title?.message}
                  isRequired={true}
                />
                <RichTextInputEditor_V2
                  label={"Description"}
                  Controller={Controller}
                  name="intro_desc"
                  control={control}
                />

                <InputField
                  label="More links"
                  fieldName="intro_morelink"
                  register={register}
                />

                <InputFields
                  type="hidden"
                  label="intro_position"
                  fieldName="intro_position"
                  register={register}
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="d-flex justify-content-center flex-wrap flex-column flex-sm-row align-items-center gap-1 gap-md-3 my-3">
              <button type="reset" className="btn btn-secondary">
                Clear
              </button>
              <button type="submit" className="btn btn-primary">
                Save
              </button>
              <Button
                type="submit"
                cssClass="btn btn-more"
                label={"Close"}
                handlerChange={closeHandler}
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ListofTitleandDescription;
