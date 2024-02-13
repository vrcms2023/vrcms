import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import UnauthorizedPage from "../../Admin/Pages/Login/UnauthorizedPage";
import { getCookie } from "../../util/cookieUtil";

const ProtectedRoute = (props) => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    const checkUserToken = () => {
      const userToken = getCookie("access");
      let is_appAccess = getCookie("is_appAccess")
        ? JSON.parse(getCookie("is_appAccess"))
        : false;

      if (!is_appAccess) {
        setIsLoggedIn(false);
        return navigate("/unauthorized");
      }

      if (!userInfo && !userToken) {
        setIsLoggedIn(false);
        return navigate("/login");
      }

      setIsLoggedIn(true);
    };

    checkUserToken();
  }, [isLoggedIn]);

  return <React.Fragment>{isLoggedIn ? props.children : ""}</React.Fragment>;
};
export default ProtectedRoute;
