// @ts-nocheck
import React, { ComponentProps } from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import { Div } from "../components/spacing";
import { Container } from "../components/grid";
import {
  FormField,
  Label,
  Input,
  TextArea,
  Checkbox,
  Select,
} from "../components/form";

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
    <Label>TextArea</Label>
    <TextArea />
    <FormField
      label="Field label"
      field="field_key"
      onChange={(edit) => alert(JSON.stringify(edit))}
      placeholder="Placeholder"
      inputType="checkbox"
      fillBg={true}
    />
    <FormField
      py={2}
      label="Select label"
      field="select_key"
      onChange={(edit) => alert(JSON.stringify(edit))}
      inputType="select"
      options={[{ value: "Option 1" }, { value: "Option 2" }]}
      error="Bad choice bud"
    />
  </Container>
);

export const Standard = Template.bind({});
Standard.args = {};
