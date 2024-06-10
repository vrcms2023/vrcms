import React from "react";

const Title = ({ 
  title = "",
  subTitle = "", 
  cssClass,
  mainTitleClassess="",
  subTitleClassess="subtitle"
}) => {
  
  return (
    <>
      <div className={`${mainTitleClassess}`}>
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
