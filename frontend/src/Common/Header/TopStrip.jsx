import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

// Components
import Title from "../Title";
import { getCookie, removeAllCookies } from "../../util/cookieUtil";
import { logout, updatedMenulist } from "../../redux/auth/authSlice";
import { useAdminLoginStatus } from "../customhook/useAdminLoginStatus";

// Stylesheet
import { TopStripStyled } from "../StyledComponents/Styled-Topstrip";

const TopStrip = () => {
  const [footerValues, setFooterValues] = useState([]);
  const { isAdmin } = useAdminLoginStatus();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { footerData } = useSelector((state) => state.footerData);

  useEffect(() => {
    if (footerData?.address?.length > 0) {
      setFooterValues(footerData.address[0]);
    }
  }, [footerData]);

  function logOutHandler() {
    removeAllCookies();
    dispatch(updatedMenulist([]));
    dispatch(logout());
    toast.success("Logout successfully");
    window.location.href = "/login";
  }
  return (
    <TopStripStyled>
      {isAdmin && (
        <div className="d-flex justify-content-center justify-content-md-between align-items-center px-5 py-3 topStrip">
          <div className="d-none d-md-flex">
            <Title
              title="Welcome to EZI Press"
              mainTitleClassess="fw-normal"
              subTitleClassess=""
            />
          </div>
          <div className="d-flex justify-content-between quickContact gap-5">
            <span className="d-none d-md-flex">
              {" "}
              {footerValues?.phonen_number
                ? footerValues?.phonen_number
                : ""}{" "}
            </span>

            {footerValues.emailid ? (
              <span className="d-none d-md-flex justify-content-center align-items-center">
                <i className="fa fa-paper-plane" aria-hidden="true"></i>
                <a href={`mailto:${footerValues.emailid}`}>
                  {footerValues.emailid}
                </a>
              </span>
            ) : (
              ""
            )}

            <>
              <span className="d-none d-md-flex justify-content-center align-items-center">
                <i className="fa fa-user-circle me-2" aria-hidden="true"></i>
                <small>{getCookie("userName")}</small>
              </span>

              <span>
                <a href="#nolink" className="logOut" onClick={logOutHandler}>
                  <i className="fa fa-sign-out me-2" aria-hidden="true"></i>
                  Logout
                </a>
              </span>
            </>
          </div>
        </div>
      )}
    </TopStripStyled>
  );
};
export default TopStrip;
