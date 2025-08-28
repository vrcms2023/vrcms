import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

import Button from "../../../Common/Button";
import { axiosClientServiceApi } from "../../../util/axiosUtil";
import Title from "../../../Common/Title";
import Error from "../../Components/Error";

// CSS Styles
import { LoginStyled } from "../../../Common/StyledComponents/Styled-Login";
import { InputFields } from "../../Components/forms/FormFields";
import { fieldValidation } from "../../../util/validationUtil";
import Ancher from "../../../Common/Ancher";

const ResendActivationEmail = () => {
  const {
    register,
    handleSubmit,
    clearErrors,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
  });
  const [success, setSuccess] = useState(false);
  const [serverError, setServerError] = useState(false);
  const resetPassword = async (email) => {
    const body = JSON.stringify(email);
    try {
      const data = await axiosClientServiceApi.post(`/user/auth/users/resend_activation/`, body);
      if (data.status === 204) {
        setSuccess(true);
      }
    } catch (error) {
      if (error.email) {
        setServerError(error.email[0]);
      } else setServerError(error);
    }
  };

  const loginHandler = () => {};

  const inputHandler = (e) => {
    reset();
  };

  const reset = () => {
    setSuccess(false);
    setServerError(false);
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
      <div className="login">
        <div className="bg-white d-flex justify-content-center align-items-center flex-column">
          <div className="container">
            <div className="d-flex flex-column justify-content-center align-items-center">
              <form onSubmit={handleSubmit(resetPassword)} className="shadow-lg">
                {serverError && (
                  <div className="fw-bold">{serverError && <Error>{serverError}</Error>}</div>
                )}
                <Title
                  title="Resend Activation Email"
                  cssClass="text-center text-dark mb-4 fw-bold fs-4"
                />
                {success ? (
                  <>
                    <div>
                      Email sent to your resgister email id please activate your account before
                      login
                    </div>
                    <div className="mt-3">
                      Click here to ? <Link to="/login">Login</Link>
                    </div>
                  </>
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

                    <div className="d-grid gap-2 mt-4">
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
        </div>
      </div>
    </LoginStyled>
  );
};

export default ResendActivationEmail;
