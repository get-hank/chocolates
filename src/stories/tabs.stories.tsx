// @ts-nocheck

import React, { ComponentProps } from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import Tabs from "../components/Tabs";
import { Container, Item } from "../components/grid";

export default {
  title: "Tabs",
  component: Tabs,
} as Meta;

const Template: Story<ComponentProps<typeof Tabs>> = (args) => (
  <Tabs {...args} />
);

export const Standard = Template.bind({});
Standard.args = {
  tabs: [
    {
      label: "Tab 1",
      render: () => <Item py={2}>Tab 1 contents</Item>,
      count: 3,
    },
    {
      label: "Tab 2",
      render: () => <Item py={2}>Tab 2 contents</Item>,
    },
  ],
};
