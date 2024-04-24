import React from "react";
import { Link } from "react-router-dom";
import Title from "../../Common/Title";

import "./EditAdminCommonStyles.css";

const EditAdminPopupHeader = ({ closeHandler, title, type }) => {
  return (
    <div className="d-flex align-items-center justify-content-between border adminEditTestmonialHeader">
      <h6 className="px-3 fw-normal text-warning m-0 ">
        <Title
          title={title}
          cssClass="text-black fs-5 fw-bold"
          // subTitle={type === "add" ? "Add Mode " : "Edit Mode"}
        />
      </h6>
      <Link
        to="#"
        className="p-3 text-decoration-none text-danger close d-flex justify-content-center align-items-cener gap-2"
        onClick={closeHandler}
      >
        {/* <span className="d-none d-md-block">Close</span> */}
        <i className="fa fa-times fs-4" aria-hidden="true"></i>
      </Link>
    </div>
  );
};
export default EditAdminPopupHeader;
