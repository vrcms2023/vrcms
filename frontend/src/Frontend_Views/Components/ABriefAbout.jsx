import React, { useState, useEffect } from "react";

// Components
import Title from "../../Common/Title";
import "./ABriefAbout.css";

// Images

import { useAdminLoginStatus } from "../../Common/customhook/useAdminLoginStatus";
import EditIcon from "../../Common/AdminEditIcon";
import ModelBg from "../../Common/ModelBg";
import ImageInputsForm from "../../Frontend_Admin/Components/forms/ImgTitleIntoForm";
import { axiosClientServiceApi } from "../../util/axiosUtil";
import { getImagePath } from "../../util/commonUtil";
import { getFormDynamicFields } from "../../util/dynamicFormFields";
import Ancher from "../../Common/Ancher";
import ContactForm from "../../Common/Forms/ContactForm";

const ABriefAbout = ({
  cssClass,
  col1,
  col2,
  imageClass,
  dimensions,
  pageType = "HomeWhoWeAre",
  componentFlip = false,
  showForm = false,
  categoryId,
}) => {
  const editComponentObj = {
    whoweare: false,
  };
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
          `banner/clientBannerIntro/${pageType}/`
        );
        if (response?.status === 200) {
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
      <div className={`${col1}`}>
        <img
          src={getImagePath(bannerData?.path)}
          alt=""
          className={imageClass}
        />
      </div>

      <div className={`${col2}`}>
        {/* Edit */}
        {isAdmin && hasPermission && (
          <EditIcon editHandler={() => editHandler("whoweare", true)} />
        )}
        {bannerData.banner_title ? (
          <Title title={bannerData.banner_title} cssClass={cssClass} />
        ) : (
          ""
        )}
        {bannerData.banner_subTitle ? (
          <Title title={bannerData.banner_subTitle} cssClass="fs-6 my-3" />
        ) : (
          ""
        )}
        <div>
          <p className="lh-md">
            {bannerData?.banner_descripiton
              ? bannerData.banner_descripiton
              : "Update description"}
          </p>
        </div>
        {showForm && <ContactForm categoryId={categoryId} />}
        {bannerData.moreLink ? (
          <div>
            <Ancher
              AncherLabel="more..."
              Ancherpath={bannerData.moreLink ? bannerData.moreLink : ""}
              AncherClass="moreLink d-flex justify-content-center align-items-center gap-3"
              AnchersvgColor="#ffffff"
            />
          </div>
        ) : (
          ""
        )}
      </div>

      <div className={`adminEditTestmonial ${componentEdit.whoweare ? "selected" : "dismiss" } `}>
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

      {/* {componentEdit.whoweare ? (
          
      ) : (
        ""
      )} */}

      {show && <ModelBg />}
    </>
  );
};

export default ABriefAbout;
