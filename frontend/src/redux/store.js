import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import projectReducer from "./project/projectSlice";
import clientProjectReducer from "./project/clientProjectSlice";
import loadingReducer from "./project/loadingSlice";
import footerReducer from "./footer/footerSlice";
import serviceReducer from "../redux/services/serviceSlice";
import addressSlice from "./address/addressSlice";
import productsSlice from "./products/productsSlice";
import { authApi } from "./auth/authService";

const store = configureStore({
  reducer: {
    dashBoardProjects: projectReducer,
    clientProjects: clientProjectReducer,
    loader: loadingReducer,
    auth: authReducer,
    footerData: footerReducer,
    serviceMenu: serviceReducer,
    addressList: addressSlice,
    productList: productsSlice,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
});

export default store;
