import React from "react";
import ShowHideIcon from "./AdminShowHideIcon";

const ShowHideToggle = ({
  showhideStatus,
  title,
  componentName,
  showHideHandler,
}) => {
  return (
    <div
      className={`randomServices text-white p-1 px-2 mb-1 ${
        showhideStatus ? " bg-info" : " bg-secondary"
      }`}
    >
      <div className="d-flex justify-content-between align-items-center">
        {/* Products, visibility = {showHideCompList?.products?.visibility} */}
        <span className={`${showhideStatus ? "text-white" : "text-muted"}`}>
          {title}
        </span>
        <ShowHideIcon
          editHandler={() => showHideHandler(componentName)}
          hideIcon={showhideStatus}
        />
      </div>
    </div>
  );
};
export default ShowHideToggle;
