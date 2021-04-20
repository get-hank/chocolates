import React, { useState } from 'react'
import styled from 'styled-components'
import { DateTime } from 'luxon'
import CalendarPicker from '../CalendarPicker'
import { InputStyle, _InputProps } from './Input'
import { isMobileViewport } from '../../util/layout'

const PickerWrapper = styled.div`
  .mobile-picker {
    position: fixed;
    left: 0;
    right: 0;
    width: 100%;

    .react-calendar__tile,
    .react-calendar__navigation__arrow {
      height: 2.5rem;
      width: 2.5rem;
    }
  }
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
    <InputStyle {...styledProps}>
      <input
        onFocus={(_) => setPickerVisible(true)}
        onClick={(_) => setPickerVisible(true)}
        {...rest}
        onChange={(e) => dateChanged(e.target.value)}
        value={value ? value.toFormat('MM / dd / yyyy') : ''}
        placeholder="MM / DD / YYYY"
      />
      {pickerVisible ? (
        <PickerWrapper>
          <CalendarPicker
            pickerClassName={mobileViewport ? 'mobile-picker' : ''}
            minDetail="month"
            defaultValue={value ? new Date(value.valueOf()) : null}
            minDate={minDate ? new Date(minDate.valueOf()) : null}
            maxDate={maxDate ? new Date(maxDate.valueOf()) : null}
            onChange={dateChanged}
            onDismiss={() => setPickerVisible(false)}
          />
        </PickerWrapper>
      ) : null}
    </InputStyle>
  )
}
