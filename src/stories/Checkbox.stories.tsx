// @ts-nocheck
import React, { ComponentProps } from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import { Container } from "../components/grid";
import { Checkbox, FormField } from "../components/form";
import { P } from "../components/typography";

export default {
  title: "Form/Checkbox",
  component: Checkbox,
} as Meta;

const Template: Story<ComponentProps<typeof Checkbox>> = (args) => (
  <Container direction="column" center>
    <Checkbox {...args}>Inline content</Checkbox>
    <Checkbox {...args}>
      <div>
        <P>Block content</P>
        <P>More block content</P>
      </div>
    </Checkbox>

    <FormField label="as a form field" inputType="checkbox" field="check" />

    <FormField label="as a form field" inputType="checkbox" field="field">
      <div>
        <P>Woo block content</P>
        <P>So much block content</P>
      </div>
    </FormField>
  </Container>
);

export const Standard = Template.bind({});
Standard.args = {
  nativeProps: {},
};
