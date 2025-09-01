import React from "react";
import BriefIntroFrontend from "../BriefIntro";
import EditIcon from "../AdminEditIcon";
import BriefIntroAdmin from "../../Frontend_Admin/Components/BriefIntro";
import useAdminLoginStatus from "../customhook/useAdminLoginStatus";
import ShowHideToggle from "../ShowHideToggle";
import BriefComponent from "./BriefComponent";

function BriefWithShowHideToggleComponent({
  editHandler,
  componentType,
  popupTitle,
  pageType,
  componentEdit,
  editlabel,
  linkCss,
  linkLabel,
  introTitleCss,
  introSubTitleCss,
  introDecTitleCss,
  detailsContainerCss,
  anchorContainer,
  anchersvgColor,
  maxHeight,
  showHideCompList,
  ShowHideToggle,
  showHideHandler,
  showHideComponentName,
  showHideComponentTitle,
  briefRootDivClass = "",
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
          componentName={showHideComponentName}
          showHideHandler={showHideHandler}
          id={showHideCompList?.[showHideComponentName]?.id}
        />
      )}

      {showHideCompList?.[showHideComponentName]?.visibility && (
        <div className={`homeBriefIntroduction ${briefRootDivClass}`}>
          <BriefComponent
            editHandler={editHandler}
            componentType={componentType}
            popupTitle={popupTitle}
            pageType={pageType}
            componentEdit={componentEdit}
            editlabel={editlabel}
            linkCss={linkCss}
            linkLabel={linkLabel}
            introTitleCss={introTitleCss}
            introSubTitleCss={introSubTitleCss}
            introDecTitleCss={introDecTitleCss}
            detailsContainerCss={detailsContainerCss}
            anchorContainer={anchorContainer}
            anchersvgColor={anchersvgColor}
            maxHeight={maxHeight}
          />
        </div>
      )}
    </div>
  );
}

export default BriefWithShowHideToggleComponent;
