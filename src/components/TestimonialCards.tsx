import React from 'react'
import styled from 'styled-components'
import { colors } from '../util/colors'
import { Container, Item } from './grid'
import { Div } from './spacing'
import { P } from './typography'

const CardHolder = styled(Item)`
  align-self: stretch;
`

const Card = styled(Div)<React.ComponentProps<typeof Div> & { color: string }>`
  width: 100%;
  height: 100%;

  box-shadow: 0px 24px 32px rgba(41, 40, 39, 0.1);
  border-radius: 8px;
  background-color: ${({ color }) => color};
`

const TestimonialCards = ({
  cardColor = colors.blue50,
}: {
  cardColor?: string
}) => (
  <Container justify="center" align="flex-start" pb={9}>
    <CardHolder pb={3} px={3} cols={6} smCols={12}>
      <Card px={3} py={5} color={cardColor}>
        <P pb={3}>
          &ldquo;
          <strong>
            Hank is a real treat and an easy, easy benefit to my life.
          </strong>{' '}
          I didn’t realize that making meals gets to be a burden. I’m 78 years
          old, and I’m tired of cooking and picking things up at the
          store.&rdquo;
        </P>
        <P>
          <strong>Donna G</strong>
        </P>
        <P>Grandparent in Chico, California</P>
      </Card>
    </CardHolder>
    <CardHolder pb={3} px={3} cols={6} smCols={12}>
      <Card px={3} py={5} color={cardColor}>
        <P pb={3}>
          &ldquo;
          <strong>
            I was very pleased to find a service that can allow me to ease some
            stressors for her, even though I’m not physically near.
          </strong>{' '}
          We will definitely be using Hank again!&rdquo;
        </P>
        <P>
          <strong>Caitlin T</strong>
        </P>
        <P>Caregiver in Azle, Texas</P>
      </Card>
    </CardHolder>
  </Container>
)

export default TestimonialCards
