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
import { getAllCategories } from "../../../redux/products/categoryActions";
import {
  getObjectPositionKey,
  paginationDataFormat,
  sortByFieldName,
} from "../../../util/commonUtil";
import CustomPagination from "../../../Common/CustomPagination";
import { useLocation, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import DynamicFormwithFileUplod from "../../../Frontend_Admin/Components/forms/DynamicFormwithFileUplod";

const ProductsPage = () => {
  const { id } = useParams();

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
  const [productsList, setProductsList] = useState([]);

  const [paginationData, setPaginationData] = useState({});
  const [pageLoadResult, setPageloadResults] = useState(false);
  const [searchQuery, setSearchquery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.categoryList);

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

  const setResponseData = (data) => {
    if (data?.results?.length > 0) {
      //const _positionKey = getShortByDate(data.results[0]);
      const _productList = sortByFieldName(data.results, "created_at");
      setProductsList(_productList);
      setPaginationData(paginationDataFormat(data));
      setCurrentPage(1);
    } else {
      setProductsList([]);
    }
  };

  useEffect(() => {
    if (categories.length > 0) {
      setCategory(categories);
      let _data = "";
      if (selectedCategory?.id) {
        _data = categories.filter((item) => item.id === selectedCategory.id)[0];
      } else if (id) {
        _data = categories.filter((item) => item.id === id)[0];
      } else {
        _data = categories[0];
      }

      setSelectedCategory(_data);
      setPageType(_data?.id ? _data?.id : pageType);
    } else {
      dispatch(getAllCategories());
    }
  }, [categories, id]);

  useEffect(() => {
    dispatch(getAllCategories());
  }, [!componentEdit.category]);

  useEffect(() => {
    setPageType(selectedCategory?.id ? selectedCategory?.id : pageType);
  }, [selectedCategory]);

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
            message={`Do you want to delete the ${selectedCategory?.category_name} ?`}
          />
        );
      },
    });
  };

  return (
    <>
      {isAdmin && hasPermission && (
        <div className="container py-4">
          <div className="row ">
            {/* <div className="col-md-6 fw-bold fw-md-medium py-3 py-md-0 fs-5 fs-md-4 text-center d-flex justify-content-md-end align-items-center">
              <Title title="CATEGORY" cssClass={"fw-medium"}  />
            </div> */}
            <div className="col-md-12 d-flex justify-content-end align-items-center gap-2">
              <span>
                <Title title="CATEGORY - " cssClass={"fw-medium fs-6"} />
              </span>
              <Button
                type="button"
                cssClass="btn btn-secondary"
                label={"Create"}
                icon="fa-plus"
                handlerChange={() => {
                  editHandler("category", true);
                }}
              />
              {selectedCategory?.id && (
                <Button
                  type="button"
                  cssClass="btn btn-more"
                  label={"Edit"}
                  icon="fa-pencil"
                  handlerChange={categoryEditHandler}
                />
              )}
              {selectedCategory?.id && (
                <Button
                  type="button"
                  cssClass="btn bg-danger text-white"
                  label={"Delete"}
                  icon="fa-trash-o"
                  handlerChange={categoryDeleteHandler}
                />
              )}
            </div>
          </div>
        </div>
      )}

      {componentEdit.category && (
        <div className="adminEditTestmonial">
          <DynamicFormwithFileUplod
            editHandler={editHandler}
            componentTitle={"Crete New Category"}
            componentType={"category"}
            editObject={editCategoryState ? selectedCategory : ""}
            setEditState={setEditCategoryState}
            setSaveState={setSelectedCategory}
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
              bannerContainerCss="titleCaption d-flex align-items-end justify-content-center flex-column"
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
          setResponseData={setResponseData}
          setSelectedCategory={setSelectedCategory}
          setPageloadResults={setPageloadResults}
          setSearchquery={setSearchquery}
          searchQuery={searchQuery}
        />
        <div />

        <div className="container productsList pt-5">
          <div className="row mb-4">
            <div className="col-md-12 col-lg-6 d-flex justify-content-center justify-content-md-start mb-3 mb-md-0 align-items-center">
              <Title
                title={`CATEGORY -> ${selectedCategory?.category_name}`}
                cssClass={"fw-medium fs-4"}
              />{" "}
            </div>
            <div className="col-md-12 col-lg-6 d-flex flex-column flex-sm-row justify-content-end align-items-center gap-3">
              {selectedCategory?.id && isAdmin && hasPermission && (
                <Button
                  type="button"
                  cssClass="btn btn-secondary"
                  label={" Add Product"}
                  icon="fa-plus"
                  handlerChange={() => {
                    editHandler("product", true);
                  }}
                />
                // <EditIcon editHandler={() => editHandler("product", true)} />
              )}
              <div>
                {/* Showing 1 –  */}
                {productsList?.length} of{" "}
                <strong>{productsList?.length}</strong>
                {/* results */}
              </div>
              <span className="d-none d-md-block"> | </span>
              <div className="d-flex justify-content-end align-items-center gap-1">
                {/* <span>Show </span> */}
                <select class="form-select" aria-label="Default select example">
                  <option selected>show</option>
                  <option value="1">5</option>
                  <option value="2">10</option>
                  <option value="3">25</option>
                  <option value="3">50</option>
                  <option value="3">75</option>
                  <option value="3">100</option>
                </select>
                {/* <span>entries</span> */}
              </div>
              <span className="d-none d-md-block"> | </span>
              <div>
                <Link
                  className="moreLink "
                  // onClick={() => downloadFile(editObject?.category_fileuplod)}
                >
                  File
                  <i
                    class="fa fa-download ms-1 fs-5 rounded-2 p-1 border border-1 border-info bg-white"
                    aria-hidden="true"
                  ></i>
                </Link>
              </div>
            </div>
          </div>

          {selectedCategory?.id && (
            <ProductsList
              compState={componentEdit.product}
              selectedCategory={selectedCategory}
              editHandler={editHandler}
              setResponseData={setResponseData}
              productsList={productsList}
              setProductsList={setProductsList}
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
              imageGetURL={`/products/createProduct/${selectedCategory.id}/`}
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

        <div>
          {paginationData?.total_count ? (
            <CustomPagination
              paginationData={paginationData}
              paginationURL={`/products/getClinetProduct/${selectedCategory.id}/`}
              paginationSearchURL={
                searchQuery
                  ? `products/productSearch/${searchQuery}/`
                  : `/products/getClinetProduct/${selectedCategory.id}/`
              }
              searchQuery={searchQuery}
              setCurrentPage={setCurrentPage}
              currentPage={currentPage}
              setResponseData={setResponseData}
              pageLoadResult={pageLoadResult}
            />
          ) : (
            ""
          )}
        </div>

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
                    col2="col-md-7 px-4 p-lg-5 d-flex justify-content-center align-items-start flex-column"
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
