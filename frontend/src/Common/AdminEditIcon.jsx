import React from "react";
import "./AdminEditIcon.css";

const EditIcon = ({ 
  editHandler,
  icon = "fa-pencil",
  iconCss = "text-warning cursor-pointer fs-3"
 }) => {
  return (
    <span className="position-absolute editIcon">
      <i
        className={`fa ${icon} ${iconCss}`}
        aria-hidden="true"
        onClick={() => editHandler("carousel", true)}
      ></i>
    </span>
  );
};

export default EditIcon;
