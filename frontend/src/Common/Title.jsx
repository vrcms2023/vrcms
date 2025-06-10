import React from "react";

import './Title.css'

const Title = ({ 
  title = "",
  subTitle = "", 
  cssClass,
  mainTitleClassess="",
  subTitleClassess=""
}) => {
  
  return (
    <>
      <h5 className={`${cssClass} ${mainTitleClassess}`}>
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
