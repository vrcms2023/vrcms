import React, { useEffect, useState } from "react";

// Component
import Title from "../../Title";
import { axiosClientServiceApi } from "../../../util/axiosUtil";
import { getDummyImage, getImagePath } from "../../../util/commonUtil";
import SkeletonImage from "../../Skeltons/SkeletonImage";

// Styles
import { PageBannerStyled } from "../../StyledComponents/Styled-PageBanner";
import Ancher from "../../Ancher";
import RichTextView from "../../RichTextView";
import useAdminLoginStatus from "../../customhook/useAdminLoginStatus";

const PageHeroBannerClientView = ({
  getBannerAPIURL,
  bannerState,
  pageLoadServiceName,
  bannerTitleCss = "title text-center fs-3",
  bannerSubTitleCss = "subTitle text-end fw-normal",
  imageCss = "w-100",
  bannerContainerCss = "titleCaption d-flex align-items-center justify-content-end flex-column",
}) => {
  const [bannerdata, setBannerData] = useState([]);
  const { isAdmin, hasPermission } = useAdminLoginStatus();

  useEffect(() => {
    const getBannerData = async () => {
      try {
        const response = await axiosClientServiceApi.get(getBannerAPIURL);
        if (response?.status === 200 && response.data?.length > 0) {
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
  }, [bannerState, pageLoadServiceName, getBannerAPIURL]);

  return (
    <PageBannerStyled>
      <div className="pageBanner">
        {bannerdata?.path && (
          <div
            className={
              (bannerdata.banner_descripiton && bannerdata.banner_title) ||
              bannerdata.banner_descripiton ||
              bannerdata.banner_title
                ? bannerContainerCss
                : ""
            }
          >
            {bannerdata.banner_title !== "" && (
              <Title
                title={bannerdata.banner_title}
                cssClass={bannerTitleCss}
                mainTitleClassess=""
              />
            )}
            {bannerdata.banner_subTitle !== "" && (
              <Title
                subTitle={bannerdata.banner_subTitle}
                cssClass={bannerSubTitleCss}
                subTitleClassess=""
              />
            )}
            {bannerdata.banner_descripiton !== "" && (
              <RichTextView
                data={
                  bannerdata?.banner_descripiton
                    ? bannerdata?.banner_descripiton
                    : isAdmin
                      ? "Please Update Brief Intro"
                      : ""
                }
                className={"introDecTitleCss bannerDescriptionCss"}
                showMorelink={false}
              />
            )}

            {bannerdata.moreLink && (
              <div>
                <Ancher
                  AncherLabel={"Services"}
                  Ancherpath={bannerdata.moreLink ? bannerdata.moreLink : moreLink}
                  AncherClass={"btn btn-primary btn-sm mt-2"}
                />
              </div>
            )}
          </div>
        )}
        {bannerdata?.path ? (
          <img
            src={bannerdata?.path ? getImagePath(bannerdata.path) : getDummyImage()}
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
export default PageHeroBannerClientView;
