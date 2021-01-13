import React, { InputHTMLAttributes } from "react";
import styled from "styled-components";
import { inputStyle, InputProps } from "./utils";
import { Div } from "../spacing";

export const InputStyle = styled(Div) <InputProps>`
  input {
    ${inputStyle}
  }
`;

export type _InputProps = {
  styledProps?: InputProps;
  nativeProps: InputHTMLAttributes<HTMLInputElement>;
};

export const Input = ({ styledProps = {}, nativeProps }: _InputProps) => (
  <InputStyle {...styledProps}>
    <input {...nativeProps} />
  </InputStyle>
);
