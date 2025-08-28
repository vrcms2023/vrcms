import React from "react";

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
  const appliedIconCss = iconCss ?? `${hideIcon ? 'componentext' : 'componentext'} cursor-pointer fs-5`;
  return (
    <span className={`${cssClasses} componentext d-flex justify-content-between align-items-center`}>
     <small className={hideIcon ? "" : "componentext" }>{hideIcon ? "ON" : "OFF" }</small>
      <i
        className={`ms-1 fa ${hideIcon ? iconShow : iconHide} ${appliedIconCss}`}
        aria-hidden="true"
        onClick={editHandler}
      ></i>
    </span>
  );
};

export default ShowHideIcon;
