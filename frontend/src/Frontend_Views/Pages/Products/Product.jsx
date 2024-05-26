import React from "react";
import Title from "../../../Common/Title";
import { Link, Navigate } from "react-router-dom";
import { ProductItemStyled } from "../../../Common/StyledComponents/Styled-Products";

const Product = ({ item }) => {
  return (
    
    <div className="col-sm-6 col-md-4 col-lg-3 text-center product">
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
            className="w-75 h-75 rounded-1 border-4 shadow"
          />
        </Link>
        <Title title={item.prodName} cssClass="fs-6 py-3" />
        </ProductItemStyled>
    </div>
   
  );
};

export default Product;
