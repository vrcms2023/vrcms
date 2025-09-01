import React from "react";
import ShowHideToggle from "../ShowHideToggle";
import EditIcon from "../AdminEditIcon";
import Carousel from "../../Frontend_Views/Components/Carousel";
import { HomeCauroselComponentStyles } from "../StyledComponents/Styled-HomeCarousel";
import AdminBanner from "../../Frontend_Admin/Components/forms/ImgTitleIntoForm-List";
import { getCarouselFields, imageDimensionsJson } from "../../util/dynamicFormFields";
import AdminListOfRecordsUpload from "../../Frontend_Admin/Components/forms/V2/AdminListOfRecordsUpload";
import useAdminLoginStatus from "../customhook/useAdminLoginStatus";
import BriefIntroFrontend from "../BriefIntro";
import BriefIntroAdmin from "../../Frontend_Admin/Components/BriefIntro";
import { ImageGalleryStyled } from "../StyledComponents/Styled-ImageGallery";
import BriefComponent from "../Brief/BriefComponent";

function IndustriesWeServeCarouselComponent({
  editHandler,
  componentEdit,
  componentType,
  category,
  showHideCompList,
  showHideHandler,
  showHideComponentName,
  popupTitle,
}) {
  const { isAdmin, hasPermission } = useAdminLoginStatus();
  return (
    <div
      className={
        showHideCompList?.[showHideComponentName]?.visibility && isAdmin && hasPermission
          ? "border border-info mb-2"
          : ""
      }
    >
      {isAdmin && hasPermission && (
        <ShowHideToggle
          showhideStatus={showHideCompList?.[showHideComponentName]?.visibility}
          title={popupTitle}
          componentName={showHideComponentName}
          showHideHandler={showHideHandler}
          id={showHideCompList?.[showHideComponentName]?.id}
        />
      )}
      {showHideCompList?.[showHideComponentName]?.visibility && (
        <>
          <BriefComponent
            editHandler={editHandler}
            componentType={"industriesweserveBrief"}
            popupTitle="Industries We Serve Brief Intro"
            pageType={"industriesweserveBrief"}
            componentEdit={componentEdit}
            editlabel={"Industries Brief"}
          />
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-12 p-0 carousel">
                {isAdmin && hasPermission && (
                  <EditIcon
                    editHandler={() => editHandler("industriesweserve", true)}
                    editlabel={"Industries"}
                  />
                )}

                {/* <Carousel
                      carouselState={componentEdit.industriesweserve}
                      category={"industriesweserve"}
                      containerId="industriesweserve-carousel"
                    /> */}
                <ImageGalleryStyled>
                  <div className="container-fluid">
                    <div className="row ">
                      <div className="col-md-10 offset-md-1 homeGalleryCarousel">
                        <div className="container">
                          <div className="row">
                            <div className="col-md-12">
                              <Carousel
                                carouselState={componentEdit.industriesweserve}
                                category={category}
                                containerId="industriesweserve-carousel"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </ImageGalleryStyled>
              </div>
            </div>
          </div>

          {componentEdit.industriesweserve && (
            <div className={`adminEditTestmonial selected `}>
              <AdminListOfRecordsUpload
                editHandler={editHandler}
                componentType={componentType}
                popupTitle={popupTitle}
                getImageListURL={`carousel/createCarousel/${category}/`}
                deleteImageURL="carousel/updateCarousel/"
                imagePostURL={`carousel/createCarousel/${category}/`}
                imageUpdateURL="carousel/updateCarousel/"
                imageIndexURL="carousel/updateCarouselindex/"
                imageLabel="Upload Image"
                showExtraFormFields={getCarouselFields(category)}
                dimensions={imageDimensionsJson("carousel")}
                sideDeck="carouselpopup"
              />
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default IndustriesWeServeCarouselComponent;
