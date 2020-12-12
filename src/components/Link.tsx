import React from "react";
import styled from "styled-components";

export interface LinkProps extends React.HTMLAttributes<HTMLAnchorElement> {
  secondary?: boolean;
}

const Link = styled.a<LinkProps>`
  color: ${({ secondary, theme }) =>
    secondary ? theme.colors.text : theme.colors.primary};

  &:hover,
  &:active {
    cursor: pointer;
    color: ${({ secondary, theme }) =>
    secondary ? theme.colors.text : theme.colors.primaryDark};
    text-decoration: underline;
  }

  &:disabled {
    cursor: initial;
    color: ${({ secondary, theme }) =>
    secondary ? theme.colors.textDisabled : theme.colors.primaryLightest};
  }
`;

export default Link;
