import React from "react";
import { Link } from "react-router-dom";

const Ancher = ({
  AncherLabel,
  AncherClass,
  Ancherpath,
  AnchersvgColor,
  handleModel,
  icon,
  iconCss
}) => {
  return (
    <>
      <Link to={Ancherpath} className={AncherClass} onClick={handleModel}>
        <span>{AncherLabel} 
        {icon && <i class={`fa ${icon} ${iconCss}`} aria-hidden="true"></i>}
        </span>
        {/* {AnchersvgColor && (
          <svg
            width="30"
            height="16"
            viewBox="0 0 37 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M36.6866 9.22701C37.0881 8.8478 37.1062 8.21489 36.727 7.81338L30.5474 1.27026C30.1682 0.86874 29.5353 0.850657 29.1338 1.22987C28.7322 1.60908 28.7142 2.24199 29.0934 2.64351L34.5864 8.45961L28.7703 13.9526C28.3687 14.3318 28.3507 14.9647 28.7299 15.3662C29.1091 15.7678 29.742 15.7858 30.1435 15.4066L36.6866 9.22701ZM0.97144 8.49959L35.9714 9.49959L36.0286 7.50041L1.02856 6.50041L0.97144 8.49959Z"
              fill={AnchersvgColor}
            />
          </svg>
        )} */}
      </Link>
    </>
  );
};

export default Ancher;
