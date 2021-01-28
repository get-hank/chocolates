import React, { ComponentProps } from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import Button from "../components/Button";
import { Container } from "../components/grid";
import { Div } from "../components/spacing";
import ImpersonationModule from "../components/ImpersonationModule";
import { impersonate } from "../util/api";

export default {
  title: "Impersonation",
  component: ImpersonationModule,
} as Meta;

const Template: Story<ComponentProps<typeof ImpersonationModule>> = () => (
  <Container center>
    <Div py={4}>
      <Button
        onClick={() => {
          impersonate("blah", window.location.href);
          window.location.replace(window.location.href);
        }}
      >
        Impersonate
      </Button>
    </Div>
    <ImpersonationModule userName="Fake User" apiBase={window.location.href} />
  </Container>
);

export const Standard = Template.bind({});
