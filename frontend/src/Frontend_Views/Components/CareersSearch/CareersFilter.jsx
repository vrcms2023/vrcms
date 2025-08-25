import React from "react";
import Search from "../../../Common/Search";
import Button from "../../../Common/Button";

const CareersFilter = () => {
  return (
    <>
      <div className="row">
        {/* <div className="col-md-12">
          <small>707 + Open Positions Globally</small>
        </div> */}
      </div>
      <div className="row">
        <div className="col-md-10">
          <div className="row">
          <div className="col-md-8 mb-3 mb-md-0">
          <input
            className="form-control"
            type="text"
            placeholder="Search by Skills or Job title"
            aria-label=".form-control-lg example"
          />
        </div>

        <div className="col-md-2 mb-3 mb-md-0">
          <select className="form-select" aria-label="Default select example">
            <option value="">Select Experience </option>
            <option value="0-1 years">0-1 years</option>
            <option value="1-3 years">1-3 years</option>
            <option value="3-5 years">3-5 years</option>
            <option value="5-10 years">5-10 years</option>
            <option value="10-15 years">10-15 years</option>
            <option value="15+ years">15+ years</option>
          </select>
        </div>
        <div className="col-md-2">
          <select className="form-select" aria-label="Default select example">
            <option value="">Select Location</option>
            <option value="bangalore">&nbsp; &nbsp;Bangalore</option>
            <option value="chennai">&nbsp; &nbsp;Chennai</option>
            <option value="gurgaon">&nbsp; &nbsp;Gurgaon</option>
            <option value="hyderabad">&nbsp; &nbsp;Hyderabad</option>
            <option value="nagpur">&nbsp; &nbsp;Nagpur</option>
            <option value="new-delhi">&nbsp; &nbsp;New Delhi</option>
            <option value="noida">&nbsp; &nbsp;Noida</option>
            <option value="pune">&nbsp; &nbsp;Pune</option>
            <option value="guadalajara">&nbsp; &nbsp;Guadalajara</option>
            <option value="mexico-city">&nbsp; &nbsp;Mexico City</option>
          </select>
        </div>
        </div>

        <div className="col-md-12 py-2 d-flex justify-content-start align-items-start gap-2">
          <div className="d-flex justify-content-start align-items-center gap-1">
            <input
              className="form-check-input"
              type="checkbox"
              value=""
              id="flexCheckDefault"
            />
            <label className="form-check-label" htmlFor="flexCheckDefault">
              Freelance
            </label>
          </div>
          <div className="d-flex justify-content-start align-items-center gap-1">
            <input
              className="form-check-input"
              type="checkbox"
              value=""
              id="flexCheckDefault"
              defaultChecked
            />
            <label className="form-check-label" htmlFor="flexCheckDefault">
              Remove
            </label>
          </div>
          <div className="d-flex justify-content-start align-items-center gap-1">
            <input
              className="form-check-input"
              type="checkbox"
              value=""
              id="flexCheckDefault"
            />
            <label className="form-check-label" htmlFor="flexCheckDefault">
              Hybrid
            </label>
          </div>
          <div className=" d-flex justify-content-start align-items-center gap-1">
            <input
              className="form-check-input"
              type="checkbox"
              value=""
              id="flexCheckDefault"
            />
            <label className="form-check-label" htmlFor="flexCheckDefault">
              On-Site/Office
            </label>
          </div>
      </div>
    </div>
        
    <div className="col-md-2 d-flex justify-content-center align-items-start">
      <Button type="button" label="Search" cssClass={"btn btn-primary"} icon="fa-search" />
    </div>
  </div>
      {/* <div className="row d-md-none">
        <div className="col-md-12">
          <Button type="button" label="search" cssClass={"btn btn-primary"} icon="fa-search"/>
        </div>
      </div> */}
    </>
  );
};

export default CareersFilter;
