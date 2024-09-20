import React, { useState } from "react";

import { fieldValidation, removeAllCookies } from "../../util/validationUtil";
import { removeCookie, setCookie } from "../../util/cookieUtil";
import {
  InputField,
  InputFields,
  TextAreaField,
} from "../../Frontend_Admin/Components/forms/FormFields";
import { useForm } from "react-hook-form";
import { axiosClientServiceApi } from "../../util/axiosUtil";
import { toast } from "react-toastify";
import Title from "../Title";

const ContactForm = ({ categoryId }) => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({});

  const onFormSubmit = async (data) => {
    data["categoryId"] = categoryId ? categoryId : "";

    try {
      const response = await axiosClientServiceApi.post(`/contactus/`, {
        ...data,
      });
      if (response.status === 201) {
        toast.success("Your request is submit succuessfully");
        reset();
      } else {
        toast.error("unable to process your request");
      }
    } catch (error) {
      toast.error("unable to process your request");
    }
  };

  return (
    <>
    <small>SEND US EMAIL</small>
    <Title title="Contact Feel free to write" cssClass="formTitle fs-4 fw-bold mb-3" />
    <form
      className="my-0 mx-auto contactForm"
      onSubmit={handleSubmit(onFormSubmit)}
    >
      <InputFields
        label="Name"
        fieldName="firstName"
        register={register}
        validationObject={fieldValidation.firstName}
        error={errors?.firstName?.message}
      />
      <InputField
        label="Email"
        fieldName="email"
        register={register}
        validationObject={fieldValidation.email}
        error={errors?.email?.message}
      />
      <InputField
        label="Phone"
        fieldName="phoneNumber"
        register={register}
        validationObject={fieldValidation.phoneNumber}
        error={errors?.phoneNumber?.message}
      />
      <TextAreaField
        label="Message"
        fieldName="description"
        register={register}
        validationObject={fieldValidation.description}
        error={errors?.description?.message}
      />

      <div className="mb-3 row">
        <div className="col-sm-12 mt-2">
          <button
            type="submit"
            className="btn btn-primary"
          >
            Send Request
          </button>
        </div>
      </div>
    </form>
    </>
    
  );
};

export default ContactForm;
