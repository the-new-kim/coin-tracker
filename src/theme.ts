import { DefaultTheme } from "styled-components";

const THEME_COLOR1 = "rgba(0, 0, 0, 1)";
const THEME_COLOR2 = "rgba(31, 31, 31, 1)";
const THEME_COLOR3 = "rgba(60, 60, 60, 1)";
const THEME_COLOR4 = "rgba(0, 218, 198, 1)";
const THEME_COLOR5 = "rgba(225, 225, 225, 1)";
const THEME_COLOR6 = "rgba(187, 134, 252, 1)";
const THEME_COLOR7 = "rgba(240, 240, 240, 1)";

export const lightTheme: DefaultTheme = {
  bgColor: THEME_COLOR4,
  bgColorOpacityZero: "rgba(0, 218, 198, 0)",
  textColor: THEME_COLOR2,
  border: {
    background: `linear-gradient(135deg, ${THEME_COLOR5} 0%, ${THEME_COLOR5} 100%)`,
    hover: {
      background: `linear-gradient(135deg, ${THEME_COLOR5} 0%, ${THEME_COLOR7} 100%)`,
    },
  },
  boardBgColor: THEME_COLOR5,
  boardBgColor2: THEME_COLOR3,
  hoverColor: THEME_COLOR6,
  activeColor: THEME_COLOR6,
  textRed: "rgb(205,61,61)",
  textGreen: "rgb(29,162,417)",
  boardTitleBg: "rgb(210, 210, 210)",
};

export const darkTheme: DefaultTheme = {
  bgColor: THEME_COLOR1,
  bgColorOpacityZero: "rgba(0, 0, 0, 0)",
  textColor: THEME_COLOR4,
  border: {
    background: `linear-gradient(135deg, ${THEME_COLOR2} 0%, ${THEME_COLOR2} 100%)`,
    hover: {
      background: `linear-gradient(135deg, ${THEME_COLOR2} 0%, ${THEME_COLOR3} 100%)`,
    },
  },
  boardBgColor: THEME_COLOR2,
  boardBgColor2: THEME_COLOR3,
  hoverColor: THEME_COLOR5,
  activeColor: THEME_COLOR6,
  textRed: "rgb(162,0,0)",
  textGreen: "rgb(40,161,154)",
  boardTitleBg: "rgb(20, 20, 20)",
};
