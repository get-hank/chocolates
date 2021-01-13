import React from "react";
import { InputStyle, _InputProps } from "./Input";

export const TimePicker = ({ styledProps = {}, nativeProps }: _InputProps) => (
  <InputStyle {...styledProps}>
    <input type="time" {...nativeProps} />
  </InputStyle>
);
