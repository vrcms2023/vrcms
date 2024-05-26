import React from "react";

// Comonents
import EditAdminPopupHeader from "../EditAdminPopupHeader";
import Button from "../../../Common/Button";

const ContactInputs = ({ editHandler, componentType }) => {
  const closeHandler = () => {
    editHandler(componentType, false);
    document.body.style.overflow = "";
  };

  return (
    <>
      <EditAdminPopupHeader closeHandler={closeHandler} title={componentType} />
      <div className="container">
        <div className="row py-0 pb-md-5">
          <div className="col-md-8 offset-md-2 mb-5 mb-md-0">
            <form className="g-3 mb-md-0">
              <div className="mb-3 row">
                <label
                  htmlFor=""
                  className="col-sm-2 col-form-label text-start text-md-end"
                >
                  Phone
                </label>
                <div className="col-sm-10">
                  <input type="text" className="form-control p-2" />
                </div>
              </div>
              <div className="mb-3 row">
                <label
                  htmlFor=""
                  className="col-sm-2 col-form-label text-start text-md-end"
                >
                  Email
                </label>
                <div className="col-sm-10">
                  <input type="text" className="form-control p-2" />
                </div>
              </div>

              <div className="d-flex justify-content-center flex-wrap flex-column flex-sm-row align-items-center gap-1 gap-md-3 mt-5">
                <button className="btn btn-secondary mx-3">Clear</button>
                <button className="btn btn-primary">Save</button>
                <Button
                  type="submit"
                  cssClass="btn btn-more"
                  label={"Close"}
                  handlerChange={closeHandler}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactInputs;
