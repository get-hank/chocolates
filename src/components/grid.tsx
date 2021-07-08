import React from 'react'
import styled from 'styled-components'
import { SpacingProps, SpacingContainer } from './spacing'
import { breakPoint, layoutWidth, sizes, space } from '../util/layout'

type FlexProps = {
  center?: boolean
  direction?: 'row' | 'row-reverse' | 'column' | 'column-reverse'
  align?:
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'space-between'
    | 'stretch'
    | 'space-around'
  justify?:
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'space-between'
    | 'stretch'
    | 'space-around'
  wrap?: boolean
}

export type ContainerProps = SpacingProps & FlexProps

type colCount = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12

type ItemProps = ContainerProps & {
  cols?: colCount
  xsCols?: colCount
  smCols?: colCount
  mdCols?: colCount
  lgCols?: colCount
}

const genSizeRule = (cols: colCount | undefined) => {
  if (!cols) return ''
  return `width: ${(cols / 12) * 100}%;`
}

const genMediaSizeRule = (breakPoint: number, cols: colCount | undefined) => {
  return `@media (max-width: ${breakPoint}px) {
     ${genSizeRule(cols)}
   }
`
}

const genFlexRules = ({ center, direction, align, justify }: FlexProps) => {
  let rules = ''
  if (center)
    rules += `
      justify-content: center;
      align-items: center;
    `

  if (direction) rules += `flex-direction: ${direction};`

  if (align) rules += `align-items: ${align};`
  if (justify) rules += `justify-content: ${justify};`

  return rules
}

const genItemRules = ({
  cols,
  xsCols,
  smCols,
  mdCols,
  lgCols,
  center,
  direction,
  align,
  justify,
}: ItemProps) => {
  let rules = genSizeRule(cols)
  const colCounts: { [index: string]: colCount | undefined } = {
    // off by one for < media queries
    sm: xsCols,
    md: smCols,
    lg: mdCols,
    xl: lgCols,
  }

  Object.keys(colCounts).forEach((bpName: string) => {
    if (colCounts[bpName])
      rules += genMediaSizeRule(breakPoint(bpName), colCounts[bpName])
  })

  if (center || direction || align || justify) rules += 'display: flex;'

  rules += genFlexRules({ center, direction, align, justify })

  return rules
}

const generateMaxWidthRule = (size: string) => {
  if (!layoutWidth(size)) return
  return `@media (min-width: ${breakPoint(size)}px) {
    max-width: ${layoutWidth(size)}px;
  }
`
}

export const Item = styled(SpacingContainer)<ItemProps>`
  ${(props) => genItemRules(props)}
`

export const Container = styled(
  ({ wrap, center, direction, align, justify, ...rest }) => (
    <SpacingContainer {...rest} />
  )
)<ContainerProps>`
  display: flex;
  flex-wrap: ${({ wrap = true }) => (wrap ? 'wrap' : 'nowrap')};
  ${({ center, direction, align, justify }) =>
    genFlexRules({ center, direction, align, justify })}
`

export const LayoutWrapper = styled(SpacingContainer)`
  width: 100%;
  padding-left: ${space(2)};
  padding-right: ${space(2)};
  margin-left: auto;
  margin-right: auto;

  ${sizes.map(generateMaxWidthRule)}
`
