import React from "react";
import { fieldValidation } from "../../util/validationUtil";
import { InputFields } from "../../Frontend_Admin/Components/forms/FormFields";
import { useForm } from "react-hook-form";
import { axiosClientServiceApi } from "../../util/axiosUtil";
import { toast } from "react-toastify";
import Title from "../Title";
import CSRFToken from "../../Frontend_Views/Components/CRSFToken";

const ContactForm = ({ categoryId }) => {
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
    data["categoryId"] = categoryId ? categoryId : "";

    try {
      const response = await axiosClientServiceApi.post(`/contactus/listcreate/`, {
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
      <Title title="Feel free to write" cssClass="fs-4 mb-3 formTitle" />
      <form className="my-0 mx-auto contactForm" onSubmit={handleSubmit(onFormSubmit)}>
        <CSRFToken />
        <InputFields
          label="Name"
          fieldName="firstName"
          register={register}
          isRequired={true}
          validationObject={fieldValidation.firstName}
          error={errors?.firstName?.message}
          onChange={() => handleChange("firstName")}
        />

        <InputFields
          label="Email"
          fieldName="email"
          register={register}
          isRequired={true}
          validationObject={fieldValidation.email}
          error={errors?.email?.message}
          onChange={() => handleChange("email")}
        />
        <InputFields
          label="Phone"
          type="number"
          fieldName="phoneNumber"
          register={register}
          validationObject={fieldValidation.phoneNumber}
          error={errors?.phoneNumber?.message}
        />
        <InputFields
          type="textarea"
          label="Message"
          fieldName="description"
          register={register}
          isRequired={true}
          validationObject={fieldValidation.description}
          error={errors?.description?.message}
          onChange={() => handleChange("description")}
        />

        <div className="mb-3 row">
          <div className="col-sm-12 mt-2">
            <button type="submit" className="btn btn-primary">
              Send Request
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default ContactForm;
