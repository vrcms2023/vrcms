import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosClientServiceApi, axiosServiceApi } from "../../util/axiosUtil";
import { setCookie } from "../../util/cookieUtil";

export const userLogin = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      // configure header's Content-Type as JSON

      const { data } = await axiosClientServiceApi.post(
        `/user/auth/jwt/create/`,
        {
          email,
          password,
        },
      );

      // store user's token in local storage
      localStorage.setItem("access", data.access);
      localStorage.setItem("refresh", data.refresh);

      setCookie("access", data.access);
      setCookie("refresh", data.refresh);

      return data;
    } catch (error) {
      // return custom error message from API if any
      return rejectWithValue(error);
    }
  },
);

export const registerUser = createAsyncThunk(
  "auth/register",
  async ({ userName, email, password, re_password }, { rejectWithValue }) => {
    try {
      await axiosClientServiceApi.post(`/user/auth/users/`, {
        userName,
        email,
        password,
        re_password,
      });
    } catch (error) {
      return rejectWithValue(error);
    }
  },
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
  },
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
  },
);

export const getSelectedUserPermissions = createAsyncThunk(
  "auth/getSelectedUserPermissions",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axiosServiceApi.get(
        `/pagePermission/updatePermissions/${id}/`,
      );

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
  },
);

export const getMenu = createAsyncThunk(
  "auth/getMenus",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosClientServiceApi.get(
        `/pageMenu/getPageMenu/`,
      );

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
  },
);
