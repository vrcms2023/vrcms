import React from "react";

import Title from "../../../Common/Title";

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
