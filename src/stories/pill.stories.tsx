// @ts-nocheck
import React, { ComponentProps } from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import { Container } from "../components/grid";
import Pill from "../components/Pill";
import { colors } from "../util/colors";

export default {
  title: "Pill",
  component: Pill,
} as Meta;

const Template: Story<ComponentProps<typeof Pill>> = (args) => (
  <Container center>
    <Pill {...args} />
  </Container>
);

export const Standard = Template.bind({});
Standard.args = {
  children: "Ready",
  pillColor: colors.gray50,
  color: colors.black,
};
