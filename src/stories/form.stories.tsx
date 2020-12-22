// @ts-nocheck
import React, { ComponentProps } from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import { Container, Div } from "../components/grid";
import { Label, Input, TextArea, Checkbox, Select } from "../components/form";

export default {
  title: "Form/Summary",
  component: Input,
} as Meta;

const Template: Story<ComponentProps<typeof Input>> = (args) => (
  <Container direction="column">
    <Label>Input</Label>
    <Input />
    <Label>Checkbox</Label>
    <Checkbox />
    <Label>Select</Label>
    <Select>
      <option>Option 1</option>
      <option>Option 2</option>
    </Select>
    <Label>TextArea</Label>
    <TextArea />
  </Container>
);

export const Standard = Template.bind({});
Standard.args = {};
