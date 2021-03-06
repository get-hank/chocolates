import React from 'react'
import styled from 'styled-components'
import { SpacingProps, SpacingContainer } from './spacing'
import { passThroughRule, rem } from '../util/helpers'
import { breakPoint } from '../util/layout'

export const fontSize = (size = 1, base = 1) => `font-size: ${rem(size, base)};`

export type TextProps = SpacingProps & {
  center?: boolean
  error?: boolean
  color?: string
  weight?: 200 | 300 | 400 | 500 | 600 | 700
  fontSize?: number // rem
  lineHeight?: number // percentage
  theme?: any
  ellipsis?: boolean
}

const colorRule = (color: string | undefined) =>
  color ? `color: ${color};` : ''

const lineHeightRule = (lineHeight: number | undefined) =>
  lineHeight ? `line-height: ${lineHeight}%;` : ''

export const rulesForTextProps = ({
  center,
  color,
  error,
  lineHeight,
  weight,
  fontSize: size,
  ellipsis = false,
  theme,
}: TextProps) => `
  margin: 0;
  ${center ? 'text-align: center;' : ''}
  ${error ? colorRule(theme.colors.error) : ''}
  ${colorRule(color)}
  ${lineHeightRule(lineHeight)}
  ${passThroughRule('font-weight', weight)}
  ${size ? fontSize(size, theme.typography.baseSize) : ''};

  ${
    ellipsis
      ? `
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`
      : ''
  }
`

const tagMap: any = {}
const nativeTags = ['h1', 'h2', 'h3', 'h4', 'h5', 'h5', 'p', 'span']
const components = nativeTags.reduce((memo = {}, tag) => {
  // @ts-ignore
  memo[tag] = React.forwardRef((props: SpacingProps, ref) => (
    <SpacingContainer ref={ref} {...props} as={tag} />
  ))
  return memo
}, tagMap)

export const H1 = styled(components.h1)<TextProps>`
  color: ${({ theme }) => theme.colors.text};
  ${({ theme }) => fontSize(3, theme.typography.baseSize)}
  ${({ theme }) => passThroughRule('font-family', theme.typography.headingType)}
  font-weight: 300;

  @media (max-width: ${breakPoint('sm')}px) {
    ${({ theme }) => fontSize(2, theme.typography.baseSize)}
    font-weight: 400;
  }

  ${rulesForTextProps}
`

export const H2 = styled(components.h2)<TextProps>`
  color: ${({ theme }) => theme.colors.text};
  ${({ theme }) => fontSize(2, theme.typography.baseSize)}
  ${({ theme }) => passThroughRule('font-family', theme.typography.headingType)}
  font-weight: 400;

  @media (max-width: ${breakPoint('sm')}px) {
    ${({ theme }) => fontSize(1.625, theme.typography.baseSize)}
  }

  ${rulesForTextProps}
`

export const H3 = styled(components.h3)<TextProps>`
  color: ${({ theme }) => theme.colors.text};
  ${({ theme }) => fontSize(1.5, theme.typography.baseSize)}
  ${({ theme }) => passThroughRule('font-family', theme.typography.headingType)}
  font-weight: 400;

  @media (max-width: ${breakPoint('sm')}px) {
    ${({ theme }) => fontSize(1.375, theme.typography.baseSize)}
  }

  ${rulesForTextProps}
`

export const H4 = styled(components.h4)<TextProps>`
  color: ${({ theme }) => theme.colors.text};
  ${({ theme }) => fontSize(1.25, theme.typography.baseSize)}
  ${({ theme }) => passThroughRule('font-family', theme.typography.headingType)}
  font-weight: 400;

  @media (max-width: ${breakPoint('sm')}px) {
    ${({ theme }) => fontSize(1.125, theme.typography.baseSize)}
  }

  ${rulesForTextProps}
`

export const H5 = styled(components.h5)<TextProps>`
  color: ${({ theme }) => theme.colors.text};
  ${({ theme }) => fontSize(0.75, theme.typography.baseSize)}
  ${({ theme }) => passThroughRule('font-family', theme.typography.headingType)}
  font-weight: 400;
  letter-spacing: 1px;

  ${rulesForTextProps}
`

export const P = styled(components.p)<TextProps>`
  color: ${({ theme }) => theme.colors.text};
  ${({ theme }) => fontSize(1, theme.typography.baseSize)}

  ${rulesForTextProps}
`

export const Text = styled(components.span)<TextProps>`
  color: ${({ theme }) => theme.colors.text};
  ${({ theme }) => fontSize(1, theme.typography.baseSize)}

  ${rulesForTextProps}
`
