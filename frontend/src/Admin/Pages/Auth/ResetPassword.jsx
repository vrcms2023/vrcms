import React, { useState } from "react";
import { useForm } from "react-hook-form";

import Button from "../../../Common/Button";
import { axiosClientServiceApi } from "../../../util/axiosUtil";
import Title from "../../../Common/Title";
import Error from "../../Components/Error";

import { LoginStyled } from "../../../Common/StyledComponents/Styled-Login";

const ResetPassword = () => {
  const { register, handleSubmit } = useForm();
  const [success, setSuccess] = useState(false);
  const [serverError, setServerError] = useState(false);
  const resetPassword = async (email) => {
    reset();
    const body = JSON.stringify(email);
    try {
      const data = await axiosClientServiceApi.post(
        `/user/auth/users/reset_password/`,
        body,
      );
      if (data.status === 204) {
        setSuccess(true);
      }
    } catch (error) {
      if (error.email) {
        setServerError(error.email[0]);
      } else setServerError(error[0]);
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
              <form
                onSubmit={handleSubmit(resetPassword)}
                className="shadow-lg"
              >
                {serverError ? (
                  <p className="fw-bold">
                    {serverError && <Error>{serverError}</Error>}
                  </p>
                ) : (
                  ""
                )}
                <Title
                  title="Reset Password"
                  cssClass="text-center text-dark mb-4 fw-bold fs-4"
                />
                {success ? (
                  <div>Email sent to your resgister email id please check</div>
                ) : (
                  <>
                    <input
                      type="text"
                      {...register("email")}
                      name="email"
                      onChange={inputHandler}
                      className="form-control bg-light"
                      id="userName"
                      aria-describedby="emailHelp"
                    />

                    <div className="d-grid gap-2 mt-4">
                      <Button
                        type="submit"
                        cssClass="btn btn-lg btn-primary"
                        handlerChange={loginHandler}
                        label="Reset Password"
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

export default ResetPassword;
