import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosClientServiceApi } from "../../util/axiosUtil";
import { sortByFieldName } from "../../util/commonUtil";

export const getHomeIntroList = createAsyncThunk("home/homeIntroList", async (rejectWithValue) => {
  try {
    const { data } = await axiosClientServiceApi.get(`carousel/clientHomeIntroList/homecorporate/`);

    let response = sortByFieldName(data.intro, "intro_position");
    return response;
  } catch (error) {
    // return custom error message from API if any
    if (error.response && error.response.data.message) {
      return rejectWithValue(error.response.data.message);
    } else {
      return rejectWithValue(error.message);
    }
  }
});
