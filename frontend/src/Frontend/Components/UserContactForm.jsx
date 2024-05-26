import React, { useState } from "react";
import Alert from "../../Common/Alert";
import { toast } from "react-toastify";
import { axiosClientServiceApi } from "../../util/axiosUtil";

import { removeCookie, setCookie } from "../../util/cookieUtil";

const UserContactForm = ({ closeModel, downloadPDF }) => {
  const formObject = {
    firstName: "",
    email: "",
    phoneNumber: "",
    description: "",
  };
  const [formData, setFormData] = useState(formObject);
  const [formerror, setFormerror] = useState({});
  const [success, setsuccess] = useState(false);

  const handleChange = (event) => {
    setsuccess(false);
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    setFormerror((prevFormData) => ({ ...prevFormData, [name]: "" }));
  };

  const onFormSubmit = async (e) => {
    e.preventDefault();
    const errors = validationform(formData);
    setFormerror(errors);
    if (Object.keys(errors).length > 0) return;
    try {
      const response = await axiosClientServiceApi.post(`/contactus/`, {
        ...formData,
      });
      if (response.status === 201) {
        toast.success("Your request is submit succuessfully");
        removeCookie("clientInformation");
        setCookie("clientInformation", formData.email, { maxAge: 86400 });
        setFormData(formObject);
        setFormerror("");
        setsuccess(true);
        closeModel();
        downloadPDF();
      } else {
        toast.error("unable to process your request");
      }
    } catch (error) {
      toast.error("unable to process your request");
    }
  };

  const validationform = (value) => {
    const errors = {};
    const emailPattern =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!value.firstName) {
      errors.firstName = "Please Enter Name";
    }

    if (!value.phoneNumber) {
      errors.phoneNumber = "Please Enter Phone Number";
    }

    if (!value.email) {
      errors.email = "Please Enter Email";
    } else if (!emailPattern.test(value.email)) {
      errors.email = "Enter Valid Email";
    }

    return errors;
  };

  return (
    <>
      {/* User Contact Form */}
      <div className="col-md-12 d-flex justify-content-center align-items-center flex-column">
        {success && (
          <Alert
            mesg={"Thank you for contact us"}
            cssClass={`alert text-white w-75 mt-3 p-2 text-center bg-success`}
          />
        )}

        <form className="my-2 py-3 py-md-5 contactForm" onSubmit={onFormSubmit}>
          {/* <Title title="Quick contact" cssClass="text-black fw-bold mb-4" /> */}

          <div className="mb-3 row">
            <label
              htmlFor="exampleInputFName"
              className="col-sm-2 col-form-label"
            >
              Name
            </label>
            <div className="col-sm-10">
              <input
                type="textbox"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="form-control"
                id="exampleInputFName"
                aria-describedby="emailHelp"
              />

              {formerror.firstName !== null ? (
                <div id="emailHelp" className="form-text text-danger">
                  {formerror.firstName}
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
          <div className="mb-3 row">
            <label
              htmlFor="exampleInputEmail1"
              className="col-sm-2 col-form-label"
            >
              Email
            </label>
            <div className="col-sm-10">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
              />
              {formerror.email !== null ? (
                <div id="emailHelp" className="form-text text-danger">
                  {formerror.email}
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
          <div className="mb-3 row">
            <label
              htmlFor="exampleInputPhone"
              className="col-sm-2 col-form-label"
            >
              Phone
            </label>
            <div className="col-sm-10">
              <input
                type="textbox"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                className="form-control"
                id="exampleInputPhone"
                aria-describedby="emailHelp"
              />
              {formerror.phoneNumber !== null ? (
                <div id="emailHelp" className="form-text text-danger">
                  {formerror.phoneNumber}
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
          <div className="mb-3 row">
            <label
              htmlFor="exampleFormMesg"
              className="col-sm-2 col-form-label"
            >
              Message
            </label>
            <div className="col-sm-10">
              <textarea
                className="form-control"
                value={formData.description}
                onChange={handleChange}
                name="description"
                id="exampleFormMesg"
                rows="3"
              ></textarea>
            </div>
          </div>
          <div className="mb-3 row">
            <div className="col-sm-2"></div>
            <div className="col-sm-10">
              <button
                type="submit"
                className="btn btn-primary w-100 text-uppercase py-2"
              >
                Send Request
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default UserContactForm;
