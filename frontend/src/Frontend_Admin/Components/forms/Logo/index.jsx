import React from "react";
import EditAdminPopupHeader from "../../EditAdminPopupHeader";
const AdminHeader = ({ editHandler }) => {
  const closeHandler = () => {
    editHandler("menu", false);
    document.body.style.overflow = "";
  };

  return (
    <>
      <EditAdminPopupHeader closeHandler={closeHandler} title="Header" />
      <div className="container">
        <div className="row p-4">
          <div className="col-md-8 offset-md-2">
            <form className="">
              <div className="row mb-3">
                <label
                  htmlFor=""
                  className="col-sm-2 col-form-label text-start text-md-end"
                >
                  Logo
                </label>
                <div className="col-sm-10">
                  <input className="form-control p-2" type="file" id="" />
                </div>
              </div>
              <div className="row mb-3">
                <label
                  htmlFor=""
                  className="col-sm-2 col-form-label text-start text-md-end"
                >
                  Alt
                </label>
                <div className="col-sm-10">
                  <input type="text" className="form-control p-2" />
                </div>
              </div>
              <div className="row">
                <div className="text-center">
                  <button className="btn btn-secondary m-3 ">Clear</button>
                  <button className="btn btn-primary">Save</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
export default AdminHeader;
