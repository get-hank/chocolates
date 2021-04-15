import React, { ComponentProps } from 'react'
import { Story, Meta } from '@storybook/react/types-6-0'
import AddressModal from '../components/AddressModal'

export default {
  title: 'AddressModal',
  component: AddressModal,
} as Meta

const Template: Story<ComponentProps<typeof AddressModal>> = () => {
  return (
    <AddressModal
      apiBase="placeholder"
      dismiss={() => {}}
      states={[
        { code: 'DC', name: 'Washington, DC' },
        { code: 'PR', name: 'Puerto Rico' },
      ]}
    />
  )
}

export const Standard = Template.bind({})
