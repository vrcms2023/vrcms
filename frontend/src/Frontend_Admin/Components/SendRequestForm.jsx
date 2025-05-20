import React, { useState } from "react";
import Alert from "../../Common/Alert";
import { toast } from "react-toastify";
import { axiosServiceApi } from "../../util/axiosUtil";
import ShowHideToggle from "../../Common/ShowHideToggle";

const SendRequestForm = ({ closeModel, selectedUser }) => {
  const formObject = {
    description: "",
  };
  const [formData, setFormData] = useState(formObject);
  const [success, setsuccess] = useState(false);
  const [defaultMessage, setDefaultMessage] = useState(false);

  const handleChange = (event) => {
    setsuccess(false);
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const onFormSubmit = async (e) => {
    e.preventDefault();
    const data = {
      firstName: selectedUser.firstName,
      email: selectedUser.email,
      phoneNumber: selectedUser.phoneNumber,
      description: formData.description ? formData.description : "dummyvalue",
      appName: "VRMCS",
      selectedDefaultMessage: defaultMessage,
    };

    try {
      const response = await axiosServiceApi.post(
        `/contactus/sendRequesttoClient/`,
        {
          ...data,
        }
      );

      if (response.status === 200) {
        toast.success(`Request is sent successfully`);
        closeModel();
      }
    } catch (error) {
      toast.error("unable to process your request");
    }
  };
  const showHideHandler = async (name) => {
    setDefaultMessage(!defaultMessage);
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
        <div>
          <ShowHideToggle
            showhideStatus={defaultMessage}
            title={"Default message"}
            componentName={"Default"}
            showHideHandler={showHideHandler}
          />
        </div>

        <form className="contactForm container-fluid" onSubmit={onFormSubmit}>
          <div className="mb-3 row">
            <label
              htmlFor="exampleInputFName"
              className="col-sm-2 col-form-label"
            >
              Name
            </label>
            <div className="col-sm-10">{selectedUser.firstName}</div>
          </div>
          <div className="mb-3 row">
            <label
              htmlFor="exampleInputEmail1"
              className="col-sm-2 col-form-label"
            >
              Email
            </label>
            <div className="col-sm-10">{selectedUser.email}</div>
          </div>
          {!defaultMessage ? (
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
          ) : (
            <div className="mb-3 row">
              <div className="col-sm-12 text-left">
                We are sending default messate <br />
              </div>
            </div>
          )}
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

export default SendRequestForm;
