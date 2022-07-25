const colors = {
  orange: "#FF8C28",
  green: "#00AE1E",
  darkBlue: "#322F5A",
  black: "#222222",
  white: "#FFFFFF",
  gray: "#AFB0B3",
  lightGray: "#ECECEC",
  lighterGray: "#FAFAFA",
  red: "#F34F1D",
};

const fontSizes = {
  s: "12px",
  m: "14px",
  l: "18px",
  xl: "27px",
};

const width = {
  maxWidth: "1440px",
  listWidth: "1106px",
};

const deviceSizes = {
  mobile: "768px",
};

const device = {
  mobile: `screen and (min-width: ${deviceSizes.mobile})`,
};

const theme = {
  colors,
  fontSizes,
  width,
  device,
  deviceSizes,
};

export default theme;
