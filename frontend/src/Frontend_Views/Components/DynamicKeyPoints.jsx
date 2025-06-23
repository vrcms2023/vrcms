import React from "react";

// Styles

import { useAdminLoginStatus } from "../../Common/customhook/useAdminLoginStatus";
import EditIcon from "../../Common/AdminEditIcon";

import {
  getKeyPointsDynamicFields,
  imageDimensionsJson,
} from "../../util/dynamicFormFields";
import ImageInputsForm from "../../Frontend_Admin/Components/forms/ImgTitleIntoForm";

import DynamicKeyPoint from "../../Common/DynamicKeyPoint";

const DynamicKeyPoints = ({ editHandler, objectstatus, pageType }) => {
  const { isAdmin, hasPermission } = useAdminLoginStatus();

  return (
    <div className="position-relative">
      {isAdmin && hasPermission && (
        <EditIcon editHandler={() => editHandler(pageType, true)} />
      )}

      <DynamicKeyPoint
        getBannerAPIURL={`banner/clientBannerIntro/${pageType}/`}
        bannerState={objectstatus}
      />

      {objectstatus && (
        <div className="adminEditTestmonial selected">
          <ImageInputsForm
            editHandler={editHandler}
            componentType={pageType}
            pageType={pageType}
            imageLabel="Key Points"
            showDescription={false}
            showExtraFormFields={getKeyPointsDynamicFields(pageType)}
            dimensions={imageDimensionsJson("banner")}
          />
        </div>
      )}
    </div>
  );
};

export default DynamicKeyPoints;
