import { createSlice } from "@reduxjs/toolkit";
import {
  getShowHideComponentsListByPage,
  createShowHideComponent,
  updateShowHideComponent,
  deleteShowHideComponent,
  getAllShowHideComponentsList,
} from "./showHideActions";
const initialState = {
  loading: false,
  showHideList: [],
  error: null,
  success: false,
};

const showHidePageloadingSlice = createSlice({
  name: "showHideList",
  initialState,
  reducers: {
    // setShowHideComponents: (state, { payload }) => {
    //   state.showHideList = payload;
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
        state.showHideList = action?.payload;
      }
    );
    builder.addCase(
      getShowHideComponentsListByPage.rejected,
      (state, action) => {
        state.loading = false;
        state.error = action.payload;
      }
    );

    builder.addCase(getAllShowHideComponentsList.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getAllShowHideComponentsList.fulfilled, (state, action) => {
      state.loading = false;
      state.showHideList = action?.payload;
    });
    builder.addCase(getAllShowHideComponentsList.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // create new show hide component details
    builder.addCase(createShowHideComponent.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(createShowHideComponent.fulfilled, (state, action) => {
      state.loading = false;
      state.loading = false;
      const index = state.showHideList.findIndex(
        (item) => item.id === action.payload.id
      );
      if (index !== -1) {
        state.showHideList[index] = action.payload;
      } else if (state.showHideList.length > 0) {
        state.showHideList.push(action?.payload);
      } else {
        state.showHideList = action?.payload;
      }
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
      const index = state.showHideList.findIndex(
        (item) => item.id === action.payload.id
      );
      if (index !== -1) {
        state.showHideList[index] = action.payload;
      } else {
        state.showHideList = action?.payload;
      }
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
      state.items = state.showHideList.filter(
        (item) => item.id !== action.payload
      );
    });
    builder.addCase(deleteShowHideComponent.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export default showHidePageloadingSlice.reducer;
