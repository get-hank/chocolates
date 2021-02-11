import React from "react";
import styled from "styled-components";
import { darken } from "polished";
import { Container, ContainerProps } from "./grid";
import { Div } from "./spacing";
import { ArrowBack, ArrowLeft, ArrowRight, Close, Menu } from "../icons";
import { breakPoint, space } from "../util/layout";

interface IconButtonProps extends React.ComponentPropsWithoutRef<"button"> {
  icon?: "back" | "close" | "menu" | "left" | "right";
  bgColor?: string;
  noButton?: boolean;
}

const components = {
  back: ArrowBack,
  left: ArrowLeft,
  right: ArrowRight,
  close: Close,
  menu: Menu,
};

const ClickTarget = styled.button<Omit<IconButtonProps, "icon" | "noButton">>`
  appearance: none;
  border: none;
  margin: 0;
  padding: 0;

  min-height: ${space(4)};
  min-width: ${space(4)};
  border-radius: 50%;
  cursor: pointer;
  background-color: ${({ theme, bgColor }) =>
    bgColor ? bgColor : theme.colors.white};

  &:active {
    background-color: ${({ theme, bgColor }) =>
    bgColor ? darken(0.1, bgColor) : theme.colors.grayBorder};
  }

  // hack: only apply hover rule on non-mobile viewport
  @media (min-width: ${breakPoint("md")}px) {
    &:hover {
      background - color: ${({ theme, bgColor }) =>
    bgColor ? darken(0.1, bgColor) : theme.colors.grayBorder};
    }
  }
`;

const IconButton: React.FC<IconButtonProps> = ({
  noButton,
  icon,
  children,
  ...rest
}) => {
  const Component = icon ? components[icon] : null;
  return (
    <ClickTarget {...rest} {...(noButton && { as: "span" })}>
      <Container center>{Component ? <Component /> : children}</Container>
    </ClickTarget>
  );
};

export default IconButton;
