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
    return location.pathname.toLowerCase().match(item.name.toLowerCase());
  });
  let getHome = _.filter(permissions, (item) => {
    return item.name === "/home";
  });

  useEffect(() => {
    const updateUserPermission = () => {
      setIsAdmin(false);
      setHasPermission(false);
      if (!isAppAccess(userInfo)) {
        setIsAdmin(false);
      }
      if (getCookie("access") && isAppAccess(userInfo)) {
        setIsAdmin(true);
      }
      if (userInfo?.is_admin) setHasPermission(true);
      if (location.pathname === "/" && getHome.length > 0)
        setHasPermission(true);
      if (getCookie("access") && permissionsPath.length > 0) {
        setHasPermission(true);
      }
    };
    updateUserPermission();
  }, [
    userInfo,
    permissions,
    permissionsPath.length,
    location.pathname,
    getHome.length,
  ]);

  return { isAdmin, hasPermission };
};

export default useAdminLoginStatus;
