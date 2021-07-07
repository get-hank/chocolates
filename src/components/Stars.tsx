import React from 'react'
import { Star } from '../icons'
import { Container } from './grid'

const Stars = () => (
  <Container center>
    {[...Array(5)].map((_, idx) => (
      <Star key={`star-${idx}`} />
    ))}
  </Container>
)

export default Stars
