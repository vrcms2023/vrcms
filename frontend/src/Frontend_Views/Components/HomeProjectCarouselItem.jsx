import React from "react";
import { getImagePath } from "../../util/commonUtil";
import Ancher from "../../Common/Ancher";
import { useNavigate } from "react-router-dom";

export const HomeProjectCarouselItem = ({ item, index }) => {
  const navigate = useNavigate();
  return (
    <div
      className={`carousel-item ${index === 0 ? "active" : ""}`}
      key={item.index}
    >
      <div className="container">
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
              {item.projectTitle && <h1 className="">{item.projectTitle}</h1>}

              {item.projectDescription ||
                (item.imageDescription && (
                  <p className="fw-normal description fs-5">
                    {item.imageDescription
                      ? item.imageDescription
                      : item.projectDescription}
                  </p>
                ))}

              <div>
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() =>
                    navigate("/project-details", {
                      state: {
                        selectedPorject: item.projectType,
                        projectid: item.id,
                      },
                    })
                  }
                >
                  more details
                </button>
                {/* <Ancher
                  handleModel={() =>
                    navigate("/project-details", {
                      // state: {
                      //   selectedPorject: item.projectType,
                      //   projectid: item.id,
                      // },
                    })
                  }
                  AncherLabel="More project details.."
                /> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
