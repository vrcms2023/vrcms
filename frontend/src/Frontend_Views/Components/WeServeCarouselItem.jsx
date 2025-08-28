import React, { useState } from "react";
import { getImagePath } from "../../util/commonUtil";
import RichTextView from "../../Common/RichTextView";
import Slider from "react-slick";

export const WeServeCarouselItem = ({ carouselList }) => {
  const settings = {
    className: "slider variable-width",
    dots: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 3000,
    variableWidth: false,
    draggable: true,
    swipeToSlide: true,
    cssEase: "ease",
  };

  return (
    <Slider {...settings}>
      {carouselList?.map((item, index) => {
        return (
          <WeServeCarouselItemMemo key={item.id} item={item} index={index} />
        );
      })}
    </Slider>
  );
};

const WeServeCarouselItemMemo = ({ item, index }) => {
  const [hover, setHover] = useState(false);
  const mouseOver = (event) => {
    setHover(true);
  };

  const mouseOut = (event) => {
    setHover(false);
  };
  return (
    <div
      key={item.id}
      onMouseEnter={mouseOver}
      onMouseLeave={mouseOut}
      className="weServe"
    >
      <img
        src={getImagePath(item?.path)}
        alt={item.alternitivetext}
        className="d-block w-100"
      />

      <div className="carousel-info">
        {item.carouse_title && <h1 className="">{item.carouse_title}</h1>}
      </div>
      <RichTextView data={item?.carouse_description} showMorelink={false} />
    </div>
  );
};
