import React from "react";
import Button from "../../../Common/Button";
import Title from "../../../Common/Title";
import { CareersFormStyled } from "../../../Common/StyledComponents/Styled-CareersApply";

const ApplyForm = () => {
  return (
    <CareersFormStyled>
      <div className="container">
        <div className="row">
          <div className="col-md-12 py-4">
            <Title title="Apply Now" cssClass={"fs-5 fw-medium "} />
            <hr />
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="mb-3">
              <label for="exampleFormControlInput1" className="form-label">
                First Name *
              </label>
              <input
                type="text"
                className="form-control"
                id="exampleFormControlInput1"
                placeholder="First Name"
              />
            </div>
            <div className="mb-3">
              <label for="exampleFormControlInput1" className="form-label">
                Last Name *
              </label>
              <input
                type="text"
                className="form-control"
                id="exampleFormControlInput1"
                placeholder="Last Name"
              />
            </div>
            <div className="mb-3">
              <label for="exampleFormControlInput1" className="form-label">
                Email *
              </label>
              <input
                type="email"
                className="form-control"
                id="exampleFormControlInput1"
                placeholder="Email"
              />
            </div>

            <div className="mb-3 border border-1 p-3 py-4">
              <label for="formFile" className="form-label">
                Upload Resume / Share LinkedIn Profile *
              </label>
              <input className="form-control" type="file" id="formFile" />
              <small className="my-2 d-block">
                Only .docx, .rtf, .pdf formats allowed to a max size of 5 MB.
              </small>

              <div className="text-muted text-center careers-or-text">
                <label> OR </label>
              </div>
              <div className="linkedInProfile mt-4">
                <label for="exampleFormControlInput1" className="form-label">
                  Linked In Profile
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="exampleFormControlInput1"
                />
              </div>
            </div>

            <div className="mb-3">
              <label for="exampleFormControlInput1" className="form-label">
                Phone
              </label>
              <input
                type="number"
                className="form-control"
                id="exampleFormControlInput1"
                placeholder="Phone Number"
              />
            </div>
            <div className="mb-3">
              <label for="exampleFormControlInput1" className="form-label">
                Country *
              </label>
              <select
                className="form-select"
                aria-label="Default select example"
              >
                <option value="">Select Country</option>
                <option value="kakinada">&nbsp; &nbsp;Kakinada</option>
                <option value="visakhapatnam">
                  &nbsp; &nbsp;Visakhapatnam
                </option>
                <option value="hyderabad">&nbsp; &nbsp;Hyderabad</option>
                <option value="bangalore">&nbsp; &nbsp;Bangalore</option>
                <option value="chennai">&nbsp; &nbsp;Chennai</option>
                <option value="gurgaon">&nbsp; &nbsp;Gurgaon</option>
                <option value="nagpur">&nbsp; &nbsp;Nagpur</option>
                <option value="new-delhi">&nbsp; &nbsp;New Delhi</option>
                <option value="noida">&nbsp; &nbsp;Noida</option>
                <option value="pune">&nbsp; &nbsp;Pune</option>
              </select>
            </div>

            <div className="mb-3">
              <label for="exampleFormControlInput1" className="form-label">
                City
              </label>
              <input
                type="text"
                className="form-control"
                id="exampleFormControlInput1"
                placeholder="name@example.com"
              />
            </div>
            <div className="mb-3">
              <label for="exampleFormControlTextarea1" className="form-label">
                How did you hear about this job?
              </label>
              <textarea
                className="form-control"
                id="exampleFormControlTextarea1"
                rows="3"
              ></textarea>
            </div>
            <div className="mb-3">
              <Button label={"Apply"} cssClass="btn btn-secondary" />
            </div>
          </div>
        </div>
      </div>
    </CareersFormStyled>
  );
};

export default ApplyForm;
