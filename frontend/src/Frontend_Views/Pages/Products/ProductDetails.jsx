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
        if (products?.results.length === 0) {
          dispatch(getProductsByCategory(data.category_id));
        }
      } catch (error) {
        console.log("Unable to get the Career data");
      }
    };
    getSelectedProductData();
  }, [id]);
  useEffect(() => {
    console.log(products);
  }, [products]);

  return (
    <>
      <ProductItemStyled>
        <div className="container productDetails">
          <div className="row">
            <div className="col-md-12 col-lg-10 py-4 imgSelected">
              <Link to="/products" className="btn btn-primary d-inline-flex justify-content-center align-items-center">
              <i class="fa fa-angle-left fs-5 me-2" aria-hidden="true"></i> Back </Link>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12 col-lg-10  pb-3 imgSelected">
              <img
                src={getImagePath(selectedProduct?.path)}
                alt={selectedProduct?.alternitivetext}
                className="w-100 rounded-3"
              />
              <div className="py-3">
                <Title
                  title={selectedProduct?.product_name}
                  cssClass="fs-4 fw-medium mt-1 mt-md-4"
                />

                <p className="mt-2">{selectedProduct?.description}</p>
              </div>
            </div>

            <div className="col-lg-2 my-5 allProducts rightPositioned d-none d-lg-block position-fixed rounded shadow-lg">
              {products?.results?.map(
                (item) =>
                  item.id !== id && (
                    <Product item={item} key={item.id} pathName={pathName} />
                  )
              )}
            </div>
          </div>

          <div className="row my-0 my-md-5 allProducts bottomPositioned d-lg-none">
            {products?.results?.map(
              (item) => item.id !== id && <Product item={item} key={item.id} />
            )}
          </div>
        </div>
      </ProductItemStyled>
    </>
  );
};
export default ProductDetails;
