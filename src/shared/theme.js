const device = {
  mobileLg: `@media screen and (min-width: 360px) and (max-width:720px)`,
  tablet: `@media screen and (min-width: 720px)`,
  desktop: `@media screen and (min-width: 1000px)`,
};

//font-size: ${({ theme }) => theme.fontSizes.lg};

const colors = {
  mainGreen: "#00DB9A",
  mainOrange: "#FF4532",
  white: "#FFFFFF",
  lightGray: "#EFEFEF",
  gray: "#A9A9A9",
  darkGray: "#606060",
  black: "#222222",
};

const paddings = {
  md: "20px",
};

const fontSizes = {
  xl: "40px",
  lg: "28px",
  md: "22px",
  ms: "18px",
  sm: "16px",
  xs: "14px",
};

const theme = {
  device,
  colors,
  paddings,
  fontSizes,
};

export default theme;
