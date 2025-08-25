import React, { useState } from "react";
import "./RichTextView.css";
import Button from "./Button";

const RichTextView = ({ data, className = "", characterLimit = 400, showMorelink = true }) => {
  if (!data) return;
  if (data === "undefined") return;
  const [showFullContent, setShowFullContent] = useState(false);
  const displayedContent = showFullContent
    ? data
    : data.slice(0, characterLimit) + (data.length > characterLimit ? "..." : "");

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
                __html: showMorelink ? displayedContent : data,
              }}
            ></div>
          </div>
        </div>
      </div>
      {showMorelink && data.length > characterLimit && (
        <div className="d-flex justify-content-center align-items-center">
          <Button
            label={
              showFullContent ? (
                <span>
                  Less <strong>⇡</strong>
                </span>
              ) : (
                <span>
                  More <strong>⇣</strong>
                </span>
              )
            }
            handlerChange={toggleShowContent}
            cssClass="btn moreLink p-0"
          />
        </div>
      )}
    </div>
  );
};
export default RichTextView;
