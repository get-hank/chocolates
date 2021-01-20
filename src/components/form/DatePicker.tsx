import React, { useCallback, useState } from "react";
import styled from "styled-components";
import { DateTime } from "luxon";
import CalendarPicker from "../CalendarPicker";
import { InputStyle, _InputProps } from "./Input";
import { isMobileViewport } from "../../util/layout";

export type DatePickerProps = _InputProps & {
  onDateChange: (d: DateTime) => any;
  pickerProps?: {
    minDate?: DateTime;
    maxDate?: DateTime;
  };
};

export const DatePicker = ({
  styledProps = {},
  onDateChange,
  nativeProps,
  pickerProps = {},
}: DatePickerProps) => {
  const { defaultValue, onChange, ...rest } = nativeProps;
  const [value, setValue] = useState<DateTime>(
    defaultValue ? DateTime.fromISO(defaultValue as string) : DateTime.local()
  );
  const [pickerVisible, setPickerVisible] = useState(false);
  const mobileViewport = isMobileViewport();

  const dateChanged = (newDate: Date[] | Date | string) => {
    const newDateLuxon =
      typeof newDate === "string"
        ? DateTime.fromISO(newDate)
        : // TODO: update this when implementing date range picking
        Array.isArray(newDate)
          ? null
          : DateTime.fromISO(newDate.toISOString());
    setValue(newDateLuxon);
    setPickerVisible(false);
    onDateChange && onDateChange(newDateLuxon);
  };

  const showPicker = !mobileViewport && pickerVisible;
  const { minDate, maxDate } = pickerProps;

  return (
    <InputStyle {...styledProps}>
      <input
        onFocus={(_) => setPickerVisible(true)}
        onClick={(_) => setPickerVisible(true)}
        onChange={(e) => dateChanged(e.target.value)}
        value={
          mobileViewport
            ? value.toFormat("yyyy-MM-dd")
            : value.toFormat("MM / dd / yyyy")
        }
        {...rest}
        type={mobileViewport ? "date" : "text"}
      />
      {showPicker ? (
        <CalendarPicker
          minDetail="month"
          defaultValue={new Date(value.valueOf())}
          minDate={minDate ? new Date(minDate.valueOf()) : null}
          maxDate={maxDate ? new Date(maxDate.valueOf()) : null}
          onChange={dateChanged}
          onDismiss={() => setPickerVisible(false)}
        />
      ) : null}
    </InputStyle>
  );
};
