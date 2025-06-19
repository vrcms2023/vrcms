import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { fieldValidation } from "../../util/validationUtil";
import Alert from "../../Common/Alert";
import { toast } from "react-toastify";
import { axiosClientServiceApi } from "../../util/axiosUtil";

import { removeCookie, setCookie } from "../../util/cookieUtil";
import {
  InputFields,
  SelectField,
} from "../../Frontend_Admin/Components/forms/FormFields";
import { generateOptionLength } from "../../util/commonUtil";
import Button from "../../Common/Button";
import { countries, natureofprojectOptions } from "../../data/coutrieslist";

const RaqUseForm = ({ closeModel, downloadPDF }) => {
  const {
    register,
    reset,
    handleSubmit,
    clearErrors,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
  });

  const handleChange = (fieldName) => {
    clearErrors(fieldName);
  };

  const onFormSubmit = async (data) => {
    console.log(data);
    try {
      const response = await axiosClientServiceApi.post(`/contactus/raqform/`, {
        ...data,
      });
      if (response.status === 201) {
        toast.success("Your request is submit succuessfully");
        closeModel();
        downloadPDF();
      } else {
        toast.error("unable to process your request");
      }
    } catch (error) {
      toast.error("unable to process your request");
    }
  };

  return (
    <>
      {/* User Contact Form */}
      <div className="col-md-12 d-flex justify-content-center align-items-center flex-column">
        <form
          className="my-2 contactForm"
          onSubmit={handleSubmit(onFormSubmit)}
        >
          <div className="row">
            <div className="col-6">
              <InputFields
                label="Name *"
                fieldName="name"
                register={register}
                validationObject={fieldValidation.name}
                error={errors?.name?.message}
                onChange={() => handleChange("name")}
              />
            </div>
            <div className="col-6">
              <InputFields
                label="Company"
                fieldName="company"
                register={register}
                validationObject={fieldValidation.company}
                error={errors?.company?.message}
                onChange={() => handleChange("company")}
              />
            </div>
            <div className="col-6">
              <InputFields
                label="Email Address*"
                fieldName="email"
                register={register}
                validationObject={fieldValidation.email}
                error={errors?.email?.message}
                onChange={() => handleChange("email")}
              />
            </div>
            <div className="col-6">
              <InputFields
                label="Phone*"
                fieldName="phoneNumber"
                register={register}
                validationObject={fieldValidation.phoneNumber}
                error={errors?.phoneNumber?.message}
                onChange={() => handleChange("phoneNumber")}
              />
            </div>
            <div className="col-6">
              <InputFields
                label="City/Address"
                fieldName="cityAddress"
                register={register}
                validationObject={fieldValidation.cityAddress}
                error={errors?.cityAddress?.message}
                onChange={() => handleChange("cityAddress")}
              />
            </div>
            <div className="col-6">
              <InputFields
                label="State/Province"
                fieldName="stateProvince"
                register={register}
                validationObject={fieldValidation.stateProvince}
                error={errors?.stateProvince?.message}
                onChange={() => handleChange("stateProvince")}
              />
            </div>
            <div className="col-6">
              <InputFields
                type="dropdown"
                label="Nature of Project"
                fieldName="natureofProject"
                register={register}
                options={natureofprojectOptions}
                validationObject={fieldValidation.natureofProject}
                error={errors?.natureofProject?.message}
                onChange={() => handleChange("natureofProject")}
              />
            </div>
            <div className="col-6">
              <InputFields
                type="dropdown"
                label="Country *"
                fieldName="country"
                register={register}
                options={countries}
                validationObject={fieldValidation.country}
                error={errors?.country?.message}
                onChange={() => handleChange("country")}
              />
            </div>
            <div className="col-12">
              <InputFields
                type="textarea"
                label="Description of your project  *"
                fieldName="description"
                register={register}
                options={generateOptionLength(20)}
                validationObject={fieldValidation.description}
                error={errors?.description?.message}
                onChange={() => handleChange("description")}
              />
            </div>
            <div className="col-4">
              <InputFields
                label="Teams"
                fieldName="teams"
                register={register}
                validationObject={fieldValidation.teams}
                error={errors?.teams?.message}
                onChange={() => handleChange("teams")}
              />
            </div>
            <div className="col-4">
              <InputFields
                label="Teams"
                fieldName="hangout"
                register={register}
                validationObject={fieldValidation.hangout}
                error={errors?.hangout?.message}
                onChange={() => handleChange("hangout")}
              />
            </div>
            <div className="col-4">
              <InputFields
                label="Teams"
                fieldName="other"
                register={register}
                validationObject={fieldValidation.other}
                error={errors?.other?.message}
                onChange={() => handleChange("other")}
              />
            </div>
            <div className="d-flex justify-content-center flex-wrap flex-column flex-sm-row align-items-center gap-1 mt-3">
              <button className="btn btn-primary mx-3">Save</button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default RaqUseForm;
