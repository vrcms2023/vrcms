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
  extraReducers: (builder) => {
    // Client projects
    builder.addCase(getDashBoardProjects.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getDashBoardProjects.fulfilled, (state, action) => {
      state.loading = false;
      state.projects = action.payload;
    });
    builder.addCase(getDashBoardProjects.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const { setProjects } = projectSlice.actions;

export default projectSlice.reducer;
