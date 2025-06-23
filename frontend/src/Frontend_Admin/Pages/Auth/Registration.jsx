import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import Title from "../../../Common/Title";
import Button from "../../../Common/Button";
import Error from "../../Components/Error";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../../../redux/auth/authActions";
import { updatedState } from "../../../redux/auth/authSlice";
import { toast } from "react-toastify";
import { removeAllCookies } from "../../../util/cookieUtil";
import CSRFToken from "../../../Frontend_Views/Components/CRSFToken";

// CSS Styles
import { LoginStyled } from "../../../Common/StyledComponents/Styled-Login";

const Registration = () => {
  const [customError, setCustomError] = useState(null);

  const { error, success } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    // redirect user to login page if registration was successful
    if (success) {
      toast.success("Register successfully");
      navigate("/login");
    }
    if (error) {
      setCustomError(error);
    }
    dispatch(updatedState());
  }, [navigate, success, error, dispatch]);

  useEffect(() => {
    removeAllCookies();
  }, []);

  const submitForm = (data) => {
    // check if passwords match
    if (data.password !== data.re_password) {
      setCustomError("Password mismatch");
      return;
    }
    data.email = data.email.toLowerCase();
    dispatch(registerUser(data));
  };

  const inputHandler = (e) => {
    reset();
  };

  const reset = () => {
    setCustomError(false);
  };

  const loginHandler = () => {};

  return (
    <LoginStyled>
      <div className="login">
        <div className="text-center pt-4">
          <button className="btn btn-secondary" onClick={() => navigate("/")}>
            Back to HOME
          </button>
        </div>
        <div className="d-flex justify-content-center align-items-center flex-column">
          <form onSubmit={handleSubmit(submitForm)} className="shadow-lg">
            <CSRFToken />
            <Title
              title="Create / Register account"
              cssClass="text-center text-dark mb-4 fs-4 fw-bold"
            />
            <div className="mb-3">
              {error && <Error>{error}</Error>}
              {customError && <Error>{customError}</Error>}
              {success && (
                <div>
                  Your registration has been successful. You will receive an
                  account activation email shortly.{" "}
                </div>
              )}
            </div>
            <div className="mb-3">
              <label
                htmlFor="userName"
                className="form-label text-dark fw-normal"
              >
                User name
              </label>
              <input
                type="text"
                name="userName"
                {...register("userName", { required: true })}
                className="form-control"
                onChange={inputHandler}
                id="userName"
                aria-describedby="emailHelp"
                aria-invalid={errors.userName ? "true" : "false"}
              />
              {errors.userName?.type === "required" && (
                <p role="alert">userName is required</p>
              )}
              {/* <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div> */}
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label text-dark fw-normal">
                Email
              </label>
              <input
                type="email"
                {...register("email")}
                required
                name="email"
                onChange={inputHandler}
                className="form-control"
                id="email"
                aria-describedby="emailHelp"
              />
            </div>
            <div className="mb-3">
              <label
                htmlFor="signPassord"
                className="form-label text-dark fw-normal"
              >
                Password
              </label>
              <input
                type="password"
                {...register("password")}
                required
                name="password"
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
                {...register("re_password")}
                required
                onChange={inputHandler}
                name="re_password"
                className="form-control"
                id="signPassordRe"
              />
            </div>
            <div className="my-4 d-flex flex-column gap-1 loginLinks">
              <div className="mt-1">
                Aleardy a User ? <Link to="/login">Login</Link>
              </div>
              <div className="mt-1">
                Not Activate your account ?
                <Link to="/resend_activation"> Activate</Link>
              </div>
            </div>
            {/* <div className="mb-3 form-check">
                      <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                      <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                  </div> */}
            <div className="d-grid gap-2 mt-4">
              <Button
                type="submit"
                cssClass="btn btn-lg btn-primary"
                handlerChange={loginHandler}
                label="Create"
              />
            </div>
          </form>
        </div>
      </div>
    </LoginStyled>
  );
};

export default Registration;
