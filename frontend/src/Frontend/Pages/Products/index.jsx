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
import AdminBriefIntro from "../../../Admin/Components/BriefIntro/index";

import ImageInputsForm from "../../../Admin/Components/forms/ImgTitleIntoForm";

import { ProductStyled } from '../../../Common/StyledComponents/Styled-Products'


import {
  getFormDynamicFields,
  imageDimensionsJson,
} from "../../../util/dynamicFormFields";
import Products from "./ProductsList";
import SearchFilter from "./FilterComponent";



const ProductsPage = () => {
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
      <div className="position-relative">
        {isAdmin && hasPermission && (
          <EditIcon editHandler={() => editHandler("banner", true)} />
        )}
        <Banner
          getBannerAPIURL={`banner/clientBannerIntro/${pageType}-banner/`}
          bannerState={componentEdit.banner}
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

        <div className="container productsList">
          <Products />
        </div>
      </ProductStyled>

      {show && <ModelBg />}
    </>
  );
};
export default ProductsPage;
