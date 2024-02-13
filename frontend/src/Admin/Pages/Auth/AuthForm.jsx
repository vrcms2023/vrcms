import React from "react";
import Login from "./Login";
import Registration from "./Registration";

// CSS Styles
import { LoginStyled } from "../../../Common/StyledComponents/Styled-Login";

const AuthForm = () => {
  return (
    <LoginStyled>
      <div className="container-fluid">
        <div className="row authForm d-flex justify-contnet-center align-items-center">
          <div className="col-12 col-md-6">
            <Login />
          </div>
          <div className="col-12 col-md-6 register">
            <Registration />
          </div>
        </div>
      </div>
    </LoginStyled>
  );
};

export default AuthForm;
