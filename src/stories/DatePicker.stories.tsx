// @ts-nocheck
import React, { ComponentProps } from "react";
import { DateTime } from "luxon";
import { Story, Meta } from "@storybook/react/types-6-0";
import { Container } from "../components/grid";
import { DatePicker } from "../components/form";

export default {
  title: "Form/DatePicker",
  component: DatePicker,
} as Meta;

const Template: Story<ComponentProps<typeof DatePicker>> = (args) => (
  <Container center>
    <DatePicker {...args} />
  </Container>
);

export const Standard = Template.bind({});
Standard.args = {
  nativeProps: {},
  pickerProps: {
    minDate: DateTime.local().minus({ days: 2 }),
    maxDate: DateTime.local().plus({ months: 3 }),
  },
};
