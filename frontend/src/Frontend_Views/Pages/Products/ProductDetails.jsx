import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
// Components

import BriefIntroFrontend from "../../../Common/BriefIntro";
import Products from "./ProductsList";

import Banner from "../../../Common/Banner";
import EditIcon from "../../../Common/AdminEditIcon";
import ModelBg from "../../../Common/ModelBg";
import { useAdminLoginStatus } from "../../../Common/customhook/useAdminLoginStatus";
import AdminBriefIntro from "../../../Frontend_Admin/Components/BriefIntro/index";

import ImageInputsForm from "../../../Frontend_Admin/Components/forms/ImgTitleIntoForm";

import { ProductStyled } from "../../../Common/StyledComponents/Styled-Products";
import SearchFilter from "./FilterComponent";

import {
  getFormDynamicFields,
  imageDimensionsJson,
} from "../../../util/dynamicFormFields";

import Img1 from "../../../Images/Banner_11.jpg";
import Title from "../../../Common/Title";

const ProductDetails = () => {
  const editComponentObj = {
    banner: false,
    briefIntro: false,
  };

  const pageType = "products";
  const { isAdmin, hasPermission } = useAdminLoginStatus();
  const [componentEdit, SetComponentEdit] = useState(editComponentObj);
  const [show, setShow] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const editHandler = (name, value) => {
    SetComponentEdit((prevFormData) => ({ ...prevFormData, [name]: value }));
    setShow(!show);
    document.body.style.overflow = "hidden";
  };

  return (
    <>
      {/* Page Banner Component */}
      {/* <div className="position-relative">
        {isAdmin && hasPermission && (
          <EditIcon editHandler={() => editHandler("banner", true)} />
        )}
        <Banner
          getBannerAPIURL={`banner/clientBannerIntro/${pageType}-banner/`}
          bannerState={componentEdit.banner}
        />
      </div> */}
      {/* 
      {componentEdit.banner ? (
        <div className="adminEditTestmonial">
          <ImageInputsForm
            editHandler={editHandler}
            componentType="banner"
            pageType={`${pageType}-banner`}
            imageLabel="Project Banner Image"
            showDescription={false}
            showExtraFormFields={getFormDynamicFields(`${pageType}-banner`)}
            dimensions={imageDimensionsJson("banner")}
          />
        </div>
    ) : (
    ""
    )} */}
      {/* Introduction */}
      {/* {isAdmin && hasPermission && (
        <EditIcon editHandler={() => editHandler("briefIntro", true)} />
      )}

      <BriefIntroFrontend
        introState={componentEdit.briefIntro}
        pageType={pageType}
      />

      {componentEdit.briefIntro ? (
        <div className="adminEditTestmonial">
          <AdminBriefIntro
            editHandler={editHandler}
            componentType="briefIntro"
            pageType={pageType}
          />
        </div>
      ) : (
        ""
      )} */}
      <ProductStyled>
        <div className="container productDetails">
          <div className="row">
            <div className="col-md-10 offset-md-1 pt-5 text-center">
              <img src={Img1} alt="" className="w-100 rounded-3" />
            </div>
            <div className="col-md-10 offset-md-1 py-3">
              <Title title="Brentuximab" cssClass="fs-4 fw-bold" />
              <Title title="Sun Pharmaceuticals" cssClass="fs-6" />
              <Title title="Product Details" cssClass="fs-6 fw-bold mt-4" />
              <p>
                If you have diabetes, checking your blood sugar is simple, easy
                and affordable with ReliOn Platinum Blood Glucose Test Strips.
                ReliOn Platinum test strips are compatible with the ReliOn
                Platinum Blood Glucose Meter; an affordable, accurate, Bluetooth
                meter with advanced features. ReliOn Platinum test strips have a
                wide dosing area, making it easy to apply a small amount of
                blood anywhere along the test strip edge. Package includes 50
                ReliOn Platinum blood glucose test strips.
              </p>
              <p>
                The manufacturer warrants that your ReliOn Platinum test strips
                will be free from defects in materials and workmanship until the
                product expiration date printed on the label if the test strips
                are used and stored in the manner described in this package
                insert and in your ReliOn Platinum blood glucose meter User’s
                Manual. If, prior to the expiration date of the test strips,
                there is a defect in materials or workmanship, the manufacturer
                will replace the test strips free of charge.
              </p>
              <p>
                Failure to follow testing instructions or test strip storage and
                handling instructions can lead to an incorrect test result that
                may lead to improper therapy. Carefully read and follow the
                instructions in the User's Manual and package inserts for the
                test strips.
              </p>
              <p>
                Together, we impact life and health with science. We offer one
                of the broadest portfolios in the industry for scientists,
                best-in-class products for pharmaceutical development and
                manufacturing, and a fully integrated service organization to
                support CDMO and contract testing across traditional and novel
                modalities. Our vision is a world where our innovative products,
                services, and digital offerings help create solutions for people
                globally and a sustainable future for generations to come.
              </p>
            </div>
          </div>
        </div>
      </ProductStyled>
      {show && <ModelBg />}
    </>
  );
};
export default ProductDetails;
