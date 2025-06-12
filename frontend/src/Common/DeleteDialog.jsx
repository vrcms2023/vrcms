import React from "react";
import "./DeleteDialog.css";

const DeleteDialog = ({
  title,
  onClose,
  callback,
  label,
  message,
  buttonStyle,
  showConfirmButotns = true,
  projectName,
}) => {
  return (
    <div className="popup-overlay d-flex justify-content-center align-items-center flex-column  border-light">
      <h1 className="fs-4 text-secondary text-uppercase">
        {title ? title : "Are you sure?"}
      </h1>
      <p className="text-muted m-0">{message ? message : ""}</p>
      <div className="w-100">
        <hr className="mb-4 border border-secondary" />
        <div className="d-flex justify-content-center align-items-center gap-2 w-100">
          {showConfirmButotns ? (
            <>
              <button className="border btn btn-outline-dark" onClick={onClose}>
                No
              </button>
              <button
                className={`border btn bg-danger text-white ${buttonStyle ? buttonStyle : "btn-outline-danger"}`}
                onClick={() => {
                  callback();
                  onClose();
                }}
              >
                Yes
                {/* Yes, {label ? label : " Delete"} it! */}
              </button>
            </>
          ) : (
            <button
              className={`border btn ${buttonStyle ? buttonStyle : "btn-outline-danger"}`}
              onClick={() => {
                onClose();
              }}
            >
              OK
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default DeleteDialog;
