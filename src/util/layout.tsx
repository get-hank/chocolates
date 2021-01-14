import { rem } from "./helpers";

const base = 0.5;

export const space = (size = 1) => rem(size, base);

export const sizes = ["xs", "sm", "md", "lg", "xl"];

const breakPointMap: { [index: string]: number } = {
  // breakpoints, in px
  xs: 0,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
};

export const layoutWidthMap: { [index: string]: number } = {
  // widths at breakpoints, in px
  sm: 540,
  md: 720,
  lg: 960,
  xl: 1140,
};

export const breakPoint = (key: string) => breakPointMap[key];
export const layoutWidth = (key: string) => layoutWidthMap[key];

export const isMobileViewport = () =>
  window.matchMedia(`only screen and (max-width: ${breakPoint("sm")}px)`)
    .matches;
