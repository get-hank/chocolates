import React, { ComponentProps } from 'react'
import { Story, Meta } from '@storybook/react/types-6-0'
import { Container } from '../components/grid'
import StripeCardForm from '../components/StripeCardForm'

export default {
  title: 'StripeCardForm',
  component: StripeCardForm,
} as Meta

const Template: Story<ComponentProps<typeof StripeCardForm>> = (args) => (
  <Container center>
    <StripeCardForm {...args} />
  </Container>
)

export const Standard = Template.bind({})
Standard.args = {
  publishableKey: 'pk_test_oeb0blKIHxA1LZLddd05HFN000lMyXCGDm',
  scrollOnError: true,
}
export const Modal = Template.bind({})
Modal.args = {
  ...Standard.args,
  modal: true,
}
