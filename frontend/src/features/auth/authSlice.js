import { createSlice } from "@reduxjs/toolkit";
import {
  registerUser,
  userLogin,
  getUser,
  getRefreshToken,
  getSelectedUserPermissions,
  getMenu,
} from "./authActions";
import { removeAllCookies } from "../../util/cookieUtil";
import { getMenuObject } from "../../util/commonUtil";

// initialize userToken from local storage
const userToken = localStorage.getItem("access")
  ? localStorage.getItem("access")
  : null;

const initialState = {
  loading: false,
  userInfo: null,
  access: null,
  refresh: null,
  error: null,
  success: false,
  accountVerfy: false,
  isAuthenticated: false,
  permissions: [],
  menuList: [],
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem("access"); // delete token from storage
      state.loading = false;
      state.userInfo = null;
      state.access = null;
      state.refresh = null;
      state.error = false;
      state.success = false;
      state.isAuthenticated = false;
      removeAllCookies();
      localStorage.clear();
    },
    setCredentials: (state, { payload }) => {
      state.userInfo = payload;
    },
    updatedState: (state) => {
      state.error = false;
      state.success = false;
    },
    updatedPermisisons: (state) => {
      state.error = false;
      state.permissions = ["ALL"];
    },
  },
  extraReducers: {
    // login user
    [userLogin.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [userLogin.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.access = payload.access;
      state.refresh = payload.refresh;
    },
    [userLogin.rejected]: (state, { payload }) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.error = payload;
    },
    // register user
    [registerUser.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [registerUser.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.success = true; // registration successful
    },
    [registerUser.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },

    // load user
    [getUser.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [getUser.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.userInfo = payload; // get user informaiton
    },
    [getUser.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },

    // Refesh Token
    [getRefreshToken.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [getRefreshToken.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.access = payload.access;
      state.refresh = payload.refresh;
    },
    [getRefreshToken.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },

    // get permissions
    [getSelectedUserPermissions.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [getSelectedUserPermissions.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.permissions = payload?.userPermissions?.user_permission_list;
    },
    [getSelectedUserPermissions.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },

    // get Menu
    [getMenu.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [getMenu.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.menuList =
        payload?.PageDetails && getMenuObject(payload?.PageDetails);
    },
    [getMenu.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
  },
});

export const { logout, setCredentials, updatedState, updatedPermisisons } =
  authSlice.actions;

export default authSlice.reducer;
