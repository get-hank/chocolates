// @ts-nocheck
import React, { ComponentProps, useState } from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import { Container } from "../components/grid";
import { P } from "../components/typography";
import Modal from "../components/Modal";

export default {
  title: "Modal",
  component: Modal,
} as Meta;

const Template: Story<ComponentProps<typeof Modal>> = (args) => {
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(true);
  return (
    <Container center>
      <P>{message}</P>
      <Modal
        {...args}
        open={open}
        onSubmit={() => {
          setOpen(false);
          setMessage("Submitted!");
        }}
        onCancel={() => {
          setOpen(false);
          setMessage("Canceled!");
        }}
      />
    </Container>
  );
};

export const Standard = Template.bind({});
Standard.args = {
  children: (
    <Container center direction="column">
      {[...Array(30)].map((idx) => (
        <P p={3} key={idx}>
          Hello!!
        </P>
      ))}
    </Container>
  ),
  titleText: "Howdy pardner",
  submitText: "Submit",
  cancelText: "Cancel",
};
