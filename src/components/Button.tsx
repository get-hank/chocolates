import React from "react";
import styled from "styled-components";
import { SpacingContainer } from "./spacing";

type ButtonProps = {
  disabled?: boolean;
};

const Button = styled.button`
  background-color: white;
  &:disabled {
    color: initial;
    background-color: #dbdbdb;
  }
`;

const Component: React.FC<ButtonProps> = ({ children, disabled = false }) => {
  return (
    <Button disabled={disabled}>
      <SpacingContainer p={0.5}>{children}</SpacingContainer>
    </Button>
  );
};

export default Component;
