import React from "react";
import ImagewithDescComponent from "../../Common/ImagewithDescSideBySide/ImagewithDescComponent";

const HomeDynamicServices = ({ pageType, componentFlip, popupTitle, imageLabel, category }) => {
  return (
    <div className="homeService">
      <div className="container">
        <div className={`row ${componentFlip ? "d-flex flex-row-reverse my-3 my-md-5" : ""}`}>
          <ImagewithDescComponent
            col1="col-md-6 ps-sm-0"
            col2="col-md-6 d-flex justify-content-center align-items-start flex-column"
            cssClass="fs-3 mb-3 fw-bolder title"
            imageClass="w-100 object-fit-cover imgStylingLeft shadow imgStyling"
            pageType={pageType}
            popupTitle={popupTitle}
            imageLabel={imageLabel}
            category={category}
          />
        </div>
      </div>
    </div>
  );
};

export default HomeDynamicServices;
