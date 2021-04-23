import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { DateTime } from 'luxon'
import CalendarPicker from '../CalendarPicker'
import { Calendar } from '../../icons'
import { InputStyle, _InputProps } from './Input'
import { isMobileViewport } from '../../util/layout'
import { colors } from '../../util/colors'

const PickerWrapper = styled.div<{ inputLeftPx: number; inputRightPx: number }>`
  .picker {
    margin-top: 4px;

    button,
    abbr {
      font-size: 14px;
    }
  }

  .mobile-picker {
    position: absolute;
    top: 0;
    left: -${({ inputLeftPx }) => inputLeftPx}px;
    right: -${({ inputRightPx }) => inputRightPx}px;
    width: 100vw;

    .react-calendar__tile,
    .react-calendar__navigation__arrow {
      height: 2.5rem;
      width: 2.5rem;
    }
  }
`

const CalendarIcon = styled.span`
  pointer-events: none;
  position: absolute;
  left: 9px;
  top: 9px;
`

export type DatePickerProps = _InputProps & {
  onDateChange: (d: DateTime) => any
  pickerProps?: {
    minDate?: DateTime
    maxDate?: DateTime
  }
}

export const DatePicker = ({
  styledProps = {},
  onDateChange,
  nativeProps,
  pickerProps = {},
}: DatePickerProps) => {
  const { defaultValue, onChange, ...rest } = nativeProps
  const [value, setValue] = useState<DateTime | null>(
    defaultValue ? DateTime.fromISO(defaultValue as string) : null
  )
  const [pickerVisible, setPickerVisible] = useState(false)
  const mobileViewport = isMobileViewport()
  const inputRef = useRef(null)

  const dateChanged = (newDate: Date[] | Date | string) => {
    const newDateLuxon =
      typeof newDate === 'string'
        ? DateTime.fromISO(newDate)
        : // TODO: update this when implementing date range picking
        Array.isArray(newDate)
        ? null
        : DateTime.fromISO(newDate.toISOString())
    if (newDateLuxon.invalidExplanation) {
      console.error(newDateLuxon.invalidExplanation)
    } else {
      setValue(newDateLuxon)
      setPickerVisible(false)
      onDateChange && onDateChange(newDateLuxon)
    }
  }

  const { minDate, maxDate } = pickerProps

  return (
    <InputStyle
      {...styledProps}
      style={{ position: 'relative' }}
      ref={inputRef}
    >
      <input
        style={{ paddingLeft: '1.75rem', cursor: 'pointer' }}
        onFocus={(_) => setPickerVisible(true)}
        onClick={(_) => setPickerVisible(true)}
        {...rest}
        onChange={(e) => dateChanged(e.target.value)}
        readOnly
        value={value ? value.toFormat('ccc LLL d') : ''}
        placeholder="Select a date"
      />
      <CalendarIcon style={{ pointerEvents: 'none' }}>
        <Calendar color={colors.gray800} />
      </CalendarIcon>
      {pickerVisible && inputRef.current && (
        <PickerWrapper
          inputLeftPx={inputRef.current.offsetLeft}
          inputRightPx={
            inputRef.current.offsetLeft + inputRef.current.offsetWidth
          }
        >
          <CalendarPicker
            pickerClassName={mobileViewport ? 'picker mobile-picker' : 'picker'}
            minDetail="month"
            defaultValue={value ? new Date(value.valueOf()) : null}
            minDate={minDate ? new Date(minDate.valueOf()) : null}
            maxDate={maxDate ? new Date(maxDate.valueOf()) : null}
            onChange={dateChanged}
            onDismiss={() => setPickerVisible(false)}
          />
        </PickerWrapper>
      )}
    </InputStyle>
  )
}
