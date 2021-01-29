import React from "react";
import styled from "styled-components";
import { Link as ReactRouterLink } from "react-router-dom";

export interface LinkProps extends React.HTMLAttributes<HTMLAnchorElement> {
  secondary?: boolean;
}

export const Link = styled.a<LinkProps>`
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
    <Link
      to={to}
      {...forwardProps}
      as={ReactRouterLink}
      style={{ textDecoration: "none" }}
    >
      {children}
    </Link>
  );
};
