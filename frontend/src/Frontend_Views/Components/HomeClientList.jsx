import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { HomeClientItem } from "./HomeClientItem";
import { Link } from "react-router-dom";

export const HomeClientList = ({ clientsList }) => {
  const settings = {
    className: "slider variable-width",
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 2000,
    cssEase: "linear",
  };
  return (
    <>
      <div className="text-center mb-5" style={{ marginTop: "100px" }}>
        <span
          className="fs-1 px-4 py-2"
          style={{ borderBottom: "1px solid #444444" }}
        >
          Clients
        </span>
      </div>

      <div className="slider-container">
        <Slider {...settings}>
          {clientsList.map((client) => {
            return <HomeClientItem client={client} key={client.id} />;
          })}
        </Slider>
      </div>
      <div className="text-center py-4 position-relative viewAllBtn">
        <Link to="/clients/clients" className="btn btn-outline">
          View All
        </Link>
      </div>
    </>
  );
};
