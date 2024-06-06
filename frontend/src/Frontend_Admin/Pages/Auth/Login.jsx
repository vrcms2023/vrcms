import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Title from "../../../Common/Title";
import Button from "../../../Common/Button";
import Error from "../../Components/Error";
import {
  removeAllCookies,
  setCookie,
  getCookie,
} from "../../../util/cookieUtil";
import {
  userLogin,
  getUser,
  getSelectedUserPermissions,
} from "../../../redux/auth/authActions";
import { updatedPermisisons } from "../../../redux/auth/authSlice";
import CSRFToken from "../../../Frontend_Views/Components/CRSFToken";

// CSS Styles
import { LoginStyled } from "../../../Common/StyledComponents/Styled-Login";
import { isAppAccess } from "../../../util/permissions";
import Ancher from "../../../Common/Ancher";

const Login = () => {
  const { access, userInfo, error, permissions } = useSelector(
    (state) => state.auth
  );

  const dispatch = useDispatch();

  const { register, handleSubmit } = useForm();

  const navigate = useNavigate();

  // redirect authenticated user to Main screen
  useEffect(() => {
    if (access) {
      dispatch(getUser());
    }
  }, [access, dispatch]);

  useEffect(() => {
    removeAllCookies();
  }, []);

  useEffect(() => {
    if (userInfo) {
      if (!isAppAccess(userInfo)) {
        removeAllCookies();
        return navigate("/unauthorized");
      }
      if (!userInfo.is_admin) {
        dispatch(getSelectedUserPermissions(userInfo.id));
      } else {
        dispatch(updatedPermisisons());
      }

      toast.success(`${userInfo.userName} Login successfully `);
      setCookie("email", userInfo.email);
      setCookie("userName", userInfo.userName);
      setCookie("userId", userInfo.id);
      setCookie("is_admin", JSON.parse(userInfo.is_admin));
      setCookie("is_appAccess", JSON.parse(userInfo.is_appAccess));
    } else {
      if (getCookie("email")) {
        removeAllCookies();
      }
    }
  }, [userInfo, dispatch, navigate]);

  useEffect(() => {
    if (permissions.length > 0) {
      navigate("/");
      window.location.reload();
    }
  }, [permissions, navigate]);

  const submitForm = (data) => {
    dispatch(userLogin(data));
  };

  const loginHandler = () => {};

  return (
    <LoginStyled>
      <div className="text-center">
        {/* <button
          className="btn btn-secondary mt-4"
          onClick={() => navigate("/")}
        >
          Back to Home
        </button> */}
        <Ancher 
            Ancherpath="/"
            AncherClass="btn btn-outline mt-5 w-auto"
            handleModel=""
            AncherLabel=""
            icon="fa-home"
            // icon="fa-arrow-right"
            iconCss="fs-4"
          />
      </div>
      <div className="login">
        <div className="d-flex justify-content-center align-items-center flex-column">
          <form onSubmit={handleSubmit(submitForm)} className="shadow">
            <CSRFToken />
            {error ? (
              <p className="fw-bold">{error && <Error>{error}</Error>}</p>
            ) : (
              ""
            )}
            <input
              type="hidden"
              {...register("csrfmiddlewaretoken")}
              name="csrfmiddlewaretoken"
              value="m6pDnuW9RPTEuK66x0H4oc09JSfyv6bD"
            />
            {/* <Title
              title="login"
              cssClass="text-center text-dark mb-4 fw-medium fs-4"
            /> */}
            <div className="mb-3">
              <label
                htmlFor="userName"
                className="form-label text-dark fw-normal"
              >
                Email
              </label>
              <input
                type="text"
                {...register("email")}
                name="email"
                className="form-control bg-light"
                id="userName"
                aria-describedby="emailHelp"
              />
              {/* <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div> */}
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
                name="password"
                className="form-control bg-light"
                id="signPassord"
              />
            </div>

            <div className="d-grid gap-2 mt-4">
              <Button
                type="submit"
                cssClass="btn btn-lg btn-primary"
                handlerChange={loginHandler}
                label="Login"
              />
            </div>

            <div className="my-4 d-flex flex-column gap-1 loginLinks">
              <div className="">
                <small>
                  Don't have an account ?{" "}
                  <Link to="/register" className="">
                    Sign Up{" "}
                  </Link>
                </small>
              </div>
              <div className="">
                <small>
                  Forgot your Password ?{" "}
                  <Link to="/reset_password  ">Reset Password </Link>
                </small>
              </div>
              <div className="">
                <small>
                  Not Activate your account ?{" "}
                  <Link to="/resend_activation">Activate</Link>
                </small>
              </div>
            </div>
          </form>
        </div>
      </div>
    </LoginStyled>
  );
};

export default Login;
