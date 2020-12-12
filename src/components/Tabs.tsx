import React, { useState } from "react";
import styled from "styled-components";
import { fontSize } from "./typography";
import { Container, Item } from "./grid";
import { space } from "../util/layout";

type TabProps = {
  label: string;
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
  ${fontSize(0.875)}
  padding: 0;
  border: none;
  padding-bottom: ${space(1.5)};

  background-color: ${({ theme }) => theme.colors.white};
  color: ${({ theme, active }) =>
    active ? theme.colors.primary : theme.colors.gray};

  box-shadow: inset 0px ${({ theme, active }) => (active ? "-2px" : "-1px")} 0px
    ${({ theme, active }) =>
    active ? theme.colors.primaryMid : theme.colors.grayBorder};
`;

const Tabs = ({ tabs }: TabsProps) => {
  const [active, setActive] = useState(0);
  return (
    <div>
      <LabelRow>
        {tabs.map((t, idx) => (
          <LabelWrapper key={`tab-${idx}`} px={1}>
            <TabLabel onClick={() => setActive(idx)} active={active === idx}>
              {t.label}
            </TabLabel>
          </LabelWrapper>
        ))}
      </LabelRow>
      {tabs[active].render()}
    </div>
  );
};

export default Tabs;
