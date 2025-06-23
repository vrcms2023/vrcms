import React, { useState } from "react";
import "./RichTextView.css";
import Button from "./Button";

const RichTextView = ({ data, className = "", characterLimit = 240 }) => {
  if (!data) return;
  const [showFullContent, setShowFullContent] = useState(false);
  const displayedContent = showFullContent
    ? data
    : data.slice(0, characterLimit) +
      (data.length > characterLimit ? "..." : "");

  const toggleShowContent = () => {
    setShowFullContent(!showFullContent);
  };
  return (
    <div>
      <div className="quill ">
        <div className="ql-container ql-snow">
          <div className="ql-editor">
            <div
              className={className}
              dangerouslySetInnerHTML={{
                __html: displayedContent,
              }}
            ></div>
          </div>
        </div>
      </div>
      {data.length > characterLimit && (
        <Button
          label={showFullContent ? "Less" : "More..."}
          handlerChange={toggleShowContent}
          cssClass="btn moreLink float-end p-0"
        />
      )}
    </div>
  );
};
export default RichTextView;
