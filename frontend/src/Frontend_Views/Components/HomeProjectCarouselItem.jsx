import React from "react";
import { getImagePath } from "../../util/commonUtil";

export const HomeProjectCarouselItem = ({ item, index }) => {
  return (
    <div
      className={`carousel-item ${index === 0 ? "active" : ""}`}
      key={item.id}
    >
      <div class="container">
        <div class="row align-items-start">
          <div class="col">
            <img
              src={getImagePath(item.path)}
              alt={item.altText}
              className="d-block w-100"
            />
          </div>
          <div class="col">
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
