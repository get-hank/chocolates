import React, { SelectHTMLAttributes } from "react";
import styled from "styled-components";
import { Text, TextProps, rulesForTextProps } from "../typography";
import { Div } from "../spacing";
import { space } from "../../util/layout";

import { inputStyle, InputProps } from "./utils";

export type Option = {
  value: string;
  label?: string;
};

export type SelectProps = {
  styledProps?: InputProps;
  nativeProps: SelectHTMLAttributes<HTMLSelectElement>;
  options: Option[];
};

const SelectStyle = styled(Div) <InputProps>`
  select {
    ${inputStyle}
  }

  option {
    ${({ theme }) => `font-family: ${theme.typography.baseType}`};
    ${rulesForTextProps}
    padding: ${space(1)};
  }
`;

export const Select = ({
  options,
  styledProps = {},
  nativeProps,
}: SelectProps) => (
    <SelectStyle {...styledProps}>
      <select {...nativeProps}>
        {options.map((o: Option) => (
          <option key={o.value} value={o.value}>
            {o.label !== undefined ? o.label : o.value}
          </option>
        ))}
      </select>
    </SelectStyle>
  );
