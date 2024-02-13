import React, { useState, useEffect } from "react";

// Components
import Title from "../../Common/Title";
import NewsForm from "../../Admin/Components/News/index";

// Styles

import "./ABriefAbout.css";

// Images

import { useAdminLoginStatus } from "../../Common/customhook/useAdminLoginStatus";
import EditIcon from "../../Common/AdminEditIcon";
import ModelBg from "../../Common/ModelBg";
import ImageInputsForm from "../../Admin/Components/forms/ImgTitleIntoForm";
import { axiosClientServiceApi } from "../../util/axiosUtil";
import { getImagePath } from "../../util/commonUtil";
import { getFormDynamicFields } from "../../util/dynamicFormFields";
import Ancher from "../../Common/Ancher";

const ABriefAbout = ({ cssClass, dimensions }) => {
  const editComponentObj = {
    whoweare: false,
  };
  const pageType = "HomeWhoWeAre";
  const { isAdmin, hasPermission } = useAdminLoginStatus();
  const [componentEdit, SetComponentEdit] = useState(editComponentObj);
  const [show, setShow] = useState(false);
  const [bannerData, setBannerData] = useState("");

  const editHandler = (name, value) => {
    SetComponentEdit((prevFormData) => ({ ...prevFormData, [name]: value }));
    setShow(!show);
    document.body.style.overflow = "hidden";
  };

  useEffect(() => {
    const getBannerData = async () => {
      try {
        const response = await axiosClientServiceApi.get(
          `banner/clientBannerIntro/${pageType}/`,
        );
        if (response?.status == 200) {
          setBannerData(response.data.imageModel);
        }
      } catch (error) {
        console.log("unable to access ulr because of server is down");
      }
    };
    if (!componentEdit.whoweare) {
      getBannerData();
    }
  }, [componentEdit.whoweare]);

  return (
    <>
      <div className="col-md-5 pb-5 p-md-0  d-flex align-items-center justify-content-center justify-content-md-end">
        <img src={getImagePath(bannerData?.path)} alt="" className="" />
      </div>
      <div className="col-md-7">
        {/* Edit News */}
        {isAdmin && hasPermission && (
          <EditIcon editHandler={() => editHandler("whoweare", true)} />
        )}
        <div className="row h-100">
          <div className="col-md-12 p-4 pt-0 p-lg-5 pt-lg-0 d-flex justify-content-center align-items-start flex-column">
            {bannerData.banner_title ? (
              <Title title={bannerData.banner_title} cssClass={cssClass} />
            ) : (
              ""
            )}

            {bannerData.banner_subTitle ? (
              <Title
                title={bannerData.banner_subTitle}
                cssClass="fs-1 fw-bold"
              />
            ) : (
              ""
            )}

            <div>
              <p className="lh-md mt-4">
                {bannerData?.banner_descripiton
                  ? bannerData.banner_descripiton
                  : "Update description"}
              </p>
            </div>
            <div>
              <Ancher
                AncherLabel="Know More"
                Ancherpath="/about"
                AncherClass="btn btn-secondary d-flex justify-content-center align-items-center gap-3"
                AnchersvgColor="#ffffff"
              />
            </div>
          </div>
        </div>
      </div>

      {componentEdit.whoweare ? (
        <div className="adminEditTestmonial">
          <ImageInputsForm
            editHandler={editHandler}
            componentType="whoweare"
            pageType={pageType}
            imageLabel="Banner Image"
            showDescription={false}
            dimensions={dimensions}
            showExtraFormFields={getFormDynamicFields(pageType)}
          />
        </div>
      ) : (
        ""
      )}

      {show && <ModelBg />}
    </>
  );
};

export default ABriefAbout;
