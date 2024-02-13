import React from "react";
import "./DeleteDialog.css";

const DeleteDialog = (props) => {
  const { title, onClose, callback, label, message, buttonStyle } = props;
  return (
    <div className="popup-overlay d-flex justify-content-center align-items-center flex-column">
      <h1>{title ? title : "Are you sure?"}</h1>
      <p className="text-muted m-0">{message ? message : ""}</p>
      <div className="w-100">
        <hr className="mb-4" />
        <div className="d-flex justify-content-center align-items-center flex-column flex-md-row gap-2 w-100">
          <button className="btn btn-primary" onClick={onClose}>
            No
          </button>
          <button
            className={`btn ${buttonStyle ? buttonStyle : "btn-danger"}`}
            onClick={() => {
              callback();
              onClose();
            }}
          >
            Yes, {label ? label : " Delete"} it!
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteDialog;
