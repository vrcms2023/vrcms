import store from "../redux/store";
import axios from "axios";
import { getBaseURL } from "./ulrUtil";
import { getCookie } from "./cookieUtil";
import { startLoading, stoptLoading } from "../redux/project/loadingSlice";

axios.defaults.baseURL = `${getBaseURL()}/api/v1`;

axios.defaults.withCredentials = true;
/**
 * Axios API call with Access token
 */
const headers = {
  Accept: "application/json",
  "Content-type": "application/json",
  "X-CSRFToken": getCookie("csrftoken"),
};
const fileUploadHeader = {
  Accept: "application/json",
  "Content-type": "application/json",
  "X-CSRFToken": getCookie("csrftoken"),
  "Content-Type": "multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW",
};
export const axiosServiceApi = axios.create({ headers: headers });

export const axiosClientServiceApi = axios.create({ headers: headers });

export const axiosFileUploadServiceApi = axios.create({
  headers: fileUploadHeader,
});

export const axiosJobUploadServiceApi = axios.create({
  headers: fileUploadHeader,
});

const requestInterceptorRequestHanler = async (config) => {
  store.dispatch(startLoading());
  try {
    const accessToken = getCookie("access");
    if (!accessToken) return false;
    config.headers["Authorization"] = `JWT ${accessToken}`;
    return config;
  } catch (error) {
    window.location = "/login";
  }
};

const requestInterceptorClientRequestHanler = async (config) => {
  store.dispatch(startLoading());
  return config;
};

const requestInterceptorErrortHanler = async (error) => {
  store.dispatch(stoptLoading());
  return Promise.reject(error);
};

const responseInterceptorResponseHanler = async (response) => {
  store.dispatch(stoptLoading());
  return response;
};

const responseInterceptorErrortHanler = async (error) => {
  store.dispatch(stoptLoading());
  if (error?.code === "ERR_NETWORK") {
    window.location = "/login";
  }
  if (error?.response?.status === 401) {
    window.location = "/login";
    //return Promise.reject(error.response.data.detail);
  }
  if (error?.response?.status === 404) {
    return Promise.reject(error.response.statusText);
  }
  const key = Object.keys(error?.response?.data)[0];
  return Promise.reject(error.response.data[key]);
};

const clientresponseInterceptorErrortHanler = async (error) => {
  store.dispatch(stoptLoading());
  if (error?.code === "ERR_NETWORK") {
    return Promise.reject(error.code);
  }
  if (error?.response?.status === 401) {
    return Promise.reject(error?.response?.data?.detail);
  }
  if (error?.response?.status === 404) {
    return Promise.reject(error?.response?.statusText);
  }
  if (error?.response?.status === 500) {
    return error;
  }
  const key = Object.keys(error?.response?.data)[0];
  return Promise.reject(error?.response?.data[key]);
};

axiosServiceApi.interceptors.request.use(requestInterceptorRequestHanler, requestInterceptorErrortHanler);
axiosServiceApi.interceptors.response.use(responseInterceptorResponseHanler, responseInterceptorErrortHanler);

axiosFileUploadServiceApi.interceptors.request.use(requestInterceptorRequestHanler, requestInterceptorErrortHanler);
axiosFileUploadServiceApi.interceptors.response.use(responseInterceptorResponseHanler, responseInterceptorErrortHanler);

axiosClientServiceApi.interceptors.request.use(requestInterceptorClientRequestHanler, requestInterceptorErrortHanler);
axiosClientServiceApi.interceptors.response.use(responseInterceptorResponseHanler, clientresponseInterceptorErrortHanler);

axiosJobUploadServiceApi.interceptors.request.use(requestInterceptorClientRequestHanler, requestInterceptorErrortHanler);
axiosJobUploadServiceApi.interceptors.response.use(responseInterceptorResponseHanler, clientresponseInterceptorErrortHanler);
