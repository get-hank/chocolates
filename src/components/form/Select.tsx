import React, { SelectHTMLAttributes } from 'react'
import styled from 'styled-components'
import { rulesForTextProps } from '../typography'
import { Div } from '../spacing'
import { space } from '../../util/layout'

import { inputStyle, InputProps } from './utils'

export type Option = {
  value: string
  label?: string
}

export type SelectProps = {
  styledProps?: InputProps
  nativeProps: SelectHTMLAttributes<HTMLSelectElement>
  options: Option[]
}

const SelectStyle = styled(Div) <InputProps>`
  position: relative;
  cursor: pointer;

  select {
    -moz-appearance: none; /* Firefox */
    -webkit-appearance: none; /* Safari and Chrome */
    appearance: none;
    ${inputStyle}
    padding-right: ${space(4)};

    /* prevent horizontal scroll on iOS Safari */
    max-width: 100%;
    overflow: hidden;

    text-overflow: ellipsis;
    cursor: pointer;
  }

  option {
    ${({ theme }) => `font-family: ${theme.typography.baseType}`};
    ${rulesForTextProps}
    padding: ${space(1)};
  }

  svg {
    position: absolute;
    right: ${space(1)};
    top: 50%;
    margin-top: -3px;
    pointer-events: none;
  }
`

export const Select = ({
  options,
  styledProps = {},
  nativeProps,
}: SelectProps) => {
  return (
    <SelectStyle {...styledProps}>
      <select {...nativeProps}>
        {options.map((o: Option) => (
          <option key={o.value} value={o.value}>
            {o.label !== undefined ? o.label : o.value}
          </option>
        ))}
      </select>
      <svg width="12" height="6" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M.6.6L6 5.4 11.4.6"
          stroke="#1F1F1F"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </SelectStyle>
  )
}
