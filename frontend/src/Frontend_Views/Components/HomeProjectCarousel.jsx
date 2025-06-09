import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// Components
import { axiosClientServiceApi } from "../../util/axiosUtil";
import {
  getImagePath,
  getProjectwithImageMap,
  sortByFieldName,
} from "../../util/commonUtil";

// Styles
import "./Carousel.css";
import SkeletonImage from "../../Common/Skeltons/SkeletonImage";
import { CarouselItem } from "./CarouselItem";
import { getClientProjects } from "../../redux/project/clientProjectActions";
import { HomeProjectCarouselItem } from "./HomeProjectCarouselItem";

const HomeProjectCarousel = ({ carouselState }) => {
  const { clientProjects } = useSelector((state) => state.clientProjects);
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.loader);
  const [carousel, setCarousel] = useState([]);
  const pageType = "imagegallery";

  useEffect(() => {
    if (clientProjects.length === 0) {
      dispatch(getClientProjects());
    }
  }, [dispatch, clientProjects]);

  useEffect(() => {
    if (clientProjects?.projectList?.length > 0) {
      const list = getProjectwithImageMap(clientProjects);
      const carouselList = [];
      list.forEach((element) => {
        element.imgs.forEach((img) => {
          carouselList.push({
            id: element.id,
            projectTitle: element.projectTitle,
            projectDescription: element.description,
            altText: img.alternitivetext,
            path: img.path,
            imageDescription: img.imageDescription,
            imageTitle: img.imageTitle,
          });
        });
      });
      setCarousel(carouselList);
    }
  }, [clientProjects]);

  return (
    <div
      id="carouselExampleDark"
      className="homeCarousel carousel slide"
      data-bs-ride="carousel"
    >
      <div className="carousel-indicators">
        {carousel.length > 0 &&
          carousel?.map((item, index) => (
            <button
              key={index}
              type="button"
              data-bs-target="#carouselExampleDark"
              data-bs-slide-to={index}
              className={`${index === 0 ? "active" : ""}`}
              aria-current="true"
              aria-label={`Slide ${index} `}
            ></button>
          ))}
      </div>
      <div className="carousel-inner">
        {isLoading ? <SkeletonImage /> : ""}

        {carousel.length > 0 ? (
          carousel?.map((item, index) => (
            <HomeProjectCarouselItem key={index} item={item} index={index} />
          ))
        ) : (
          <div className="d-flex justify-content-center align-items-center fs-5 text-muted text-center noImg">
            {!isLoading && <p>Please add images for Carousel...</p>}
          </div>
        )}
      </div>

      {carousel.length > 1 ? (
        <>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleDark"
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
            data-bs-target="#carouselExampleDark"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </>
      ) : (
        ""
      )}
    </div>
  );
};

export default HomeProjectCarousel;
