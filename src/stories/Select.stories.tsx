import React, { ComponentProps } from 'react'
import { Story, Meta } from '@storybook/react/types-6-0'
import { Container } from '../components/grid'
import { Select } from '../components/FormField'

export default {
  title: 'Form/Select',
  component: Select,
} as Meta

const Template: Story<ComponentProps<typeof Select>> = (args) => (
  <Container center>
    <Select {...args} />
  </Container>
)

export const Standard = Template.bind({})
Standard.args = {
  nativeProps: {
    name: 'option',
  },
  options: [
    {
      label: 'An option',
      value: 'a',
    },
    {
      label: 'Another option',
      value: 'b',
    },
    {
      label:
        'Some really long value that is going to overflow so we need to see how to deal with it',
      value: 'c',
    },
    {
      label: 'A final option',
      value: 'd',
    },
  ],
}
