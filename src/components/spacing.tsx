import React from 'react'
import styled from 'styled-components'
import { breakPoint, space } from '../util/layout'

export interface SpacingProps extends React.HTMLAttributes<HTMLDivElement> {
  p?: number
  py?: number
  pt?: number
  pb?: number
  px?: number
  pl?: number
  pr?: number

  smP?: number
  smPy?: number
  smPx?: number

  hideUnder?: string
  hideOver?: string

  b?: boolean
  by?: boolean
  bx?: boolean
  bt?: boolean
  bb?: boolean
  bl?: boolean
  br?: boolean

  grow?: boolean

  hideFromFullStory?: boolean
  as?: Parameters<ReturnType<typeof styled.div>>[0]['as']
}

export const padding = (rule: string, size: number) =>
  `${rule}: ${space(size)};`

export const mediaPadding = (bp: string, rule: string, size: number) => `
  @media (max-width: ${breakPoint(bp)}px) {
    ${padding(rule, size)}
  }
`

export const hideAt = (bp: string, under: boolean) => `
  @media (${under ? 'max' : 'min'}-width: ${breakPoint(bp)}px) {
    display: none !important;
  }
`

export const borderRule: (
  color: string,
  direction?: 'all' | 'left' | 'right' | 'top' | 'bottom'
) => string = (color, direction = 'all') =>
  `border${direction === 'all' ? '' : `-${direction}`}: 1px solid ${color};`

const TheSpacingContainer = styled.div<SpacingProps>`
  ${({ p }) => (p ? padding('padding', p) : '')};

  ${({ py }) =>
    py ? padding('padding-top', py) + padding('padding-bottom', py) : ''};
  ${({ pt }) => (pt ? padding('padding-top', pt) : '')};
  ${({ pb }) => (pb ? padding('padding-bottom', pb) : '')};

  ${({ px }) =>
    px ? padding('padding-left', px) + padding('padding-right', px) : ''};
  ${({ pl }) => (pl ? padding('padding-left', pl) : '')};
  ${({ pr }) => (pr ? padding('padding-right', pr) : '')};

  ${({ smP }) => (smP ? mediaPadding('sm', 'padding', smP) : '')}
  ${({ smPy }) =>
    smPy || smPy === 0
      ? mediaPadding('sm', 'padding-top', smPy) +
        mediaPadding('sm', 'padding-bottom', smPy)
      : ''};
  ${({ smPx }) =>
    smPx || smPx === 0
      ? mediaPadding('sm', 'padding-left', smPx) +
        mediaPadding('sm', 'padding-right', smPx)
      : ''};

  ${({ hideUnder }) => (hideUnder ? hideAt(hideUnder, true) : '')}
  ${({ hideOver }) => (hideOver ? hideAt(hideOver, false) : '')}

  ${({ b, theme }) => (b ? borderRule(theme.colors.border) : '')}
  ${({ bt, theme }) => (bt ? borderRule(theme.colors.border, 'top') : '')}
  ${({ bb, theme }) => (bb ? borderRule(theme.colors.border, 'bottom') : '')}
  ${({ bl, theme }) => (bl ? borderRule(theme.colors.border, 'left') : '')}
  ${({ br, theme }) => (br ? borderRule(theme.colors.border, 'right') : '')}
  ${({ by, theme }) =>
    by
      ? borderRule(theme.colors.border, 'bottom') +
        borderRule(theme.colors.border, 'top')
      : ''}
  ${({ bx, theme }) =>
    bx
      ? borderRule(theme.colors.border, 'left') +
        borderRule(theme.colors.border, 'right')
      : ''}

  ${({ grow }) => (grow ? 'flex-grow: 1;' : '')}
`

export const SpacingContainer = React.forwardRef(
  ({ hideFromFullStory, className, ...rest }: SpacingProps, ref) => (
    <TheSpacingContainer
      ref={ref as React.RefObject<HTMLDivElement>}
      {...rest}
      className={`${hideFromFullStory ? '__fullstory_hidden ' : ''}${
        className ? className : ''
      }`}
    />
  )
)

export const Div = SpacingContainer
