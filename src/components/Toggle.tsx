import React, { useState } from "react";
import styled from "styled-components";
import { Container } from "./grid";

type ToggleProps = {
  left: string;
  right: string;
  value?: string | null;
  onChange?: (newVal: string) => any;
};

const Wrapper = styled(Container)`
  padding: 2px;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.colors.grayLight};
`;

const Choice = styled.button<{ active: boolean }>`
  appearance: none;
  border: none;
  border-radius: 3px;
  padding: 0.5rem 1.5rem;
  width: 50%;
  font-weight: 500;
  background-color: ${({ active, theme }) =>
    active ? theme.colors.white : "transparent"};

  &:hover {
    ${({ active }) => (!active ? "cursor: pointer;" : "")}
  }
`;

const Toggle = ({
  left,
  right,
  value: overrideValue,
  onChange,
}: ToggleProps) => {
  const [internalValue, setValue] = useState<string>(overrideValue || left);
  const value = overrideValue || internalValue;

  const leftActive = value === left;

  const handleChange = (newValue: string) => {
    if (newValue === value) return;
    setValue(newValue);
    onChange && onChange(newValue);
  };

  return (
    <Wrapper>
      <Choice
        name={left}
        active={leftActive}
        onClick={() => handleChange(left)}
      >
        {left}
      </Choice>
      <Choice
        name={right}
        active={!leftActive}
        onClick={() => handleChange(right)}
      >
        {right}
      </Choice>
    </Wrapper>
  );
};

export default Toggle;
