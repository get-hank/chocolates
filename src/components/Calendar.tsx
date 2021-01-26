import React, { useEffect, useState } from "react";
import styled from "styled-components";
import "./Calendar/style.scss";
import { Calendar as BigCalendar, dateFnsLocalizer } from "react-big-calendar";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
const locale = "en-US";
const locales = {
  [locale]: require("date-fns/locale/en-US"),
};
import { colors } from "../util/colors";
import { Div, SpacingProps } from "./spacing";
import { Container } from "./grid";
import { fontSize, P, Text } from "./typography";
import type { TextProps } from "./typography";
import Toolbar from "./Calendar/Toolbar";

const Wrapper = styled(Container)`
  max-width: 1000px;
  .rbc-calendar {
    flex-grow: 1;
    min-height: 750px;
  }

  * {
    font-family: ${({ theme }) => theme.typography.baseType};
  }

  .rbc-month-view {
    border: none;
    border-bottom: 1px solid ${({ theme }) => theme.colors.grayBorder};
  }

  .rbc-header {
    border-left: none !important;
    background-color: ${({ theme }) => theme.colors.grayLightest};
    border-bottom-color: ${({ theme }) => theme.colors.grayBorder};
  }

  .rbc-month-row {
    border: 1px solid ${({ theme }) => theme.colors.grayBorder};
    border-top: none;
    border-bottom: none;

    .rbc-day-bg.rbc-today {
      background-color: ${colors.white};
    }
  }

  .rbc-month-row + .rbc-month-row {
    border-top: 1px solid ${({ theme }) => theme.colors.grayBorder};
  }

  .rbc-day-bg + .rbc-day-bg {
    border-color: ${({ theme }) => theme.colors.grayBorder};
  }

  .rbc-off-range-bg {
    background-color: inherit;
  }

  .rbc-event-content {
    ${({ theme }) => fontSize(0.875, theme.typography.baseSize)}
    text-overflow: clip;
  }

  .rbc-show-more {
    color: ${({ theme }) => theme.colors.primary};
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }

  .rbc-time-view {
    border: none;

    .rbc-day-bg,
    .rbc-day-slot {
      &.rbc-today {
        background-color: ${colors.white};
      }
    }

    .rbc-time-header-content {
      padding-left: 1px;
      border: none;
    }

    .rbc-header {
      border-bottom: none;
    }

    .rbc-allday-cell {
      height: auto;
    }

    .rbc-time-content {
      border-top: none;

      .rbc-day-slot.rbc-time-column {
        border: none;
        border-top: 1px solid ${({ theme }) => theme.colors.grayBorder};

        .rbc-events-container,
        .rbc-timeslot-group {
          border-left: none;
        }
      }
      .rbc-day-slot.rbc-time-column + .rbc-day-slot.rbc-time-column {
        border-left: 1px solid ${({ theme }) => theme.colors.grayBorder};
      }
    }

    .rbc-timeslot-group .rbc-time-slot {
      border: none;
      min-height: 30px;
    }

    .rbc-events-container {
      margin-right: 0;

      .rbc-event-label {
        display: none;
      }

      .rbc-event {
        border: none;
      }
    }

    .rbc-time-gutter {
      .rbc-timeslot-group {
        border: none;
        padding-bottom: 1px;
        .rbc-time-slot {
          min-height: 30px;
          text-align: right;
          color: ${colors.gray600};
          ${({ theme }) => fontSize(0.875, theme.typography.baseSize)}
        }
      }

      .rbc-timeslot-group + .rbc-timeslot-group {
        .rbc-time-slot {
          position: relative;
          top: -8px;
        }
      }
    }
  }
`;

const DayMarker = styled(P) <{ today: boolean } & TextProps>`
  margin-top: 3px;
  margin-bottom: 3px;
  padding: 5px;
  font-weight: 400;

  color: ${({ today }) => (today ? colors.white : colors.gray400)};
  background-color: ${({ today }) => (today ? colors.blue600 : colors.white)};
  border-radius: 50%;
`;

