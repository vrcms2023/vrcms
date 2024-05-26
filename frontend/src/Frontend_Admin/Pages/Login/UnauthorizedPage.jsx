import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Title from "../../../Common/Title";
import { useDispatch } from "react-redux";
import { logout } from "../../../redux/auth/authSlice";
import { removeAllCookies } from "../../../util/cookieUtil";

const UnauthorizedPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userName = localStorage.getItem("userName");

  const logOutHandler = () => {
    removeAllCookies();
    dispatch(logout());
    navigate("/login");
    window.location.reload();
  };

  // useEffect(() => {
  //   setTimeout(() => {
  //     dispatch(logout());
  //   }, 5000);
  // }, []);

  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center"
      style={{ marginTop: "200px" }}
    >
      <Title title="Unauthorized" cssClass="text-dark fs-5 mb-4" />
      <div className="mt-3">
        <span> Hi {userName},</span>
        You dont have permission to access the applicaiton, please contact
        applicaiton admin
      </div>
      <div className="unauthorized mt3">
        <span>
          <NavLink to="/#" onClick={logOutHandler}>
            Login
          </NavLink>{" "}
          to gain access
        </span>
      </div>
    </div>
  );
};
export default UnauthorizedPage;
