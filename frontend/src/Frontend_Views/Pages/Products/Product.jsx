import React, { useEffect } from "react";
import Title from "../../../Common/Title";
import { Link, Navigate, useLocation } from "react-router-dom";
import { ProductItemStyled } from "../../../Common/StyledComponents/Styled-Products";
import { getImagePath } from "../../../util/commonUtil";
import useAdminLoginStatus from "../../../Common/customhook/useAdminLoginStatus";
import { removeCookie, setCookie } from "../../../util/cookieUtil";

const Product = ({
  item,
  categoryId,
  editHandler,
  deleteProduct,
  pathName,
}) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    removeCookie("product");
    setCookie("product", item.id);
  }, [item]);

  const { isAdmin, hasPermission } = useAdminLoginStatus();

  const locationPath = useLocation();
  // console.log(homeCategoriesList.length, "homeCategoriesList")

  return (
    <div
      className={`${pathName ? "" : "col-sm-6 col-md-4 col-lg-3"} text-center product px-mb-3 mb-5`}
    >
      <ProductItemStyled>
        {isAdmin && hasPermission && (
          <div className="d-flex justify-content-end pe-4">
            {editHandler && (
              <Link
                onClick={() => editHandler("product", true, item)}
                className="btn p-2"
              >
                <i
                  className="fa fa-pencil fs-6 text-warning"
                  aria-hidden="true"
                ></i>
              </Link>
            )}
            {deleteProduct && (
              <Link onClick={(event) => deleteProduct(item)} className="btn">
                <i
                  className="fa fa-trash-o fs-6 text-danger"
                  aria-hidden="true"
                ></i>
              </Link>
            )}
          </div>
        )}
        {/* <Link to={`/products/${item?.id}/`}> */}
        <Link
          to={
            locationPath.pathname === "/" || locationPath.pathname === "/home"
              ? `/categories/${categoryId}/`
              : `/products/${item?.id}/`
          }
        >
          <img
            src={getImagePath(item?.path)}
            alt={item.alternitivetext}
            className="w-75 rounded-1 shadow object-fit-cover productImage"
          />
       

        <Title
          title={
            locationPath.pathname === "/" || locationPath.pathname === "/home"
              ? item.category_name
              : item.product_name
          }
          cssClass="productName mt-1 fs-6 fw-medium"
        />
         </Link>
        {/* <p>{item.description}</p> */}
      </ProductItemStyled>
    </div>
  );
};

export default Product;
