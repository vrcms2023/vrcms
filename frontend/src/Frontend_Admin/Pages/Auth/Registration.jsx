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

import { InputFields } from "../../Components/forms/FormFields";
import { fieldValidation } from "../../../util/validationUtil";
import Ancher from "../../../Common/Ancher";

const Registration = () => {
  const [customError, setCustomError] = useState(null);

  const { error, success } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
    data.email = data.email.toLowerCase();
    dispatch(registerUser(data));
    setCustomError("");
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
                  Your registration has been successful. You will receive an account activation
                  email shortly.{" "}
                </div>
              )}
            </div>
            <InputFields
              type="text"
              label="Name"
              fieldName="userName"
              register={register}
              isRequired={true}
              validationObject={fieldValidation.isRequired}
              error={errors?.userName?.message}
              onChange={() => handleChange("userName")}
            />
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
            <InputFields
              type="password"
              label="Password"
              fieldName="password"
              register={register}
              isRequired={true}
              validationObject={fieldValidation.password}
              error={errors?.password?.message}
              onChange={() => handleChange("password")}
            />
            <InputFields
              type="password"
              label="Confirm Password"
              fieldName="re_password"
              register={register}
              isRequired={true}
              validationObject={fieldValidation.confirmPassword}
              error={errors?.re_password?.message}
              onChange={() => handleChange("re_password")}
            />

            <div className="my-4 d-flex flex-column gap-1 loginLinks">
              <div className="mt-1">
                Aleardy a User ? <Link to="/login">Login</Link>
              </div>
              <div className="mt-1">
                Not Activate your account ?<Link to="/resend_activation"> Activate</Link>
              </div>
            </div>

            <div className="d-grid gap-2 mt-4">
              <Button
                type="submit"
                cssClass="btn btn-lg btn-primary"
                handlerChange={() => {}}
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
