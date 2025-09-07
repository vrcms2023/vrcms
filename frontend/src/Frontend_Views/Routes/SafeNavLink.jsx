// SafeNavLink.jsx
import React from "react";
import { NavLink, useLocation } from "react-router-dom";

export default function SafeNavLink({ to, onClick, ...rest }) {
  const location = useLocation();
  const currentUrl = location.pathname + location.search + location.hash;

  const handleClick = (e) => {
    const targetUrl =
      typeof to === "string" ? to : (to.pathname || "") + (to.search || "") + (to.hash || "");

    if (targetUrl === currentUrl) {
      e.preventDefault();
      return;
    }

    if (onClick) onClick(e);
  };

  return <NavLink to={to} onClick={handleClick} {...rest} />;
}
