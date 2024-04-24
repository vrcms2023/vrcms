import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { getCookie } from "../../../util/cookieUtil";
import { axiosServiceApi } from "../../../util/axiosUtil";
import EditAdminPopupHeader from "../EditAdminPopupHeader";
import { InputField } from "./FormFields";
import Button from "../../../Common/Button";
import { useDispatch, useSelector } from "react-redux";

import DeleteDialog from "../../../Common/DeleteDialog";
import { confirmAlert } from "react-confirm-alert";
import _ from "lodash";
import { fieldValidation } from "../../../util/validationUtil";
import DraggableAddress from "../AddressList/DraggableAddress";
import DraggableAddressList from "../AddressList/DraggableAddressList";
import { sortByFieldName } from "../../../util/commonUtil";
import { getAddressList } from "../../../features/address/addressActions";

const AddressForm = ({ editHandler, componentType, address }) => {
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
  const [editAddress, setEditAddress] = useState(address[0]);
  const dispatch = useDispatch();

  const closeHandler = () => {
    editHandler(componentType, false);
    document.body.style.overflow = "";
  };

  useEffect(() => {
    setUserName(getCookie("userName"));
  }, []);

  const handleCarouselEdit = (event, address) => {
    event.preventDefault();
    setEditAddress(address);
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
            message={`deleting the ${name} image?`}
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

      if (response.status == 200 || response.status == 201) {
        reset();
        toast.success(`Address Values are updated successfully `);
        updateAddressList(response.data.addressList);
      }
    } catch (error) {
      console.log("unable to save the footer form");
    }
  };

  const updateAddressList = (data) => {
    const item = listofAddress.filter((item) => item.id === data.id);
    let list = [...listofAddress];
    if (item.length > 0) {
      list.splice(item[0].address_position, 1);
      list.splice(list.length, 0, data);
    } else {
      list.push(data);
    }
    const _list = sortByFieldName(list, "address_position");
    setListofAddress(_list);
  };

  /**
   * Drag and drop logic
   */
  const dragEnded = async (param) => {
    const { source, destination } = param;
    if (!destination) return true;
    let _arr = [...listofAddress];

    const sourceobj = await updateObjectIndex(
      _arr[source.index],
      destination.index
    );

    const destinationObj = await updateObjectIndex(
      _arr[destination.index],
      source.index
    );
    dispatch(getAddressList());
  };

  useEffect(() => {
    if (addressList?.length > 0) {
      setListofAddress(addressList);
    }
  }, [addressList]);

  const updateObjectIndex = async (item, index) => {
    let data = {};
    data["updated_by"] = userName;
    data["index"] = index;
    try {
      let response = await axiosServiceApi.put(
        `/address/updateindex/${item.id}/`,
        data
      );
      if (response?.data?.addressList) {
        return response.data.addressList;
      }
    } catch (error) {
      console.log("unable to save the footer form");
    }
  };

  return (
    <div className="">
      <EditAdminPopupHeader closeHandler={closeHandler} title={componentType} />
      <hr className="m-0 text-dark" />
      <form className="" onSubmit={handleSubmit(onSubmit)}>
        <div className="container my-3">
          <div className="row">
          <div className="col-md-12 mb-md-0  ">
            <p className="text-dark fw-bold fs-6">Use drag option to shuffle the addresses</p>
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
            
            <div className="col-md-12">
              <p className="text-dark fw-bold mt-3">Address Form</p>
            <hr className="mb-3 text-dark" /></div>
            <div className="col-md-12 mb-md-0">
              <InputField
                label="Country"
                fieldName="location_title"
                register={register}
                validationObject={fieldValidation.location_title}
                error={errors?.location_title?.message}
              />
              <InputField label="State" fieldName="state" register={register} />
              <InputField
                label="City"
                fieldName="city"
                register={register}
                validationObject={fieldValidation.city}
                error={errors?.city?.message}
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
              />
              <InputField
                label="Phone"
                fieldName="phonen_number"
                register={register}
                validationObject={fieldValidation.phonen_number}
                error={errors?.phonen_number?.message}
              />
              <InputField
                label="WhatsApp No."
                fieldName="phonen_number_2"
                register={register}
                validationObject={fieldValidation.phonen_number_2}
                error={errors?.phonen_number_2?.message}
              />
            </div>

            
          </div>
          <div className="row">
            <div className="d-flex justify-content-center align-items-center gap-1 gap-md-3 mb-4">
              <button type="reset" className="btn btn-secondary">
                Clear
              </button>
              <button type="submit" className="btn btn-primary">
                Save
              </button>
              <Button
                type="submit"
                cssClass="btn btn-outline"
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

export default AddressForm;
