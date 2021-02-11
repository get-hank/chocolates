import React, { useRef } from "react";
import styled from "styled-components";
import { inputStyle, InputProps } from "./utils";
import { _InputProps } from "./Input";
import { Text, TextProps, rulesForTextProps } from "../typography";
import { Div } from "../spacing";
import { Container, ContainerProps } from "../grid";
import { space } from "../../util/layout";

const HoverContainer = styled(Container)`
  flex-wrap: nowrap;

  &:hover {
    cursor: pointer;
  }

  * {
    &:hover {
      cursor: pointer;
    }
  }
`;

const RadioStyle = styled(Div) <InputProps>`
  &:hover {
    cursor: pointer;
  }

  input[type="radio"] {
    ${inputStyle}

    box-sizing: content-box;
    position: relative;
    padding: 0;
    appearance: none;
    height: 20px;
    width: 20px;
    border-radius: 50%;
    border: 1px solid ${({ theme }) => theme.colors.grayBorder};

    &:checked {
      border-color: ${({ theme }) => theme.colors.primary};

      &:after {
        content: "";
        position: absolute;
        height: 10px;
        width: 10px;
        top: 25%;
        left: 25%;
        right: 25%;
        bottom: 25%;
        background-color: ${({ theme }) => theme.colors.primary};
        border-radius: 50%;
      }
    }
  }
`;

type RadioProps = _InputProps & {
  containerProps?: ContainerProps | null;
};

export const Radio: React.FC<RadioProps> = ({
  styledProps = {},
  nativeProps,
  containerProps = {},
  children,
}) => {
  const radio = useRef(null);

  const input = (
    <RadioStyle {...styledProps}>
      <input
        {...nativeProps}
        ref={radio}
        type="radio"
        onClick={(e) => e.stopPropagation()}
      />
    </RadioStyle>
  );

  if (children) {
    return (
      <HoverContainer
        align="center"
        onClick={() => radio.current.click()}
        grow
        {...containerProps}
      >
        <Div pr={1}>{input}</Div>
        {children}
      </HoverContainer>
    );
  }

  return input;
};
