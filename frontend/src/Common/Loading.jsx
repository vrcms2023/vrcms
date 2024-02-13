import React from "react";

const Loading = ({ text, cssClasses }) => {
  return (
    <div className={`p-4 fs-5 text-center text-warning ${cssClasses}`}>
      {text}
    </div>
  );
};

export default Loading;
