import React, { useState } from "react";
import { DateTime } from "luxon";
import { InputStyle, _InputProps } from "./Input";
import { isMobileViewport } from "../../util/layout";
import { Select } from "./Select";
import { Container } from "../grid";
import { Div } from "../spacing";

export type TimePickerProps = _InputProps & {
  onTimeChange: (d: DateTime) => any;
};

export const TimePicker = ({
  styledProps = {},
  nativeProps,
  onTimeChange,
}: TimePickerProps) => {
  const { defaultValue, ...rest } = nativeProps;
  const [value, setValue] = useState<DateTime>(
    defaultValue
      ? DateTime.fromISO(defaultValue as string)
      : DateTime.local().set({ minute: 0, second: 0 })
  );
  const [pickerVisible, setPickerVisible] = useState(false);
  const isMobile = isMobileViewport();

  const dateChanged = (newDate: DateTime) => {
    setValue(newDate);
    onTimeChange(newDate);
  };

  const hourChanged = (pickedHour: number) => {
    let hour = pickedHour;
    if (pickedHour === 12) {
      if (value.hour < 12) {
        hour = 0;
      }
    } else if (value.hour > 11) {
      hour = pickedHour + 12;
    }
    dateChanged(value.set({ hour }));
  };

  const amPmChanged = (newVal: string) => {
    if (newVal === "am" && value.hour > 11) {
      dateChanged(value.set({ hour: value.hour - 12 }));
    } else if (newVal === "pm" && value.hour < 12) {
      dateChanged(value.set({ hour: value.hour + 12 }));
    }
  };

  let uiHour = value.hour;
  if (uiHour > 11) uiHour = uiHour - 12;
  if (uiHour === 0) uiHour = 12;

  return (
    <InputStyle {...styledProps}>
      {isMobile ? (
        <input
          {...nativeProps}
          type="time"
          defaultValue={value.toFormat("HH:mm")}
          onChange={(e) => dateChanged(DateTime.fromISO(e.target.value))}
        />
      ) : (
          <Container align="center">
            <Select
              key="hour"
              nativeProps={{
                onChange: (e) => hourChanged(parseInt(e.target.value)),
                value: uiHour,
              }}
              options={[...Array(12)].map((_, idx) => ({
                value: (idx + 1).toString(),
              }))}
            />
            <Div px={1}>:</Div>
            <Select
              key="minute"
              nativeProps={{
                onChange: (e) =>
                  dateChanged(value.set({ minute: parseInt(e.target.value) })),
                value: value.minute,
              }}
              options={["00", "15", "30", "45"].map((value) => ({ value }))}
            />
            <Div pl={1} />
            <Select
              key="ampm"
              nativeProps={{
                onChange: (e) => amPmChanged(e.target.value),
                defaultValue: value.hour > 11 ? "pm" : "am",
              }}
              options={["am", "pm"].map((value) => ({ value }))}
            />
          </Container>
        )}
    </InputStyle>
  );
};
