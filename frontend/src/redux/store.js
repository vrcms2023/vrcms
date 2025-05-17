import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import projectReducer from "./project/projectSlice";
import clientProjectReducer from "./project/clientProjectSlice";
import loadingReducer from "./project/loadingSlice";
import footerReducer from "./footer/footerSlice";
import serviceReducer from "../redux/services/serviceSlice";
import addressSlice from "./address/addressSlice";
import productsSlice from "./products/productsSlice";
import categorySlice from "./products/categorySlice";
import { authApi } from "./auth/authService";
import themeReducer from "./themes/themeSlice";
import showHideComponentReducer from "./showHideComponent/showHideSlice";

const combinedReducer = combineReducers({
  dashBoardProjects: projectReducer,
  clientProjects: clientProjectReducer,
  loader: loadingReducer,
  auth: authReducer,
  footerData: footerReducer,
  serviceMenu: serviceReducer,
  addressList: addressSlice,
  productList: productsSlice,
  categoryList: categorySlice,
  selectedTheme: themeReducer,
  showHide: showHideComponentReducer,
  [authApi.reducerPath]: authApi.reducer,
});

const rootReducer = (state, action) => {
  if (action.type === "auth/logout") {
    return combinedReducer(undefined, action);
  }
  return combinedReducer(state, action);
};

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
});

export default store;
