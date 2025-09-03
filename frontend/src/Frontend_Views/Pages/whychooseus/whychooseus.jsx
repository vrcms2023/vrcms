import React, { useEffect, useRef, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

// Components

import BriefIntroFrontend from "../../../Common/BriefIntro";
import EditIcon from "../../../Common/AdminEditIcon";
import ModelBg from "../../../Common/ModelBg";
import Banner from "../../../Common/Banner";

import { useAdminLoginStatus } from "../../../Common/customhook/useAdminLoginStatus";

import ImageInputsForm from "../../../Frontend_Admin/Components/forms/ImgTitleIntoForm";
import AdminBriefIntro from "../../../Frontend_Admin/Components/BriefIntro/index";

import { removeActiveClass } from "../../../util/ulrUtil";
import { getFormDynamicFields, imageDimensionsJson } from "../../../util/dynamicFormFields";

// CSS

import ShowHideToggle from "../../../Common/ShowHideToggle";
import { getObjectsByKey } from "../../../util/showHideComponentUtil";
import {
  createShowHideComponent,
  getAllShowHideComponentsList,
  updateShowHideComponent,
} from "../../../redux/showHideComponent/showHideActions";
import DynamicKeyPoints from "../../Components/DynamicKeyPoints";
import PageBannerComponent from "../../../Common/Banner/PageBannerComponent";
import BriefWithShowHideToggleComponent from "../../../Common/Brief/BriefWithShowHideToggleComponent";

const WhyChooseUs = () => {
  const editComponentObj = {
    banner: false,
    briefIntro: false,
    dynamickeypoints1: false,
    dynamickeypoints2: false,
    dynamickeypoints3: false,
    dynamickeypoints4: false,
    dynamickeypoints5: false,
    dynamickeypoints6: false,
  };

  const dispatch = useDispatch();
  const pageType = "whychooseus";
  const { isAdmin, hasPermission } = useAdminLoginStatus();
  const [componentEdit, SetComponentEdit] = useState(editComponentObj);
  const [show, setShow] = useState(false);
  const [showHideCompList, setShowHideCompList] = useState([]);

  const keyPointsList = [1, 2, 3, 4, 5, 6];

  const { error, success, showHideList } = useSelector((state) => state.showHide);

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

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    removeActiveClass();
  }, []);

  const editHandler = (name, value, item) => {
    SetComponentEdit((prevFormData) => ({ ...prevFormData, [name]: value }));
    setShow(!show);
    document.body.style.overflow = "hidden";
  };

  return (
    <>
      {/* Page Banner Component */}
      <PageBannerComponent
        editHandler={editHandler}
        componentEdit={componentEdit}
        pageType={pageType}
        category={"whychooseus-banner"}
        showHideCompList={showHideCompList}
        showHideHandler={showHideHandler}
        popupTitle={"Why Choose Us Banner"}
        showHideComponentName={"whychooseusbanner"}
      />

      <BriefWithShowHideToggleComponent
        editHandler={editHandler}
        componentType="briefIntro"
        popupTitle="Why Choose Us Brief Introduction Component"
        pageType={pageType}
        componentEdit={componentEdit}
        showHideCompList={showHideCompList}
        showHideHandler={showHideHandler}
        editlabel={"briefIntro"}
        showHideComponentName={"whychooseusbriefintro"}
        detailsContainerCss="col-lg-10 offset-lg-1 text-center"
        showHideComponentTitle={"Why Choose Us Brief Intro "}
      />

      <div className="container my-5">
        <div className="row">
          {keyPointsList.map((i) => (
            <div className="col-md-6" key={i}>
              <DynamicKeyPoints
                editHandler={editHandler}
                objectstatus={componentEdit[`dynamickeypoints${i}`]}
                pageType={`dynamickeypoints${i}`}
              />
            </div>
          ))}
        </div>
      </div>

      {show && <ModelBg />}
    </>
  );
};

export default WhyChooseUs;
