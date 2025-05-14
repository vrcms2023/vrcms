import React from "react";

const RichTextView = ({ data, className = "" }) => {
  return (
    <div className="quill ">
      <div className="ql-container ql-snow">
        <div className="ql-editor">
          <div
            className={className}
            dangerouslySetInnerHTML={{
              __html: data,
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};
export default RichTextView;
