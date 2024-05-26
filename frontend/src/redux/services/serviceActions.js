import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosClientServiceApi, axiosServiceApi } from "../../util/axiosUtil";

import { getCookie } from "../../util/cookieUtil";

export const getServiceValues = createAsyncThunk(
  "serviceList",
  async (rejectWithValue) => {
    try {
      if (getCookie("access")) {
        const { data } = await axiosServiceApi.get(`/services/createService/`);
        return data;
      } else {
        const { data } = await axiosClientServiceApi.get(
          `/services/clientServiceList/`,
        );
        return data;
      }
    } catch (error) {
      // return custom error message from API if any
      if (error?.response?.data?.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error?.message);
      }
    }
  },
);
