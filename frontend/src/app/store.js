import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import projectReducer from "../features/project/projectSlice";
import clientProjectReducer from "../features/project/clientProjectSlice";
import loadingReducer from "../features/project/loadingSlice";
import footerReducer from "../features/footer/footerSlice";
import serviceReducer from "../features/services/serviceSlice";
import { authApi } from "./services/auth/authService";

const store = configureStore({
  reducer: {
    dashBoardProjects: projectReducer,
    clientProjects: clientProjectReducer,
    loader: loadingReducer,
    auth: authReducer,
    footerData: footerReducer,
    serviceMenu: serviceReducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
});

export default store;
