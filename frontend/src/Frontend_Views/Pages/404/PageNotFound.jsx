import React from "react";
import { NavLink } from "react-router-dom";
import SEO from "../../../Common/SEO";

const PageNotFound = () => {
  return (
    <div className="text-center py-5" style={{ marginTop: "100px" }}>
      <SEO
        title={"EZI Press page not found Page "}
        description={"EZI Press - Custom CMS"}
      />
      <p className="text-dark fs-5">
        <span className="d-block fs-1">Oops!</span>Sorry, but the page you were
        trying to view does not exist.
      </p>
      <h1 className="text-dark fw-bold my-5 " style={{ fontSize: "7rem" }}>
        404
      </h1>
      <NavLink to="/" className="btn btn-primary">
        Back to home
      </NavLink>
    </div>
  );
};

export default PageNotFound;
