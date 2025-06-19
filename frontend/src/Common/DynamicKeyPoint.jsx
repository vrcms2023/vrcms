import React, { useEffect, useState } from "react";

// Component
import Title from "./Title";
import { axiosClientServiceApi } from "../util/axiosUtil";
import { getDummyImage, getImagePath } from "../util/commonUtil";

import { PageBannerStyled } from "./StyledComponents/Styled-PageBanner";
import SkeletonImage from "./Skeltons/SkeletonImage";

// Styles

const DynamicKeyPoint = ({
  getBannerAPIURL,
  bannerState,
  imageCss = "img-fluid w-100 h-100",
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
    <PageBannerStyled>
      <div className="container-fluid">
        <div className="row ">
          <div className="col-12">
            <div
              className="d-inline-block"
              style={{ width: "60px", height: "60px" }}
            >
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
            <div>{bannerdata?.banner_title}</div>
          </div>
        </div>
      </div>
    </PageBannerStyled>
  );
};
export default DynamicKeyPoint;
