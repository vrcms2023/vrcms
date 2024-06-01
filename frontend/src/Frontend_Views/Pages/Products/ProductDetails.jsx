import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
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
import { axiosClientServiceApi } from "../../../util/axiosUtil";
import { getImagePath } from "../../../util/commonUtil";
import Product from "./Product";
import { getProductsByCategory } from "../../../redux/products/productsActions";

const ProductDetails = () => {
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
        if (products.length === 0) {
          dispatch(getProductsByCategory(data.category_id));
        }
      } catch (error) {
        console.log("Unable to get the Career data");
      }
    };
    getSelectedProductData();
  }, [id]);

  return (
    <>
      <ProductStyled>
        <div className="container productDetails">
          <div className="row">
            <div className="col-md-10 offset-md-1 pt-5 text-center">
              <img
                src={getImagePath(selectedProduct?.path)}
                alt={selectedProduct?.alternitivetext}
                className="w-100 rounded-3"
              />
            </div>
            <div className="col-md-10 offset-md-1 py-3">
              <Title
                title={selectedProduct?.product_name}
                cssClass="fs-4 fw-bold"
              />

              <p>{selectedProduct?.description}</p>
            </div>
          </div>

          <div className="row ">
            {products?.map(
              (item) => item.id !== id && <Product item={item} key={item.id} />
            )}
          </div>
        </div>
      </ProductStyled>
    </>
  );
};
export default ProductDetails;
