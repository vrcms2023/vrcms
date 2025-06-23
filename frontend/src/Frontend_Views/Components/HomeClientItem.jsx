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

  console.log(client, "client")
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
      <h5 className="fs-6 mt-3 mb-0 fw-bold text-center text-uppercase">{client.client_title}</h5>
      <RichTextView data={client?.client_description} />
    </div>
  );
};
