import React from "react";
import ShowHideToggle from "../ShowHideToggle";
import EditIcon from "../AdminEditIcon";
import Carousel from "../../Frontend_Views/Components/Carousel";
import { HomeCauroselComponentStyles } from "../StyledComponents/Styled-HomeCarousel";
import AdminBanner from "../../Frontend_Admin/Components/forms/ImgTitleIntoForm-List";
import { getCarouselFields, imageDimensionsJson } from "../../util/dynamicFormFields";
import AdminListOfRecordsUpload from "../../Frontend_Admin/Components/forms/V2/AdminListOfRecordsUpload";
import useAdminLoginStatus from "../customhook/useAdminLoginStatus";

function CarouselComponent({
  editHandler,
  componentEdit,
  componentType,
  category,
  showHideCompList,
  showHideHandler,
  showHideComponentName,
  showHideComponentTitle,
  popupTitle,
}) {
  const { isAdmin, hasPermission } = useAdminLoginStatus();
  return (
    <div
      className={
        showHideCompList?.[showHideComponentName]?.visibility && isAdmin && hasPermission
          ? "componentOnBorder"
          : ""
      }
    >
      {isAdmin && hasPermission && (
        <ShowHideToggle
          showhideStatus={showHideCompList?.[showHideComponentName]?.visibility}
          title={showHideComponentTitle}
          componentName={componentType}
          showHideHandler={showHideHandler}
          id={showHideCompList?.[showHideComponentName]?.id}
        />
      )}
      {showHideCompList?.[showHideComponentName]?.visibility && (
        <>
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-12 p-0 carousel">
                {isAdmin && hasPermission && (
                  <EditIcon
                    editHandler={() => editHandler(componentType, true)}
                    editlabel="Carousel"
                  />
                )}
                <HomeCauroselComponentStyles>
                  <Carousel
                    carouselState={componentEdit.carousel}
                    category={category}
                    containerId="carouselHomeGallery"
                  />
                </HomeCauroselComponentStyles>
              </div>
            </div>
          </div>

          {componentEdit.carousel && (
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
                dimensions={imageDimensionsJson(category)}
                sideDeck="carouselpopup"
              />
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default CarouselComponent;
