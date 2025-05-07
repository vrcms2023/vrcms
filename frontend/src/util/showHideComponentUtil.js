import _ from "lodash";
import { getCookie } from "./cookieUtil";
import { axiosServiceApi } from "./axiosUtil";
import { useSelector } from "react-redux";

export const getShowHideComponentsListByPage = async (type) => {
  try {
    let response = await axiosServiceApi.get(
      `/showHideComponents/getbyPageType/?pageType=${type?.toLowerCase()}`
    );
    return response.data;
  } catch (error) {
    return error;
  }
};

export const createShowHideComponent = async (data) => {
  try {
    let response = await axiosServiceApi.post(
      `/showHideComponents/getorcreate/`,
      JSON.stringify(data)
    );
    return response.data;
  } catch (error) {
    return error;
  }
};

export const updateShowHideComponent = async (id) => {
  try {
    console.log("id", id);
    let response = await axiosServiceApi.patch(
      `/showHideComponents/toggleVisibility/${id}/`
    );
    return response.data;
  } catch (error) {
    return error;
  }
};

export const deleteShowHideComponent = async (id) => {
  try {
    let response = await axiosServiceApi.delete(
      `/showHideComponents/deleteinstance/${id}/`
    );
    return response.data;
  } catch (error) {
    return error;
  }
};

export const getObjectsByKey = (data) => {
  const objectbyname = [];
  data.forEach((item) => (objectbyname[item.componentName] = item));
  return objectbyname;
};
