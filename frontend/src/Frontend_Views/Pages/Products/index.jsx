import React, { useState, useEffect, useRef } from "react";
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
  getCategoryFormDynamicFields,
  getFormDynamicFields,
  getProductCategoryBannerFormFields,
  getProductFormDynamicFields,
  imageDimensionsJson,
} from "../../../util/dynamicFormFields";
import SearchFilter from "./FilterComponent";
import ProductsList from "./ProductsList";
import ABriefAbout from "../../Components/ABriefAbout";
import { ABriefIntroStyled } from "../../../Common/StyledComponents/Styled-ABriefAbout";
import Button from "../../../Common/Button";
import BriefIntroAdmin from "../../../Frontend_Admin/Components/BriefIntro";
import DynamicForm from "../../../Frontend_Admin/Components/forms/DynamicForm";
import {
  axiosClientServiceApi,
  axiosServiceApi,
} from "../../../util/axiosUtil";
import Title from "../../../Common/Title";
import { confirmAlert } from "react-confirm-alert";
import DeleteDialog from "../../../Common/DeleteDialog";
import SingleImageUlploadWithForm from "../../../Frontend_Admin/Components/forms/SingleImageUlploadWithForm";

const ProductsPage = () => {
  const editComponentObj = {
    banner: false,
    briefIntro: false,
    category: false,
    product: false,
  };
  const pageload = useRef(true);
  const { isAdmin, hasPermission } = useAdminLoginStatus();
  const [componentEdit, SetComponentEdit] = useState(editComponentObj);
  const [show, setShow] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedProduct, setSelectedProduct] = useState("");
  const [category, setCategory] = useState([]);
  const [editCategoryState, setEditCategoryState] = useState(false);
  const [pageType, setPageType] = useState("products");
  const [compTtile, setComptitle] = useState("Add Product");

  const editHandler = (name, value, item) => {
    if (item) {
      setSelectedProduct(item);
      setComptitle(
        `${selectedCategory?.category_name} > ${item.product_name} - Edit Product`
      );
    } else {
      setComptitle(`${selectedCategory?.category_name} - Add New Product`);
    }

    SetComponentEdit((prevFormData) => ({ ...prevFormData, [name]: value }));
    setShow(!show);
    document.body.style.overflow = "hidden";
  };

  useEffect(() => {
    const getCategory = async () => {
      try {
        let response = await axiosClientServiceApi.get(
          `/products/getClinetCategory/`
        );
        setCategory(response?.data?.category);
        if (pageload.current) {
          const data = response?.data?.category[0];
          setSelectedCategory(data);
          pageload.current = false;
          setPageType(data?.id ? data?.id : pageType);
        }
      } catch (error) {
        console.log("Unable to get the intro");
      }
    };

    getCategory();
    setPageType(selectedCategory?.id ? selectedCategory?.id : pageType);
  }, [selectedCategory, pageload]);

  const categoryEditHandler = () => {
    setEditCategoryState(true);
    editHandler("category", true);
  };

  const categoryDeleteHandler = () => {
    const id = selectedCategory?.id;
    const deleteSection = async () => {
      const response = await axiosServiceApi.delete(
        `/products/updateCategory/${id}/`
      );
      if (response.status === 204) {
        const list = category.filter((list) => list.id !== id);
        setCategory(list);
        setSelectedCategory(list.length > 0 ? list[0] : "");

        toast.success(`${selectedCategory?.category_name} is deleted`);
      }
    };

    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <DeleteDialog
            onClose={onClose}
            callback={deleteSection}
            message={`deleting the ${selectedCategory?.category_name} Service?`}
          />
        );
      },
    });
  };

  return (
    <>
      {isAdmin && hasPermission && (
        <div className="container my-5">
          <div className="row">
            <div className="col-md-6 fw-bold fw-md-medium py-3 py-md-0 fs-5 fs-md-4 text-center d-flex justify-content-md-end align-items-center">Create New - Edit - Delete "CATEGORY"</div>
            <div className="col-md-6 d-flex justify-content-center gap-2">
              
              <Button
                type="button"
                cssClass="btn btn-secondary"
                label={"Create"}
                handlerChange={() => {
                  editHandler("category", true);
                }}
              />
              {selectedCategory?.id && (
                <Button
                  type="button"
                  cssClass="btn btn-more"
                  label={"Edit"}
                  handlerChange={categoryEditHandler}
                />
              )}
              {selectedCategory?.id && (
                <Button
                  type="button"
                  cssClass="btn bg-danger text-white"
                  label={"Delete"}
                  handlerChange={categoryDeleteHandler}
                />
              )}
            </div>
          </div>
        </div>
      )}

      {componentEdit.category && (
        <div className="adminEditTestmonial">
          <DynamicForm
            editHandler={editHandler}
            componentTitle={"Crete New Category"}
            componentType={"category"}
            editObject={editCategoryState ? selectedCategory : ""}
            setEditState={setEditCategoryState}
            setSavedObject={setSelectedCategory}
            dynamicFormFields={getCategoryFormDynamicFields()}
            formPostURL={"/products/createCategory/"}
            formUpdateURL={"/products/updateCategory/"}
          />
        </div>
      )}
      {selectedCategory?.id && (
        <>
          {/* Page Banner Component */}
          <div className="position-relative">
            {isAdmin && hasPermission && (
              <EditIcon editHandler={() => editHandler("banner", true)} />
            )}

            <Banner
              getBannerAPIURL={`banner/clientBannerIntro/${pageType}-banner/`}
              bannerState={componentEdit.banner}
              bannerTitleCss = "text-end fs-2"
              bannerSubTitleCss = "text-end fw-normal"
              bannerDescriptionCss = "text-end d-block mt-2 fs-6"
              imageCss = "w-100"
              bannerContainerCss = "d-flex align-items-end justify-content-center flex-column"
            />
          </div>

          {componentEdit.banner && (
            <div className="adminEditTestmonial">
              <ImageInputsForm
                editHandler={editHandler}
                componentType="banner"
                pageType={`${pageType}-banner`}
                imageLabel="Category Banner Image"
                showDescription={false}
                showExtraFormFields={getProductCategoryBannerFormFields(
                  `${pageType}-banner`
                )}
                dimensions={imageDimensionsJson("banner")}
              />
            </div>
          )}
        </>
      )}

      <ProductStyled>
        <SearchFilter
          category={category}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
        <div />
        
        <div className="container productsList pt-5" style={{marginTop: "100px"}}>

        <div className="row mb-4">
          <div className="col-md-6 d-flex justify-content-center justify-content-md-start mb-3 mb-md-0 align-items-center"><Title title={`${selectedCategory?.category_name} Products`} cssClass={"fw-medium fs-5"} /> </div>
          <div className="col-md-6 d-flex justify-content-end align-items-center">
          {selectedCategory?.id && isAdmin && hasPermission && (
            <Button
              type="button"
              cssClass="btn btn-secondary"
              label={"Add New Product"}
              handlerChange={() => {
                editHandler("product", true);
              }}
            />
            // <EditIcon editHandler={() => editHandler("product", true)} />
          )}</div>
        </div>
        
          
          {selectedCategory?.id && (
            <ProductsList
              compState={componentEdit.product}
              selectedCategory={selectedCategory}
              editHandler={editHandler}
            />
          )}
        </div>

        {componentEdit.product && (
          <div className="adminEditTestmonial">
            <SingleImageUlploadWithForm
              editHandler={editHandler}
              componentType="product"
              componentTitle={compTtile}
              selectedItem={selectedProduct}
              setSelectedItemState={setSelectedProduct}
              imageGetURL={`/products/createAppNews/${selectedCategory.id}/`}
              imagePostURL="/products/createProduct/"
              imageUpdateURL="/products/updateProduct/"
              imageDeleteURL="/products/updateProduct/"
              imageLabel="Product Image"
              showDescription={false}
              showExtraFormFields={getProductFormDynamicFields(
                selectedCategory
              )}
              dimensions={imageDimensionsJson("product")}
            />
          </div>
        )}

        {selectedCategory?.id && (
          <>
            {/* INTRODUCTION COMPONENT */}
            {/* {isAdmin && hasPermission && (
              <EditIcon editHandler={() => editHandler("briefIntro", true)} />
            )} */}
            {/* <div className="container">
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
            </div> */}
          </>
        )}
        {/* 
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
        )} */}

        {/* Feed back form for client to send product list back */}
        {selectedCategory?.id && (
          <>
            <ABriefIntroStyled>
              <div className="container-lg px-0  productForm">
                <div className="row py-4">
                  <ABriefAbout
                    col1="col-md-5 p-lg-5 ps-lg-0 d-none d-md-block"
                    col2="col-md-7 p-lg-5 d-flex justify-content-center align-items-start flex-column"
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
          </>
        )}
      </ProductStyled>

      {show && <ModelBg />}
    </>
  );
};
export default ProductsPage;
