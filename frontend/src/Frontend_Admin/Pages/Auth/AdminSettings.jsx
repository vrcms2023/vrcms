import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Title from "../../../Common/Title";
import { axiosServiceApi } from "../../../util/axiosUtil";
import { toast } from "react-toastify";

import { getDummyImage, getImagePath } from "../../../util/commonUtil";
import { sortCreatedDateByDesc } from "../../../util/dataFormatUtil";
import Button from "../../../Common/Button";

import ShowHideToggle from "../../../Common/ShowHideToggle";
import {
  createShowHideComponent,
  getShowHideComponentsListByPage,
  updateShowHideComponent,
} from "../../../redux/showHideComponent/showHideActions";
import DeleteDialog from "../../../Common/DeleteDialog";
import { confirmAlert } from "react-confirm-alert";
import SingleImageUlploadWithForm from "../../Components/forms/SingleImageUlploadWithForm";
import {
  getAdvertisementFormDynamicFields,
  imageDimensionsJson,
} from "../../../util/dynamicFormFields";
import RadioButtonGroup from "../../Components/RadioButtonGroup";

import "./adminSettingStyles.css";

const AdminSettings = () => {
  const pageType = "settings";
  const editComponentObj = {
    advertisement: false,
  };
  const [advertisementList, setAdvertisementList] = useState([]);
  const [showHideCompList, setShowHideCompList] = useState([]);
  const [editAdvertisement, setEditAdvertisement] = useState({});
  const [componentEdit, SetComponentEdit] = useState(editComponentObj);
  const [show, setShow] = useState(false);
  const [compTtile, setComptitle] = useState("Add Product");

  const [advSize, setadvSize] = useState("");
  const [selectedOption, setSelectedOption] = useState("");

  const dispatch = useDispatch();

  const radioOptions = [
    { label: "small", value: "small" },
    { label: "medium", value: "medium" },
    { label: "large", value: "large" },
  ];

  const { error, success, showHideCompPageList } = useSelector(
    (state) => state.showHide
  );

  useEffect(() => {
    if (showHideCompPageList && showHideCompPageList[pageType]) {
      setShowHideCompList(showHideCompPageList[[pageType]]);
    }
  }, [showHideCompPageList]);

  useEffect(() => {
    dispatch(getShowHideComponentsListByPage(pageType));
  }, [pageType]);

  const showHideHandler = async (name) => {
    const selectedItem = showHideCompList[name];
    if (selectedItem) {
      const id = selectedItem?.id;
      dispatch(updateShowHideComponent({ id, showHideCompPageList }));
    } else {
      const newData = {
        componentName: name.toLowerCase(),
        pageType: pageType,
      };
      dispatch(createShowHideComponent({ newData, showHideCompPageList }));
    }
  };

  const getAdvertisementList = async () => {
    try {
      const response = await axiosServiceApi.get(
        `/advertisement/createAdvertisement/`
      );
      if (response?.status === 200) {
        const sortbyCreateData = sortCreatedDateByDesc(
          response?.data?.advertisementList
        );
        setAdvertisementList(sortbyCreateData);
      }
    } catch (error) {
      toast.error("Unable to load contactus details");
    }
  };
  useEffect(() => {
    getAdvertisementList();
  }, []);

  const getAdvertisementSize = async () => {
    try {
      const response = await axiosServiceApi.get(
        `/advertisement/createAdvSize/`
      );
      if (response?.status === 200 && response?.data.length > 0) {
        setadvSize(response.data[0]);
        setSelectedOption(response.data[0].size);
      }
    } catch (error) {
      toast.error("Unable to load contactus details");
    }
  };

  const updateAdvertisementSize = async (value) => {
    try {
      let response = "";
      if (advSize?.id) {
        response = await axiosServiceApi.patch(
          `/advertisement/updateAdvSize/${advSize?.id}/`,
          {
            size: value,
          }
        );
      } else {
        response = await axiosServiceApi.post(`/advertisement/createAdvSize/`, {
          size: value,
        });
      }

      if (response?.status === 200 || response?.status === 201) {
        setadvSize(response?.data);
        setSelectedOption(response.data.size);
      }
    } catch (error) {
      toast.error("Unable to load contactus details");
    }
  };
  const handleOptionChange = (value) => {
    if (value !== advSize?.size) {
      updateAdvertisementSize(value);
    }
  };

  useEffect(() => {
    getAdvertisementSize();
  }, []);

  const advertisementShowHideHandler = async (advertisement) => {
    advertisement.showAndHide = !advertisement.showAndHide;
    advertisement.path = "";
    try {
      const response = await axiosServiceApi.patch(
        `/advertisement/updateAdvertisement/${advertisement.id}/`,
        {
          ...advertisement,
        }
      );

      if (response.status === 200) {
        toast.success(`Advertisement update successfully`);
        getAdvertisementList();
      }
    } catch (error) {
      console.log("unable to save the career form");
    }
  };

  const addNewAdvertisement = (name, value) => {
    SetComponentEdit((prevFormData) => ({ ...prevFormData, [name]: value }));
    setComptitle("Add Advertisement");
    setShow(!show);
    document.body.style.overflow = "hidden";
  };

  const editHandler = (name, value, item) => {
    setEditAdvertisement(item);
    SetComponentEdit((prevFormData) => ({ ...prevFormData, [name]: value }));
    setComptitle("Edit Advertisement");
    setShow(!show);
    document.body.style.overflow = "hidden";
  };

  const handleAdvertisementDelete = (advertisement) => {
    const title = advertisement.title;
    const deleteMenuItemByID = async () => {
      const response = await axiosServiceApi.delete(
        `/advertisement/updateAdvertisement/${advertisement.id}/`
      );
      if (response.status === 204) {
        toast.success(`${title} Advertisement is delete successfully `);
        getAdvertisementList();
      }
    };

    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <DeleteDialog
            onClose={onClose}
            callback={deleteMenuItemByID}
            message={`you want to delete the ${title} Advertisement`}
          />
        );
      },
    });
  };

  useEffect(() => {
    if (!componentEdit.advertisement) {
      getAdvertisementList();
    }
  }, [componentEdit.advertisement]);

  return (
    <div className="container-fluid pt-5 contactsList">
      <div className="row px-2 px-lg-5">
        <div className="col-sm-12 col-md-7">
          <Title title={"Advertisements"} cssClass="fs-1 pageTitle" />
        </div>

        <div className="col-12 col-sm-6 col-md-3 d-flex align-items-center text-center bg-light my-3 my-md-0 py-3 py-md-0 advSizes">
          <RadioButtonGroup
            options={radioOptions}
            onChange={handleOptionChange}
            defaultOption={selectedOption}
          />
        </div>
        <div className="col-6 col-sm-3 col-md-1 d-flex align-items-center justify-content-center publishAdvertisement">
          <ShowHideToggle
            showhideStatus={showHideCompList?.advertisement?.visibility}
            title={""}
            componentName={"advertisement"}
            showHideHandler={showHideHandler}
          />
        </div>
        <div className="col-6 col-sm-3 col-md-1  justify-content-center addAdvertisement">
          <Button
            type=""
            cssClass="btn btn-outline"
            label="Add"
            handlerChange={() => addNewAdvertisement("advertisement", true)}
          />
        </div>
      </div>

      <div className="row px-3 px-lg-5 py-4 table-responsive">
        {advertisementList?.length > 0 ? (
          <table className="table contacts">
            <thead>
              <tr>
                <th className="align-middle">Title</th>
                <th className="align-middle">Description</th>
                <th className="align-middle" style={{ width: "100px" }}>
                  Image
                </th>
                <th className="align-middle" style={{ width: "100px" }}>
                  Show or Hide
                </th>
                <th
                  className="align-middle text-end"
                  style={{ width: "100px" }}
                >
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {advertisementList?.map((advertisement) => (
                <tr key={advertisement.id}>
                  <td className="align-middle">{advertisement.title}</td>
                  <td className="align-middle">
                    {advertisement.advertisement_description}
                  </td>
                  <td className="align-middle text-center">
                    <img
                      src={
                        advertisement.path
                          ? getImagePath(advertisement.path)
                          : getDummyImage()
                      }
                      alt={advertisement.alternitivetext}
                      className="thumb75 d-lg-block rounded-1"
                      style={{
                        width: "60px",
                        height: "60px",
                        objectFit: "cover",
                      }}
                    />
                  </td>
                  <td className="align-middle">
                    <ShowHideToggle
                      showhideStatus={advertisement.showAndHide}
                      title={""}
                      componentName={"Default"}
                      showHideHandler={() => {
                        advertisementShowHideHandler(advertisement);
                      }}
                    />
                    {advertisement.showAndHide}
                  </td>
                  <td className="align-middle text-end">
                    <Link
                      to=""
                      onClick={() =>
                        editHandler("advertisement", true, advertisement)
                      }
                      className="p-2"
                    >
                      <i
                        className="fa fa-pencil text-warning cursor-pointer fs-5"
                        aria-hidden="true"
                      ></i>
                    </Link>

                    <Link
                      to=""
                      className=" ms-4"
                      onClick={() => handleAdvertisementDelete(advertisement)}
                    >
                      <i
                        className="fa fa-trash-o fs-4 text-danger"
                        aria-hidden="true"
                        title="Delete"
                      ></i>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          "No Result found"
        )}
        <>
          {componentEdit.advertisement && (
            <div className={`adminEditTestmonial selected `}>
              <SingleImageUlploadWithForm
                editHandler={editHandler}
                componentType="advertisement"
                popupTitle="advertisement"
                componentTitle={compTtile}
                selectedItem={editAdvertisement}
                setSelectedItemState={setEditAdvertisement}
                imageGetURL={`/advertisement/createAdvertisement/${editAdvertisement.id}/`}
                imagePostURL="/advertisement/createAdvertisement/"
                imageUpdateURL="/advertisement/updateAdvertisement/"
                imageDeleteURL="/advertisement/updateAdvertisement/"
                imageLabel="Advertisement Image"
                showDescription={false}
                showExtraFormFields={getAdvertisementFormDynamicFields(
                  editAdvertisement
                )}
                dimensions={imageDimensionsJson("advertisement")}
              />
            </div>
          )}
        </>
      </div>
    </div>
  );
};

export default AdminSettings;
