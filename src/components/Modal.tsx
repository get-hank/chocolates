import React, { useRef, useEffect } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import { rgba } from "polished";
import { colors } from "../util/colors";
import { breakPoint } from "../util/layout";
import { Container, Item } from "./grid";
import { Div } from "./spacing";
import { H3, P } from "./typography";
import Button from "./Button";
import { Link } from "./Link";
import IconButton from "./IconButton";

const Overlay = styled(Container)`
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${rgba(colors.gray200, 0.5)};
`;

type WrapperProps = React.ComponentProps<typeof Container> & {
  size: "big" | "small";
};

const bigWidth = "576px";
const lilWidth = "320px";

const sizeRules = ({ size }: WrapperProps) =>
  size === "big"
    ? `
  @media (max-width: ${bigWidth}) {
    height: 100%;
    width: 100vw;
  }

  @media (min-width: ${bigWidth}) {
    max-height: calc(100% - 2rem);
    width: ${bigWidth};
  }
`
    : `
  max-height: calc(100% - 2rem);

  @media (max-width: ${lilWidth}) {
    width: 100vw;
  }

  @media (min-width: ${lilWidth}) {
    width: ${lilWidth};
  }

`;

const ModalWrapper = styled(Container) <WrapperProps>`
  background-color: ${colors.white};
  box-shadow: 0px 16px 24px rgba(41, 40, 39, 0.1);
  border-radius: 8px;
  flex-wrap: nowrap;
  overflow: hidden;

  ${sizeRules}
`;

const Contents = styled(Div)`
  overflow: auto;
  flex-grow: 1;
`;

const Footer = styled(Div)`
  box-shadow: 0px 0px 8px rgba(41, 40, 39, 0.1);
  background-color: ${colors.white};
`;

type ModalProps = {
  open: boolean;
  back?: boolean;
  size?: "small" | "big";
  titleText: string;
  submitColor?: string;
  submitText?: string;
  cancelText?: string;
  onSubmit?: () => any;
  onCancel?: () => any;
  onDismiss?: () => any;
  submitDisabled?: boolean;
  renderFooter?: () => React.ReactNode;
};

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
  submitDisabled = false,
  size = "big",
}) => {
  const rootElemRef = useRef(document.createElement("div"));

  useEffect(function setupElement() {
    const parentElem = document.querySelector("body");

    parentElem.appendChild(rootElemRef.current);
    return () => rootElemRef.current.remove();
  }, []);

  if (!open) return null;

  const dismiss = () => {
    onDismiss && onDismiss();
    onCancel && onCancel();
  };

  let footer = null;
  let inlineFooterContents = null;
  if (renderFooter) {
    const inner = renderFooter();
    footer = inner ? <Footer p={2}>{inner}</Footer> : null;
  } else if (onCancel || onSubmit) {
    const big = size === "big";
    const cancelButton = onCancel ? (
      <Button
        secondary
        onClick={dismiss}
        name="Cancel"
        style={big ? {} : { minWidth: "110px" }}
      >
        {cancelText}
      </Button>
    ) : null;
    const submitButton = onSubmit ? (
      <Div pl={cancelButton && big ? 2 : 0}>
        <Button
          onClick={onSubmit}
          disabled={submitDisabled}
          name="Submit"
          {...{
            ...(submitColor && { color: submitColor }),
          }}
          style={big ? {} : { minWidth: "110px" }}
        >
          {submitText}
        </Button>
      </Div>
    ) : null;
    if (big) {
      footer = (
        <Footer p={2}>
          <Container justify="flex-end" align="center">
            {cancelButton}
            {submitButton}
          </Container>
        </Footer>
      );
    } else {
      inlineFooterContents = (
        <Container py={3} justify="space-around">
          {cancelButton}
          {submitButton}
        </Container>
      );
    }
  }

  return ReactDOM.createPortal(
    <Overlay
      center
      onClick={(e) => {
        e.stopPropagation();
        dismiss();
      }}
    >
      <ModalWrapper
        size={size}
        direction="column"
        onClick={(e: any) => e.stopPropagation()}
      >
        {size === "big" && (
          <Container px={3} pt={3} align="center">
            <IconButton
              icon={back ? "back" : "close"}
              name="Close"
              onClick={dismiss}
            />
            {back && (
              <Div onClick={dismiss} style={{ cursor: "pointer" }} pl={1}>
                <P>Back</P>
              </Div>
            )}
          </Container>
        )}
        <Contents px={3}>
          <H3 weight={600} py={3}>
            {titleText}
          </H3>
          {children}
          {inlineFooterContents}
        </Contents>
        {footer}
      </ModalWrapper>
    </Overlay>,
    rootElemRef.current
  );
};

export default Modal;
