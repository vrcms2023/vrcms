import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import { getCookie } from "../../../util/cookieUtil";
import { axiosServiceApi } from "../../../util/axiosUtil";
import EditAdminPopupHeader from "../EditAdminPopupHeader";
import { InputField } from "./FormFields";
import Button from "../../../Common/Button";
import { useSelector } from "react-redux";

import DeleteDialog from "../../../Common/DeleteDialog";
import { confirmAlert } from "react-confirm-alert";
import { fieldValidation } from "../../../util/validationUtil";
import DraggableAddress from "../AddressList/DraggableAddress";
import DraggableAddressList from "../AddressList/DraggableAddressList";
import {
  getObjectPositionKey,
  reorder,
  sortByFieldName,
  updateArrIndex,
} from "../../../util/commonUtil";
import NoteComponent from "../../../Common/NoteComponent";
import Title from "../../../Common/Title";

const AddressForm = ({ editHandler, componentType, address, popupTitle }) => {
  const { addressList } = useSelector((state) => state.addressList);
  const [userName, setUserName] = useState("");
  const {
    register,
    reset,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({});
  const [listofAddress, setListofAddress] = useState(address);

  const closeHandler = () => {
    editHandler(componentType, false);
    document.body.style.overflow = "";
  };

  useEffect(() => {
    setUserName(getCookie("userName"));
  }, []);

  const handleCarouselEdit = (event, address) => {
    event.preventDefault();

    const fieldKeys = Object.keys(address);
    fieldKeys.forEach((item) => {
      setValue(item, address[item]);
    });
  };

  /**
   *
   * Delete image
   */
  const thumbDelete = (id, name) => {
    const deleteImageByID = async () => {
      const response = await axiosServiceApi.delete(
        `address/updateAddress/${id}/`
      );
      if (response.status === 204) {
        const list = listofAddress.filter((item) => item.id !== id);
        setListofAddress(list);
      }
    };

    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <DeleteDialog
            onClose={onClose}
            callback={deleteImageByID}
            // message={`deleting the ${name} image?`}
            message={<>Confirm deletion of  <span>{name}</span> image?</>}
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
    try {
      if (data.id) {
        data["updated_by"] = userName;
        response = await axiosServiceApi.put(
          `/address/updateAddress/${data.id}/`,
          data
        );
      } else {
        data["created_by"] = userName;
        data["address_position"] = listofAddress.length;
        response = await axiosServiceApi.post(`/address/createAddress/`, data);
        console.log("New Address", response);
      }

      if (response.status === 200 || response.status === 201) {
        reset();
        toast.success(`Address Values are updated successfully `);
        updateAddressList(response.data.addressList);
      }
    } catch (error) {
      console.log("unable to save the footer form");
    }
  };

  const updateAddressList = (data) => {
    let _arr = JSON.parse(JSON.stringify(listofAddress));
    let foundIndex = _arr.findIndex((x) => x.id === data.id);
    if (foundIndex > -1) {
      _arr[foundIndex] = data;
    } else {
      _arr.push(data);
    }
    const _list = sortByFieldName(_arr, "address_position");
    setListofAddress(_list);
  };

  /**
   * Drag and drop logic
   */
  const dragEnded = async (param) => {
    const { source, destination } = param;
    if (!destination) return true;
    let _arr = JSON.parse(JSON.stringify(listofAddress));
    const _positionKey = getObjectPositionKey(_arr[0]);
    const _items = reorder(_arr, source.index, destination.index);
    const _parentObjects = updateArrIndex(_items, _positionKey);
    const response = await updateObjectsIndex(_parentObjects);
    if (response?.length > 0) {
      setListofAddress(response);
    }
  };

  useEffect(() => {
    if (addressList?.length > 0) {
      setListofAddress(addressList);
    }
  }, [addressList]);

  const updateObjectsIndex = async (data) => {
    try {
      let response = await axiosServiceApi.put(`/address/updateindex/`, data);
      if (response?.data?.addressList) {
        return response.data.addressList;
      }
    } catch (error) {
      console.log("unable to save the footer form");
    }
  };

  return (
    <div className="">
      <EditAdminPopupHeader closeHandler={closeHandler} title={popupTitle} />
      {/* <hr className="m-0 text-dark" /> */}
      <form className="" onSubmit={handleSubmit(onSubmit)}>
        <div className="container my-3">
          <div className="row">
            <div className="col-md-12 mb-md-0  p-0">
              <NoteComponent note="Use drag to shuffle" />
              <div className={listofAddress.length > 0 && ""}>
                <DragDropContext onDragEnd={dragEnded}>
                  <Droppable droppableId="address-wrapper">
                    {(provided, snapshot) => (
                      <DraggableAddressList
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                      >
                        {listofAddress.map((_address, index) => {
                          return (
                            <Draggable
                              draggableId={`${_address.id}`}
                              index={index}
                              key={_address.id}
                            >
                              {(_provided, _snapshot) => (
                                <DraggableAddress
                                  ref={_provided.innerRef}
                                  dragHandleProps={_provided.dragHandleProps}
                                  {..._provided.draggableProps}
                                  snapshot={_snapshot}
                                  item={_address}
                                  thumbDelete={thumbDelete}
                                  handleCarouselEdit={handleCarouselEdit}
                                />
                              )}
                            </Draggable>
                          );
                        })}
                        {provided.placeholder}
                      </DraggableAddressList>
                    )}
                  </Droppable>
                </DragDropContext>
              </div>
            </div>

            <div className="col-md-12 border-bottom border-secondary mt-3">
              <Title title="Address Form" cssClass="fs-5" />
              {/* <hr className="mb-3 text-dark" /> */}
            </div>
            <div className="col-md-12 mb-md-0 mt-3">
              <div className="text-dark">
                <InputField
                  label="Company Name"
                  fieldName="company_name"
                  register={register}
                  validationObject={fieldValidation.company_name}
                  error={errors?.company_name?.message}
                  isRequired={true}
                />
                <InputField
                  label="Country"
                  fieldName="location_title"
                  register={register}
                  validationObject={fieldValidation.location_title}
                  error={errors?.location_title?.message}
                  isRequired={true}
                />
                <InputField
                  label="State"
                  fieldName="state"
                  register={register}
                />
                <InputField
                  label="City"
                  fieldName="city"
                  register={register}
                  validationObject={fieldValidation.city}
                  error={errors?.city?.message}
                  isRequired={true}
                />
                <InputField
                  label="Location"
                  fieldName="location"
                  register={register}
                />
                <InputField
                  label="Street"
                  fieldName="street"
                  register={register}
                />
                <InputField
                  label="Door Number"
                  fieldName="address_dr_no"
                  register={register}
                />

                {/* <InputField
                label="Postcode"
                fieldName="postcode"
                register={register}
                validationObject={fieldValidation.postcode}
                error={errors?.postcode?.message}
              /> */}
                <InputField
                  label="Email"
                  fieldName="emailid"
                  register={register}
                  validationObject={fieldValidation.emailid}
                  error={errors?.emailid?.message}
                  isRequired={true}
                />
                <InputField
                  label="Email 2"
                  fieldName="emailid_2"
                  register={register}
                  validationObject={fieldValidation.emailid_2}
                  error={errors?.emailid_2?.message}
                  isRequired={false}
                />
                <InputField
                  label="Email 3"
                  fieldName="emailid_3"
                  register={register}
                  validationObject={fieldValidation.emailid_2}
                  error={errors?.emailid_2?.message}
                />
                <InputField
                  label="Phone"
                  fieldName="phonen_number"
                  register={register}
                  validationObject={fieldValidation.phonen_number}
                  error={errors?.phonen_number?.message}
                  isRequired={true}
                />
                <InputField
                  label="Phone Number 2"
                  fieldName="phonen_number_2"
                  register={register}
                  validationObject={fieldValidation.phonen_number_2}
                  error={errors?.phonen_number_2?.message}
                />
                <InputField
                  label="WhatsApp No."
                  fieldName="phonen_number_3"
                  register={register}
                  validationObject={fieldValidation.phonen_number_2}
                  error={errors?.phonen_number_2?.message}
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="d-flex justify-content-center flex-wrap flex-column flex-sm-row align-items-center gap-3 my-3">
              <button type="reset" className="btn btn-secondary">
                Clear
              </button>
              <button type="submit" className="btn btn-primary">
                Save
              </button>
              {/* <Button
                type="submit"
                cssClass="btn btn-more"
                label={"Close"}
                handlerChange={closeHandler}
              /> */}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddressForm;
