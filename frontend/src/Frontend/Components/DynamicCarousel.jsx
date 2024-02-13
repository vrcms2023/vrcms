import React from "react";
import "./DynamicCarousel.css";
import { getBaseURL } from "../../util/ulrUtil";

const DCarousel = ({ obj, all, closeCarousel }) => {
  const findImg = all.find((item) => item.id === obj.id);
  const imgs = [findImg, ...all];
  const baseURL = getBaseURL();

  const uniqueImgsArray = imgs.filter(function (item, pos) {
    return imgs.indexOf(item) === pos;
  });
  return (
    <div
      id="carouselExampleIndicators"
      className="dcarousel carousel slide shadow-lg"
      data-bs-ride="carousel"
    >
      <span
        className="closeCarousel"
        onClick={closeCarousel}
        onBlur={closeCarousel}
      >
        <i className="fa fa-times fs-4" aria-hidden="true"></i>
      </span>
      <div className="carousel-inner">
        {uniqueImgsArray.length > 0
          ? uniqueImgsArray.map((item, index) => (
              <div
                className={`carousel-item ${index === 0 ? "active" : ""}`}
                key={item.id}
              >
                <img
                  src={`${baseURL}${item.path}`}
                  className="d-block"
                  alt="..."
                />
              </div>
            ))
          : null}
      </div>
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleIndicators"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleIndicators"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
};
export default DCarousel;
