import React, { createContext, useState, useEffect } from "react";
import { ThemeProvider } from "styled-components";
import { themes, themeNames } from "./theme";
import { useDispatch, useSelector } from "react-redux";
import { getTheme } from "../redux/themes/themeActions";
import { axiosServiceApi } from "../util/axiosUtil";
import { getCookie } from "../util/cookieUtil";
import { toast } from "react-toastify";

// Create Context
export const ThemeContext = createContext();

export const ThemeContextProvider = ({ children }) => {
  const storedTheme = localStorage.getItem("app-theme") || "VRCMS";
  const [themeName, setThemeName] = useState(storedTheme);

  const { theme } = useSelector((state) => state.selectedTheme);
  const dispatch = useDispatch();

  useEffect(() => {
    if (theme.length == 0) {
      dispatch(getTheme());
    }
  }, [theme, dispatch]);

  useEffect(() => {
    if (theme.length > 0) {
      localStorage.setItem("app-theme", theme[0].selected_themeName);
      setTheme(theme);
    }
    // Save user's theme choice
  }, [themeName, theme.length > 0]);

  const setTheme = (newTheme) => {
    if (themeNames.includes(newTheme)) {
      updateTheme(newTheme);
      setThemeName(newTheme);
    }
  };

  const updateTheme = async (newTheme) => {
    try {
      const response = await axiosServiceApi.patch(
        `/app/updateTheme/${theme[0].id}/`,
        {
          selected_themeName: newTheme,
          updated_by: getCookie("userName"),
        }
      );

      if (response.status !== 200) {
        toast.error("Unable to active user");
      }

      if (response.status === 200) {
        toast.success("Theme is update successfully");
      }
    } catch (error) {
      toast.error("Unable to update the theme");
    }
  };

  return (
    <ThemeContext.Provider value={{ themeName, setTheme }}>
      <ThemeProvider theme={themes[themeName]}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
};
