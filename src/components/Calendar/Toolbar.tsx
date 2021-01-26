import React, { useState } from "react";
import styled from "styled-components";
import format from "date-fns/format";
import { ArrowDown } from "../../icons";
import {
  Button,
  CalendarPicker,
  colors,
  Container,
  Div,
  H4,
  IconButton,
  Toggle,
} from "../../ui";
import { capitalize } from "../../util/strings";

const MonthPicker = ({
  value,
  onChange,
}: {
  value: Date;
  onChange: (d: Date) => any;
}) => {
  const [open, setOpen] = useState(false);

  return (
    <Container
      center
      onClick={() => setOpen(true)}
      style={{ cursor: "pointer" }}
    >
      <H4 pr={1} weight={700}>
        {format(value, "MMMM y")}
      </H4>
      <ArrowDown />
      <button
        name="Pick month"
        style={{
          height: 0,
          width: 0,
          appearance: "none",
          border: "none",
          margin: 0,
          padding: 0,
        }}
      />
      {open ? (
        <CalendarPicker
          value={value}
          onChange={(newVal) => {
            setOpen(false);
            if (Array.isArray(newVal)) return onChange(newVal[0]);
            onChange(newVal);
          }}
          minDetail="year"
          maxDetail="year"
          onDismiss={() => setOpen(false)}
        />
      ) : null}
    </Container>
  );
};

const Toolbar: React.FC = ({ date, view, onNavigate, onView }: any) => (
  <Container align="center" justify="space-between" pb={4}>
    <Container>
      <Div pr={2}>
        <Button secondary onClick={() => onNavigate("TODAY")}>
          Today
        </Button>
      </Div>
      <Div pr={1}>
        <IconButton
          icon="left"
          name="Previous"
          onClick={() => onNavigate("PREV")}
          bgColor={colors.gray50}
        />
      </Div>
      <IconButton
        icon="right"
        name="Next"
        onClick={() => onNavigate("NEXT")}
        bgColor={colors.gray50}
      />
      <Container pl={2} center>
        <MonthPicker
          onChange={(newDate) => onNavigate(null, newDate)}
          value={date}
        />
      </Container>
    </Container>
    <Toggle
      left="Week"
      right="Month"
      value={capitalize(view)}
      onChange={(newView) => onView(newView.toLowerCase())}
    />
  </Container>
);

export default Toolbar;
