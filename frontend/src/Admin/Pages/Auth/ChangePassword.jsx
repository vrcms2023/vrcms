import React, { useState } from "react";
import Button from "../../../Common/Button";
import { useForm } from "react-hook-form";
import { axiosServiceApi } from "../../../util/axiosUtil";
import Title from "../../../Common/Title";
import Error from "../../Components/Error";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../../features/auth/authSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { LoginStyled } from "../../../Common/StyledComponents/Styled-Login";

const ChangePassword = () => {
  const { register, handleSubmit } = useForm();
  const [success, setSuccess] = useState(false);
  const [serverError, setServerError] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const resetPassword = async (formData) => {
    const data = {
      current_password: formData.current_password,
      new_password: formData.new_password,
      re_new_password: formData.re_new_password,
    };
    const body = JSON.stringify(data);
    try {
      const data = await axiosServiceApi.post(
        `/user/auth/users/set_password/`,
        body,
      );
      if (data.status == 204) {
        setSuccess(true);
        toast.success(`Password updated successfully `);
        setTimeout(() => {
          dispatch(logout());
        }, 5000);
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
            {/* <div className="row mt-4">
          <div className="col-12">
              <Button
                type="submit"
                cssClass="btn btn-secondary float-end"
                label="Back"
                icon="fa-chevron-left"
                handlerChange={() => navigate("/main")}
              />
          </div>
        </div> */}
            <div className="row d-flex flex-column justify-content-center align-items-center">
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
                  title="Change Password"
                  cssClass="text-center text-dark mb-4 fw-bold fs-4"
                />

                {success ? (
                  <>
                    <div>
                      Your password Updated successfully, login with new
                      password
                    </div>
                    <div className="mt-3">
                      Click here to login ?{" "}
                      <Link onClick={dispatch(logout())} to="/login">
                        Login
                      </Link>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="mb-3">
                      <label
                        htmlFor="currentPassord"
                        className="form-label text-dark fw-normal"
                      >
                        Current Password
                      </label>
                      <input
                        type="password"
                        {...register("current_password", {
                          required: true,
                        })}
                        required
                        name="current_password"
                        onChange={inputHandler}
                        className="form-control"
                        id="signPassord"
                      />
                    </div>
                    <div className="mb-3">
                      <label
                        htmlFor="signPassord"
                        className="form-label text-dark fw-normal"
                      >
                        New Password
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

export default ChangePassword;
