import React from "react";
import { DefaultThemeProvider } from "../src/components/theme";

export const decorators = [
  (Story) => (
    <DefaultThemeProvider>
      <Story />
    </DefaultThemeProvider>
  ),
];

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
};
