import React from "react";
import Title from "../../../Common/Title";
import { Link, Navigate } from "react-router-dom";
import { ProductItemStyled } from "../../../Common/StyledComponents/Styled-Products";
import { getImagePath } from "../../../util/commonUtil";
import useAdminLoginStatus from "../../../Common/customhook/useAdminLoginStatus";

const Product = ({ item, editHandler, deleteProduct }) => {
  const { isAdmin, hasPermission } = useAdminLoginStatus();
  return (
    <div className="col-sm-6 col-md-4 col-lg-3 text-center product px-4">
      <ProductItemStyled>
        {isAdmin && hasPermission && (
          <div className="d-flex justify-content-end gap-2">
            {editHandler && (
              <Link
                onClick={() => editHandler("product", true, item)}
                className=" p-2"
              >
                <i
                  className="fa fa-pencil fs-5 text-warning"
                  aria-hidden="true"
                ></i>
              </Link>
            )}
            {deleteProduct && (
              <Link onClick={(event) => deleteProduct(item)} className=" p-2">
                <i
                  className="fa fa-trash-o fs-5 text-danger"
                  aria-hidden="true"
                ></i>
              </Link>
            )}
          </div>
        )}
        <Link to={`/products/${item?.id}/`}>
          <img
            src={getImagePath(item.path)}
            alt={item.alternitivetext}
            className="w-100 rounded-2 shadow object-fit-cover"
          />
        </Link>
        <Title
          title={item.product_name}
          cssClass="fs-6 py-3 text-black fw-medium"
        />
        {/* <p>{item.description}</p> */}
      </ProductItemStyled>
    </div>
  );
};

export default Product;
