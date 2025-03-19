import React, { useContext } from "react";
import { ThemeContext } from "./ThemeContext";
import { themeNames } from "./theme";
import styled from "styled-components";

const Select = styled.select`
  padding: 8px;
  font-size: 16px;
  border: 1px solid ${(props) => props.theme.textColor};
  background: ${(props) => props.theme.lightgray};
  color: $ ${(props) => props.theme.textColor};
  border-radius: 5px;
  cursor: pointer;
`;

const ThemeSwitcher = () => {
  const { themeName, setTheme } = useContext(ThemeContext);

  return (
    <Select value={themeName} onChange={(e) => setTheme(e.target.value)}>
      {themeNames.map((theme) => (
        <option key={theme} value={theme}>
          {theme.charAt(0).toUpperCase() + theme.slice(1)}
        </option>
      ))}
    </Select>
  );

  //   return <button onClick={toggleTheme}>Toggle Theme</button>;
};

export default ThemeSwitcher;
