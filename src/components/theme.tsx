import React from "react";
import { ThemeProvider } from "styled-components";

export const defaultTheme = {
  typography: {
    baseSize: 1, // rem
    headingType: "'Poppins', sans serif",
    baseType: "'Lato', sans serif",
  },
};

type ThemeProps = {
  theme?: any;
};

export const DefaultThemeProvider: React.FunctionComponent<ThemeProps> = ({
  theme,
  children,
}) => (
    <ThemeProvider theme={{ ...defaultTheme, ...theme }}>
      {children}
    </ThemeProvider>
  );
