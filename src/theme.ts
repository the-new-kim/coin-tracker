import { DefaultTheme } from "styled-components";

const THEME_COLOR1 = "#000000";
const THEME_COLOR2 = "#1F1F1F";
const THEME_COLOR3 = "#616161";
const THEME_COLOR4 = "#00DAC6";
const THEME_COLOR5 = "#E1E1E1";
const THEME_COLOR6 = "#BB86FC";

export const lightTheme: DefaultTheme = {
  bgColor: THEME_COLOR4,
  textColor: THEME_COLOR2,
  boardBgColor: THEME_COLOR5,
  hoverColor: THEME_COLOR3,
  activeColor: THEME_COLOR6,
};
export const darkTheme: DefaultTheme = {
  bgColor: THEME_COLOR1,
  textColor: THEME_COLOR4,
  boardBgColor: THEME_COLOR2,
  hoverColor: THEME_COLOR5,
  activeColor: THEME_COLOR6,
};
