import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Title from "../../../Common/Title";
import { axiosServiceApi } from "../../../util/axiosUtil";
import { toast } from "react-toastify";
import Search from "../../../Common/Search";
import CustomPagination from "../../../Common/CustomPagination";
import {
  getDummyImage,
  getImagePath,
  paginationDataFormat,
} from "../../../util/commonUtil";
import { sortCreatedDateByDesc } from "../../../util/dataFormatUtil";
import Button from "../../../Common/Button";
import Ancher from "../../../Common/Ancher";
import { getBaseURL } from "../../../util/ulrUtil";

import Model from "../../../Common/Model";
import ModelBg from "../../../Common/ModelBg";
import ContactsendRequstModel from "../../Components/contactsendRequstModel";
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
  getProductFormDynamicFields,
  imageDimensionsJson,
} from "../../../util/dynamicFormFields";

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

  const [userDetails, setUserDetails] = useState([]);
  const [paginationData, setPaginationData] = useState({});
  const [pageLoadResult, setPageloadResults] = useState(false);
  const [searchQuery, setSearchquery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [modelShow, setModelShow] = useState(false);
  const [selectedUser, setSelectedUser] = useState("");
  const baseURL = getBaseURL();

  const dispatch = useDispatch();

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

  const closeModel = () => {
    setModelShow(!modelShow);
    setSelectedUser("");
  };

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
        <div className="col-md-6">
          <Title title={"Advertisement list"} cssClass="fs-1 pageTitle" />
        </div>
        <div className="col-md-3">
          <ShowHideToggle
            showhideStatus={showHideCompList?.advertisement?.visibility}
            title={" ON / OFF"}
            componentName={"advertisement"}
            showHideHandler={showHideHandler}
          />
        </div>
        <div className="col-md-3">
          <Button
            type=""
            cssClass="btn btn-outline"
            label="Add Advertisement"
            handlerChange={() => addNewAdvertisement("advertisement", true)}
          />
        </div>
      </div>

      <div className="row px-3 px-lg-5 py-4 table-responsive">
        {advertisementList?.length > 0 ? (
          <table className="table table-striped table-hover contacts">
            <thead>
              <tr>
                <th class="align-middle">Title</th>
                <th class="align-middle">Description</th>

                <th class="align-middle">Show or Hide</th>
                <th class="align-middle">Image</th>
                <th className="align-middle">Action</th>
              </tr>
            </thead>
            <tbody>
              {advertisementList?.map((advertisement) => (
                <tr key={advertisement.id}>
                  <td class="align-middle">{advertisement.title}</td>
                  <td class="align-middle">
                    {advertisement.advertisement_description}
                  </td>

                  <td class="align-middle">
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
                  <td class="align-middle">
                    <img
                      src={
                        advertisement.path
                          ? getImagePath(advertisement.path)
                          : getDummyImage()
                      }
                      alt={advertisement.alternitivetext}
                      className="thumb75 d-lg-block "
                    />
                  </td>
                  <td class="align-middle">
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
