import React from "react";

const Button = ({
  type,
  cssClass,
  label,
  handlerChange,
  disabled = false,
  icon,
  isMobile
}) => {
  return (
    <button
      disabled={disabled}
      type={type}
      className={`d-flex justify-content-center align-items-center gap-2 ${cssClass}`}
      onClick={() => handlerChange(label)}
    >
      {icon ? <i className={`fa ${icon}`} aria-hidden="true"></i> : ""}
      {isMobile ? " " : <span className="">{label}</span>}
    </button>
  );
};

export default Button;
