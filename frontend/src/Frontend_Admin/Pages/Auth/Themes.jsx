import React from "react";
import ThemeSwitcher from "../../../themes/ThemeSwitcher";
import Title from "../../../Common/Title";

const Themes = () => {
  return (
    <div className="container-fluid pt-5">
      <div className="row px-3 px-lg-5">
        <div className="text-end d-flex justify-content-between">
          <Title title={"Change Themes"} cssClass="fs-1 pageTitle" />
        </div>
      </div>
      <div className="row px-3 px-lg-5 py-4 table-responsive">
        <ThemeSwitcher />
      </div>
    </div>
  );
};

export default Themes;
