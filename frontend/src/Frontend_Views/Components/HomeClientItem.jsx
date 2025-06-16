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
      style={{ width: 300 }}
      onMouseEnter={mouseOver}
      onMouseLeave={mouseOut}
    >
      <div className="">
        <img
          src={`${baseURL}${client.path}`}
          alt={client.client_title}
          key={client.id}
          style={{ width: "100px", height: "100px" }}
        />
        <RichTextView data={client?.client_description} />
      </div>
    </div>
  );
};
