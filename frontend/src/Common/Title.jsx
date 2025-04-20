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
      <h3 className={`${cssClass}`}>
        {title}
        {subTitle ? (
          <span className={`${subTitleClassess}`}> / {subTitle}</span>
        ) : (
          ""
        )}
      </h3>
    </>
  );
};

export default Title;
