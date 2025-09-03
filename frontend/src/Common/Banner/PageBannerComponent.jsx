import React, { useEffect, useState } from "react";
import EditIcon from "../AdminEditIcon";
import PageHeroBannerClientView from "./ClientViews/PageHeroBannerClientView";
import AdminSingleRecordUpload from "../../Frontend_Admin/Components/forms/V2/AdminSingleRecordUpload";
import { getFormDynamicFields, imageDimensionsJson } from "../../util/dynamicFormFields";
import ShowHideToggle from "../ShowHideToggle";
import useAdminLoginStatus from "../customhook/useAdminLoginStatus";

const PageBannerComponent = ({
  editHandler,
  componentEdit,
  pageType,
  category,
  showHideCompList,
  showHideHandler,
  popupTitle,
  componentType = "banner",
  showHideComponentName,
  editlabel = "Banner",
}) => {
  const { isAdmin, hasPermission } = useAdminLoginStatus();
  return (
    <div className="page-banner">
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
            title={"Banner"}
            componentName={showHideComponentName}
            showHideHandler={showHideHandler}
            id={showHideCompList?.[showHideComponentName]?.id}
          />
        )}
        {showHideCompList?.[showHideComponentName]?.visibility && (
          <>
            {/* Page Banner Component */}
            <div className="position-relative">
              {isAdmin && hasPermission && (
                <EditIcon
                  editHandler={() => editHandler(componentType, true)}
                  editlabel={editlabel}
                />
              )}
              <PageHeroBannerClientView
                getBannerAPIURL={`banners/by-page-and-category/${pageType}-${componentType}/category/${category}/`}
                bannerState={componentEdit.banner}
              />
            </div>
            {componentEdit.banner && (
              <div className={`adminEditTestmonial selected `}>
                <AdminSingleRecordUpload
                  editHandler={editHandler}
                  componentType={componentType}
                  popupTitle={popupTitle}
                  onPageLoadServiceCall={true}
                  imagePostURL="banners/createBanner/"
                  imageGetURL={`banners/by-page-and-category/${pageType}-${componentType}/category/${category}/`}
                  imageUpdateURL="banners/updateBanner/"
                  imageDeleteURL="banners/deleteBanner/"
                  showExtraFormFields={getFormDynamicFields(
                    `${pageType}-${componentType}`,
                    category
                  )}
                  dimensions={imageDimensionsJson(componentType)}
                />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default PageBannerComponent;
