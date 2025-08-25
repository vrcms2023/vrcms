import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { StyledShareComponent } from "./StyledComponents/Styled-Share-Component";
// uselocation

const ShareButtons = ({ name }) => {
  const location = useLocation();
  // const shareUrl = "https://yourwebsite.com/careers";
  const shareUrl = `${window.location.origin}${location.pathname}`;
  //console.log(shareUrl, "shareUrl");
  const title = "Explore exciting career opportunities with us!";
  const emailSubject = "Career Opportunities at Our Company";
  const emailBody = `Hi,\n\nI thought you might be interested in this job opportunity:\n\n${shareUrl}`;

  const [show, setShow] = useState(true);
  const wrapperRef = useRef(null);

  useEffect(() => {
    const handleOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setShow(false);
      }
    };

    document.addEventListener("mousemove", handleOutside);
    document.addEventListener("click", handleOutside);
    return () => {
      document.removeEventListener("mousemove", handleOutside);
      document.removeEventListener("click", handleOutside);
    };
  }, []);

  return (
    <StyledShareComponent ref={wrapperRef}>
      <div className="btn btn-sm btn-outline share" onMouseOver={() => setShow(true)}>
        <i className="fa fa-share-alt me-1" aria-hidden="true"></i>
        <span className="">{name}</span>
      </div>

      {show && (
        <div className="share-buttons" onMouseOver={() => setShow(true)}>
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fa fa-facebook-square" />
          </a>
          <a
            href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fa fa-linkedin-square" />
          </a>
          <a
            href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(title)}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fa fa-twitter-square" />
          </a>
          <a
            href={`mailto:?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`}
          >
            <i className="fa fa-envelope-o" />
          </a>
        </div>
      )}
    </StyledShareComponent>
  );
};

export default ShareButtons;
