import React, { ComponentProps } from "react";
import { Story, Meta } from "@storybook/react/types-6-0";

import { Container, Item } from "../components/grid";

export default {
  title: "Grid/Item",
  component: Item,
} as Meta;

const Template: Story<ComponentProps<typeof Item>> = (args) => (
  <Container>
    <Item
      style={{
        backgroundColor: "green",
        color: "white",
      }}
      {...args}
    >
      Hello world!
    </Item>
  </Container>
);

export const Col = Template.bind({});
Col.args = {
  cols: 6,
};

export const Flex = Template.bind({});
Flex.args = {
  center: true,
  cols: 6,
  align: "center",
  justify: "center",
};
