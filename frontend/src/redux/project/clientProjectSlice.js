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
  extraReducers: (builder) => {
    // Client projects
    builder.addCase(getClientProjects.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getClientProjects.fulfilled, (state, action) => {
      state.loading = false;
      state.clientProjects = action.payload;
    });
    builder.addCase(getClientProjects.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const { setClientProjects } = clientProjectSlice.actions;

export default clientProjectSlice.reducer;
