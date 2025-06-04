import React, { useEffect, useState } from "react";
import { AdvertiseComponentStyled } from "../StyledComponents/Adv-Styles";
import { axiosClientServiceApi } from "../../util/axiosUtil";
import { sortCreatedDateByDesc } from "../../util/dataFormatUtil";
import { getDummyImage, getImagePath } from "../../util/commonUtil";
import { CarouselItem } from "../../Frontend_Views/Components/CarouselItem";
import { toast } from "react-toastify";

const Advertisement = ({ setFlashAdd }) => {
  const [advertisementList, setAdvertisementList] = useState([]);
  const [advertisementSize, setAdvertisementSize] = useState([]);
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

  const getAdvertisementSize = async () => {
    try {
      const response = await axiosClientServiceApi.get(
        `/advertisement/getclientAdvSize/`
      );
      if (response?.status === 200 && response.data.length > 0) {
        setAdvertisementSize(response.data[0].size);
      }
    } catch (error) {
      toast.error("Unable to load contactus details");
    }
  };
  useEffect(() => {
    getAdvertisementList();
    getAdvertisementSize();
  }, []);

  return (
    <AdvertiseComponentStyled>
      <div className={`imgContainer slide-top ${advertisementSize}`}>
        <span className="close" onClick={() => setFlashAdd(false)}>
          x
        </span>
        {advertisementList.length == 1 && (
          <div>
            <div className="advertismentInfo">
              {advertisementList[0].title && (
                <h3 className="p-2 px-0 m-0 fs-4 title">
                  {advertisementList[0].title}
                </h3>
              )}
              {advertisementList[0].advertisement_description && (
                <p className="description">
                  {advertisementList[0].advertisement_description}
                </p>
              )}
              {advertisementList[0].phonen_number && (
                <p className="phoneNumber">
                  {advertisementList[0].phonen_number}
                </p>
              )}
            </div>

            <img
              src={
                advertisementList[0]?.path
                  ? getImagePath(advertisementList[0].path)
                  : getDummyImage()
              }
              alt={advertisementList[0].alternitivetext}
              className="w-100"
            />
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
