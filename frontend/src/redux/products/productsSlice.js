import { createSlice } from "@reduxjs/toolkit";
import { getProductsByCategory } from "./productsActions";

const initialState = {
  loading: false,
  products: [],
  error: null,
  success: false,
};

const productsSlice = createSlice({
  name: "categoryProducts",
  initialState,
  extraReducers: (builder) => {
    // products
    builder.addCase(getProductsByCategory.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getProductsByCategory.fulfilled, (state, action) => {
      state.loading = false;
      state.products = action.payload;
    });
    builder.addCase(getProductsByCategory.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export default productsSlice.reducer;
