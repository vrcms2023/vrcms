import { createSlice } from "@reduxjs/toolkit";
import { getAllCategories } from "./categoryActions";

const initialState = {
  loading: false,
  categories: [],
  error: null,
  success: false,
};

const categorySlice = createSlice({
  name: "categoryList",
  initialState,
  extraReducers: (builder) => {
    // category
    builder.addCase(getAllCategories.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getAllCategories.fulfilled, (state, action) => {
      state.loading = false;
      state.categories = action.payload?.category;
    });
    builder.addCase(getAllCategories.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export default categorySlice.reducer;
