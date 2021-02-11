import React, { useState, ComponentProps } from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import { colors } from "../util/colors";
import { Container } from "../components/grid";
import IconButton from "../components/IconButton";

export default {
  title: "IconButton",
  component: IconButton,
} as Meta;

const Template: Story<ComponentProps<typeof IconButton>> = (args) => {
  const [count, setCount] = useState(0);
  return (
    <Container center>
      <p>{count} clicks</p>
      <Container pl={2}>
        <IconButton {...args} onClick={() => setCount(count + 1)} />
      </Container>
    </Container>
  );
};

export const Standard = Template.bind({});
Standard.args = {
  icon: "left",
  bgColor: colors.gray50,
};
