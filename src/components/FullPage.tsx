import React, { useEffect } from 'react'
import { colors } from '../util/colors'
import { Container, LayoutWrapper } from './grid'
import IconButton from './IconButton'
import { Div } from './spacing'
import { P } from './typography'

type Props = {
  goBack?: () => void
  headerCenterContent?: React.ReactNode
  headerRightContent?: React.ReactNode
  pad?: boolean
  footer?: React.ReactNode
}

const FullPage: React.FC<Props> = ({
  goBack,
  headerCenterContent,
  headerRightContent,
  children,
  footer,
  pad = true,
}) => {
  const Wrapper = pad ? LayoutWrapper : Div
  useEffect(() => {
    window.scrollTo({ top: 0 })
  }, [])

  return (
    <>
      <Div
        bb
        style={{
          position: 'sticky',
          top: 0,
          backgroundColor: colors.white,
          zIndex: 10,
        }}
      >
        <Container
          px={2}
          align="center"
          justify="space-between"
          wrap={false}
          style={{ height: '4rem' }}
        >
          <Container
            align="center"
            justify="flex-start"
            style={{ width: '25%' }}
          >
            {goBack && (
              <Container
                wrap={false}
                center
                style={{ cursor: 'pointer' }}
                onClick={goBack}
              >
                <IconButton icon="back" name="back"></IconButton>
                <P pl={1}>Back</P>
              </Container>
            )}
          </Container>
          {headerCenterContent || <div />}
          <div style={{ width: '25%' }}>{headerRightContent}</div>
        </Container>
      </Div>
      <Wrapper>{children}</Wrapper>
      {footer && footer}
    </>
  )
}
export default FullPage
