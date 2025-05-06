import React from "react";
import "./AdminEditIcon.css";

const ShowHideIcon = ({
  editHandler,
  hideIcon = false,
  // iconShow = "fa-eye",
  // iconHide = "fa-eye-slash",
  iconShow = "fa-toggle-on",
  iconHide = "fa-toggle-off",
  iconCss,
  // iconCss = "text-info cursor-pointer fs-3",
  cssClasses = "",
}) => {
  const appliedIconCss = iconCss ?? `${hideIcon ? 'text-white' : 'text-muted'} cursor-pointer fs-3`;
  return (
    <span className={`${cssClasses} d-block p-1 rounded-2 d-flex justify-content-between align-items-center`}>
     <span className={hideIcon ? "" : "text-muted" }>{hideIcon ? "ON" : "OFF" }</span>
      <i
        className={`mx-2 fa ${hideIcon ? iconShow : iconHide} ${appliedIconCss}`}
        aria-hidden="true"
        onClick={editHandler}
      ></i>
    </span>
  );
};

export default ShowHideIcon;
