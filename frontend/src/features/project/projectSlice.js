import { createSlice } from "@reduxjs/toolkit";
import { getDashBoardProjects } from "./projectActions";

const initialState = {
  loading: false,
  projects: [],
  error: null,
  success: false,
};

const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    setProjects: (state, { payload }) => {
      state.projects = payload;
    },
  },
  extraReducers: {
    // admin project
    [getDashBoardProjects.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [getDashBoardProjects.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.projects = payload;
    },
    [getDashBoardProjects.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
  },
});

export const { setProjects } = projectSlice.actions;

export default projectSlice.reducer;
