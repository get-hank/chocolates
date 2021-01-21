import React, { ComponentProps } from "react";
import { lighten } from "polished";
import { Story, Meta } from "@storybook/react/types-6-0";
import { Container } from "../components/grid";
import Button from "../components/Button";

export default {
  title: "Button",
  component: Button,
} as Meta;

const Template: Story<ComponentProps<typeof Button>> = (args) => (
  <Container center>
    <Button {...args} />
  </Container>
);

export const Standard = Template.bind({});
Standard.args = {
  children: "Click me",
  disabled: false,
  size: "small",
  secondary: false,
  wide: false,
  color: "#2A69F2",
};
