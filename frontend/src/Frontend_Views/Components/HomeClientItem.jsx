import React, { useState } from "react";
import RichTextView from "../../Common/RichTextView";
import { getBaseURL } from "../../util/ulrUtil";

export const HomeClientItem = ({ client }) => {
  const [hover, setHover] = useState(false);
  const baseURL = getBaseURL();

  const mouseOver = (event) => {
    setHover(true);
  };

  const mouseOut = (event) => {
    setHover(false);
  };
  return (
    <div
      // style={{ width: '200px !important' }}
      onMouseEnter={mouseOver}
      onMouseLeave={mouseOut}
    >
      <img
        src={`${baseURL}${client.path}`}
        alt={client.client_title}
        key={client.id}
        style={{ height: "100px" }}
      />
      {/* <RichTextView data={client?.client_description} /> */}
    </div>
  );
};
