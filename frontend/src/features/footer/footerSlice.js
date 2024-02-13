import { createSlice } from "@reduxjs/toolkit";
import { getFooterValues } from "./footerActions";

const initialState = {
  loading: false,
  footerData: [],
  error: null,
  success: false,
};

const footerSlice = createSlice({
  name: "footerData",
  initialState,
  reducers: {
    setFooterValues: (state, { payload }) => {
      state.footerData = payload;
    },
  },
  extraReducers: {
    // Footer
    [getFooterValues.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [getFooterValues.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.footerData = payload;
    },
    [getFooterValues.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
  },
});

export const { setFooterValues } = footerSlice.actions;

export default footerSlice.reducer;
