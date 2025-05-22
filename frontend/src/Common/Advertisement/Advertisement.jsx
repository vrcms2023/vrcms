import React, { useEffect, useState } from "react";
import { AdvertiseComponentStyled } from "../StyledComponents/Adv-Styles";
import { axiosClientServiceApi } from "../../util/axiosUtil";
import { sortCreatedDateByDesc } from "../../util/dataFormatUtil";
import { getDummyImage, getImagePath } from "../../util/commonUtil";
import { CarouselItem } from "../../Frontend_Views/Components/CarouselItem";

const Advertisement = ({ setFlashAdd }) => {
  const [advertisementList, setAdvertisementList] = useState([]);
  const getAdvertisementList = async () => {
    try {
      const response = await axiosClientServiceApi.get(
        `/advertisement/clientAdvertisement/`
      );
      if (response?.status === 200) {
        const sortbyCreateData = sortCreatedDateByDesc(response?.data);
        setAdvertisementList(sortbyCreateData);
      }
    } catch (error) {
      toast.error("Unable to load contactus details");
    }
  };
  useEffect(() => {
    getAdvertisementList();
  }, []);

  return (
    <AdvertiseComponentStyled>
      <span className="text-white fs-2" onClick={() => setFlashAdd(false)}>
        x
      </span>
      <div className="imgContainer slide-top">
        {advertisementList.length == 1 && (
          <div>
            {advertisementList[0].title && (
              <h1 className="text-black text-center p-4 bg-warning m-0">
                {advertisementList[0].title}
              </h1>
            )}

            <img
              src={
                advertisementList[0]?.path
                  ? getImagePath(advertisementList[0].path)
                  : getDummyImage()
              }
              alt={advertisementList[0].alternitivetext}
              className="w-100"
            />
            {advertisementList[0].advertisement_description && (
              <div className="text-center bg-warning p-2 text-black fw-bold fs-5">
                {advertisementList[0].advertisement_description}
              </div>
            )}
            {advertisementList[0].phonen_number && (
              <div className="text-center bg-warning p-2 text-black fw-bold fs-5">
                {advertisementList[0].phonen_number}
              </div>
            )}
          </div>
        )}
        {advertisementList.length > 1 && (
          <div
            id="carouselExampleIndicators"
            className="homeCarousel carousel slide"
            data-bs-ride="carousel"
          >
            <div className="carousel-inner">
              {advertisementList?.map((item, index) => (
                <CarouselItem key={index} item={item} index={index} />
              ))}
            </div>
            {advertisementList.length > 1 && (
              <>
                <button
                  className="carousel-control-prev"
                  type="button"
                  data-bs-target="#carouselExampleIndicators"
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
                  data-bs-target="#carouselExampleIndicators"
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
        )}
      </div>
    </AdvertiseComponentStyled>
  );
};

export default Advertisement;
