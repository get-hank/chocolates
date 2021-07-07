// @ts-nocheck
import React, { ComponentProps } from 'react'
import { Story, Meta } from '@storybook/react/types-6-0'
import { Container } from '../components/grid'
import { Input } from '../components/FormField'

export default {
  title: 'Form/Input',
  component: Input,
} as Meta

const Template: Story<ComponentProps<typeof Input>> = (args) => (
  <Container center>
    <Input {...args} />
  </Container>
)

export const Standard = Template.bind({})
Standard.args = {
  nativeProps: {
    defaultValue: 'Hi',
    placeholder: 'Type in something...',
  },
  styledProps: {
    error: true,
  },
}
