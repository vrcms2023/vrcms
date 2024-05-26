import React from "react";
import UserContactForm from "../Frontend_Views/Components/UserContactForm";

const ContactModel = ({ closeModel, downloadPDF }) => {
  return (
    <div className="modal d-block modal-lg" tabIndex="-1">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title text-dark fw-bold">Contact</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={closeModel}
            ></button>
          </div>
          <div className="modal-body px-4 py-3">
            {/* User Contact Form */}
            <UserContactForm
              closeModel={closeModel}
              downloadPDF={downloadPDF}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default ContactModel;
