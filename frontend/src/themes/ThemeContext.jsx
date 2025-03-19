import React, { createContext, useState, useEffect } from "react";
import { ThemeProvider } from "styled-components";
import { themes, themeNames } from "./theme";

// Create Context
export const ThemeContext = createContext();

export const ThemeContextProvider = ({ children }) => {
  const storedTheme = localStorage.getItem("app-theme") || "VRCMS";
  const [themeName, setThemeName] = useState(storedTheme);

  useEffect(() => {
    localStorage.setItem("theme", themeName); // Save user's theme choice
  }, [themeName]);

  const setTheme = (newTheme) => {
    if (themeNames.includes(newTheme)) {
      setThemeName(newTheme);
    }
  };

  return (
    <ThemeContext.Provider value={{ themeName, setTheme }}>
      <ThemeProvider theme={themes[themeName]}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
};
