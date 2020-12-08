import React from "react";
import styled, { ThemeProvider } from "styled-components";
import { colors } from "../util/colors";

export const defaultTheme = {
  typography: {
    baseSize: 1, // rem
    headingType: '"Poppins", sans-serif',
    baseType: '"Lato", sans-serif',
  },
  colors: {
    primary: colors.primary700,
    primaryDark: colors.primary900,
    primaryLight: colors.primary100,
    white: colors.white,
    black: colors.black,
    grayLight: colors.gray10,
    text: colors.gray950,
    textDisabled: colors.gray200,
    grayBorder: colors.gray100,
  },
};

type ThemeProps = {
  theme?: any;
};

const Wrapper = styled.div`
  * {
    box-sizing: border-box;
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
