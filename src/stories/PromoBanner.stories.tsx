import React, { ComponentProps } from 'react'
import { Story, Meta } from '@storybook/react/types-6-0'
import { Container } from '../components/grid'
import PromoBanner from '../components/PromoBanner'

export default {
  title: 'PromoBanner',
  component: PromoBanner,
} as Meta

const Template: Story<ComponentProps<typeof PromoBanner>> = (args) => (
  <Container center>
    <PromoBanner>Hello world!</PromoBanner>
  </Container>
)

export const Standard = Template.bind({})
Standard.args = {}
