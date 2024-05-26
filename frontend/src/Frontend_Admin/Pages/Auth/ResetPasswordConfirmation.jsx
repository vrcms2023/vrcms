import React, { useState } from "react";
import Button from "../../../Common/Button";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { axiosClientServiceApi } from "../../../util/axiosUtil";
import Title from "../../../Common/Title";
import Error from "../../Components/Error";
import { useParams } from "react-router-dom";
import { LoginStyled } from "../../../Common/StyledComponents/Styled-Login";

const ResetPasswordConfirmation = () => {
  const { register, handleSubmit } = useForm();
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
      if (typeof error === "object") {
        const key = Object.keys(error);
        setServerError(error[key]);
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
                  title="Reset Password Confirmation"
                  cssClass="text-center text-dark mb-4 fw-bold fs-4"
                />
                {success ? (
                  <div className="mt-3">
                    Password updated successfully Click here to login{" "}
                    <Link to="/login">Login</Link>
                  </div>
                ) : (
                  <>
                    <div className="mb-3">
                      <label
                        htmlFor="signPassord"
                        className="form-label text-dark fw-normal"
                      >
                        Password
                      </label>
                      <input
                        type="password"
                        {...register("new_password", {
                          required: true,
                        })}
                        required
                        name="new_password"
                        onChange={inputHandler}
                        className="form-control"
                        id="signPassord"
                      />
                      <small className="text-muted">
                        Passwords must be at least 6 characters.
                      </small>
                    </div>
                    <div className="mb-3">
                      <label
                        htmlFor="signPassordRe"
                        className="form-label text-dark fw-normal"
                      >
                        Re-enter password
                      </label>
                      <input
                        type="password"
                        {...register("re_new_password", {
                          required: true,
                        })}
                        required
                        name="re_new_password"
                        onChange={inputHandler}
                        className="form-control"
                        id="signPassordRe"
                      />
                    </div>

                    <div className="d-grid gap-2 mt-4">
                      <Button
                        type="submit"
                        cssClass="btn btn-lg btn-primary"
                        handlerChange={loginHandler}
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
