import React, { ComponentProps } from 'react'
import { Story, Meta } from '@storybook/react/types-6-0'
import Testimonials from '../components/Testimonials'
import { Container } from '../components/grid'

export default {
  title: 'Testimonials',
  component: Testimonials,
} as Meta

const Template: Story<ComponentProps<typeof Testimonials>> = (args) => {
  return (
    <Container center p={2}>
      <Testimonials {...args} />
    </Container>
  )
}

export const Standard = Template.bind({})
