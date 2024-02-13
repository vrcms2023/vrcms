import React from "react";
import "./spinner.css";

export default function LoadingSpinner(isLoading) {
  const iconStyle = { width: "60px", height: "60px" };
  return (
    <>
      <div className="overlay show"></div>
      <div className="spanner show">
        {/* <div class="loader"></div> */}
        <div className="d-flex justify-content-center align-item-center">
          <div className="spinner-border" style={iconStyle} role="status">
            {" "}
          </div>
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    </>
  );
}
