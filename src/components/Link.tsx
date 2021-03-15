import React from "react";
import styled from "styled-components";
import { darken, lighten } from "polished";
import { Link as ReactRouterLink } from "react-router-dom";

export interface LinkProps extends React.HTMLAttributes<HTMLAnchorElement> {
  secondary?: boolean;
  color?: string;
  underline?: boolean;
}

export const Link = styled.a<LinkProps>`
  color: ${({ secondary, theme, color }) =>
    secondary ? theme.colors.text : color ? color : theme.colors.primary};

  text-decoration: ${({ underline }) => (underline ? "underline" : "none")};

  &:hover,
  &:active {
    cursor: pointer;
    color: ${({ secondary, theme, color }) =>
    secondary
      ? theme.colors.text
      : color
        ? darken(0.1, color)
        : theme.colors.primaryDark};
    text-decoration: underline;
  }

  &:disabled {
    cursor: initial;
    color: ${({ secondary, theme, color }) =>
    secondary
      ? theme.colors.textDisabled
      : color
        ? lighten(0.2, color)
        : theme.colors.primaryLightest};
  }
`;

type RouterLinkProps = {
  to?: string;
  onClick?:
  | ((e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => any)
  | (() => any);
};

export const RouterLink: React.FC<RouterLinkProps> = ({
  children,
  to = "",
  ...forwardProps
}) => {
  return (
    <Link to={to} {...forwardProps} as={ReactRouterLink}>
      {children}
    </Link>
  );
};
