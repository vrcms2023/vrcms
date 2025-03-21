import React from "react";
import "./index.css";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import { Provider } from "react-redux";
import { CookiesProvider } from "react-cookie";
import { createRoot } from "react-dom/client";

import reportWebVitals from "./reportWebVitals";
import store from "./redux/store";
import { ThemeContextProvider } from "./themes/ThemeContext";

const root = createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <CookiesProvider>
        <ThemeContextProvider>
          <App />
        </ThemeContextProvider>
      </CookiesProvider>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
