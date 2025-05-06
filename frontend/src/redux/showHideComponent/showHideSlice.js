import { createSlice } from "@reduxjs/toolkit";
import { getShowHideComponentsListByPage } from "./showHideActions";
import { sortByCreatedDate } from "../../util/dataFormatUtil";
const initialState = {
  loading: false,
  showHideCompList: [],
  error: null,
  success: false,
};

const serviceSlice = createSlice({
  name: "showHideComponentList",
  initialState,
  reducers: {
    setShowHideComponents: (state, { payload }) => {
      state.showHideCompList = payload;
    },
  },
  extraReducers: (builder) => {
    // Client projects
    builder.addCase(getShowHideComponentsListByPage.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(
      getShowHideComponentsListByPage.fulfilled,
      (state, action) => {
        state.loading = false;
        state.serviceMenu = sortByCreatedDate(action?.payload?.services);
      }
    );
    builder.addCase(
      getShowHideComponentsListByPage.rejected,
      (state, action) => {
        state.loading = false;
        state.error = action.payload;
      }
    );
  },
});

export const { setServiceMenuValues } = serviceSlice.actions;

export default serviceSlice.reducer;
