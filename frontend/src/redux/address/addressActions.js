import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosClientServiceApi } from "../../util/axiosUtil";
import { sortByFieldName } from "../../util/commonUtil";

export const getAddressList = createAsyncThunk(
  "project/clientAddressList",
  async (rejectWithValue) => {
    try {
      const { data } = await axiosClientServiceApi.get(
        `address/getClientAddress/`
      );

      let response = sortByFieldName(data.addressList, "address_position");
      return response;
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
