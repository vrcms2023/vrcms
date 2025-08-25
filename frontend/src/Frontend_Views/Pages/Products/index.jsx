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
  getImagePath,
  getObjectPositionKey,
  paginationDataFormat,
  sortByFieldName,
} from "../../../util/commonUtil";
import CustomPagination from "../../../Common/CustomPagination";
import { useLocation, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import DynamicFormwithFileUplod from "../../../Frontend_Admin/Components/forms/DynamicFormwithFileUplod";
import { getObjectsByKey } from "../../../util/showHideComponentUtil";
import {
  createShowHideComponent,
  getAllShowHideComponentsList,
  updateShowHideComponent,
} from "../../../redux/showHideComponent/showHideActions";
import ShowHideToggle from "../../../Common/ShowHideToggle";

const ProductsPage = () => {
  const { id } = useParams();

  const editComponentObj = {
    banner: false,
    briefIntro: false,
    category: false,
    product: false,
  };
  const [counter, setCounter] = useState(0);
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
            // message={`Do you want to delete the ${selectedCategory?.category_name} ?`}
            message={
              <>
                Confirm deletion of{" "}
                <span>{selectedCategory?.category_name}</span> ?
              </>
            }
          />
        );
      },
    });
  };

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const [showHideCompList, setShowHideCompList] = useState([]);
  const showHideCompPageLoad = useRef(true);

  const { error, showHideList } = useSelector((state) => state.showHide);

  useEffect(() => {
    if (showHideList.length > 0) {
      setShowHideCompList(getObjectsByKey(showHideList));
    }
  }, [showHideList]);

  useEffect(() => {
    if (
      showHideList.length === 0 &&
      showHideCompPageLoad.current &&
      counter < 3
    ) {
      dispatch(getAllShowHideComponentsList());
      showHideCompPageLoad.current = false;
      setCounter(counter + 1);
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
// console.log(productsList, "productsList")
  return (
    <>
      {componentEdit.category && (
        <div className={`adminEditTestmonial selected `}>
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

      <div
          className={
            showHideCompList?.banner?.visibility &&
            isAdmin &&
            hasPermission
              ? "componentOnBorder"
              : ""
          }
        >
        {isAdmin && hasPermission && (
            <ShowHideToggle
              showhideStatus={showHideCompList?.banner?.visibility}
              title={"Banner"}
              componentName={"banner"}
              showHideHandler={showHideHandler}
              id={showHideCompList?.banner?.id}
            />
          )}

        {selectedCategory?.id && (
          <>
            {/* Page Banner Component */}
            <div className="position-relative">
              {isAdmin && hasPermission && (
                <EditIcon editHandler={() => editHandler("banner", true)} editlabel="Banner"/>
              )}

              <Banner
                getBannerAPIURL={`banner/clientBannerIntro/${pageType}-banner/`}
                bannerState={componentEdit.banner}
                bannerContainerCss="titleCaption d-flex align-items-end justify-content-center flex-column"
              />
            </div>
            
            {componentEdit.banner && (
              <div className={`adminEditTestmonial selected `}>
                <ImageInputsForm
                  editHandler={editHandler}
                  componentType="banner"
                  popupTitle="Products - Banner Image"
                  pageType={`${pageType}-banner`}
                  imageLabel="Upload Image"
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
      </div>
      <ProductStyled>
        <div
          className={
            showHideCompList?.productsbriefintro?.visibility &&
            isAdmin &&
            hasPermission
              ? "componentOnBorder"
              : ""
          }
        >
          {isAdmin && hasPermission && (
            <ShowHideToggle
              showhideStatus={showHideCompList?.productsbriefintro?.visibility}
              title={"A Brief Introduction Component"}
              componentName={"productsbriefintro"}
              showHideHandler={showHideHandler}
              id={showHideCompList?.productsbriefintro?.id}
            />
          )}

          {/* INTRODUCTION COMPONENT */}
          {showHideCompList?.productsbriefintro?.visibility && (
            <div>
              {/* Introduction */}
              {isAdmin && hasPermission && (
                <EditIcon editHandler={() => editHandler("briefIntro", true)} editlabel="Brief" />
              )}

              <BriefIntroFrontend
                pageType={pageType}
                introState={componentEdit.briefIntro}
                detailsContainerCss="col-lg-8 offset-lg-2 text-center"
                introTitleCss=""
                introSubTitleCss=""
                introDecTitleCss=""
                linkLabel="Read More"
                linkCss="btn btn-outline"
                moreLink=""
                anchorContainer=""
                anchersvgColor=""
                showLink={"True"}
              />
              {componentEdit.briefIntro && (
                <div className={`adminEditTestmonial selected `}>
                  <BriefIntroAdmin
                    editHandler={editHandler}
                    componentType="briefIntro"
                    pageType={pageType}
                    popupTitle={"Banner"}
                  />
                </div>
              )}
            </div>
          )}
        </div>

        <div>
          <SearchFilter
          category={category}
          selectedCategory={selectedCategory}
          setResponseData={setResponseData}
          setSelectedCategory={setSelectedCategory}
          setPageloadResults={setPageloadResults}
          setSearchquery={setSearchquery}
          searchQuery={searchQuery}
          searchBy={"Search By Product Name"}
          hideSearchBy={false}
        />
        </div>

        <div className="container productsList">
          <div className="row mb-4 py-2 shadow-lg d-flex justify-content-between align-items-center bg-white">
            {/* <div className="col-md-12 col-lg-6">
              <Title
                title={`CATEGORY:  ${selectedCategory?.category_name}`}
                cssClass={""}
                icon=""
              />
            </div> */}
            <div className="col-md-4 d-flex flex-column flex-sm-row justify-content-start align-items-center gap-3 ">
              
              <div className="d-flex justify-content-end align-items-center">
                 <Title
                title={`${selectedCategory?.category_name}`}
                cssClass={"m-0 fs-5"}
                icon=""
              />
              
              {selectedCategory?.id && isAdmin && hasPermission && (
                <Button
                  type="button"
                  cssClass="btn "
                  label={""}
                  icon="fa-pencil fs-6 text-warning"
                  isMobile={isMobile}
                  handlerChange={categoryEditHandler}
                />
              )}
              {selectedCategory?.id && isAdmin && hasPermission && (
                <Button
                  type="button"
                  cssClass="btn"
                  label={""}
                  icon="fa-trash-o fs-6 text-danger"
                  isMobile={isMobile}
                  handlerChange={categoryDeleteHandler}
                />
              )}
              </div>
              
              
            </div>
            <div className={`${isAdmin && hasPermission ? "col-md-4 justify-content-center" : "col-md-6 justify-content-end" } d-flex flex-column flex-sm-row  align-items-center gap-3 productFilters`}>
              
              
              {productsList?.length > 0  ? (
                <div>
                {/* Showing 1 –  */}
                {productsList?.length} of
                <strong className="text-primary fw-medium"> {productsList?.length}</strong>
                {/* results */}
              </div>
              ) : "" }
              
              {productsList?.length > 5  ? (
                <div>
                {/* <span>Show </span> */}
                <select
                  className="form-select perPage"
                  aria-label="Default select example"
                >
                  <option selected>Show</option>
                  <option value="1">5</option>
                  <option value="2">10</option>
                  <option value="3">25</option>
                  <option value="3">50</option>
                  <option value="3">75</option>
                  <option value="3">100</option>
                </select>
                {/* <span>entries</span> */}
              </div>
              ) : "" }
              

              <div>
                <Link
                  className="moreLink "
                  onClick={() => downloadFile(editObject?.category_fileuplod)}
                >
                  File
                  <i
                    className="fa fa-download p-1 "
                    aria-hidden="true"
                  ></i>
                </Link>
              </div>
            </div>

            {isAdmin && hasPermission && (
            <div className="col-md-4 d-flex flex-column flex-sm-row justify-content-end align-items-center gap-3">
                 
              <Button
                type="button"
                cssClass="btn btn-outline"
                label={"New Category"}
                icon="fa-plus  me-2"
                isMobile={isMobile}
                handlerChange={() => {
                  editHandler("category", true);
                }}
              />

              {selectedCategory?.id &&  (
                <Button
                  type="button"
                  cssClass="btn btn-outline w-auto"
                  label={"Product"}
                  icon="fa-plus  me-2"
                  handlerChange={() => {
                    editHandler("product", true);
                  }}
                />
                // <EditIcon editHandler={() => editHandler("product", true)} />
              )}
            </div>
            )}
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
          <div className={`adminEditTestmonial selected `}>
            <SingleImageUlploadWithForm
              editHandler={editHandler}
              componentType="product"
              popupTitle="Product"
              category={selectedProduct?.category_name}
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
                  introTitleCss = "fs-3 fw-medium text-md-center"
                  introSubTitleCss = "fw-medium text-muted text-md-center"
                  introDecTitleCss = "fs-6 fw-normal w-75 m-auto text-md-center"
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

        {selectedCategory?.id && productsList?.length > 0 ? (
          <>
            <ABriefIntroStyled>
              <div className="container-lg px-0  productForm">
                <div className="row pb-4">
                  <ABriefAbout
                    col1="col-md-5 p-lg-5 ps-lg-0 d-none d-md-block"
                    col2="col-md-7 px-4 p-lg-5 d-flex justify-content-center align-items-start flex-column"
                    cssClass="fs-3 text-center fw-medium title"
                    imageClass="w-100 h-100 object-fit-cover rounded-end rounded-end-5"
                    dimensions={imageDimensionsJson("whoweare")}
                    pageType={"products-Abrief"}
                    componentFlip={false}
                    showForm={true}
                    categoryId={selectedCategory.id}
                  />
                </div>
              </div>
            </ABriefIntroStyled>
          </>
        ) : ""}
      </ProductStyled>

      {show && <ModelBg />}
    </>
  );
};
export default ProductsPage;
