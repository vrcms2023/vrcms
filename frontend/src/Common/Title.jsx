import React from "react";

import './Title.css'
import { TitleSubTitleStyled } from "./StyledComponents/Styled-Title-Component";

const Title = ({ 
  title = "",
  subTitle = "", 
  cssClass,
  mainTitleClassess="",
  subTitleClassess="",
  icon,
  seoTitle=false
}) => {
  
  return (
    <TitleSubTitleStyled>
      {seoTitle ? (
        <h1 className={`${mainTitleClassess}`}>
          {icon ? <i class={`fa ${icon}`} aria-hidden="true"></i> : ""} {title} 
        </h1>
      ) : title ? (
        <h5 className={`${cssClass}`}>
          {icon ? <i class={`fa ${icon}`} aria-hidden="true"></i> : ""} {title} 
        </h5>
      ) : ""}
      {/* {title ? (
        <h5 className={`${cssClass} ${mainTitleClassess}`}>
        {icon ? <i class={`fa ${icon}`} aria-hidden="true"></i> : ""} {title} 
      </h5>
      ) : ""} */}
      
      {subTitle ? (
          <span className={`${subTitleClassess}`}>{subTitle}</span>
        ) : (
          ""
        )}
    </TitleSubTitleStyled>
  );
};

export default Title;
