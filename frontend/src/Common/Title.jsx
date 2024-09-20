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
      <div className={`${cssClass}`}>
        {title}
        {subTitle ? (
          <span className={`${subTitleClassess}`}> / {subTitle}</span>
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default Title;
