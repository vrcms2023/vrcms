import { createSlice } from "@reduxjs/toolkit";
import {
  getShowHideComponentsListByPage,
  createShowHideComponent,
  updateShowHideComponent,
  deleteShowHideComponent,
} from "./showHideActions";
const initialState = {
  loading: false,
  showHideCompPageList: {},
  error: null,
  success: false,
};

const showHidePageloadingSlice = createSlice({
  name: "showHideComponentList",
  initialState,
  reducers: {
    // setShowHideComponents: (state, { payload }) => {
    //   state.showHideCompPageList = payload;
    // },
  },
  extraReducers: (builder) => {
    //Loading all components list
    builder.addCase(getShowHideComponentsListByPage.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(
      getShowHideComponentsListByPage.fulfilled,
      (state, action) => {
        state.loading = false;
        state.showHideCompPageList = action?.payload;
      }
    );
    builder.addCase(
      getShowHideComponentsListByPage.rejected,
      (state, action) => {
        state.loading = false;
        state.error = action.payload;
      }
    );

    // create new show hide component details
    builder.addCase(createShowHideComponent.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(createShowHideComponent.fulfilled, (state, action) => {
      state.loading = false;
      state.showHideCompPageList = action?.payload;
    });
    builder.addCase(createShowHideComponent.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // update show hide component
    builder.addCase(updateShowHideComponent.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(updateShowHideComponent.fulfilled, (state, action) => {
      state.loading = false;
      state.showHideCompPageList = action?.payload;
    });
    builder.addCase(updateShowHideComponent.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // Delete show hide component
    builder.addCase(deleteShowHideComponent.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(deleteShowHideComponent.fulfilled, (state, action) => {
      state.loading = false;
      state.showHideCompPageList = action?.payload;
    });
    builder.addCase(deleteShowHideComponent.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export default showHidePageloadingSlice.reducer;
