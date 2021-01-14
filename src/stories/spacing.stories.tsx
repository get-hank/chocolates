// @ts-nocheck

import React, { ComponentProps } from "react";
import { Story, Meta } from "@storybook/react/types-6-0";

import { Div } from "../components/spacing";

export default {
  title: "Layout/Div",
  component: Div,
} as Meta;

const Template: Story<ComponentProps<typeof Div>> = (args) => (
  <div style={{ padding: "2rem" }}>
    <Div style={{ backgroundColor: "blue", color: "white" }} {...args}>
      I am Div
    </Div>
  </div>
);

export const HideNarrow = Template.bind({});
HideNarrow.args = {
  hideUnder: "sm",
  bb: true,
};

export const HideWide = Template.bind({});
HideWide.args = {
  hideOver: "sm",
};
