import React, { useCallback, useState } from "react";
import styled from "styled-components";
import Calendar from "react-calendar";
import { DateTime } from "luxon";
import { InputStyle, _InputProps } from "./Input";
import { isMobileViewport, space } from "../../util/layout";
import IconButton from "../IconButton";

const Overlay = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`;

const StyledCalendar = styled.div`
  position: relative;

  .react-calendar {
    z-index: 1;
    width: 300px;
    font-family: ${({ theme }) => theme.typography.baseType};
    padding: ${space(1)};
    position: absolute;
    background-color: white;
    border: 1px solid ${({ theme }) => theme.colors.grayBorder};
    border-top: none;
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
    box-shadow: 0px 8px 8px rgba(41, 40, 39, 0.1);

    .react-calendar__navigation__arrow {
      appearance: none;
      border: none;
      background: none;
    }

    .react-calendar__navigation__label:disabled {
      appearance: none;
      border: none;
      color: ${({ theme }) => theme.colors.black};
      background-color: transparent;
    }

    .react-calendar__month-view__weekdays {
      padding-top: ${space(1)};
      padding-bottom: ${space(1)};
      font-size: ${space(1.5)};
      color: ${({ theme }) => theme.colors.gray};

      .react-calendar__month-view__weekdays__weekday {
        text-align: center;
      }
    }

    abbr {
      text-decoration: none;
    }

    .react-calendar__tile {
      border: none;
      appearance: none;
      background-color: transparent;

      &:hover abbr {
        background-color: ${({ theme }) => theme.colors.primary};
        color: white;
      }

      abbr {
        border-radius: 50%;
        width: ${space(3.5)};
        height: ${space(3.5)};
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }

    .react-calendar__tile--now abbr {
      background-color: ${({ theme }) => theme.colors.grayBorder};
    }

    .react-calendar__tile--active abbr {
      background-color: ${({ theme }) => theme.colors.primary};
      color: white;
    }
  }
`;

export type DatePickerProps = _InputProps & {
  onDateChange: (d: DateTime) => any;
  pickerProps?: {
    minDate?: DateTime;
    maxDate?: DateTime;
  };
};

const toDow = (date: Date) =>
  ["Su", "M", "T", "W", "Th", "F", "S"][date.getDay()];

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
        <StyledCalendar>
          <Overlay onClick={(_) => setPickerVisible(false)} />
          <Calendar
            locale="en-US"
            minDetail="month"
            defaultValue={new Date(value.valueOf())}
            minDate={minDate ? new Date(minDate.valueOf()) : null}
            maxDate={maxDate ? new Date(maxDate.valueOf()) : null}
            onChange={dateChanged}
            next2Label={null}
            prev2Label={null}
            prevLabel={<IconButton>{"<"}</IconButton>}
            nextLabel={<IconButton>{">"}</IconButton>}
            formatShortWeekday={(locale, date) => toDow(date)}
          />
        </StyledCalendar>
      ) : null}
    </InputStyle>
  );
};
