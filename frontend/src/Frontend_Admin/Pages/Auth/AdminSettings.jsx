import React, { useState } from "react";

import Title from "../../../Common/Title";

import "./adminSettingStyles.css";
import AdvertisementsAdminSettings from "./AdvertisementsAdminSettings";
import UploadBrochures from "./UploadBrochures";

const AdminSettings = () => {
  const pageType = "settings";

  const [gridList, setGridList] = useState("grid");

  return (
    <div className="mt-4 contactsList px-4">
      <div className="d-flex justify-content-between align-items-center">
        <Title title={"Settings"} cssClass="pageTitle" />
        <div className="d-flex justify-content-between align-items-center gap-2 ">
          <i
            class={`fa fa-th-large fs-4 cursor-pointer text-${gridList === "grid" ? "primary" : "secondary"}`}
            aria-hidden="true"
            onClick={() => setGridList("grid")}
          ></i>
          <i
            class={`fa fa-bars fs-4 cursor-pointer text-${gridList === "list" ? "primary" : "secondary"}`}
            aria-hidden="true"
            onClick={() => setGridList("list")}
          ></i>
        </div>
      </div>

      <div className="container-fluid">
        <div className="row">
          <div className={`col-12 ${gridList === "grid" ? "col-md-12 col-lg-6" : "col-lg-12"}`}>
            <UploadBrochures />
            {/* {gridList === "list" && (<hr className="my-1  border-dark"/>)} */}
          </div>
          <div className={`col-12 ${gridList === "list" ? "col-lg-12" : "col-md-12 col-lg-6"}`}>
            <AdvertisementsAdminSettings />
            {/* {gridList === "list" && (<hr className="my-2 border-dark"/>)} */}
          </div>
        </div>
      </div>
      {/* <UploadBrochures />
        <hr/>
        <AdvertisementsAdminSettings />
        <hr/> */}
    </div>
  );
};

export default AdminSettings;
