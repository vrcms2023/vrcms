import React, { useEffect, useState } from "react";

// Component
import Title from "../Title";
import { axiosClientServiceApi } from "../../util/axiosUtil";
import { getDummyImage, getImagePath } from "../../util/commonUtil";
import SkeletonImage from "../Skeltons/SkeletonImage";

// Styles
import { PageBannerStyled } from "../StyledComponents/Styled-PageBanner";

const Banner = ({ getBannerAPIURL, bannerState, pageLoadServiceName }) => {
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
  }, [bannerState, pageLoadServiceName, getBannerAPIURL]);

  return (
    <PageBannerStyled>
      <div className="pageBanner">
        <div
          className={
            (bannerdata.banner_descripiton && bannerdata.banner_title) ||
            bannerdata.banner_descripiton ||
            bannerdata.banner_title
              ? "titleCaption d-flex align-items-end justify-content-end flex-column"
              : ""
          }
        >
          {bannerdata.banner_title === "" ? (
            ""
          ) : (
            <Title
              title={bannerdata.banner_title}
              cssClass="title text-end fs-2"
            />
          )}
          {bannerdata.banner_subTitle === "" ? (
            ""
          ) : (
            <Title
              title={bannerdata.banner_subTitle}
              cssClass="subTitle text-end fw-normal"
            />
          )}
          {bannerdata.banner_descripiton === "" ? (
            ""
          ) : (
            <small className="description text-end d-block mt-2 fs-6">
              {bannerdata.banner_descripiton}
            </small>
          )}
        </div>
        {bannerdata.path ? (
          <img
            src={
              bannerdata?.path ? getImagePath(bannerdata.path) : getDummyImage()
            }
            alt={bannerdata.alternitivetext}
            className="w-100"
          />
        ) : (
          <SkeletonImage />
        )}
      </div>
    </PageBannerStyled>
  );
};
export default Banner;
