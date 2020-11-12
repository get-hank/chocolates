import React, { ComponentProps } from "react";
import { Story, Meta } from "@storybook/react/types-6-0";

import { Container, Item } from "../components/grid";

export default {
  title: "Grid/Container",
  component: Container,
} as Meta;

const Template: Story<ComponentProps<typeof Container>> = (args) => (
  <Container {...args}>
    <Item>A</Item>
    <Item>B</Item>
    <Item>C</Item>
  </Container>
);

export const CenteredRow = Template.bind({});
CenteredRow.args = {
  center: true,
};

export const CenteredCol = Template.bind({});
CenteredCol.args = { ...CenteredRow.args, direction: "column" };

export const Flex = Template.bind({});
Flex.args = {
  direction: "row",
  align: "flex-end",
  justify: "flex-end",
  center: false,
};
