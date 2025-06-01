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
  menuRawList: [],
  menuloadedStatus: false,
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
      state.menuList = [];
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
      state.permissions = [
        {
          id: "67c7e654-6008-4690-96e6-e7cac347db23232",
          name: "all",
        },
      ];
    },
    updatedMenulist: (state, { payload }) => {
      state.error = false;
      state.menuList = payload;
    },
    updatedMenuloadedStatus: (state) => {
      state.error = false;
      state.menuloadedStatus = false;
    },
  },
  extraReducers: (builder) => {
    // login user
    builder.addCase(userLogin.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(userLogin.fulfilled, (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.access = action.payload.access;
      state.refresh = action.payload.refresh;
    });
    builder.addCase(userLogin.rejected, (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.error = action.payload;
    });

    // register user
    builder.addCase(registerUser.pending, (state, action) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.loading = false;
      state.success = true;
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // load user
    builder.addCase(getUser.pending, (state, action) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getUser.fulfilled, (state, action) => {
      state.loading = false;
      state.userInfo = action.payload; // get user informaiton
    });
    builder.addCase(getUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // Refesh Token
    builder.addCase(getRefreshToken.pending, (state, action) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getRefreshToken.fulfilled, (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.access = action.payload.access;
      state.refresh = action.payload.refresh;
    });
    builder.addCase(getRefreshToken.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // get permissions
    builder.addCase(getSelectedUserPermissions.pending, (state, action) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getSelectedUserPermissions.fulfilled, (state, action) => {
      state.loading = false;
      state.permissions = action.payload;
    });
    builder.addCase(getSelectedUserPermissions.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // get Menu
    builder.addCase(getMenu.pending, (state, action) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getMenu.fulfilled, (state, action) => {
      state.loading = false;
      state.menuRawList = action?.payload?.PageDetails;
      state.menuList =
        action.payload?.PageDetails.length > 0
          ? getMenuObject(action.payload?.PageDetails)
          : [];
      state.menuloadedStatus = true;
    });
    builder.addCase(getMenu.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const {
  logout,
  setCredentials,
  updatedState,
  updatedPermisisons,
  updatedMenulist,
  updatedMenuloadedStatus,
} = authSlice.actions;

export default authSlice.reducer;
