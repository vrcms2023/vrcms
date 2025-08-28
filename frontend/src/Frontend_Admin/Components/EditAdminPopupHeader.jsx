import React from "react";
import { Link } from "react-router-dom";
import Title from "../../Common/Title";

import "./EditAdminCommonStyles.css";

const EditAdminPopupHeader = ({ closeHandler, title, type }) => {
  return (
    <div className="d-flex align-items-center justify-content-between adminEditTestmonialHeader">
      <div className="fw-normal m-0 ">
        <Title
          title={title}
          cssClass=""
          // subTitle={type === "add" ? "Add Mode " : "Edit Mode"}
        />
      </div>
      <Link
        to="#"
        className="p-3 text-decoration-none close d-flex justify-content-center align-items-cener gap-2"
        onClick={closeHandler}
      >
        {/* <span className="d-none d-md-block">Close</span> */}
        <i className="fa fa-times fs-5" aria-hidden="true"></i>
      </Link>
    </div>
  );
};
export default EditAdminPopupHeader;
