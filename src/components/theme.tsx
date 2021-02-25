import React from "react";
import styled, { ThemeProvider } from "styled-components";
import { colors } from "../util/colors";

export const defaultTheme = {
  typography: {
    baseSize: 1, // rem
    headingType: '"Poppins", sans-serif',
    baseType:
      '"DM Sans", -apple-system, system-ui, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  },
  colors: {
    primary: colors.primary700,
    primaryMid: colors.primary600,
    primaryDark: colors.primary900,
    primaryLight: colors.primary200,
    primaryLightest: colors.primary100,
    error: colors.red400,
    errorLightest: colors.red50,
    white: colors.white,
    black: colors.black,
    gray: colors.gray400,
    grayLight: colors.gray50,
    grayLightest: colors.gray10,
    text: colors.gray950,
    textDisabled: colors.gray200,
    grayBorder: colors.gray100,
    border: colors.gray100,
  },
};

type ThemeProps = {
  theme?: any;
};

const Wrapper = styled.div`
  * {
    box-sizing: border-box;
  }

  *:not(h1):not(h2):not(h3):not(h4):not(h5):not(h6) {
    font-family: ${({ theme }) => theme.typography.baseType};
    letter-spacing: -0.01rem;
  }
`;

export const DefaultThemeProvider: React.FunctionComponent<ThemeProps> = ({
  theme,
  children,
}) => (
    <ThemeProvider theme={{ ...defaultTheme, ...theme }}>
      <Wrapper>{children}</Wrapper>
    </ThemeProvider>
  );
