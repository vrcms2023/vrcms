import React from "react";
import BriefIntroFrontend from "../BriefIntro";
import EditIcon from "../AdminEditIcon";
import BriefIntroAdmin from "../../Frontend_Admin/Components/BriefIntro";
import useAdminLoginStatus from "../customhook/useAdminLoginStatus";

function BriefComponent({
  editHandler,
  componentType,
  popupTitle,
  pageType,
  componentEdit,
  editlabel,
  linkCss = "btn btn-outline d-flex justify-content-center align-items-center gap-3",
  linkLabel = "Read More",
  introTitleCss = "mb-0 text-center fw-medium",
  introSubTitleCss = "fw-medium text-muted text-center",
  introDecTitleCss = "fs-6 fw-normal mx-4 text-center",
  detailsContainerCss = "col-md-12",
  anchorContainer = "d-flex justify-content-center align-items-center mt-4",
  anchersvgColor = "#17427C",
  maxHeight = 300,
}) {
  const { isAdmin, hasPermission } = useAdminLoginStatus();
  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="breiftopMargin">
            {isAdmin && hasPermission && (
              <EditIcon
                editHandler={() => editHandler(componentType, true)}
                editlabel={editlabel}
              />
            )}

            <BriefIntroFrontend
              introState={componentEdit[componentType]}
              linkCss={linkCss}
              linkLabel={linkLabel}
              moreLink=""
              introTitleCss={introTitleCss}
              introSubTitleCss={introSubTitleCss}
              introDecTitleCss={introDecTitleCss}
              detailsContainerCss={detailsContainerCss}
              anchorContainer={anchorContainer}
              anchersvgColor={anchersvgColor}
              pageType={pageType}
              maxHeight={maxHeight}
            />

            {componentEdit[componentType] && (
              <div className={`adminEditTestmonial selected `}>
                <BriefIntroAdmin
                  editHandler={editHandler}
                  componentType={componentType}
                  popupTitle={popupTitle}
                  pageType={pageType}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BriefComponent;
