import React, { useEffect, useState } from "react";

// Component
import Title from "../Title";
import { axiosClientServiceApi } from "../../util/axiosUtil";
import { getDummyImage, getImagePath } from "../../util/commonUtil";
import SkeletonImage from "../Skeltons/SkeletonImage";

// Styles
import { PageBannerStyled } from "../StyledComponents/Styled-PageBanner";

const Banner = ({
  getBannerAPIURL,
  bannerState,
  pageLoadServiceName,
  bannerTitleCss = "title text-end fs-2",
  bannerSubTitleCss = "subTitle text-end fw-normal",
  bannerDescriptionCss = "description text-end d-block mt-2 fs-6",
  imageCss = "w-100",
  bannerContainerCss = "titleCaption d-flex align-items-end justify-content-end flex-column",
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
  }, [bannerState, pageLoadServiceName, getBannerAPIURL]);

  return (
    <PageBannerStyled>
      <div className="pageBanner">
        <div
          className={
            (bannerdata.banner_descripiton && bannerdata.banner_title) ||
            bannerdata.banner_descripiton ||
            bannerdata.banner_title
              ? bannerContainerCss
              : ""
          }
        >
          {bannerdata.banner_title === "" ? (
            ""
          ) : (
            <Title title={bannerdata.banner_title} 
            cssClass={bannerTitleCss} 
              // cssClass=""
              mainTitleClassess="fs-1 fw-bold text-white "
              subTitleClassess=""
            />
          )}
          {bannerdata.banner_subTitle === "" ? (
            ""
          ) : (
            <Title
              title={bannerdata.banner_subTitle}
              cssClass={bannerSubTitleCss} 
              mainTitleClassess="fs-6 mb-2 fw-medium text-white "
            />
          )}
          {bannerdata.banner_descripiton === "" ? (
            ""
          ) : (
            <small className={bannerDescriptionCss}>
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
            className={imageCss}
          />
        ) : (
          <SkeletonImage />
        )}
      </div>
    </PageBannerStyled>
  );
};
export default Banner;
