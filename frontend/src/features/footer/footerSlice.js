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
  extraReducers: (builder) => {
    // Footer
    builder.addCase(getFooterValues.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getFooterValues.fulfilled, (state, action) => {
      state.loading = false;
      state.footerData =
        action.payload?.address?.length > 0 ? action.payload : [];
    });
    builder.addCase(getFooterValues.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const { setFooterValues } = footerSlice.actions;

export default footerSlice.reducer;
