import React from "react";
import "./AdminEditIcon.css";

const EditIcon = ({
  editHandler,
  icon = "fa-pencil",
  iconCss = "text-warning cursor-pointer fs-3",
  cssClasses = "position-absolute ",
}) => {
  return (
    <span className={`${cssClasses} editIcon`}>
      <i
        className={`fa ${icon} ${iconCss}`}
        aria-hidden="true"
        onClick={editHandler}
      ></i>
    </span>
  );
};

export default EditIcon;
