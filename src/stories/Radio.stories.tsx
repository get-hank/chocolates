// @ts-nocheck
import React, { ComponentProps } from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import { Container } from "../components/grid";
import { Radio, FormField } from "../components/form";
import { P } from "../components/typography";

export default {
  title: "Form/Radio",
  component: Radio,
} as Meta;

const Template: Story<ComponentProps<typeof Radio>> = (args) => (
  <Container direction="column" center>
    <Radio {...args} value="inline">
      Inline content
    </Radio>
    <Radio {...args} value="block">
      <div>
        <P>Block content</P>
        <P>More block content</P>
      </div>
    </Radio>

    <FormField
      label="as a form field"
      inputType="radio"
      field="field"
      value="formField"
    />

    <FormField
      label="as a form field"
      inputType="radio"
      field="field"
      value="formField"
    >
      <div>
        <P>Woo block content</P>
        <P>So much block content</P>
      </div>
    </FormField>
  </Container>
);

export const Standard = Template.bind({});
Standard.args = {
  nativeProps: {
    name: "field",
  },
};
