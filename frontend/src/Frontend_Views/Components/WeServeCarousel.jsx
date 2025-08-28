import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

// Components
import { axiosClientServiceApi } from "../../util/axiosUtil";
import { getImagePath, sortByFieldName } from "../../util/commonUtil";


import SkeletonImage from "../../Common/Skeltons/SkeletonImage";
import { WeServeCarouselItem } from "./WeServeCarouselItem";

const WeServeCarousel = ({ carouselState, category }) => {
  const { isLoading } = useSelector((state) => state.loader);
  const [carouselList, setCarouselList] = useState([]);

  useEffect(() => {
    const getCarousels = async () => {
      try {
        const response = await axiosClientServiceApi.get(
          `carousel/clientCarousel/${category}/`
        );

        if (response?.status === 200) {
          let key = Object.keys(response.data);
          const carouselList = sortByFieldName(
            response.data[key],
            "carouse_position"
          );

          setCarouselList(carouselList);
        }
      } catch (error) {
        console.log("unable to access ulr because of server is down");
      }
    };
    if (!carouselState) {
      getCarousels();
    }
  }, [carouselState]);

  return (
    <div className="">
      {isLoading ? <SkeletonImage /> : ""}
      <div className="slider-container">
        {carouselList.length > 0 && (
          <WeServeCarouselItem carouselList={carouselList} />
        )}
      </div>

      {carouselList.length === 0 && (
        <div className="d-flex justify-content-center align-items-center fs-5 text-muted text-center noImg">
          {!isLoading && <p>Please add images for Carousel...</p>}
        </div>
      )}
    </div>
  );
};

export default WeServeCarousel;
