import { createSlice } from "@reduxjs/toolkit";
import { getHomeIntroList } from "./homeIntroListActions";

const initialState = {
  loading: false,
  homeIntroList: [],
  error: null,
  success: false,
};

const homeIntroListSlice = createSlice({
  name: "homeIntroList",
  initialState,
  reducers: {
    setHomeIntrorValues: (state, { payload }) => {
      state.homeIntroList = payload;
    },
  },
  extraReducers: (builder) => {
    // Footer
    builder.addCase(getHomeIntroList.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getHomeIntroList.fulfilled, (state, action) => {
      state.loading = false;
      state.homeIntroList = action.payload;
    });
    builder.addCase(getHomeIntroList.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const { setHomeIntrorValues } = homeIntroListSlice.actions;

export default homeIntroListSlice.reducer;
