import React from "react";
import { getImagePath } from "../../util/commonUtil";

export const CarouselItem = ({ item, index }) => {
  return (
    <div
      className={`carousel-item ${index === 0 ? "active" : ""}`}
      key={item.id}
    >
      <img
        src={getImagePath(item.path)}
        alt={item.alternitivetext}
        className="d-block w-100"
      />

      <div className="carousel-caption ">
        {item.carouse_sub_title ? (
          <span className="subtitle">{item.carouse_sub_title}</span>
        ) : (
          ""
        )}
        
        {item.carouse_title ? (
          <h1 className="fw-bold my-4">{item.carouse_title}</h1>
        ) : (
          ""
        )}

        {/* {item.carouse_sub_title ? (
          <span className="subtitle">{item.carouse_sub_title}</span>
        ) : (
          ""
        )} */}

        {item.carouse_description ? (
          <p className="fw-normal description fs-5">
            {item.carouse_description}
          </p>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};
