import React, { useEffect, useState } from "react";
import { EditorState, ContentState, convertFromHTML } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { convertToHTML } from "draft-convert";

const RichTextEditor = ({ RichEditorState, initialText }) => {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createWithContent(
      ContentState.createFromBlockArray(convertFromHTML(initialText)),
    ),
  );

  useEffect(() => {
    let html = convertToHTML(editorState.getCurrentContent());
    RichEditorState(html);
  }, [editorState]);

  return (
    <Editor
      wrapperClassName="wrapper-class"
      editorClassName="editor-class"
      toolbarClassName="toolbar-class"
      toolbar={{
        options: [
          "inline",
          "blockType",
          "fontSize",
          "fontFamily",
          "list",
          "textAlign",
          "colorPicker",
          "link",
          "remove",
          "history",
        ],
      }}
      editorState={editorState}
      onEditorStateChange={setEditorState}
    />
  );
};

export default RichTextEditor;
