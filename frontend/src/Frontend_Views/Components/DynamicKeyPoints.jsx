import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// Components
import Title from "../../Common/Title";

// Styles

import { useAdminLoginStatus } from "../../Common/customhook/useAdminLoginStatus";
import ServiceForm from "../../Frontend_Admin/Components/forms/ImgTitleIntoForm-List";
import ModelBg from "../../Common/ModelBg";
import EditIcon from "../../Common/AdminEditIcon";
import { axiosClientServiceApi } from "../../util/axiosUtil";
import {
  mapServicePagetoComponent,
  sortByDate,
  sortByCreatedDate,
} from "../../util/dataFormatUtil";
import { getImagePath } from "../../util/commonUtil";
import RichTextView from "../../Common/RichTextView";
import BriefIntroFrontend from "../../Common/BriefIntro";
import BriefIntroAdmin from "../../Frontend_Admin/Components/BriefIntro";
import {
  getFormDynamicFields,
  getKeyPointsDynamicFields,
  imageDimensionsJson,
} from "../../util/dynamicFormFields";
import ImageInputsForm from "../../Frontend_Admin/Components/forms/ImgTitleIntoForm";
import Banner from "../../Common/Banner";
import DynamicKeyPoint from "../../Common/DynamicKeyPoint";

const DynamicKeyPoints = ({ editHandler, objectstatus, pageType }) => {
  const editComponentObj = {
    service: false,
  };

  const { isAdmin, hasPermission } = useAdminLoginStatus();
  const [componentEdit, SetComponentEdit] = useState(editComponentObj);
  const [show, setShow] = useState(false);
  const [clientServiceList, setClientServiceList] = useState([]);

  return (
    <div className="homeService">
      <div className="container">
        <div className="row">
          <div className="breiftopMargin">
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
        </div>
      </div>
    </div>
  );
};

export default DynamicKeyPoints;
