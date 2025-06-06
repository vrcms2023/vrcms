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
import AdvertisementsAdminSettings from "./AdvertisementsAdminSettings";
import UploadBrochures from "./UploadBrochures";

const AdminSettings = () => {
  const pageType = "settings";

  return (
    <div className="container-fluid pt-5 contactsList">
      <div className="row px-2 px-lg-5">
        <div className="col-sm-12 col-md-7">
          <Title title={"Settings"} cssClass="fs-1 pageTitle" />
        </div>
      </div>
      <>
        <AdvertisementsAdminSettings />
        <UploadBrochures />
      </>
    </div>
  );
};

export default AdminSettings;
