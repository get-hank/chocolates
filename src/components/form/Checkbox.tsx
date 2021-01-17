import React, { useRef, useState } from "react";
import styled from "styled-components";
import { inputStyle, InputProps } from "./utils";
import { _InputProps } from "./Input";
import { Text, TextProps, rulesForTextProps } from "../typography";
import { Div } from "../spacing";
import { Container, ContainerProps } from "../grid";
import { space } from "../../util/layout";

const HoverContainer = styled(Container)`
  &:hover {
    cursor: pointer;
  }

  * {
    &:hover {
      cursor: pointer;
    }
  }
`;

const CheckboxStyle = styled(Div) <InputProps>`
  position: relative;

  input[type="checkbox"] {
    ${inputStyle}
    appearance: none;
    height: 20px;
    width: 20px;

    &:checked {
      background-color: ${({ theme }) => theme.colors.primary};
      border-color: ${({ theme }) => theme.colors.primary};
    }
  }

  svg {
    position: absolute;
    top: 6px;
    left: 4px;
  }
`;

type CheckboxProps = _InputProps & {
  containerProps?: ContainerProps | null;
};

export const Checkbox: React.FC<CheckboxProps> = ({
  styledProps = {},
  nativeProps,
  containerProps = {},
  children,
}) => {
  const { defaultChecked, onChange, ...rest } = nativeProps;
  const [checked, setChecked] = useState<boolean>(defaultChecked || false);
  const checkbox = useRef(null);

  const input = (
    <CheckboxStyle {...styledProps}>
      {checked ? (
        <svg
          width="12"
          height="9"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          onClick={(e) => {
            checkbox.current.click();
            e.stopPropagation();
          }}
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M3.73 8.037L.15 4.542a.484.484 0 010-.7l.723-.698a.525.525 0 01.723 0L4.09 5.59 9.654.144a.525.525 0 01.723 0l.723.7c.2.192.2.506 0 .697L4.452 8.037a.525.525 0 01-.723 0z"
            fill="#fff"
          />
        </svg>
      ) : null}
      <input
        {...rest}
        ref={checkbox}
        defaultChecked={checked}
        onClick={(e) => e.stopPropagation()}
        onChange={(e) => {
          setChecked(e.target.checked);
          onChange && onChange(e);
        }}
        type="checkbox"
      />
    </CheckboxStyle>
  );

  if (children) {
    return (
      <HoverContainer
        align="center"
        onClick={() => checkbox.current.click()}
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
