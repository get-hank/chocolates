import React, { useCallback, useState } from "react";
import styled from "styled-components";
import Calendar from "react-calendar";
import type { CalendarProps } from "react-calendar";
import format from "date-fns/format";
import { space } from "../util/layout";
import IconButton from "./IconButton";

const Overlay = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1;
`;

const StyledCalendar = styled.div`
  position: relative;

  .react-calendar {
    z-index: 10;
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

    .react-calendar__year-view {
      padding-top: ${space(0.5)};

      .react-calendar__tile {
        display: flex;
        justify-content: center;
        align-items: center;

        abbr {
          margin: 0 auto;
          width: ${space(4)};
          height: ${space(4)};
        }
      }
    }

    .react-calendar__tile {
      border: none;
      appearance: none;
      background-color: transparent;

      abbr {
        margin: 0 auto;
        border-radius: 50%;
        width: ${space(3.5)};
        height: ${space(3.5)};
        display: flex;
        justify-content: center;
        align-items: center;

        &:hover {
          cursor: pointer;
          background-color: ${({ theme }) => theme.colors.primary};
          color: white;
        }
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

const toDow = (date: Date) =>
  ["Su", "M", "T", "W", "Th", "F", "S"][date.getDay()];

type CalendarPickerProps = {
  value?: Date;
  defaultValue?: Date;
  onChange: CalendarProps["onChange"];
  minDetail: "month" | "year";
  maxDetail?: "month" | "year";
  minDate?: Date | null;
  maxDate?: Date | null;
  onDismiss?: () => any;
  pickerClassName?: string | null;
  overlayClassName?: string | null;
};

const CalendarPicker = ({
  onDismiss,
  pickerClassName,
  overlayClassName,
  ...calendarProps
}: CalendarPickerProps) => (
    <StyledCalendar>
      <Overlay
        onClick={(e) => {
          e.stopPropagation();
          onDismiss && onDismiss();
        }}
        {...(overlayClassName && { className: overlayClassName })}
      />
      <Calendar
        locale="en-US"
        next2Label={null}
        prev2Label={null}
        prevLabel={<IconButton noButton icon="left" />}
        nextLabel={<IconButton noButton icon="right" />}
        formatShortWeekday={(locale, date) => toDow(date)}
        formatMonth={(locale, date) => format(date, "MMM")}
        {...(pickerClassName && { className: pickerClassName })}
        {...calendarProps}
      />
    </StyledCalendar>
  );

export default CalendarPicker;
