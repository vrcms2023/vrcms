import { createSlice } from "@reduxjs/toolkit";
import { getTheme } from "./themeActions";

const initialState = {
  loading: false,
  theme: [],
  error: null,
  success: false,
};

const themeSlice = createSlice({
  name: "appThemes",
  initialState,
  reducers: {
    setThemeValues: (state, { payload }) => {
      state.theme = payload;
    },
  },
  extraReducers: (builder) => {
    // Footer
    builder.addCase(getTheme.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getTheme.fulfilled, (state, action) => {
      state.loading = false;
      state.theme = action.payload;
    });
    builder.addCase(getTheme.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const { setThemeValues } = themeSlice.actions;

export default themeSlice.reducer;
