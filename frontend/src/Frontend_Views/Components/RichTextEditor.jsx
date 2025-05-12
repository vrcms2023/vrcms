import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

const RichTextEditor = ({ RichEditorState, initialText }) => {
  const [editorState, setEditorState] = useState(initialText);

  const toolbar = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ color: [] }, { background: [] }],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link"],
      ["clean"],
    ],
  };

  const onEditorStateChange = (newEditorState) => {
    setEditorState(newEditorState);
    RichEditorState(newEditorState);
  };

  return (
    <ReactQuill
      theme="snow"
      value={editorState}
      onChange={onEditorStateChange}
      modules={toolbar}
    />
  );
};

export default RichTextEditor;
