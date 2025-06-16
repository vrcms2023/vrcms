import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosClientServiceApi, axiosServiceApi } from "../../util/axiosUtil";
import { getObjectsByKey } from "../../util/showHideComponentUtil";
import { getClonedObject } from "../../util/commonUtil";

// Get all component by page type
export const getAllShowHideComponentsList = createAsyncThunk(
  "showHide/list",
  async (rejectWithValue) => {
    try {
      const { data } = await axiosClientServiceApi.get(
        `/showHideComponents/getAllShowHide/`
      );
      return data;
      // if (data.length > 0) {
      //   const pageData = getObjectsByKey(data);
      //   return pageData;
      // } else {
      //   return {};
      // }
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// Get all component by page type
export const getShowHideComponentsListByPage = createAsyncThunk(
  "showHide/pageList",
  async (type, { rejectWithValue }) => {
    const pageType = type?.toLowerCase();
    try {
      const { data } = await axiosServiceApi.get(
        `/showHideComponents/getbyPageType/?pageType=${pageType}`
      );
      return data;
      // if (data.length > 0) {
      //   // const pageData = [];
      //   // pageData[pageType] = getObjectsByKey(data);
      //   // return pageData;
      //   const pageData = getObjectsByKey(data);
      //   return pageData;
      // } else {
      //   return {};
      // }
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// Create new show hide component
export const createShowHideComponent = createAsyncThunk(
  "showHide/createcomponent",
  async (newData, { rejectWithValue }) => {
    try {
      const { data } = await axiosServiceApi.post(
        `/showHideComponents/getorcreate/`,
        newData
      );
      return data;
      //return updateObjects(data, showHideList);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// update show hide component
export const updateShowHideComponent = createAsyncThunk(
  "showHide/updatecomponent",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axiosServiceApi.patch(
        `/showHideComponents/toggleVisibility/${id}/`
      );
      return data;
      //return updateObjects(data, showHideList);
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

// Delete show hide component
export const deleteShowHideComponent = createAsyncThunk(
  "auth/getRefreshToken",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axiosServiceApi.delete(
        `/showHideComponents/deleteinstance/${id}/`
      );
      return id;
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
