import React, { useState, useEffect } from "react";
import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
import { HomeClientItem } from "./HomeClientItem";
import { Link } from "react-router-dom";
import ShowHideToggle from "../../Common/ShowHideToggle";
import useAdminLoginStatus from "../../Common/customhook/useAdminLoginStatus";
import { HomeClientsStyled } from "../../Common/StyledComponents/Styled-HomeClients";
import { axiosClientServiceApi } from "../../util/axiosUtil";
import { sortByFieldName } from "../../util/commonUtil";

export const HomeClientList = ({ showHideCompList, showHideHandler }) => {
  const [clientsList, setClientsList] = useState([]);
  const { isAdmin, hasPermission } = useAdminLoginStatus();
  useEffect(() => {
    const getClientList = async () => {
      try {
        const response = await axiosClientServiceApi.get(`/client/getAllClientLogos/`);
        if (response?.status === 200) {
          const _clientList = sortByFieldName(response.data, "client_position");

          setClientsList(_clientList);
        }
      } catch (error) {
        console.log("unable to access ulr because of server is down");
      }
    };

    getClientList();
  }, []);
  return (
    <div
      className={
        showHideCompList?.homeclient?.visibility && isAdmin && hasPermission
          ? "componentOnBorder"
          : ""
      }
    >
      {isAdmin && hasPermission && (
        <ShowHideToggle
          showhideStatus={showHideCompList?.homeclient?.visibility}
          title={"Client Showcase"}
          componentName={"homeclient"}
          showHideHandler={showHideHandler}
          id={showHideCompList?.homeclient?.id}
        />
      )}
      {showHideCompList?.homeclient?.visibility && (
        <HomeClientsStyled>
          {clientsList.length > 0 ? (
            <SliderImage clientsList={clientsList} />
          ) : (
            <div className="col-md-12 text-center">Please add some clients</div>
          )}
        </HomeClientsStyled>
      )}
    </div>
  );
};

const SliderImage = ({ clientsList }) => {
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
    <div className="slider-container">
      <Slider {...settings}>
        {clientsList.map((client) => {
          return <HomeClientItem client={client} key={client.id} />;
        })}
      </Slider>
    </div>
  );
};
