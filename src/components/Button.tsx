import React from 'react'
import styled from 'styled-components'
import { darken, lighten } from 'polished'
import { fontSize } from './typography'
import { passThroughRule } from '../util/helpers'
import { breakPoint, space } from '../util/layout'

const animationDuration = 200

type SizeType = 'small' | 'medium' | 'large' | 'x-large' | 'mobile'

export interface ButtonProps extends React.ComponentPropsWithoutRef<'button'> {
  size?: SizeType
  secondary?: boolean
  wide?: boolean
  disabled?: boolean
  color?: string
}

const sizeRules = (size: SizeType, wide: boolean | null) => {
  switch (size) {
    case 'small':
      return `
        ${fontSize(0.875)}
        padding: ${space(1)} ${space(wide ? 4 : 1.5)};
      `
    case 'medium':
      return `
        ${fontSize(0.875)}
        padding: ${space(1)} ${space(wide ? 4 : 2)};
      `
    case 'mobile':
      return `
        ${fontSize(0.875)}
        padding: ${space(1.5)} ${space(wide ? 4 : 2.5)};
      `
    case 'large':
      return `
        ${fontSize(1)}
        padding: ${space(2)} ${space(wide ? 5 : 3)};
      `
    case 'x-large':
      return `
        ${fontSize(1.25)}
        padding: ${space(3)} ${space(wide ? 8 : 4)};
      `
  }
}

const Button = styled.button<ButtonProps>`
  font-weight: 500;

  border-width: 1px;
  border-radius: 3px;
  border-style: solid;

  ${({ theme }) => passThroughRule('font-family', theme.typography.baseType)}

  color: ${({ secondary, theme, color }) =>
    secondary ? (color ? color : theme.colors.text) : theme.colors.white};

  background-color: ${({ secondary, theme, color }) =>
    secondary ? 'transparent' : color ? color : theme.colors.primary};
  border-color: ${({ secondary, theme, color }) =>
    color ? color : secondary ? theme.colors.grayBorder : theme.colors.primary};

  transition: color ${animationDuration}ms ease,
    border-color ${animationDuration}ms ease,
    background-color ${animationDuration}ms ease;

  &:hover,
  &:active {
    cursor: pointer;
    color: ${({ secondary, theme, color }) =>
    secondary ? theme.colors.primary : theme.colors.white};
    background-color: ${({ secondary, theme, color }) =>
    secondary
      ? theme.colors.white
      : color
        ? darken(0.1, color)
        : theme.colors.primaryDark};
    border-color: ${({ secondary, theme, color }) =>
    secondary
      ? color
        ? color
        : theme.colors.primary
      : color
        ? darken(0.1, color)
        : theme.colors.primaryDark};
  }

  &:active {
    border-color: ${({ theme, color }) =>
    color ? lighten(0.1, color) : theme.colors.primaryLight};
    box-shadow: 0 0 1px 3px
      ${({ theme, color }) =>
    color ? lighten(0.1, color) : theme.colors.primaryLight};
  }

  &:disabled {
    cursor: initial;
    color: ${({ secondary, theme }) =>
    secondary ? theme.colors.textDisabled : theme.colors.white};
    background-color: ${({ secondary, theme, color }) =>
    secondary
      ? theme.colors.grayLightest
      : color
        ? lighten(0.2, color)
        : theme.colors.primaryLightest};
    border-color: ${({ secondary, theme, color }) =>
    secondary
      ? theme.colors.grayLightest
      : color
        ? lighten(0.2, color)
        : theme.colors.primaryLightest};
  }

  ${({ size, wide }) => sizeRules(size, wide)}

  @media (max-width: ${breakPoint('sm')}px) {
    ${({ wide }) => sizeRules('mobile', wide)}
  }
`

const Component: React.FC<ButtonProps> = ({
  children,
  size = 'small',
  secondary = false,
  wide = false,
  ...rest
}) => {
  return (
    <Button size={size} secondary={secondary} wide={wide} {...rest}>
      {children}
    </Button>
  )
}

export default Component
