import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Title from "../../../Common/Title";
import { axiosServiceApi } from "../../../util/axiosUtil";
import { toast } from "react-toastify";

import { getDummyImage, getImagePath } from "../../../util/commonUtil";
import { sortCreatedDateByDesc } from "../../../util/dataFormatUtil";
import Button from "../../../Common/Button";
import ModalBg from "../../../Common/ModelBg";

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
  getBrochuresFormDynamicFields,
  imageDimensionsJson,
} from "../../../util/dynamicFormFields";
import RadioButtonGroup from "../../Components/RadioButtonGroup";

import "./adminSettingStyles.css";
import { getBaseURL } from "../../../util/ulrUtil";
import { BrochureComponentStyles } from "../../../Common/StyledComponents/Styled-AddBrochure-Component";

const UploadBrochures = () => {
  const pageType = "advertisementsettings";
  const editComponentObj = {
    brochures: false,
  };
  const baseURL = getBaseURL();

  const [brochuresList, setBrochuresList] = useState([]);
  const [editBrochures, setEditBrochures] = useState({});
  const [componentEdit, SetComponentEdit] = useState(editComponentObj);
  const [compTtile, setComptitle] = useState("Add Brochures");
  const [show, setShow] = useState(false);

  const editHandler = (name, value, item) => {
    setEditBrochures(item);
    SetComponentEdit((prevFormData) => ({ ...prevFormData, [name]: value }));
    setComptitle("Edit Brochure");
    setShow(!show);
    document.body.style.overflow = "hidden";
  };

  useEffect(() => {
    if (!componentEdit.brochures) {
      getBrochuresList();
    }
  }, [componentEdit.brochures]);

  const addNewBrochures = (name, value) => {
    SetComponentEdit((prevFormData) => ({ ...prevFormData, [name]: value }));
    setComptitle("Add Brochure");
    setShow(!show);
    document.body.style.overflow = "hidden";
  };

  const getBrochuresList = async () => {
    try {
      const response = await axiosServiceApi.get(`/contactus/createBrochures/`);
      if (response?.status === 200) {
        const sortbyCreateData = sortCreatedDateByDesc(
          response?.data?.brochures
        );
        setBrochuresList(sortbyCreateData);
      }
    } catch (error) {
      toast.error("Unable to load Brochures  details");
    }
  };
  useEffect(() => {
    getBrochuresList();
  }, []);

  const downloadPDF = (url) => {
    window.open(
      url,
      "_blank",
      "location=yes,height=800,width=600 ,scrollbars=yes,status=yes"
    );
  };

  const handleBrochuresDelete = (brochures) => {
    const title = brochures.brochures_downloadName;
    const deleteMenuItemByID = async () => {
      const response = await axiosServiceApi.delete(
        `/contactus/updateBrochures/${brochures.id}/`
      );
      if (response.status === 204) {
        toast.success(`${title} Brochures is delete successfully `);
        getBrochuresList();
      }
    };

    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <DeleteDialog
            onClose={onClose}
            callback={deleteMenuItemByID}
            // message={`you want to delete the ${title} Brochures`}
            message={<>Confirm deletion of  <span>{title}</span> Brochures?</>}
          />
        );
      },
    });
  };

  return (
    <BrochureComponentStyles>
    <div className="my-4 addBrochure border">
      <div className="d-flex justify-content-between align-items-center p-3">
        <Title title={"Add Brochures"} cssClass="pageTitle" />
        <div className="uploadBrochure">
          <Button
            type=""
            cssClass="btn btn-outline"
            label="Add"
            handlerChange={() => addNewBrochures("brochures", true)}
          />
        </div>
      </div>

      <div className="row table-responsive px-3">
        {brochuresList?.length > 0 ? (
          <table className="table">
            <thead>
              <tr style={{background: "#f8f8f8"}}>
                <th className="align-middle bg-secondary">Title</th>
                <th className="align-middle bg-secondary">Download File</th>
                <th
                  className="align-middle text-end bg-secondary"
                >
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {brochuresList?.map((brochures) => (
                <tr key={brochures.id}>
                  <td className="align-middle">{brochures.brochures_name}</td>
                  <td className="align-middle text-left">
                    
                    <a
                      href="#!"
                      onClick={() => downloadPDF(`${baseURL}${brochures.path}`)}
                      className="mx-1 text-dark"
                    >
                      <i class="fa fa-download me-1" aria-hidden="true"></i> 
                      {brochures.brochures_downloadName
                        ? brochures.brochures_downloadName
                        : brochures.originalname}
                    </a>
                  </td>
                  <td className="align-middle text-end">
                    <Link
                      to=""
                      onClick={() => editHandler("brochures", true, brochures)}
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
                      onClick={() => handleBrochuresDelete(brochures)}
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
          {componentEdit.brochures && (
            <div className={`adminEditTestmonial selected `}>
              <SingleImageUlploadWithForm
                editHandler={editHandler}
                componentType="brochures"
                popupTitle="Brochures"
                componentTitle={compTtile}
                selectedItem={editBrochures}
                setSelectedItemState={setEditBrochures}
                imageGetURL={`/contactus/createBrochures/`}
                imagePostURL="/contactus/createBrochures/"
                imageUpdateURL="/contactus/updateBrochures/"
                imageDeleteURL="/contactus/updateBrochures/"
                imageLabel="PDF's upload"
                validTypes="application/pdf"
                showDescription={false}
                showExtraFormFields={getBrochuresFormDynamicFields(
                  editBrochures
                )}
                dimensions={imageDimensionsJson("brochures")}
              />
            </div>
          )}
        </>
      </div>
    </div>
    {show && <ModalBg />}
    </BrochureComponentStyles>
  );
};

export default UploadBrochures;
