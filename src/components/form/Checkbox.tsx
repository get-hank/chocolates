import React, { useRef, useState } from "react";
import styled from "styled-components";
import { InputStyle, _InputProps } from "./Input";
import { Text, TextProps, rulesForTextProps } from "../typography";
import { Div } from "../spacing";
import { space } from "../../util/layout";

const CheckboxStyle = styled(InputStyle)`
  position: relative;

  input[type="checkbox"] {
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

export const Checkbox = ({ styledProps = {}, nativeProps }: _InputProps) => {
  const { defaultChecked, onChange, ...rest } = nativeProps;
  const [checked, setChecked] = useState<boolean>(defaultChecked || false);
  const checkbox = useRef(null);

  return (
    <CheckboxStyle {...styledProps}>
      {checked ? (
        <svg
          width="12"
          height="9"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          onClick={() => checkbox.current.click()}
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
        onChange={(e) => {
          setChecked(e.target.checked);
          onChange && onChange(e);
        }}
        type="checkbox"
        style={{ width: space(2.5), height: space(2.5) }}
      />
    </CheckboxStyle>
  );
};
