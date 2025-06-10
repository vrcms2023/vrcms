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

const HomeDynamicServices = ({ editHandler, objectstatus, pageType }) => {
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

            <BriefIntroFrontend
              introState={objectstatus}
              linkCss="text-white"
              linkLabel="In detail..."
              moreLink=""
              introTitleCss="fs-4 mb-4 lineClamp lc2"
              introSubTitleCss="fw-medium text-muted text-center"
              introDecTitleCss="text-white text-start lineClamp lc5"
              detailsContainerCss="col-md-12 py-3"
              anchorContainer="d-flex justify-content-start mt-4"
              anchersvgColor="#fff"
              pageType={pageType}
              showLink="true"
            />

            {objectstatus && (
              <div className={`adminEditTestmonial selected `}>
                <BriefIntroAdmin
                  editHandler={editHandler}
                  componentType={pageType}
                  popupTitle="Home Service"
                  pageType={pageType}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeDynamicServices;
