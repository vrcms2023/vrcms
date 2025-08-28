import React, { useEffect, useState } from "react";

// Component

import { axiosClientServiceApi } from "../util/axiosUtil";
import { getDummyImage, getImagePath } from "../util/commonUtil";
import { PageBannerStyled } from "./StyledComponents/Styled-PageBanner";
import { KeypointsStyled } from "./StyledComponents/Styled-Keypoints";

// Styles

const DynamicKeyPoint = ({
  getBannerAPIURL,
  keyPointsState,
  imageCss = "",
}) => {
  const [bannerdata, setBannerData] = useState([]);
  const [keyPointsdata, setKeyPointsData] = useState([]);

  useEffect(() => {
    const getKeyPointsData = async () => {
      try {
        const response = await axiosClientServiceApi.get(getBannerAPIURL);
        if (response?.status === 200) {
          setKeyPointsData(response.data.imageModel);
        } else {
          setKeyPointsData({});
        }
      } catch (error) {
        setKeyPointsData({});
        console.log("unable to access ulr because of server is down");
      }
    };
    if (!keyPointsState) {
      getKeyPointsData();
    }
  }, [keyPointsState, getBannerAPIURL]);

  return (
    <KeypointsStyled>
      <div className="container-fluid">
        <div className="row IconsMainKeys">
          <div className="col-md-2 p-2 d-flex align-items-center keyPoint">
              {keyPointsdata?.path ? (
                <img
                  src={
                    keyPointsdata?.path
                      ? getImagePath(keyPointsdata.path)
                      : getDummyImage()
                  }
                  alt={keyPointsdata?.alternitivetext}
                  className={imageCss}
                />
              ) : (
                <img src={getDummyImage()} className={imageCss} />
              )}
            
          </div>
          <div className="col-md-10 p-2 d-flex align-items-center">{keyPointsdata?.banner_title}</div>
        </div>
      </div>
      </KeypointsStyled>
  );
};
export default DynamicKeyPoint;
