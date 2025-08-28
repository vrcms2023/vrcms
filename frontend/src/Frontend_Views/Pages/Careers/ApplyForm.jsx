import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Button from "../../../Common/Button";
import Title from "../../../Common/Title";
import { CareersFormStyled } from "../../../Common/StyledComponents/Styled-CareersApply";
import { InputFields } from "../../../Frontend_Admin/Components/forms/FormFields";
import { fieldValidation } from "../../../util/validationUtil";
import { countries } from "../../../data/coutrieslist";
import { axiosJobUploadServiceApi } from "../../../util/axiosUtil";
import { toast } from "react-toastify";

const ApplyForm = ({ jobDetails }) => {
  const {
    register,
    reset,
    handleSubmit,
    clearErrors,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
  });
  const [serverError, setServerError] = useState();
  const handleChange = (fieldName) => {
    clearErrors(fieldName);
  };
  const onFormSubmit = async (data) => {
    setServerError("");
    const formData = new FormData();
    const file = data.path?.[0];
    if (file) {
      formData.append("path", file);
    }
    formData.append("firstName", data.firstName);
    formData.append("lastName", data.lastName);
    formData.append("phoneNumber", data.phoneNumber);
    formData.append("jobID", jobDetails?.id);
    formData.append("jobtitle", jobDetails?.job_title);
    formData.append("email", data.email);
    formData.append("description", data.description);
    formData.append("country", data.country);
    formData.append("cityAddress", data.cityAddress);
    try {
      const response = await axiosJobUploadServiceApi.post(`/careers/applyJob/create/`, formData);
      //console.log(response);
      if (response.status === 201) {
        toast.success(`Request is sent successfully`);
      }
    } catch (error) {
      setServerError(error[0]);
      toast.error("unable to process your request");
    }
    reset();
  };
  return (
    <CareersFormStyled>
      <div className="container">
        <form className="contactForm" onSubmit={handleSubmit(onFormSubmit)}>
          <div className="row">
            <div className="col-md-12 ">
              <Title title="Apply Now" cssClass={"fs-5 fw-medium "} />
              <hr />
            </div>
            {serverError && <div className="error">{serverError}</div>}
            <div className="col-12">
              <InputFields
                label="First Name"
                fieldName="firstName"
                register={register}
                isRequired={true}
                validationObject={fieldValidation.firstName}
                error={errors?.firstName?.message}
                onChange={() => handleChange("firstName")}
              />
            </div>
            <div className="col-12">
              <InputFields
                label="Last Name"
                fieldName="lastName"
                register={register}
                isRequired={false}
                onChange={() => handleChange("lastName")}
              />
            </div>
            <div className="col-12">
              <InputFields
                label="Email Address"
                fieldName="email"
                register={register}
                isRequired={true}
                validationObject={fieldValidation.email}
                error={errors?.email?.message}
                onChange={() => handleChange("email")}
              />
            </div>
            <div className="col-12">
              <InputFields
                label=" Upload Resume / Share LinkedIn Profile"
                fieldName="path"
                register={register}
                isRequired={true}
                type={"file"}
                accept={".docx,.pdf,.rtf"}
                validationObject={fieldValidation.path}
                maxSize={5 * 1024 * 1024} // 5MB
                allowedTypes={[
                  "application/pdf",
                  "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // .docx
                  "application/rtf",
                ]}
                error={errors?.path?.message}
                onChange={() => handleChange("path")}
              />
              <small className="my-2 d-block">
                Only .docx, .rtf, .pdf formats allowed to a max size of 5 MB.
              </small>
            </div>
            <div className="col-12">
              <InputFields
                label="Phone Number"
                fieldName="phoneNumber"
                register={register}
                isRequired={true}
                type={"number"}
                validationObject={fieldValidation.phoneNumber}
                error={errors?.phoneNumber?.message}
                onChange={() => handleChange("phoneNumber")}
              />
            </div>
            <div className="col-12">
              <InputFields
                label="City/Address"
                fieldName="cityAddress"
                register={register}
                validationObject={fieldValidation.cityAddress}
                error={errors?.cityAddress?.message}
                onChange={() => handleChange("cityAddress")}
              />
            </div>
            <div className="col-12">
              <InputFields
                type="dropdown"
                label="Country"
                fieldName="country"
                register={register}
                options={countries}
                onChange={() => handleChange("country")}
              />
            </div>
            <div className="col-12">
              <InputFields
                type="textarea"
                label="Description of your project"
                fieldName="description"
                register={register}
                onChange={() => handleChange("description")}
              />
            </div>
          </div>
          <div className="col-12">
            <div className="text-center pt-3">
              <button className="btn btn-primary ">Apply</button>
            </div>
          </div>
        </form>
      </div>
    </CareersFormStyled>
  );
};

export default ApplyForm;
