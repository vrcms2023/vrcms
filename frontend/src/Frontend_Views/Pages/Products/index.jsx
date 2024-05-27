import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
// Components

import BriefIntroFrontend from "../../../Common/BriefIntro";

import Banner from "../../../Common/Banner";
import EditIcon from "../../../Common/AdminEditIcon";
import ModelBg from "../../../Common/ModelBg";
import { useAdminLoginStatus } from "../../../Common/customhook/useAdminLoginStatus";

import ImageInputsForm from "../../../Frontend_Admin/Components/forms/ImgTitleIntoForm";
import { ProductStyled } from "../../../Common/StyledComponents/Styled-Products";

import {
  getFormDynamicFields,
  imageDimensionsJson,
} from "../../../util/dynamicFormFields";
import SearchFilter from "./FilterComponent";
import ProductsList from "./ProductsList";
import ABriefAbout from "../../Components/ABriefAbout";
import { ABriefIntroStyled } from "../../../Common/StyledComponents/Styled-ABriefAbout";
import Button from "../../../Common/Button";
import BriefIntroAdmin from "../../../Frontend_Admin/Components/BriefIntro";

const ProductsPage = () => {
  const editComponentObj = {
    banner: false,
    briefIntro: false,
  };

  const pageType = "products";
  const { isAdmin, hasPermission } = useAdminLoginStatus();
  const [componentEdit, SetComponentEdit] = useState(editComponentObj);
  const [show, setShow] = useState(false);

  // useEffect(() => {
  //   window.scrollTo(0, 0);
  // }, []);

  const editHandler = (name, value) => {
    SetComponentEdit((prevFormData) => ({ ...prevFormData, [name]: value }));
    setShow(!show);
    document.body.style.overflow = "hidden";
  };

  return (
    <>
      {/* Page Banner Component */}
      <div className="position-relative">
        {isAdmin && hasPermission && (
          <EditIcon editHandler={() => editHandler("banner", true)} />
        )}
        {/* <Banner
          getBannerAPIURL={`banner/clientBannerIntro/${pageType}-banner/`}
          bannerState={componentEdit.banner}
        /> */}
        <Banner
          getBannerAPIURL={`banner/clientBannerIntro/${pageType}-banner/`}
          bannerState={componentEdit.banner}
          bannerContainerCss={"titleCaption d-flex align-items-end justify-content-end flex-column"}
          bannerTitleCss={"title text-end fs-2"}
          bannerSubTitleCss={"subTitle text-end fw-normal"}
          bannerDescriptionCss={"description text-end d-block mt-2 fs-6"}
          imageCss={"w-100"}
        />
      </div>

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
      )}

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
        <SearchFilter />

        <div className="container productsList pt-5">
          <ProductsList />
        </div>

        {/* INTRODUCTION COMPONENT */}
        {isAdmin && hasPermission && (
          <EditIcon editHandler={() => editHandler("briefIntro", true)} />
        )}
        <div className="container">
          <div className="row my-4">
            <BriefIntroFrontend
              introState={componentEdit.briefIntro}
              linkCss="btn btn-outline d-flex justify-content-center align-items-center gap-3"
              linkLabel="Read More"
              moreLink=""
              introTitleCss="fs-2 text-center fw-medium mb-3 pt-3"
              introSubTitleCss="mb-3 fw-bold text-secondary text-center"
              introDecTitleCss="text-center lh-md m-0 fw-medium"
              detailsContainerCss="col-md-10 offset-md-1 py-3"
              anchorContainer="d-flex justify-content-center align-items-center mt-4"
              anchersvgColor="#17427C"
              pageType={pageType}
            />
          </div>
        </div>

        {componentEdit.briefIntro ? (
          <div className="adminEditTestmonial">
            <BriefIntroAdmin
              editHandler={editHandler}
              componentType="briefIntro"
              pageType={pageType}
            />
          </div>
        ) : (
          ""
        )}

        <ABriefIntroStyled>
          <div className="container productForm">
            <div className="row py-4">
              <ABriefAbout
                col1="col-md-5 p-5"
                col2="col-md-7 p-5 p-md-5 d-flex justify-content-center align-items-start flex-column"
                cssClass="fs-3 text-center fw-medium title"
                imageClass="w-100 h-100 object-fit-cover rounded-end rounded-end-5"
                dimensions={imageDimensionsJson("whoweare")}
                pageType={"products"}
                componentFlip={false}
                showForm={true}
              />
            </div>
          </div>
        </ABriefIntroStyled>
      </ProductStyled>

      {show && <ModelBg />}
    </>
  );
};
export default ProductsPage;
