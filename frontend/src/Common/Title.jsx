import React from "react";

const Title = ({ title, subTitle = "", cssClass }) => {
  return (
    <>
      <div className={`${cssClass} mb-3 text-center text-md-start text-capitalize fw-medium mainTitle `}>
        {title}{" "}
        {subTitle ? (
          <span className={"fs-6 text-black fw-normal subtitle"}> / {subTitle}</span>
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default Title;
