// @ts-nocheck
import React, { ComponentProps } from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import { Div } from "../components/spacing";
import { Container } from "../components/grid";
import { FormField } from "../components/form";

export default {
  title: "Form/FormField",
  component: FormField,
} as Meta;

const Template: Story<ComponentProps<typeof Input>> = (args) => (
  <Container direction="column" center>
    <FormField onChange={(edit) => alert(JSON.stringify(edit))} {...args} />
  </Container>
);

export const Standard = Template.bind({});
Standard.args = {
  label: "Label",
  field: "key",
  placeholder: "Placeholder",
  inputType: "checkbox",
  fillBg: false,
  autoComplete: "email",
  options: [{ value: "Option 1" }, { value: "Option 2" }],
};
