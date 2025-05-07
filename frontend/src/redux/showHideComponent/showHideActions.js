import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosClientServiceApi, axiosServiceApi } from "../../util/axiosUtil";
import { getObjectsByKey } from "../../util/showHideComponentUtil";

// Get all component by page type
export const getShowHideComponentsListByPage = createAsyncThunk(
  "showHide/list",
  async (type, { rejectWithValue }) => {
    const pageType = type?.toLowerCase();
    try {
      const { data } = await axiosClientServiceApi.get(
        `/showHideComponents/getbyPageType/?pageType=${pageType}`
      );
      if (data.length > 0) {
        const pageData = [];
        pageData[pageType] = getObjectsByKey(data);
        return pageData;
      } else {
        return {};
      }
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// Create new show hide component
export const createShowHideComponent = createAsyncThunk(
  "showHide/createcomponent",
  async ({ newData, showHideCompPageList }, { rejectWithValue }) => {
    try {
      const { data } = await axiosServiceApi.post(
        `/showHideComponents/getorcreate/`,
        newData
      );
      return updateObjects(data, showHideCompPageList);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// update show hide component
export const updateShowHideComponent = createAsyncThunk(
  "showHide/updatecomponent",
  async ({ id, showHideCompPageList }, { rejectWithValue }) => {
    try {
      const { data } = await axiosServiceApi.patch(
        `/showHideComponents/toggleVisibility/${id}/`
      );
      return updateObjects(data, showHideCompPageList);
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

const updateObjects = (data, showHideCompPageList) => {
  if (data) {
    const { pageType, componentName } = data;
    if (!showHideCompPageList[pageType]) {
      showHideCompPageList = [];
      showHideCompPageList[pageType] = {};
    }
    showHideCompPageList[pageType][componentName] = data;
    return showHideCompPageList;
  }
};
