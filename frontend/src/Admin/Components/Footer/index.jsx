import React from "react";
import { Link } from "react-router-dom";
import Button from "../../../Common/Button";

const AdminFooter = ({ editHandler }) => {
  return (
    <div className="bg-white">
      <div className="d-flex align-items-center justify-content-between">
        <h5 className="p-3 fw-normal text-warning ">
          <small className="text-dark">Logo</small> - Edit Mode
        </h5>
        <Link
          to="#"
          className="p-3 text-decoration-none text-black"
          onClick={() => {
            editHandler("menu", false);
          }}
        >
          Close <span className="text-danger fw-bold">X</span>
        </Link>
      </div>
      <div className="container">
        <div className="row py-0 py-md-5">
          <div className="col-md-12 mb-5 mb-md-0">
            <form className="g-3  mb-md-0">
              <div className="mb-3 row">
                <label
                  for=""
                  className="col-sm-2 col-form-label text-start text-md-end"
                >
                  Logo
                </label>
                <div className="col-sm-10">
                  <input className="form-control" type="file" id="" />
                </div>
              </div>
              <div className="mb-3 row">
                <label
                  for=""
                  className="col-sm-2 col-form-label text-start text-md-end"
                >
                  Alt
                </label>
                <div className="col-sm-10">
                  <input type="text" className="form-control" />
                </div>
              </div>
              <div className="d-flex justify-content-center align-items-center gap-1 gap-md-3">
                <button className="btn btn-secondary mx-3">Clear</button>
                <button className="btn btn-primary">Save</button>
                <Button type="submit" cssClass="btn btn-more" label={"Close"} />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AdminFooter;
