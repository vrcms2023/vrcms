import React, { useState } from "react";
import { useForm } from "react-hook-form";

import Button from "../../../Common/Button";
import { axiosClientServiceApi } from "../../../util/axiosUtil";
import Title from "../../../Common/Title";
import Error from "../../Components/Error";

import { LoginStyled } from "../../../Common/StyledComponents/Styled-Login";
import Ancher from "../../../Common/Ancher";
import { InputFields } from "../../Components/forms/FormFields";
import { fieldValidation } from "../../../util/validationUtil";

const ResetPassword = () => {
  const {
    register,
    reset,
    handleSubmit,
    clearErrors,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
  });

  const [success, setSuccess] = useState(false);
  const [serverError, setServerError] = useState(false);

  const resetPassword = async (email) => {
    setServerError("");
    const body = JSON.stringify(email);
    try {
      const data = await axiosClientServiceApi.post(`/user/auth/users/reset_password/`, body);
      if (data.status === 204) {
        setSuccess(true);
      }
    } catch (error) {
      if (error) {
        setServerError(error);
      } else setServerError(error);
    }
  };
  const handleChange = (fieldName) => {
    clearErrors(fieldName);
  };

  const loginHandler = () => {};

  const inputHandler = (e) => {
    clearErrors();
  };

  return (
    <LoginStyled>
      <div className="text-center">
        <Ancher
          Ancherpath="/login"
          AncherClass="btn btn-outline mt-5 w-auto"
          handleModel=""
          AncherLabel=""
          icon="fa-home"
          iconCss="fs-4"
        />
      </div>
      <div className="login mt-5">
        <div className="d-flex flex-column justify-content-center align-items-center">
          <form onSubmit={handleSubmit(resetPassword)} className="shadow-lg">
            {serverError && (
              <div className="fw-medium">{serverError && <Error>{serverError}</Error>}</div>
            )}
            <Title title="Reset Password" cssClass="text-center text-dark mb-4 fw-medium fs-4" />
            {success ? (
              <div>Email sent to your resgister email id please check</div>
            ) : (
              <>
                <InputFields
                  type="text"
                  label="Email"
                  fieldName="email"
                  register={register}
                  isRequired={true}
                  validationObject={fieldValidation.email}
                  error={errors?.email?.message}
                  onChange={() => handleChange("email")}
                />

                <div className="d-flex justify-content-center gap-2 mt-4">
                  <Ancher
                    Ancherpath="/login"
                    AncherClass="btn btn-outline  w-auto"
                    handleModel=""
                    AncherLabel="Cancel"
                    icon=""
                    // icon="fa-arrow-right"
                    iconCss="fs-4"
                  />
                  <Button
                    type="submit"
                    cssClass="btn btn-lg btn-primary"
                    handlerChange={() => {}}
                    label="Submit"
                  />
                </div>
              </>
            )}
          </form>
        </div>
      </div>
    </LoginStyled>
  );
};

export default ResetPassword;
