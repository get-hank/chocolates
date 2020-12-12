import React, { useRef, useEffect } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import { rgba } from "polished";
import { colors } from "../util/colors";
import { Close } from "../icons";
import { Container, Item } from "./grid";
import { SpacingContainer } from "./spacing";
import { H3 } from "./typography";
import Button from "./Button";
import Link from "./Link";

const Overlay = styled(Container)`
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${rgba(colors.gray200, 0.5)};
`;

const ModalWrapper = styled(SpacingContainer)`
  background-color: ${colors.white};
  box-shadow: 0px 16px 24px rgba(41, 40, 39, 0.1);
  border-radius: 4px;
`;

type ModalProps = {
  open: boolean;
  titleText: string;
  submitText?: string;
  cancelText?: string;
  onSubmit?: () => any;
  onCancel?: () => any;
};

const Modal: React.FC<ModalProps> = ({
  open,
  titleText,
  submitText,
  cancelText,
  onSubmit,
  onCancel,
  children,
}) => {
  const rootElemRef = useRef(document.createElement("div"));

  useEffect(function setupElement() {
    const parentElem = document.querySelector("body");

    parentElem.appendChild(rootElemRef.current);
    return () => rootElemRef.current.remove();
  }, []);

  if (!open) return null;

  const dismiss = () => {
    onCancel && onCancel();
  };

  return ReactDOM.createPortal(
    <Overlay center onClick={dismiss}>
      <ModalWrapper p={3} direction="column">
        <Container pb={2} align="center" justify="space-between">
          <H3 weight={600} pr={4}>
            {titleText}
          </H3>
          <Close />
        </Container>
        {children}
        <Container justify="flex-end" align="center" pt={1}>
          {onCancel ? (
            <SpacingContainer pr={5}>
              <Link secondary onClick={onCancel}>
                {cancelText}
              </Link>
            </SpacingContainer>
          ) : null}
          {onSubmit ? <Button onClick={onSubmit}>{submitText}</Button> : null}
        </Container>
      </ModalWrapper>
    </Overlay>,
    rootElemRef.current
  );
};

export default Modal;
