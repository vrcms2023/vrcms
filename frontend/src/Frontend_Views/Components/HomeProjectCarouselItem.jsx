import React from "react";
import { getImagePath } from "../../util/commonUtil";

export const HomeProjectCarouselItem = ({ item, index }) => {
  return (
    <div
      className={`carousel-item ${index === 0 ? "active" : ""}`}
      key={item.index}
    >
      <div className="container">
        <div className="row align-items-start">
          <div className="col">
            <img
              src={getImagePath(item.path)}
              alt={item.altText}
              className="d-block w-100"
            />
          </div>
          <div className="col">
            <div className="">
              {item.projectTitle && (
                <h1 className="fw-bold">{item.projectTitle}</h1>
              )}

              {item.projectDescription ||
                (item.imageDescription && (
                  <p className="fw-normal description fs-5">
                    {item.imageDescription
                      ? item.imageDescription
                      : item.projectDescription}
                  </p>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
