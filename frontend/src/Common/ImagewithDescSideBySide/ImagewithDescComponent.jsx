import React, { useState, useEffect } from "react";

// Components

import "./index.css";

// Images

import { useAdminLoginStatus } from "../customhook/useAdminLoginStatus";
import EditIcon from "../AdminEditIcon";
import ModelBg from "../ModelBg";
import ImageInputsForm from "../../Frontend_Admin/Components/forms/ImgTitleIntoForm";
import { axiosClientServiceApi } from "../../util/axiosUtil";
import { getImagePath } from "../../util/commonUtil";
import { getFormDynamicFields, imageDimensionsJson } from "../../util/dynamicFormFields";
import Ancher from "../Ancher";
import ContactForm from "../Forms/ContactForm";
import RichTextView from "../RichTextView";
import AdminSingleRecordUpload from "../../Frontend_Admin/Components/forms/V2/AdminSingleRecordUpload";
import Title from "../Title";

const ImagewithDescComponent = ({
  cssClass,
  col1,
  col2,
  imageClass,
  pageType = "HomeWhoWeAre",
  showForm = false,
  categoryId,
  popupTitle = "Who We Are Banner",
  imageLabel = "Banner Image",
  category = "whoweare",
  componentType = "whoweare",
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
        const url = `banners/by-page-and-category/${pageType}/category/${category}/`;
        const response = await axiosClientServiceApi.get(url);
        if (response?.status === 200 && response?.data?.length > 0) {
          setBannerData(response.data[0]);
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
          alt={bannerData?.alternative_text}
          className={imageClass}
        />
      </div>

      <div className={`${col2}`}>
        {/* Edit */}
        {isAdmin && hasPermission && <EditIcon editHandler={() => editHandler("whoweare", true)} />}
        {bannerData?.banner_title && <Title title={bannerData.banner_title} cssClass={cssClass} />}
        {bannerData.banner_subTitle && (
          <Title title={bannerData.banner_subTitle} cssClass="fs-6 my-3" />
        )}
        <div>
          <RichTextView
            data={
              bannerData?.banner_descripiton
                ? bannerData?.banner_descripiton
                : isAdmin
                  ? "Please Update Content"
                  : ""
            }
            className={"introDecTitleCss bannerDescriptionCss"}
            showMorelink={false}
          />
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
      {componentEdit.whoweare && (
        <div className={`adminEditTestmonial selected`}>
          <AdminSingleRecordUpload
            editHandler={editHandler}
            componentType={componentType}
            popupTitle={popupTitle}
            imagePostURL="banners/createBanner/"
            imageGetURL={`banners/by-page-and-category/${pageType}/category/${category}/`}
            imageUpdateURL="banners/updateBanner/"
            imageDeleteURL="banners/deleteBanner/"
            imageLabel={imageLabel}
            showExtraFormFields={getFormDynamicFields(pageType, category)}
            dimensions={imageDimensionsJson(componentType)}
          />
        </div>
      )}

      {show && <ModelBg />}
    </>
  );
};

export default ImagewithDescComponent;
