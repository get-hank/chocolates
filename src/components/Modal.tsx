import React, { useRef, useEffect } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import { rgba } from "polished";
import { colors } from "../util/colors";
import { breakPoint } from "../util/layout";
import { Container, Item } from "./grid";
import { Div } from "./spacing";
import { H3 } from "./typography";
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

const ModalWrapper = styled(Container)`
  background-color: ${colors.white};
  box-shadow: 0px 16px 24px rgba(41, 40, 39, 0.1);
  border-radius: 4px;
  flex-wrap: nowrap;

  @media (max-width: ${breakPoint("sm")}px) {
    height: 100vh;
    width: 100vw;
  }

  @media (min-width: ${breakPoint("sm")}px) {
    max-height: 80vh;
    max-width: 80vw;
  }
`;

const Contents = styled(Div)`
  overflow: auto;
`;

const Footer = styled(Div)`
  box-shadow: 0px 0px 8px rgba(41, 40, 39, 0.1);
  background-color: ${colors.white};
`;

type ModalProps = {
  open: boolean;
  titleText: string;
  submitText?: string;
  cancelText?: string;
  onSubmit?: () => any;
  onCancel?: () => any;
  onDismiss?: () => any;
  submitDisabled?: boolean;
};

const Modal: React.FC<ModalProps> = ({
  open,
  titleText,
  submitText,
  cancelText,
  onSubmit,
  onCancel,
  onDismiss,
  children,
  submitDisabled = false,
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

  return ReactDOM.createPortal(
    <Overlay
      center
      onClick={(e) => {
        e.stopPropagation();
        dismiss();
      }}
    >
      <ModalWrapper
        direction="column"
        onClick={(e: any) => e.stopPropagation()}
      >
        <Div p={2} pl={3}>
          <Container align="center" justify="space-between">
            <H3 weight={600} pr={4}>
              {titleText}
            </H3>
            <IconButton icon="close" name="Close" onClick={dismiss} />
          </Container>
        </Div>
        <Contents px={2}>{children}</Contents>
        {onCancel || onSubmit ? (
          <Footer p={2}>
            <Container justify="flex-end" align="center">
              {onCancel ? (
                <Div pr={2}>
                  <Button secondary onClick={dismiss} name="Cancel">
                    {cancelText}
                  </Button>
                </Div>
              ) : null}
              {onSubmit ? (
                <Button
                  onClick={onSubmit}
                  disabled={submitDisabled}
                  name="Submit"
                >
                  {submitText}
                </Button>
              ) : null}
            </Container>
          </Footer>
        ) : null}
      </ModalWrapper>
    </Overlay>,
    rootElemRef.current
  );
};

export default Modal;
