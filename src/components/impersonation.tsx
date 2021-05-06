import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { colors, Container, Div, Item, Link, P, useBreakpoint } from '../ui'
import { isImpersonating, stopImpersonating, impersonate } from '../util/api'

export const ImpersonationTrigger: React.FC = () => {
  const query = new URLSearchParams(window.location.search)
  const impersonateId = query.get('impersonate_id')

  useEffect(() => {
    if (!impersonateId) return
    impersonate(impersonateId, { storage: 'session' })
    window.location.replace(window.location.origin)
  }, [impersonateId])

  return null
}

const Footer = styled.footer`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: ${colors.red600};
  z-index: 1000000;
`

export const ImpersonationModule = ({
  userName,
  apiBase,
}: {
  userName: string
  apiBase: string
}) => {
  const [hidden, setHidden] = useState(false)
  const isNarrow = useBreakpoint('sm')

  if (hidden || !isImpersonating()) return null

  const stop = () => {
    stopImpersonating(apiBase)
    window.location.replace(window.location.origin)
  }

  return (
    <Footer>
      <Container align="center" justify="space-between" px={3} py={2}>
        <Item
          cols={isNarrow ? 12 : 6}
          pb={isNarrow ? 2 : 0}
          align="center"
          justify={isNarrow ? 'center' : 'flex-start'}
        >
          <P weight={700} color={colors.white}>
            You are impersonating {userName}
          </P>
        </Item>
        <Item
          cols={isNarrow ? 12 : 6}
          align="center"
          justify={isNarrow ? 'center' : 'flex-end'}
        >
          <Div pr={3}>
            <Link underline color={colors.white} onClick={stop}>
              Stop impersonating
            </Link>
          </Div>
          <Link underline color={colors.white} onClick={() => setHidden(true)}>
            Hide me
          </Link>
        </Item>
      </Container>
    </Footer>
  )
}
