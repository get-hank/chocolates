import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Button, colors, Container, Div, H2, IconButton } from "../ui";
import { isImpersonating, stopImpersonating, impersonate } from "../util/api";
import type { impersonateStorage } from "../util/api";

export const ImpersonationTrigger: React.FC = () => {
  const query = new URLSearchParams(window.location.search);
  const impersonateId = query.get("impersonate_id");

  useEffect(() => {
    if (!impersonateId) return;
    impersonate(impersonateId, { storage: "session" });
    window.location.replace(window.location.origin);
  }, [impersonateId]);

  return null;
};

const Footer = styled.footer`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: ${colors.red700};
  z-index: 1000;
`;

const Dismiss = styled.div`
  position: absolute;
  right: 2rem;
  top: 2rem;
`;

export const ImpersonationModule = ({
  userName,
  apiBase,
}: {
  userName: string;
  apiBase: string;
}) => {
  const [hidden, setHidden] = useState(false);

  if (hidden || !isImpersonating()) return null;

  const stop = () => {
    stopImpersonating(apiBase);
    window.location.replace(window.location.origin);
  };

  return (
    <Footer>
      <Container align="center" justify="space-between" p={2}>
        <H2 weight={700} color={colors.white}>
          WARNING you are impersonating {userName}
        </H2>
        <Container>
          <Div pr={3}>
            <Button onClick={stop} secondary>
              Stop impersonating
            </Button>
          </Div>
          <IconButton
            onClick={() => setHidden(true)}
            name="Close footer"
            icon="close"
          />
        </Container>
      </Container>
    </Footer>
  );
};
