import React, { useState } from "react";
import Product from "./Product";

import { ProductStyled } from "../../../Common/StyledComponents/Styled-Products";

import Img1 from "../../../Images/future.png";
import Img2 from "../../../Images/ongoing.png";
import Img3 from "../../../Images/quality.png";
import Button from "../../../Common/Button";

const ProductsList = () => {
  const productList = [
    {
      id: 1,
      img: Img1,
      prodCategory: "onchology",
      prodName: "OncProduct-0",
      companyName: "Sun Pharma",
      productDesc: "Description",
      file: "",
    },
    {
      id: 2,
      img: Img2,
      prodCategory: "onchology",
      prodName: "OncProduct-1",
      companyName: "Sun Pharma",
      productDesc: "Description",
      file: "",
    },
    {
      id: 3,
      img: Img3,
      prodCategory: "onchology",
      prodName: "OncProduct-2",
      companyName: "Sun Pharma",
      productDesc: "Description",
      file: "",
    },
    {
      id: 4,
      img: Img1,
      prodCategory: "onchology",
      prodName: "OncProduct-0",
      companyName: "Sun Pharma",
      productDesc: "Description",
      file: "",
    },
    {
      id: 5,
      img: Img2,
      prodCategory: "onchology",
      prodName: "OncProduct-1",
      companyName: "Sun Pharma",
      productDesc: "Description",
      file: "",
    },
    {
      id: 6,
      img: Img3,
      prodCategory: "onchology",
      prodName: "OncProduct-2",
      companyName: "Sun Pharma",
      productDesc: "Description",
      file: "",
    },
  ];
  const [products, setProducts] = useState(productList);
  return (
    <>
    <div className="row ">
      {products?.map((item, index) => (
        <Product item={item} key={item.id} />
      ))}
    </div>
    <div className=" pb-5">
      <Button label={"Load More"} cssClass={"btn btn-outline m-auto"}/>
  </div>
  </>
  );
};

export default ProductsList;
