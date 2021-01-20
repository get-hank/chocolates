import React, { ComponentProps } from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import { Container } from "../components/grid";
import Toggle from "../components/Toggle";

export default {
  title: "Toggle",
  component: Toggle,
} as Meta;

const Template: Story<ComponentProps<typeof Toggle>> = (args) => (
  <Container center>
    <Toggle {...args} />
  </Container>
);

export const Standard = Template.bind({});
Standard.args = {
  left: "Week",
  right: "Month",
  onChange: alert,
};
