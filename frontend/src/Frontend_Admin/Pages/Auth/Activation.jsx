import React, { useEffect, useState } from "react";
import { axiosClientServiceApi } from "../../../util/axiosUtil";
import { useParams } from "react-router-dom";
import Title from "../../../Common/Title";
import Error from "../../Components/Error";

// CSS Styles
import { LoginStyled } from "../../../Common/StyledComponents/Styled-Login";
import LoadingSpinner from "../../../Common/LoadingSpinner";
import SEO from "../../../Common/SEO";

const Activation = () => {
  const [verified, setVerified] = useState(false);
  let { uid, token } = useParams();

  const [isLoading, setIsLoading] = useState(true);
  const [serverError, setServerError] = useState(false);

  useEffect(() => {
    verify_account();
  }, [uid, token]);

  const verify_account = async () => {
    const data = {
      uid: uid,
      token: token,
    };

    const body = JSON.stringify(data);

    try {
      const response = await axiosClientServiceApi.post(
        `/user/auth/users/activation/`,
        body
      );
      setIsLoading(false);
      if (response.status === 204) {
        setVerified(true);
      }
    } catch (error) {
      setIsLoading(false);
      setVerified(false);
      // if(error.response.status === 403) {
      //     setServerError(true)
      // }
      setServerError(error);
    }
  };

  return (
    <LoginStyled>
      <div className="login">
        <SEO
          title={"EZI Press Activation Page "}
          description={"EZI Press - Custom CMS"}
        />
        {isLoading && <LoadingSpinner />}
        <div className="bg-white d-flex justify-content-center align-items-center flex-column">
          <div className="container">
            <div
              className="d-flex flex-column justify-content-center align-items-center"
              style={{ margin: "100px 0" }}
            >
              <Title
                title="Verify your Account"
                cssClass="text-center text-dark mb-4 fw-bold fs-4"
              />
              {verified ? (
                <h5>
                  Your Account verified please contact your application admin to
                  activate your account
                </h5>
              ) : (
                <div>
                  <p className="fw-bold">
                    {serverError && <Error>{serverError}</Error>}
                  </p>
                  <br />
                  {serverError && (
                    <p className="text-center">Please contact your admin</p>
                  )}
                </div>
              )}
              {isLoading && (
                <div className="d-grid gap-2 mt-4">
                  <h5> Please wait your account is verfication in process </h5>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </LoginStyled>
  );
};

export default Activation;
