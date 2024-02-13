import React from "react";

const Title = ({ title, subTitle = "", cssClass }) => {
  return (
    <>
      <div className={`${cssClass} text-capitalize`}>
        {title}{" "}
        {subTitle ? (
          <span className={"fs-6 text-black fw-normal"}> / {subTitle}</span>
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default Title;
