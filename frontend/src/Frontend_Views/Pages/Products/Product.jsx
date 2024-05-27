import React from "react";
import Title from "../../../Common/Title";
import { Link, Navigate } from "react-router-dom";
import { ProductItemStyled } from "../../../Common/StyledComponents/Styled-Products";

const Product = ({ item }) => {
  return (
    
    <div className="col-sm-6 col-md-4 col-lg-3 text-center product px-4">
      <ProductItemStyled>
        <Link
          to={`/products/${item?.id}`}
          // onClick={() =>
          //   Navigate()
          // }
        >
          <img
            src={item.img}
            alt={item.prodName}
            className="w-100 rounded-2 shadow object-fit-cover"
          />
        </Link>
        <Title title={item.prodName} cssClass="fs-6 py-3 text-black fw-bold" />
        </ProductItemStyled>
    </div>
   
  );
};

export default Product;
