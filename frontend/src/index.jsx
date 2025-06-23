import React from "react";
import "./index.css";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Provider } from "react-redux";
import { CookiesProvider } from "react-cookie";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import reportWebVitals from "./reportWebVitals";
import store from "./redux/store";
import { ThemeContextProvider } from "./themes/ThemeContext";
import { HelmetProvider } from "react-helmet-async";

const root = createRoot(document.getElementById("root"));

root.render(
  <HelmetProvider>
    <React.StrictMode>
      <Provider store={store}>
        <CookiesProvider>
          <ThemeContextProvider>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </ThemeContextProvider>
        </CookiesProvider>
      </Provider>
    </React.StrictMode>
  </HelmetProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
