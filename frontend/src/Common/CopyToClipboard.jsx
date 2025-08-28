import React, { useState, useRef } from "react";

const CopyToClipboard = ({ children }) => {
  const [copied, setCopied] = useState(false);
  const textRef = useRef();

  const handleCopy = async () => {
    try {
      const text = textRef.current.innerText;
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // reset after 2s
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  return (
    <div className="d-flex align-items-center">
      <span ref={textRef} className="me-2">
        {children}
      </span>
      <i
        className={`fa ${copied ? "fa-check text-success" : "fa-copy"} cursor-pointer`}
        onClick={handleCopy}
        style={{ cursor: "pointer" }}
        title={copied ? "Copied!" : "Copy"}
      ></i>
    </div>
  );
};

export default CopyToClipboard;
