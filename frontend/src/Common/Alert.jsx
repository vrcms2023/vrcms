import React from "react";

const Alert = ({ mesg, cssClass }) => {
  return (
    <div className={cssClass} role="alert">
      {mesg}
    </div>
  );
};

export default Alert;
