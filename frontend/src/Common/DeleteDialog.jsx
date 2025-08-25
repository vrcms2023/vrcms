import React from "react";
import "./DeleteDialog.css";
import { ConfirmationDialogStyled } from "./StyledComponents/Styled-ConfirmationDialog";

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
    <ConfirmationDialogStyled>
    <div className="popup-overlay d-flex justify-content-center align-items-center flex-column  border-light">
      <h1 className="">
        {title ? title : "Are you sure ?"}
      </h1>
      <p className="text-muted m-0 mesg">{message ? message : ""}</p>
      <div className="w-100">
        <hr className="mb-4" />
        <div className="d-flex justify-content-center align-items-center gap-2 w-100">
          {showConfirmButotns ? (
            <>
              <button className="border btn btn-outline-dark" onClick={onClose}>
                No
              </button>
              <button
                className={`border btn btn-outline-dark text-danger`}
                // className={`border btn text-danger ${buttonStyle ? buttonStyle : "btn-outline-danger"}`}
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
    </ConfirmationDialogStyled>
  );
};

export default DeleteDialog;
