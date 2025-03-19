import React, { useContext } from "react";
import { ThemeContext } from "./ThemeContext";
import { themeNames } from "./theme";
import styled from "styled-components";

const Select = styled.select`
  padding: 8px;
  font-size: 16px;
  border: 1px solid ${({ theme }) => theme.secondaryColor};
  background: ${({ theme }) => theme.white};
  color: ${({ theme }) => theme.teamTextColor};
  border-radius: 5px;
  cursor: pointer;
`;

const ThemeSwitcher = () => {
  const { themeName, setTheme } = useContext(ThemeContext);

  return (
    <Select value={themeName} onChange={(e) => setTheme(e.target.value)}>
      {themeNames.map((theme) => (
        <option key={theme} value={theme}>
          {theme}
        </option>
      ))}
    </Select>
  );
};

export default ThemeSwitcher;
