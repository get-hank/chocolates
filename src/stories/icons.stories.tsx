import React, { ComponentProps } from 'react'
import { Story, Meta } from '@storybook/react/types-6-0'
import { Container } from '../components/grid'
import { P } from '../components/typography'
import * as Icons from '../icons'

export default {
  title: 'Icons',
  component: Icons.Arrow,
} as Meta

const Template: Story<ComponentProps<typeof Icons.Arrow>> = (_) => (
  <Container center>
    {Object.keys(Icons).map((name) => {
      // @ts-ignore
      const Icon = Icons[name]
      return (
        <Container center p={2} direction="column">
          <Icon />
          <P center pt={1}>
            {name}
          </P>
        </Container>
      )
    })}
  </Container>
)

export const Standard = Template.bind({})
