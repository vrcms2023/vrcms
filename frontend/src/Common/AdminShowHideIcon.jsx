import React from "react";
import "./AdminEditIcon.css";

const ShowHideIcon = ({
  editHandler,
  hideIcon = false,
  iconShow = "fa-eye",
  iconHide = "fa-eye-slash",
  iconCss = "text-warning cursor-pointer fs-3",
  cssClasses = "position-absolute",
}) => {
  return (
    <span className={`${cssClasses} editIcon`}>
      <i
        className={`fa ${hideIcon ? iconShow : iconHide} ${iconCss}`}
        aria-hidden="true"
        onClick={editHandler}
      ></i>
    </span>
  );
};

export default ShowHideIcon;
