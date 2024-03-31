import { createSlice } from "@reduxjs/toolkit";
import { getAddressList } from "./addressActions";

const initialState = {
  loading: false,
  addressList: [],
  error: null,
  success: false,
};

const addressSlice = createSlice({
  name: "addresslist",
  initialState,
  reducers: {
    setFooterValues: (state, { payload }) => {
      state.addressList = payload;
    },
  },
  extraReducers: {
    // Footer
    [getAddressList.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [getAddressList.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.addressList = payload;
    },
    [getAddressList.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
  },
});

export const { setAddressList } = addressSlice.actions;

export default addressSlice.reducer;
