// @ts-nocheck

import React, { ComponentProps } from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import { Container, LayoutWrapper } from "../components/grid";
import { H1, H2, H3, H4, H5, P, TextProps } from "../components/typography";

export default {
  title: "Base/Typography",
  component: H1,
} as Meta;

const Template: Story<ComponentProps<typeof H1>> = (args) => (
  <LayoutWrapper>
    <Container direction="column" justify="stretch">
      <H1 {...args}>I am an H1</H1>
      <H2 {...args}>I am an H2</H2>
      <H3 {...args}>I am an H3</H3>
      <H4 {...args}>I am an H4</H4>
      <H5 {...args}>I am an H5</H5>
      <P {...args}>I am a P</P>
    </Container>
  </LayoutWrapper>
);

export const Standard = Template.bind({});
Standard.args = {
  py: 4,
};

export const Centered = Template.bind({});
Centered.args = {
  ...Standard.args,
  center: true,
};

export const Color = Template.bind({});
Color.args = {
  ...Standard.args,
  color: "blue",
};
