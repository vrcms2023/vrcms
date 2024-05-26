import React, { useState } from "react";

export const HomeClientItem = ({ client }) => {
  const [hover, setHover] = useState(false);

  const mouseOver = (event) => {
    setHover(true);
  };

  const mouseOut = (event) => {
    setHover(false);
  };
  return (
    <div
      className="position-relative"
      onMouseEnter={mouseOver}
      onMouseLeave={mouseOut}
    >
      <div className="slide">
        <img src={client.path} alt={client.client_title} key={client.id} />
        {hover && (
        <div
          className="position-absolute p-3 w-100 rounded-3 bg-dark text-white clientPopOver"
         
          dangerouslySetInnerHTML={{
            __html: client?.client_description,
          }}
        />
      )}
      </div>
      
    </div>
  );
};
