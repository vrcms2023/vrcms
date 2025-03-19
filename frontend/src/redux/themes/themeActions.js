import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosClientServiceApi } from "../../util/axiosUtil";

export const getTheme = createAsyncThunk(
  "project/theme",
  async (rejectWithValue) => {
    try {
      const { data } = await axiosClientServiceApi.get(`app/getClientTheme/`);

      return data?.theme;
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
