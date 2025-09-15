import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosServiceApi } from "../../util/axiosUtil";

export const getDashBoardProjects = createAsyncThunk(
  "project/dashboardProjects",
  async (rejectWithValue) => {
    try {
      const { data } = await axiosServiceApi.get(`/project/addProject/`);

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
