import { createSlice } from "@reduxjs/toolkit";
import { getClientProjects } from "./clientProjectActions";

const initialState = {
  loading: false,
  clientProjects: [],
  error: null,
  success: false,
};

const clientProjectSlice = createSlice({
  name: "clientProject",
  initialState,
  reducers: {
    setClientProjects: (state, { payload }) => {
      state.clientProjects = payload;
    },
  },
  extraReducers: {
    // Client projects
    [getClientProjects.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [getClientProjects.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.clientProjects = payload;
    },
    [getClientProjects.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
  },
});

export const { setClientProjects } = clientProjectSlice.actions;

export default clientProjectSlice.reducer;
