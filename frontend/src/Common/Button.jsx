import React from "react";
import { useSelector } from "react-redux";

const Button = ({
  type,
  cssClass,
  label,
  handlerChange,
  disabled = false,
  icon,
}) => {
  return (
    <button
      disabled={disabled}
      type={type}
      className={`d-flex justify-content-center align-items-center gap-2 ${cssClass}`}
      onClick={() => handlerChange(label)}
    >
      {icon ? <i className={`fa ${icon}`} aria-hidden="true"></i> : ""}
      <span className="">{label}</span>
    </button>
  );
};

export default Button;
