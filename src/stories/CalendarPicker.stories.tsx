import React, { useState, ComponentProps } from 'react'
import styled from 'styled-components'
import { Story, Meta } from '@storybook/react/types-6-0'
import { colors } from '../util/colors'
import { Container } from '../components/grid'
import CalendarPicker from '../components/CalendarPicker'

const pickerClassName = 'picker'
const PickerHolster = styled.div`
  width: 100%;
  .${pickerClassName} {
    width: 100%;
  }
`

export default {
  title: 'CalendarPicker',
  component: CalendarPicker,
} as Meta

const Template: Story<ComponentProps<typeof CalendarPicker>> = (args) => {
  const [date, setDate] = useState(new Date())
  return (
    <Container center direction="column">
      <p>Date is {date.toString()}</p>
      <PickerHolster>
        <CalendarPicker
          value={date}
          onChange={(d) => {
            if (Array.isArray(d)) {
              if (d[0]) setDate(d[0])
            } else {
              setDate(d)
            }
          }}
          pickerClassName={pickerClassName}
          {...args}
        />
      </PickerHolster>
    </Container>
  )
}

export const Standard = Template.bind({})
Standard.args = {
  minDetail: 'month',
  maxDetail: 'month',
}
