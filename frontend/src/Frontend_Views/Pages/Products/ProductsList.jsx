import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Product from "./Product";

import { ProductStyled } from "../../../Common/StyledComponents/Styled-Products";

import Button from "../../../Common/Button";
import {
  axiosClientServiceApi,
  axiosFileUploadServiceApi,
} from "../../../util/axiosUtil";
import { confirmAlert } from "react-confirm-alert";
import DeleteDialog from "../../../Common/DeleteDialog";
import { getProductsByCategory } from "../../../redux/products/productsActions";

const ProductsList = ({ compState, selectedCategory, editHandler }) => {
  const [productsList, setProductsList] = useState([]);
  const { products } = useSelector((state) => state.productList);
  const dispatch = useDispatch();

  useEffect(() => {
    if (selectedCategory?.id) {
      dispatch(getProductsByCategory(selectedCategory.id));
    }
  }, [compState, selectedCategory]);

  useEffect(() => {
    if (products) {
      setProductsList(products);
    }
  }, [products]);

  const deleteProduct = (item) => {
    const { id, product_name } = item;
    const deleteImageByID = async () => {
      const response = await axiosFileUploadServiceApi.delete(
        `/products/updateProduct/${id}/`
      );
      if (response.status === 204) {
        const list = productsList.filter((item) => item.id !== id);
        setProductsList(list);
      }
    };

    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <DeleteDialog
            onClose={onClose}
            callback={deleteImageByID}
            message={`deleting the ${product_name} Product?`}
          />
        );
      },
    });
  };

  return (
    <>
      <div className="row ">
        {productsList?.map((item) => (
          <Product
            item={item}
            key={item.id}
            editHandler={editHandler}
            deleteProduct={deleteProduct}
          />
        ))}
      </div>
      {productsList.length > 0 && (
        <div className="mt-5 pb-5">
          <Button label={"Load More"} cssClass={"btn btn-outline m-auto"} />
        </div>
      )}
    </>
  );
};

export default ProductsList;
