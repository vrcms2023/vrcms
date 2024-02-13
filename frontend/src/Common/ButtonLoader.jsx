import React from "react";
import { useSelector } from "react-redux";

const ButtonLoader = ({ type, cssClass, label, handlerChange }) => {
  const { isLoading } = useSelector((state) => state.loader);
  return (
    <button
      type={type}
      className={`${cssClass}`}
      onClick={() => handlerChange(label)}
    >
      {isLoading ? (
        <span
          className="spinner-border spinner-border-sm"
          role="status"
          aria-hidden="true"
        ></span>
      ) : (
        ""
      )}
      &nbsp; {label}{" "}
    </button>
  );
};

export default ButtonLoader;
