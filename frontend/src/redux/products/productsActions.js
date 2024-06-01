import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosClientServiceApi } from "../../util/axiosUtil";

export const getProductsByCategory = createAsyncThunk(
  "products/clientProductsValues",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axiosClientServiceApi.get(
        `/products/getClinetProduct/${id}/`
      );

      return data;
    } catch (error) {
      // return custom error message from API if any
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
