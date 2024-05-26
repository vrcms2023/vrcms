import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
};

const loadingSlice = createSlice({
  name: "loader",
  initialState,
  reducers: {
    startLoading: (state) => {
      state.isLoading = true;
    },
    stoptLoading: (state) => {
      state.isLoading = false;
    },
  },
});

export const { startLoading, stoptLoading } = loadingSlice.actions;

export default loadingSlice.reducer;
