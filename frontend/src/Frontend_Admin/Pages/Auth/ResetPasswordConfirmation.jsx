import React, { useState } from "react";
import Button from "../../../Common/Button";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { axiosClientServiceApi } from "../../../util/axiosUtil";
import Title from "../../../Common/Title";
import Error from "../../Components/Error";
import { useParams } from "react-router-dom";
import { LoginStyled } from "../../../Common/StyledComponents/Styled-Login";
import { InputFields } from "../../Components/forms/FormFields";
import { fieldValidation } from "../../../util/validationUtil";

const ResetPasswordConfirmation = () => {
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
  let { uid, token } = useParams();

  const resetPassword = async (formData) => {
    const data = {
      uid: uid,
      token: token,
      new_password: formData.new_password,
      re_new_password: formData.re_new_password,
    };

    const body = JSON.stringify(data);
    try {
      const data = await axiosClientServiceApi.post(
        `/user/auth/users/reset_password_confirm/`,
        body
      );
      if (data.status === 204) {
        setSuccess(true);
      }
    } catch (error) {
      setServerError(error[0]);
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
      <div className="login">
        <div className="bg-white d-flex justify-content-center align-items-center flex-column">
          <div className="container">
            <div className="d-flex flex-column justify-content-center align-items-center">
              <form onSubmit={handleSubmit(resetPassword)} className="shadow-lg">
                {serverError ? (
                  <div className="fw-bold">{serverError && <Error>{serverError}</Error>}</div>
                ) : (
                  ""
                )}
                <Title
                  title="Reset Password Confirmation"
                  cssClass="text-center text-dark mb-4 fw-bold fs-4"
                />
                {success ? (
                  <div className="mt-3">
                    Password updated successfully Click here to login <Link to="/login">Login</Link>
                  </div>
                ) : (
                  <>
                    <InputFields
                      type="password"
                      label="Password"
                      fieldName="new_password"
                      register={register}
                      isRequired={true}
                      validationObject={fieldValidation.password}
                      error={errors?.new_password?.message}
                      onChange={() => handleChange("new_password")}
                    />
                    <small className="text-muted">Passwords must be at least 6 characters.</small>

                    <InputFields
                      type="password"
                      label="Confirm Password"
                      fieldName="re_new_password"
                      register={register}
                      isRequired={true}
                      validationObject={fieldValidation.confirmPassword}
                      error={errors?.re_new_password?.message}
                      onChange={() => handleChange("re_new_password")}
                    />

                    <div className="d-grid gap-2 mt-4">
                      <Button
                        type="submit"
                        cssClass="btn btn-lg btn-primary"
                        handlerChange={() => {}}
                        label="Update Password"
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

export default ResetPasswordConfirmation;
