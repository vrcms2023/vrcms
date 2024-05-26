import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { getCookie } from "../../util/cookieUtil";

const ProtectedRoute = (props) => {
  const userToken = getCookie("access");
  let is_appAccess = getCookie("is_appAccess")
    ? JSON.parse(getCookie("is_appAccess"))
    : false;

  if (is_appAccess && userToken) {
    return <Outlet />;
  } else if (!is_appAccess && userToken) {
    return <Navigate to="/unauthorized" />;
  } else {
    return <Navigate to="/login" />;
  }
};
export default ProtectedRoute;
