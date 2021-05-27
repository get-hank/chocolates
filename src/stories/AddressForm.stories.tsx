import React, { ComponentProps } from 'react'
import { Story, Meta } from '@storybook/react/types-6-0'
import AddressForm from '../components/AddressForm'
import { Div } from '../components/spacing'
import Button from '../components/Button'

export default {
  title: 'AddressForm',
  component: AddressForm,
} as Meta

const Template: Story<ComponentProps<typeof AddressForm>> = (args) => {
  return (
    <AddressForm
      {...args}
      apiBase="placeholder"
      done={() => {}}
      states={[
        { code: 'DC', name: 'Washington, DC' },
        { code: 'PR', name: 'Puerto Rico' },
      ]}
    />
  )
}

export const Standard = Template.bind({})
export const CustomFooter = Template.bind({})
CustomFooter.args = {
  renderFooter: ({ submitting, submit }) => (
    <Div py={2}>
      <Button disabled={submitting} onClick={submit} style={{ width: '100%' }}>
        Custom Submit
      </Button>
    </Div>
  ),
}
export const Modal = Template.bind({})
Modal.args = {
  modal: true,
}
