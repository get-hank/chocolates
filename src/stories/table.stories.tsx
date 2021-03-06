// @ts-nocheck

import React, { ComponentProps } from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import Table from "../components/Table";

export default {
  title: "Table",
  component: Table,
} as Meta;

const Template: Story<ComponentProps<typeof Table>> = (args) => (
  <Table {...args} />
);

export const Standard = Template.bind({});
Standard.args = {
  onRowClick: (event, row) => alert(`Clicked row ${JSON.stringify(row)}`),
  cols: [
    {
      Header: "Column A",
      accessor: "a",
      width: 80,
    },
    {
      Header: "Column B",
      accessor: "b",
    },
    {
      Header: "Column C",
      accessor: "c",
      width: 250,
      wrap: false,
    },
  ],
  data: [
    {
      a: "1A text",
      b: "1B text",
      c: "1C text",
    },
    {
      a: "2A text",
      b: "2B text",
      c:
        "2C text 2C text 2C text 2C text 2C text 2C text 2C text 2C text 2C text 2C text 2C text 2C text 2C text 2C text 2C text 2C text 2C text 2C text 2C text 2C text 2C text 2C text 2C text 2C text 2C text 2C text 2C text 2C text 2C text 2C text 2C text 2C text 2C text 2C text 2C text 2C text 2C text 2C text 2C text 2C text 2C text 2C text 2C text 2C text 2C text 2C text 2C text 2C text 2C text 2C text 2C text 2C text 2C text 2C text",
    },
    {
      a: "3A text",
      b: "3B text",
      c: "3C text",
    },
  ],
};
