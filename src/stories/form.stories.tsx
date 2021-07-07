// @ts-nocheck
import React, { ComponentProps } from 'react'
import { Story, Meta } from '@storybook/react/types-6-0'
import { Div } from '../components/spacing'
import { Container } from '../components/grid'
import { FormField } from '../components/FormField'

export default {
  title: 'Form/FormField',
  component: FormField,
} as Meta

const Template: Story<ComponentProps<typeof Input>> = (args) => (
  <Container direction="column" center>
    <FormField {...args} onChange={(edit) => alert(JSON.stringify(edit))} />
    <FormField
      {...args}
      onChange={(edit) => alert(JSON.stringify(edit))}
      field="time"
      inputType="time"
    />
  </Container>
)

export const Standard = Template.bind({})
Standard.args = {
  label: 'Label',
  field: 'date',
  placeholder: 'Placeholder',
  inputType: 'date',
  fillBg: false,
}
