import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

// Components
import { axiosClientServiceApi } from "../../util/axiosUtil";
import { getImagePath, sortByFieldName } from "../../util/commonUtil";

// Styles
import SkeletonImage from "../../Common/Skeltons/SkeletonImage";
import { CarouselItem } from "./CarouselItem";

const Carousel = ({ carouselState, category, containerId }) => {
  const { isLoading } = useSelector((state) => state.loader);
  const [carousel, setCarousel] = useState([]);
  const pageType = "imagegallery";

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

          setCarousel(carouselList);
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
    <div
      id={containerId}
      className="homeCarousel carousel slide"
      data-bs-ride="carousel"
    >
      <div className="carousel-inner">
        {isLoading ? <SkeletonImage /> : ""}

        {carousel.length > 0 ? (
          carousel?.map((item, index) => (
            <CarouselItem key={index} item={item} index={index} />
          ))
        ) : (
          <div className="d-flex justify-content-center align-items-center fs-5 text-muted text-center noImg">
            {!isLoading && <p>Please add images for Carousel...</p>}
          </div>
        )}
      </div>

      {carousel.length > 1 && (
        <>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target={`#${containerId}`}
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target={`#${containerId}`}
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </>
      )}
    </div>
  );
};

export default Carousel;
