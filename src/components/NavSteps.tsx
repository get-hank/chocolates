import React from 'react'
import styled from 'styled-components'
import { Container } from './grid'
import { Div } from './spacing'
import { H5 } from './typography'
import { colors } from '../util/colors'
import { useBreakpoint } from '../util/hooks'
import { Check } from '../icons'

const Circle = styled.div<{ active: boolean }>`
  height: 24px;
  width: 24px;
  border-radius: 100%;
  border: 1px solid
    ${({ active }) => (active ? colors.primary700 : colors.gray100)};
  background-color: ${({ active }) =>
    active ? colors.primary700 : 'transparent'};
  color: ${({ active }) => (active ? colors.white : colors.gray600)};
  display: flex;
  justify-content: center;
  align-items: center;
  line-height: 100%;
`

const steps = ['WELCOME', 'PICK A TASK', 'CHECKOUT']

const NavSteps = ({
  step,
  nameOverride,
}: {
  step: number
  nameOverride?: string
}) => {
  const isNarrow = useBreakpoint('lg')

  return (
    <Container center wrap={false}>
      {isNarrow
        ? nameOverride || steps[step]
        : steps.map((s, idx) => (
            <React.Fragment key={s}>
              <Circle active={step === idx}>
                {step > idx ? <Check scale={0.75} /> : idx + 1}
              </Circle>
              <H5 pl={1} color={colors.gray600}>
                {step === idx && nameOverride ? nameOverride : s}
              </H5>
              {idx < steps.length - 1 && (
                <Div px={2}>
                  <Div bb style={{ width: '24px' }} />
                </Div>
              )}
            </React.Fragment>
          ))}
    </Container>
  )
}

export default NavSteps
