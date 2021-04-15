import React, { useContext, useEffect, useRef, useState } from 'react'
import ReactDOM from 'react-dom'
import styled, { ThemeContext } from 'styled-components'
import { rgba } from 'polished'
import { DefaultThemeProvider } from './theme'
import { colors } from '../util/colors'
import { useBreakpoint } from '../util/hooks'
import { useScrollPosition } from '../util/scroll'
import { Container, Item, LayoutWrapper } from './grid'
import { Div } from './spacing'
import { H2, H3, P } from './typography'
import Button from './Button'
import IconButton from './IconButton'

const Overlay = styled(Container)`
  position: fixed;
  z-index: 1000;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${rgba(colors.gray200, 0.5)};
`

type WrapperProps = React.ComponentProps<typeof Container> & {
  size: 'big' | 'small' | 'full'
  animate: boolean
}

const bigWidth = '576px'
const lilWidth = '320px'

const sizeRules = ({ size }: WrapperProps) => {
  switch (size) {
    case 'big':
      return `
  @media (max-width: ${bigWidth}) {
    height: 100%;
    width: 100vw;
  }

  @media (min-width: ${bigWidth}) {
    max-height: calc(100% - 2rem);
    width: ${bigWidth};
    border-radius: 8px;
  }
`
    case 'small':
      return `
  max-height: calc(100% - 2rem);
  border-radius: 8px;

  @media (max-width: ${lilWidth}) {
    width: 100vw;
  }

  @media (min-width: ${lilWidth}) {
    width: ${lilWidth};
  }

`
    case 'full':
      return `
  height: 100%;
  width: 100vw;
`
  }
}

const ModalWrapper = styled(Container)<WrapperProps>`
  background-color: ${colors.white};
  box-shadow: 0px 16px 24px rgba(41, 40, 39, 0.1);

  flex-wrap: nowrap;
  overflow: hidden;

  @keyframes slide-modal-in {
    from {
      transform: translateY(200%);
    }
    to {
      transform: translateY(0%);
    }
  }

  ${({ animate }) =>
    animate
      ? `
  animation-duration: 500ms;
  animation-name: slide-modal-in;
`
      : ''}

  ${sizeRules}
`

const AnimateH3 = styled(H3)`
  transition: opacity ease 250ms;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

const Contents = styled(Div)`
  overflow: auto;
  flex-grow: 1;
`

const Footer = styled(Div)`
  box-shadow: 0px 0px 8px rgba(41, 40, 39, 0.1);
  background-color: ${colors.white};
