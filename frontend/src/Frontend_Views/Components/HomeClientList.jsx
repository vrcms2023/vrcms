import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { HomeClientItem } from "./HomeClientItem";
import { Link } from "react-router-dom";

export const HomeClientList = ({ clientsList }) => {
  const settings = {
    className: "slider variable-width",
    dots: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 3000,
    // cssEase: "linear",
    // cssEase: "ease-in-out",
    variableWidth: true,

    draggable: true,
    swipeToSlide: true,
    cssEase: "ease",


  //   infinite: false,
  // draggable: true,
  // swipeToSlide: true,
  // slidesToShow: 1,           // overridden if variableWidth is true
  // slidesToScroll: 1,
  // variableWidth: true,
  // autoplay: false,
  // speed: 500,
  // cssEase: "ease",
  };
  return (
    <>
      <div className="text-center my-5">
        <span
          className="fs-3 px-4 py-2"
          // style={{ borderBottom: "1px solid #444444" }}
        >
          Our Clients We Proudly Served
        </span>
      </div>

      <div className="slider-container">
        <Slider {...settings}>
          {clientsList.map((client) => {
            return <HomeClientItem client={client} key={client.id} />;
          })}
        </Slider>
      </div>
      {/* <div className="text-center py-4 position-relative viewAllBtn">
        <Link to="/clients/clients" className="btn btn-outline">
          View All
        </Link>
      </div> */}
    </>
  );
};
