import React from "react";

const Title = ({ 
  title = "",
  subTitle = "", 
  cssClass,
  mainTitleClassess="text-center fs-4",
  subTitleClassess=""
}) => {
  
  return (
    <>
      <h5 className={`${cssClass}`}>
        {title}
        {subTitle ? (
          <span className={`${subTitleClassess}`}> / {subTitle}</span>
        ) : (
          ""
        )}
      </h5>
    </>
  );
};

export default Title;
