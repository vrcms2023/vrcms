import React from "react";
import { Navigate, Outlet } from "react-router-dom";

import { getCookie } from "../../util/cookieUtil";

const AdminProtectedRoute = () => {
  const userToken = getCookie("access");
  let is_appAccess = getCookie("is_appAccess")
    ? JSON.parse(getCookie("is_appAccess"))
    : false;
  let is_admin = getCookie("is_admin")
    ? JSON.parse(getCookie("is_admin"))
    : false;

  if (is_appAccess && userToken && is_admin) {
    return <Outlet />;
  } else if (!is_appAccess && !is_admin && userToken) {
    return <Navigate to="/unauthorized" />;
  } else {
    return <Navigate to="/unauthorized" />;
  }
};
export default AdminProtectedRoute;
