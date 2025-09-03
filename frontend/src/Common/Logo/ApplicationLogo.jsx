import React, { useEffect, useState } from "react";

// Component
import Title from "../Title";
import { axiosClientServiceApi } from "../../util/axiosUtil";
import { getDummyImage, getImagePath } from "../../util/commonUtil";
import SkeletonImage from "../Skeltons/SkeletonImage";

// Styles
import headersvgLogo from "../../Images/headerLogo.svg";

const ApplicationLogo = ({ getBannerAPIURL, bannerState, imageCss = "w-100" }) => {
  const [bannerdata, setBannerData] = useState([]);

  useEffect(() => {
    const getBannerData = async () => {
      try {
        const response = await axiosClientServiceApi.get(getBannerAPIURL);
        if (response?.status === 200) {
          setBannerData(response.data[0]);
        } else {
          setBannerData({});
        }
      } catch (error) {
        setBannerData({});
        console.log("unable to access ulr because of server is down");
      }
    };
    if (!bannerState) {
      getBannerData();
    }
  }, [bannerState, getBannerAPIURL]);

  return (
    <>
      {bannerdata?.path ? (
        <img
          src={bannerdata?.path ? getImagePath(bannerdata.path) : headersvgLogo}
          alt={bannerdata.alternitivetext}
          className={imageCss}
        />
      ) : (
        <SkeletonImage />
      )}
    </>
  );
};
export default ApplicationLogo;
