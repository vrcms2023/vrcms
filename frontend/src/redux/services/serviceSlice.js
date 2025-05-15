import { createSlice } from "@reduxjs/toolkit";
import { getServiceValues } from "./serviceActions";
import {
  sortByCreatedDate,
  sortCreatedDateByDesc,
} from "../../util/dataFormatUtil";
const initialState = {
  loading: false,
  serviceMenu: [],
  error: null,
  success: false,
};

const serviceSlice = createSlice({
  name: "serviceMenu",
  initialState,
  reducers: {
    setServiceMenuValues: (state, { payload }) => {
      state.serviceMenu = payload;
    },
  },
  extraReducers: (builder) => {
    // Client projects
    builder.addCase(getServiceValues.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getServiceValues.fulfilled, (state, action) => {
      state.loading = false;
      state.serviceMenu = sortCreatedDateByDesc(action?.payload?.services);
    });
    builder.addCase(getServiceValues.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const { setServiceMenuValues } = serviceSlice.actions;

export default serviceSlice.reducer;