const WeekEventStyle = styled(Div) <{ today: boolean } & SpacingProps>`
  border-radius: 4px;
  background-color: ${({ today }) => (today ? colors.blue600 : colors.gray50)};
  color: ${({ today }) => (today ? colors.white : colors.black)};
`;

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

// @ts-ignore
const DragAndDropCalendar = withDragAndDrop(BigCalendar);

type Event = any;
type View = "week" | "month";

const getEventTitle = (event: Event) => {
  if (!event.start) return event.title;
  return (
    <P color={colors.white} fontSize={0.875}>
      {format(event.start, "ha").toLowerCase()}{" "}
      <Text color={colors.white} weight={700} fontSize={0.875}>
        {event.title}
      </Text>
    </P>
  );
};

const getEventStyle = (
  event: Event,
  start: Date,
  end: Date,
  isSelected: boolean
) => ({
  ...(!event.style &&
    !event.className && { style: { backgroundColor: colors.green500 } }),
  ...(event.style && { style: event.style }),
  ...(event.className && { className: event.className }),
});

const today = new Date();
const isDateToday = (d1: Date) => {
  return (
    d1.getFullYear() === today.getFullYear() &&
    d1.getMonth() === today.getMonth() &&
    d1.getDate() === today.getDate()
  );
};

const MonthHeader: React.FC = ({ date }: any) => {
  return (
    <Div py={1}>
      <Text fontSize={0.875} color={colors.gray400}>
        {format(date, "E")}
      </Text>
    </Div>
  );
};

const WeekHeader: React.FC = ({ date }: any) => {
  return (
    <Div py={1}>
      <Text
        fontSize={0.875}
        color={isDateToday(date) ? colors.blue600 : colors.gray400}
      >
        {format(date, "eee d")}
      </Text>
    </Div>
  );
};

const WeekEvent: React.FC = ({ event, isAllDay }: any) => {
  const { start, end, title } = event;
  return (
    <>
      <P pt={0.5} color={colors.white} weight={700} fontSize={0.875}>
        {title}
      </P>
      {!isAllDay && start && end ? (
        <P pt={0.5} color={colors.white} fontSize={0.875}>
          {format(start, "h")}
          {" - "}
          {format(end, "ha").toLowerCase()}
        </P>
      ) : null}
    </>
  );
};

const MonthDayHeader: React.FC = ({ date, isOffRange }: any) => {
  const isToday = isDateToday(date);
  const dayFormat = isOffRange && date.getDate() === 1 ? "MMM d" : "d";
  return (
    <Container center>
      <DayMarker fontSize={0.875} today={isToday}>
        {format(date, dayFormat)}
      </DayMarker>
    </Container>
  );
};

type DateRange = { end: Date; start: Date };

type CalendarProps = {
  events: Event[];
  defaultView?: View;
  view?: View;
  date?: Date;
  onViewChange?: (v: View) => any;
  onDateChange?: (d: Date) => any;
  onDateRangeChange?: (r: DateRange) => any;
};

const Calendar = ({
  onViewChange,
  onDateChange,
  onDateRangeChange,
  defaultView = "month",
  ...rest
}: CalendarProps) => {
  const onRangeChange = onDateRangeChange
    ? (range: Date[] | DateRange, view: View) => {
      if (Array.isArray(range))
        return onDateRangeChange({
          start: range[0],
          end: range[range.length - 1],
        });

      onDateRangeChange(range);
    }
    : null;

  return (
    <Wrapper grow>
      <DragAndDropCalendar
        {...{
          defaultView,
          localizer,
          ...(onDateChange && { onNavigate: onDateChange }),
          ...(onViewChange && { onView: onViewChange }),
          ...(onDateRangeChange && { onRangeChange }),
          ...rest,
        }}
        resizable
        popup
        views={["week", "month"]}
        eventPropGetter={getEventStyle}
        titleAccessor={getEventTitle}
        formats={{
          dayHeaderFormat: "E MMM d",
          timeGutterFormat: "h a",
        }}
        components={{
          month: {
            header: MonthHeader,
            dateHeader: MonthDayHeader,
          },
          week: {
            header: WeekHeader,
            event: WeekEvent,
          },
          toolbar: Toolbar,
        }}
      />
    </Wrapper>
  );
};

export default Calendar;
