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
  extraReducers: (builder) => {
    // Footer
    builder.addCase(getAddressList.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getAddressList.fulfilled, (state, action) => {
      state.loading = false;
      state.addressList = action.payload;
    });
    builder.addCase(getAddressList.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const { setAddressList } = addressSlice.actions;

export default addressSlice.reducer;
