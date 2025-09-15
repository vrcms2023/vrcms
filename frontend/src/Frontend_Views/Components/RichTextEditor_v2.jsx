import React, { useState } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

const RichTextEditor = ({ onChange, value, field, id }) => {
  const toolbar = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ color: [] }, { background: [] }],
      [{ list: "ordered" }, { list: "bullet" }, { indent: "-1" }, { indent: "+1" }],
      ["link"],
      ["clean"],
      [{ font: [] }],
      [{ align: [] }],
    ],
  };

  return (
    <ReactQuill
      {...field}
      theme="snow"
      value={value === "undefined" ? "" : value}
      onChange={onChange}
      modules={toolbar}
      id={id}
    />
  );
};

export default RichTextEditor;
