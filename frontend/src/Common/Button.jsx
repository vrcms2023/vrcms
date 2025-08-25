import React, { Children } from "react";

const Button = ({
  type,
  cssClass,
  label,
  handlerChange,
  disabled = false,
  icon,
  isMobile,
  image,
  imageLabel,
  imgeLabelCss
}) => {
  return (
    <button
      disabled={disabled}
      type={type}
      className={`d-flex justify-content-center align-items-center ${cssClass}`}
      onClick={() => handlerChange(label)}
    >
      {icon ? <i className={`fa ${icon}`} aria-hidden="true"></i> : ""}
      {isMobile ? " " : <span className="linkLabel">{label}</span>}
      {image ? <div className={imgeLabelCss}><img src={image} /> <span style={{fontSize: ".7rem"}}>{imageLabel}</span></div> : ""}
    </button>
  );
};

export default Button;
