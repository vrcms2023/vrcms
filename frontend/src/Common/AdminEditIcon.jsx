import React from "react";
import "./AdminEditIcon.css";

const EditIcon = ({ editHandler }) => {
  return (
    <span className="position-absolute editIcon">
      <i
        className="fa fa-pencil text-warning cursor-pointer fs-3"
        aria-hidden="true"
        onClick={() => editHandler("carousel", true)}
      ></i>
    </span>
  );
};

export default EditIcon;
