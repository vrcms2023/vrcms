import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import _ from "lodash";
import { useLocation } from "react-router-dom";
import { getCookie } from "../../util/cookieUtil";
import { isAppAccess } from "../../util/permissions";

export const useAdminLoginStatus = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [hasPermission, setHasPermission] = useState(false);
  const { userInfo, permissions } = useSelector((state) => state.auth);
  const location = useLocation();
  let permissionsPath = _.filter(permissions, (item) => {
    return location.pathname.match(item.name);
  });
  let getHome = _.filter(permissions, (item) => {
    return item.name === "/home";
  });

  useEffect(() => {
    setIsAdmin(false);
    setHasPermission(false);
    if (!isAppAccess(userInfo)) {
      setIsAdmin(false);
    }
    if (getCookie("access") && isAppAccess(userInfo)) {
      setIsAdmin(true);
    }
    if (userInfo?.is_admin) permissionsPath = ["ALL"];
    if (location.pathname === "/" && getHome.length > 0)
      permissionsPath = getHome;
    if (getCookie("access") && permissionsPath.length > 0) {
      setHasPermission(true);
    }
  }, [userInfo, permissions, location.pathname]);

  return { isAdmin, hasPermission };
};

export default useAdminLoginStatus;
