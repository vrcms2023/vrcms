import { createSlice } from "@reduxjs/toolkit";
import { getServiceValues } from "./serviceActions";
import { sortByCreatedDate } from "../../util/dataFormatUtil";
const initialState = {
  loading: false,
  serviceMenu: [],
  error: null,
  success: false,
};

const serviceSlice = createSlice({
  name: "serviceMenu",
  initialState,
  reducers: {
    setServiceMenuValues: (state, { payload }) => {
      state.serviceMenu = payload;
    },
  },
  extraReducers: {
    // Servicelist
    [getServiceValues.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [getServiceValues.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.serviceMenu = sortByCreatedDate(payload?.services);
    },
    [getServiceValues.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
  },
});

export const { setServiceMenuValues } = serviceSlice.actions;

export default serviceSlice.reducer;
