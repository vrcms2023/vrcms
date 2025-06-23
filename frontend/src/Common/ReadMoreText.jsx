import React, { useState } from "react";
import "./RichTextView.css";
import Button from "./Button";

const ReadMoreText = ({ data, characterLimit = 150 }) => {
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
      <p>{displayedContent}</p>
      {data.length > characterLimit && (
        <Button
          label={showFullContent ? "Show Less" : "Read More"}
          handlerChange={toggleShowContent}
          cssClass="btn btn-outline float-end"
        />
      )}
    </div>
  );
};
export default ReadMoreText;
