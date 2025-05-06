import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosServiceApi } from "../../util/axiosUtil";
import { getCookie, setCookie } from "../../util/cookieUtil";

export const getShowHideComponentsListByPage = createAsyncThunk(
  "showHide/list",
  async ({ type }, { rejectWithValue }) => {
    try {
      // configure header's Content-Type as JSON
      const { data } = await axiosServiceApi.post(
        `/showHideComponents/getbyPageType/?pageType=${type?.toLowerCase()}`
      );

      return response.data;
    } catch (error) {
      // return custom error message from API if any
      return rejectWithValue(error);
    }
  }
);

export const registerUser = createAsyncThunk(
  "auth/register",
  async ({ userName, email, password, re_password }, { rejectWithValue }) => {
    try {
      await axiosServiceApi.post(`/user/auth/users/`, {
        userName,
        email,
        password,
        re_password,
      });
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getUser = createAsyncThunk(
  "auth/getUser",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosServiceApi.get(`/user/auth/users/me/`);
      localStorage.setItem("userName", data.userName);

      return data;
    } catch (error) {
      // return custom error message from API if any
      if (error?.response?.data) {
        const key = Object.keys(error.response.data);
        return rejectWithValue(error.response.data[key][0]);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const getRefreshToken = createAsyncThunk(
  "auth/getRefreshToken",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosServiceApi.get(`/user/auth/jwt/refresh/`);
      return data;
    } catch (error) {
      // return custom error message from API if any
      if (error?.response?.data) {
        const key = Object.keys(error.response.data);
        return rejectWithValue(error.response.data[key][0]);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const getSelectedUserPermissions = createAsyncThunk(
  "auth/getSelectedUserPermissions",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axiosServiceApi.get(
        `/pagePermission/updatePermissions/${id}/`
      );

      return data;
    } catch (error) {
      // return custom error message from API if any
      if (error?.response?.data) {
        const key = Object.keys(error.response.data);
        return rejectWithValue(error.response.data[key][0]);
      } else {
        return rejectWithValue(error);
      }
    }
  }
);

export const getMenu = createAsyncThunk(
  "auth/getMenus",
  async (_, { rejectWithValue }) => {
    try {
      let data = {};
      if (getCookie("access")) {
        data = await axiosServiceApi.get("/pageMenu/createPageMenu/");
      } else {
        data = await axiosServiceApi.get(`/pageMenu/getPageMenu/`);
      }

      return data.data;
    } catch (error) {
      // return custom error message from API if any
      if (error?.response?.data) {
        const key = Object.keys(error.response.data);
        return rejectWithValue(error.response.data[key][0]);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
