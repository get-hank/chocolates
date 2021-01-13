import React from "react";
import styled from "styled-components";
import { Container } from "./grid";
import { Div, SpacingProps } from "./spacing";
import { Close, ArrowBack, Menu } from "../icons";
import { space } from "../util/layout";

type IconButtonProps = SpacingProps & {
  name?: "back" | "close" | "menu";
};

const components = {
  back: ArrowBack,
  close: Close,
  menu: Menu,
};

const ClickTarget = styled(Container)`
  min-height: ${space(4)};
  min-width: ${space(4)};
  border-radius: 50%;
  cursor: pointer;

  &:active,
  &:hover {
    background-color: ${({ theme }) => theme.colors.grayBorder};
  }
`;

const IconButton: React.FC<IconButtonProps> = ({ name, children, ...rest }) => {
  const Component = name ? components[name] : null;
  return (
    <ClickTarget {...rest} center>
      {Component ? <Component /> : children}
    </ClickTarget>
  );
};

export default IconButton;