`

type ModalProps = {
  open: boolean
  back?: boolean
  size?: 'small' | 'big' | 'full'
  banner?: React.ReactNode
  titleText?: string
  submitColor?: string
  submitText?: string
  cancelText?: string
  onSubmit?: () => any
  onCancel?: () => any
  onDismiss?: () => any
  submitDisabled?: boolean
  renderFooter?: () => React.ReactNode
  headerCenterContent?: React.ReactNode
  animate?: boolean
}

const Modal: React.FC<ModalProps> = ({
  open,
  back,
  titleText,
  submitText,
  submitColor,
  cancelText,
  onSubmit,
  onCancel,
  onDismiss,
  children,
  renderFooter,
  banner,
  headerCenterContent,
  animate = false,
  submitDisabled = false,
  size = 'big',
}) => {
  const [titleVisible, setTitleVisible] = useState(false)
  const rootElemRef = useRef(document.createElement('div'))
  const theme = useContext(ThemeContext)

  const isMobileViewport = useBreakpoint('sm')

  useEffect(function setupElement() {
    const parentElem = document.querySelector('body')

    parentElem.appendChild(rootElemRef.current)
    return () => rootElemRef.current.remove()
  }, [])

  useEffect(() => {
    if (!open) return

    const body = document.querySelector('body')
    const oldOverflow = body.style.overflow
    body.style.overflow = 'hidden'

    return () => (document.querySelector('body').style.overflow = oldOverflow)
  }, [open])

  const { scrollRegionRef, watchElementRef: titleRef } = useScrollPosition(
    (pos) => {
      if (!pos.visible && !titleVisible) {
        setTitleVisible(true)
      } else if (pos.visible && titleVisible) {
        setTitleVisible(false)
      }
    },
    [titleVisible, setTitleVisible]
  )

  if (!open) return null

  const dismiss = () => {
    onDismiss && onDismiss()
    onCancel && onCancel()
  }

  let footer = null
  let inlineFooterContents = null
  if (renderFooter) {
    const inner = renderFooter()
    footer = inner ? <Footer p={2}>{inner}</Footer> : null
  } else if (onCancel || onSubmit) {
    const big = size !== 'small'
    const cancelButton = onCancel ? (
      <Button
        secondary
        onClick={dismiss}
        name="Cancel"
        style={big ? {} : { minWidth: '110px' }}
      >
        {cancelText}
      </Button>
    ) : null
    const submitButton = onSubmit ? (
      <Div pl={cancelButton && big ? 2 : 0}>
        <Button
          onClick={onSubmit}
          disabled={submitDisabled}
          name="Submit"
          {...{
            ...(submitColor && { color: submitColor }),
          }}
          style={big ? {} : { minWidth: '110px' }}
        >
          {submitText}
        </Button>
      </Div>
    ) : null
    if (big) {
      footer = (
        <Footer p={2}>
          <Container justify="flex-end" align="center">
            {cancelButton}
            {submitButton}
          </Container>
        </Footer>
      )
    } else {
      inlineFooterContents = (
        <Container py={3} justify="space-around">
          {cancelButton}
          {submitButton}
        </Container>
      )
    }
  }

  const headerBorder = size === 'full' && !isMobileViewport
  const TitleComponent = size === 'full' ? H2 : H3

  const inner = (
    <>
      {titleText ? (
        <TitleComponent
          weight={size === 'full' ? 700 : 600}
          pt={size === 'small' || headerBorder ? 3 : 0}
          pb={3}
          ref={titleRef}
        >
          {titleText}
        </TitleComponent>
      ) : (
        (size === 'small' || headerBorder) && <Div pb={3} />
      )}
      {children}
      {inlineFooterContents}
    </>
  )

  return ReactDOM.createPortal(
    <DefaultThemeProvider theme={theme}>
      <Overlay
        center
        onClick={(e: any) => {
          e.stopPropagation()
          dismiss()
        }}
      >
        <ModalWrapper
          size={size}
          direction="column"
          onClick={(e: MouseEvent) => e.stopPropagation()}
          animate={animate}
        >
          {size !== 'small' && (
            <Container
              px={3}
              py={2}
              wrap={false}
              bb={headerBorder}
              justify={headerCenterContent ? 'space-between' : 'flex-start'}
              align="center"
            >
              <Container
                align="center"
                justify="flex-start"
                style={{
                  overflow: 'hidden',
                  ...(headerCenterContent && { width: '30%' }),
                }}
                wrap={false}
              >
                <IconButton
                  icon={back ? 'back' : 'close'}
                  name="Close"
                  onClick={dismiss}
                />
                {!back && size === 'full' && !isMobileViewport && (
                  <Div onClick={dismiss} style={{ cursor: 'pointer' }} pl={1}>
                    <P>Close</P>
                  </Div>
                )}
                {back && (
                  <Div onClick={dismiss} style={{ cursor: 'pointer' }} pl={1}>
                    <P>Back</P>
                  </Div>
                )}

                {titleText && (
                  <AnimateH3
                    weight={600}
                    pl={3}
                    style={{ opacity: titleVisible ? 1 : 0 }}
                  >
                    {titleText}
                  </AnimateH3>
                )}
              </Container>
              {headerCenterContent && (
                <>
                  <Container center>{headerCenterContent}</Container>
                  <Container style={{ width: '30%' }}></Container>
                </>
              )}
            </Container>
          )}
          <Contents ref={scrollRegionRef}>
            {banner ? banner : null}
            {size === 'full' ? (
              <LayoutWrapper>{inner}</LayoutWrapper>
            ) : (
              <Div px={3}>{inner}</Div>
            )}
          </Contents>
          {footer}
        </ModalWrapper>
      </Overlay>
    </DefaultThemeProvider>,
    rootElemRef.current
  )
}

export default Modal
