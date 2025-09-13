import React, { Children } from "react";

const PillButton = ({
  cssClass,
  id,
  dataBsToggle = "pill",
  dataBsTarget,
  type = "button",
  role = "tab",
  ariaControls,
  ariaSelected,
  label,
  disabled = false,
}) => {
  return (
    <button
      disabled={disabled}
      id={id}
      type={type}
      className={`nav-link ${cssClass}`}
      role={role}
      aria-controls={ariaControls}
      aria-selected={ariaSelected}
      data-bs-toggle={dataBsToggle}
      data-bs-target={dataBsTarget}
    >
      {label}
    </button>
  );
};

export default PillButton;
