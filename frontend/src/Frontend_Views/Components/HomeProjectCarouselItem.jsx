import React from "react";
import { getImagePath } from "../../util/commonUtil";
import Ancher from "../../Common/Ancher";

export const HomeProjectCarouselItem = ({ item, index }) => {
  return (
    <div
      className={`carousel-item ${index === 0 ? "active" : ""}`}
      key={item.index}
    >
      <div className="container-fluid">
        <div className="row align-items-start">
          <div className="col-sm-6 col-md-6 p-0 carouselImg">
            <img
              src={getImagePath(item.path)}
              alt={item.altText}
              className="d-block w-100"
            />
          </div>
          <div className="col-sm-6 col-md-6 carouselDescription d-flex align-items-center">
            <div className="d-flex flex-column justify-content-start align-items-start gap-2">
              <span>PROJECTS</span>
              {item.projectTitle && (
                <h1 className="">{item.projectTitle}</h1>
              )}

              {item.projectDescription ||
                (item.imageDescription && (
                  <p className="fw-normal description fs-5">
                    {item.imageDescription
                      ? item.imageDescription
                      : item.projectDescription}
                  </p>
                ))}

                <div>
                  <Ancher AncherLabel="More details.."/>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
