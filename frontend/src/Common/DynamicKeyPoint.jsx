import React, { useEffect, useState } from "react";

// Component

import { axiosClientServiceApi } from "../util/axiosUtil";
import { getDummyImage, getImagePath } from "../util/commonUtil";
import { PageBannerStyled } from "./StyledComponents/Styled-PageBanner";
import { KeypointsStyled } from "./StyledComponents/Styled-Keypoints";

// Styles

const DynamicKeyPoint = ({
  getBannerAPIURL,
  bannerState,
  imageCss = "img-fluid w-100",
}) => {
  const [bannerdata, setBannerData] = useState([]);

  useEffect(() => {
    const getBannerData = async () => {
      try {
        const response = await axiosClientServiceApi.get(getBannerAPIURL);
        if (response?.status === 200) {
          setBannerData(response.data.imageModel);
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
    <KeypointsStyled>
      <div className="container-fluid">
        <div className="row IconsMainKeys">
          <div className="col-md-2 p-2 d-flex align-items-center keyPoint">
              {bannerdata.path ? (
                <img
                  src={
                    bannerdata?.path
                      ? getImagePath(bannerdata.path)
                      : getDummyImage()
                  }
                  alt={bannerdata?.alternitivetext}
                  className={imageCss}
                />
              ) : (
                <img src={getDummyImage()} className={imageCss} />
              )}
            
          </div>
          <div className="col-md-10 p-2 d-flex align-items-center">{bannerdata?.banner_title}</div>
        </div>
      </div>
      </KeypointsStyled>
  );
};
export default DynamicKeyPoint;
