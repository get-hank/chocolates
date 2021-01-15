import React, { useRef } from "react";
import styled from "styled-components";
import { inputStyle, InputProps } from "./utils";
import { _InputProps } from "./Input";
import { Text, TextProps, rulesForTextProps } from "../typography";
import { Div } from "../spacing";
import { Container } from "../grid";
import { space } from "../../util/layout";

const RadioStyle = styled(Div) <InputProps>`
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

export const Radio: React.FC<_InputProps> = ({
  styledProps = {},
  nativeProps,
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
      <Container align="center" onClick={() => radio.current.click()} grow>
        <Div pr={1}>{input}</Div>
        {children}
      </Container>
    );
  }

  return input;
};
