import React, { useState } from "react";
import styled from "styled-components";
import { fontSize } from "./typography";
import { Container, Item } from "./grid";
import { space } from "../util/layout";

type TabProps = {
  label: string;
  count?: number;
  render: any;
};

type TabsProps = {
  tabs: TabProps[];
};

export interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  active?: boolean;
}

const LabelRow = styled(Container)`
  box-shadow: inset 0px -1px 0px ${({ theme }) => theme.colors.grayBorder};
`;

const LabelWrapper = styled(Item)`
  &:first-child {
    padding-left: 0;
  }
`;

const TabLabel = styled.button<ButtonProps>`
  cursor: pointer;
  ${fontSize(1)}
  padding: 0;
  border: none;
  padding-bottom: ${space(1)};

  font-weight: ${({ active }) => (active ? 500 : 400)};

  background-color: ${({ theme }) => theme.colors.white};
  color: ${({ theme, active }) =>
    active ? theme.colors.primary : theme.colors.gray};

  box-shadow: inset 0px ${({ theme, active }) => (active ? "-2px" : "-1px")} 0px
    ${({ theme, active }) =>
    active ? theme.colors.primaryMid : theme.colors.grayBorder};
`;

type ActiveProps = {
  active: boolean;
};

const TabCount = styled.span<ActiveProps>`
  ${fontSize(0.875)}
  background-color: ${({ theme, active }) =>
    active ? theme.colors.primary : theme.colors.gray};
  color: ${({ theme }) => theme.colors.white};
  padding: ${space(0.25)} ${space(0.75)};
  margin-left: ${space(1)};
  border-radius: 100px;
  font-weight: 400;
`;

const Tabs = ({ tabs }: TabsProps) => {
  const [active, setActive] = useState(0);
  return (
    <div>
      <LabelRow align="flex-end">
        {tabs.map((t, idx) => (
          <LabelWrapper key={`tab-${idx}`} px={1}>
            <TabLabel onClick={() => setActive(idx)} active={active === idx}>
              <Container align="flex-end">
                {t.label}
                {t.count !== undefined ? (
                  <TabCount active={active === idx}>{t.count}</TabCount>
                ) : null}
              </Container>
            </TabLabel>
          </LabelWrapper>
        ))}
      </LabelRow>
      {tabs[active].render()}
    </div>
  );
};

export default Tabs;
