import React, { useEffect, useState } from "react";
import EditIcon from "../AdminEditIcon";
import PageHeroBannerClientView from "./ClientViews/PageHeroBannerClientView";
import AdminSingleRecordUpload from "../../Frontend_Admin/Components/forms/V2/AdminSingleRecordUpload";
import { getFormDynamicFields, imageDimensionsJson } from "../../util/dynamicFormFields";
import ShowHideToggle from "../ShowHideToggle";

const HeroBannerComponent = ({
  isAdmin,
  hasPermission,
  editHandler,
  componentEdit,
  pageType,
  category,
  showHideCompList,
  showHideHandler,
  componentType,
  popupTitle,
  showHideComponentName,
}) => {
  return (
    <div className="page-hero-banner">
      <div
        className={
          showHideCompList?.banner?.visibility && isAdmin && hasPermission
            ? "componentOnBorder"
            : ""
        }
      >
        {isAdmin && hasPermission && (
          <ShowHideToggle
            showhideStatus={showHideCompList?.banner?.visibility}
            title={"Hero Banner"}
            componentName={showHideComponentName}
            showHideHandler={showHideHandler}
            id={showHideCompList?.banner?.id}
          />
        )}
        {showHideCompList?.banner?.visibility && (
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-12 p-0 position-relative homePage">
                {isAdmin && hasPermission && (
                  <EditIcon
                    editHandler={() => editHandler(componentType, true)}
                    editlabel="Banner"
                  />
                )}
                <PageHeroBannerClientView
                  getBannerAPIURL={`banners/by-page-and-category/${pageType}-${componentType}/category/${category}/`}
                  bannerState={componentEdit.banner}
                />
              </div>
            </div>
            {componentEdit.banner && (
              <div className="adminEditTestmonial selected">
                <AdminSingleRecordUpload
                  editHandler={editHandler}
                  componentType="banner"
                  popupTitle={popupTitle}
                  pageType={`${pageType}-${componentType}`}
                  showDescription={false}
                  category={category}
                  showExtraFormFields={getFormDynamicFields(
                    `${pageType}-${componentType}`,
                    category
                  )}
                  dimensions={imageDimensionsJson(componentType)}
                />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default HeroBannerComponent;
