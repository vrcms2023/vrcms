import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import Title from "../../Common/Title";
import { getImagePath } from "../../util/commonUtil";
import RichTextView from "../../Common/RichTextView";

const TitleWithDescripton = ({ list }) => {
  const settings = {
    fade: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    draggable: true,
    swipe: true,
  };

  return (
    <div className="slider-container">
      <Slider {...settings}>
        {list.map((item, index) => {
          return <ItemSlide item={item} index={index} />;
        })}
      </Slider>
    </div>
  );
};

const ItemSlide = (props) => {
  const { item, ...otherProps } = props;
  return (
    <div {...otherProps}>
      <Title title={item?.intro_title} cssClass="text-start" />
      <div className="quill ">
        <div className="ql-container ql-snow">
          <div className="ql-editor">
            <RichTextView data={item.intro_desc} showMorelink={false} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TitleWithDescripton;
