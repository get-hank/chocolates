import React, { ComponentProps } from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import { DateTime } from "luxon";
import { colors } from "../util/colors";
import { Container } from "../components/grid";
import Calendar from "../components/Calendar";

export default {
  title: "Calendar",
  component: Calendar,
} as Meta;

const now = DateTime.local();

const Template: Story<ComponentProps<typeof Calendar>> = (args) => (
  <Container center>
    <Calendar
      {...args}
      events={[
        {
          id: 0,
          title: "Event with a long title",
          allDay: true,
          start: now.toJSDate(),
          end: now.toJSDate(),
        },
        {
          id: 2,
          title: "3-hour event",
          start: now.plus({ days: -1 }).set({ hour: 12, minute: 0 }).toJSDate(),
          end: now.plus({ days: -1 }).set({ hour: 15, minute: 0 }).toJSDate(),
        },
        {
          id: 3,
          title: "With color",
          start: now.plus({ days: 1 }).set({ hour: 7, minute: 0 }).toJSDate(),
          end: now.plus({ days: 1 }).set({ hour: 8, minute: 0 }).toJSDate(),
          style: {
            backgroundColor: colors.purple500,
          },
        },
        {
          id: 4,
          title: "Some thing",
          start: now.plus({ days: -1 }).set({ hour: 9, minute: 0 }).toJSDate(),
          end: now.plus({ days: -1 }).set({ hour: 9, minute: 30 }).toJSDate(),
        },
        {
          id: 5,
          title: "Some other thing",
          start: now.plus({ days: -1 }).set({ hour: 10, minute: 0 }).toJSDate(),
          end: now.plus({ days: -1 }).set({ hour: 11, minute: 0 }).toJSDate(),
        },
        {
          id: 6,
          title: "More things happening",
          start: now.plus({ days: -1 }).set({ hour: 16, minute: 0 }).toJSDate(),
          end: now.plus({ days: -1 }).set({ hour: 17, minute: 0 }).toJSDate(),
        },
        {
          id: 7,
          title: "Another thing it's a long day",
          start: now.plus({ days: -1 }).set({ hour: 18, minute: 0 }).toJSDate(),
          end: now.plus({ days: -1 }).set({ hour: 19, minute: 0 }).toJSDate(),
        },
      ]}
    />
  </Container>
);

export const Standard = Template.bind({});
Standard.args = {};
