import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getObjectsByKey } from "../../../util/showHideComponentUtil";
import {
  createShowHideComponent,
  updateShowHideComponent,
} from "../../../redux/showHideComponent/showHideActions";
import { axiosClientServiceApi } from "../../../util/axiosUtil";
import { mapServicePagetoComponent } from "../../../util/dataFormatUtil";
import ShowHideToggle from "../../../Common/ShowHideToggle";
import EditIcon from "../../../Common/AdminEditIcon";
import BriefIntroFrontend from "../../../Common/BriefIntro";
import BriefIntroAdmin from "../../../Frontend_Admin/Components/BriefIntro";
import Title from "../../../Common/Title";
import RichTextView from "../../../Common/RichTextView";
import Ancher from "../../../Common/Ancher";
import useAdminLoginStatus from "../../../Common/customhook/useAdminLoginStatus";
import { getImagePath } from "../../../util/commonUtil";
import { ShowAllServicesPage } from "../../../Common/StyledComponents/Styled-ListAllServicesPage";

// Components

// Styles

const AllServices = () => {
  const editComponentObj = {
    service: false,
  };

  const pageType = "allservicesbrief";
  const { isAdmin, hasPermission } = useAdminLoginStatus();
  const [componentEdit, SetComponentEdit] = useState(editComponentObj);
  const [show, setShow] = useState(false);
  const [clientServiceList, setClientServiceList] = useState([]);
  const [showHideCompList, setShowHideCompList] = useState([]);

  const { error, success, showHideList } = useSelector(
    (state) => state.showHide
  );

  const dispatch = useDispatch();
  useEffect(() => {
    if (showHideList.length > 0) {
      setShowHideCompList(getObjectsByKey(showHideList));
    }
  }, [showHideList]);

  const showHideHandler = async (id, compName) => {
    if (id) {
      dispatch(updateShowHideComponent(id));
    } else {
      const newData = {
        componentName: compName.toLowerCase(),
        pageType: pageType,
      };
      dispatch(createShowHideComponent(newData));
    }
  };

  const editHandler = (name, value) => {
    SetComponentEdit((prevFormData) => ({ ...prevFormData, [name]: value }));
    setShow(!show);
    document.body.style.overflow = "hidden";
  };

  useEffect(() => {
    getClinetServiceList();
  }, []);

  const getClinetServiceList = async () => {
    try {
      let response = await axiosClientServiceApi.get(
        `/services/getClientHomePageService/`
      );

      let data = mapServicePagetoComponent(response.data);
      setClientServiceList(data);
    } catch (error) {
      console.log("Unable to get the intro");
    }
  };

  return (
    <>
      <div
        className={
          showHideCompList?.allservicesbrief?.visibility &&
          isAdmin &&
          hasPermission
            ? "componentOnBorder"
            : ""
        }
      >
        {isAdmin && hasPermission && (
          <ShowHideToggle
            showhideStatus={showHideCompList?.allservicesbrief?.visibility}
            title={" Brief"}
            componentName={"allservicesbrief"}
            showHideHandler={showHideHandler}
            id={showHideCompList?.allservicesbrief?.id}
          />
        )}
        {showHideCompList?.allservicesbrief?.visibility && (
          <div className="homeDynamciServicesIntro">
            <div>
              <div className="breiftopMargin">
                {isAdmin && hasPermission && (
                  <EditIcon
                    editHandler={() => editHandler("allservicesbrief", true)}
                  />
                )}

                <BriefIntroFrontend
                  introState={componentEdit.allservicesbrief}
                  linkCss="btn btn-outline d-flex justify-content-center align-items-center gap-3"
                  linkLabel="Read More"
                  moreLink=""
                  introTitleCss="text-center mb-4"
                  introSubTitleCss="fw-medium text-muted text-center"
                  introDecTitleCss="fs-6 fw-normal mx-4 text-center"
                  detailsContainerCss="col-md-12 py-3"
                  anchorContainer="d-flex justify-content-center align-items-center mt-4"
                  anchersvgColor="#17427C"
                  pageType={"allservicesbrief"}
                  maxHeight="300"
                />

                {componentEdit.allservicesbrief && (
                  <div className={`adminEditTestmonial selected `}>
                    <BriefIntroAdmin
                      editHandler={editHandler}
                      componentType="allservicesbrief"
                      popupTitle="Brief Intro Banner"
                      pageType={pageType}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
      {/* END OF ICONS ALL SERVICES */}
      <ShowAllServicesPage>
        <div className="container">
          {clientServiceList?.map((items, index) =>
            items?.child.map((item) => (
              <div
                className="row allService mb-5 border border-1"
                key={`${index}+homeService`}
              >
                <div className="col-md-5 p-0 allServiceImg">
                  <img
                    src={
                      item?.path
                        ? getImagePath(item?.path)
                        : getImagePath("/media/images/dummy-image-square.png")
                    }
                    alt={item.alternitivetext}
                    className="img-fluid"
                  />
                </div>
                <div className="col-md-7 p-4 allServiceDetails">
                  <Title title={item.feature_title} cssClass="serviceTitle" />
                  {item.feature_description && (
                    <RichTextView
                      data={item.feature_description}
                      className={"description"}
                      characterLimit={600}
                      showMorelink={false}
                    />
                    // <div
                    //   className="description"
                    //   dangerouslySetInnerHTML={{ __html: item.feature_description }}
                    // />
                  )}
                  <Ancher
                    AncherLabel="Read More"
                    Ancherpath={`${item.services_page_url}`}
                    AncherClass="d-block mt-3"
                    AnchersvgColor="#ffffff"
                  />
                </div>
              </div>
            ))
          )}
        </div>
      </ShowAllServicesPage>
      {componentEdit.service ? (
        <div className="adminEditTestmonial">
          <ServiceForm
            editHandler={editHandler}
            componentType="service"
            popupTitle="Service"
          />
        </div>
      ) : (
        ""
      )}

      {show && <ModelBg />}
    </>
  );
};

export default AllServices;
