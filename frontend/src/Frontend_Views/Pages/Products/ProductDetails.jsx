import React, { useState, useEffect } from "react";
import { Link, useParams, useLocation } from "react-router-dom";
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

import { ProductItemStyled } from "../../../Common/StyledComponents/Styled-Products";
import SearchFilter from "./FilterComponent";

import {
  getFormDynamicFields,
  imageDimensionsJson,
} from "../../../util/dynamicFormFields";

import Title from "../../../Common/Title";
import { axiosClientServiceApi } from "../../../util/axiosUtil";
import { getImagePath } from "../../../util/commonUtil";
import Product from "./Product";
import { getProductsByCategory } from "../../../redux/products/productsActions";
import RichTextView from "../../../Common/RichTextView";
import Ancher from "../../../Common/Ancher";

const ProductDetails = () => {
  const location = useLocation();
  const pathName = location.pathname;

  const { id } = useParams();
  const [selectedProduct, setSelectedProduct] = useState("");
  const { products } = useSelector((state) => state.productList);
  const dispatch = useDispatch();

  useEffect(() => {
    const getSelectedProductData = async () => {
      try {
        let response = await axiosClientServiceApi.get(
          `/products/getClinetSelectedProduct/${id}/`
        );
        const data = response?.data?.product;
        setSelectedProduct(data);
        if (products?.length === 0) {
          dispatch(getProductsByCategory(data.category_id));
        }
      } catch (error) {
        console.log("Unable to get the Career data");
      }
    };
    getSelectedProductData();
  }, [id]);

  useEffect(() => {
    // console.log(products);
  }, [products]);

  return (
    <>
      <ProductItemStyled>
        <div className="container productDetails">
          <div className="row d-flex justify-content-center align-items-center">
            <div className="col-md-6">
              <span className="fw-bold d-inline-block ms-2"> {selectedProduct?.category_name} </span> / 
              <span className="fw-normal d-inline-block ms-2">{selectedProduct?.product_name}</span>
            </div>
            <div className="col-md-6 py-4 imgSelected text-end">
              <Link
                to="/products"
                className="btn btn-outline d-inline-flex justify-content-center align-items-center m-auto"
              >
                <i
                  className="fa fa-angle-left fs-5 me-2"
                  aria-hidden="true"
                ></i>{" "}
                Back
              </Link>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12 pb-3 imgSelected">
              <img
                src={getImagePath(selectedProduct?.path)}
                alt={selectedProduct?.alternitivetext}
                className="w-100 rounded-2"
              />
            </div>
            </div>
            <div className="row">
              <div className="col-md-12 px-5 imgSelected">
                <div className="py-3">
                  {/* <Title
                    title={selectedProduct?.product_name}
                    cssClass="fs-4 fw-medium mt-1 mt-md-4"
                  /> */}
                  <RichTextView
                    data={selectedProduct?.description}
                    className={"mt-2"}
                    showMorelink={false}
                  />
                  {/* <div
                    className="mt-2"
                    dangerouslySetInnerHTML={{
                      __html: selectedProduct?.description,
                    }}
                  ></div> */}
                </div>
              </div>
            {/* {products?.results.length <= 1 ? (
              ""
            ) : (
              <div className="col-lg-2 my-5 allProducts rightPositioned d-none d-lg-block position-fixed rounded shadow-lg">
                {products?.results?.map(
                  (item) =>
                    item.id !== id && (
                      <Product item={item} key={item.id} pathName={pathName} />
                    )
                )}
              </div>
            )} */}
          </div>

        {products?.length > 0 ? (
          <div className="row my-0 my-md-5 allProducts bottomPositioned">
            {products?.results
              ?.filter(item => item.id !== id)
              ?.slice(0, 4)
              ?.map(item => (
                <Product item={item} key={item.id} />
              ))}

            
            <div className="text-center">
              <Ancher 
                 AncherLabel="View All"
                  AncherClass="btn btn-outline"
                  Ancherpath="/products"
                  AnchersvgColor=""
                  handleModel=""
                  icon=""
                  iconCss=""
              />
            </div>
          </div>
        ) : "" }
          

          
        </div>
      </ProductItemStyled>
    </>
  );
};
export default ProductDetails;
