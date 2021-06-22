import React, { ComponentProps } from 'react'
import { DateTime } from 'luxon'
import { Story, Meta } from '@storybook/react/types-6-0'
import { Container } from '../components/grid'
import { TimePicker } from '../components/form'

export default {
  title: 'Form/TimePicker',
  component: TimePicker,
} as Meta

const Template: Story<ComponentProps<typeof TimePicker>> = (args) => (
  <Container center>
    <TimePicker {...args} />
  </Container>
)

export const Standard = Template.bind({})
Standard.args = {
  nativeProps: {
    defaultValue: DateTime.local().plus({ hours: 2 }).startOf('hour').toISO(),
  },
  onChange: (d: DateTime) => console.log(d),
  step: 10,
  timezone: 'America/Chicago',
}
