import React, { useState } from 'react'
import { colors } from '../util/colors'
import { Container } from './grid'
import IconButton from './IconButton'
import { P } from './typography'
import Close from '../icons/Close'

const PromoBanner: React.FC = ({ children }) => {
  const [hidden, setHidden] = useState(false)
  if (!children || hidden) return null

  return (
    <Container
      center
      py={1}
      px={3}
      style={{ backgroundColor: colors.purple500, width: '100%' }}
      wrap={false}
    >
      <P pr={3} color={colors.white} weight={500}>
        {children}
      </P>
      <IconButton onClick={() => setHidden(true)} bgColor="transparent">
        <Close color={colors.white} />
      </IconButton>
    </Container>
  )
}

export default PromoBanner
