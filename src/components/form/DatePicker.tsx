import React, { useState } from 'react'
import { DateTime } from 'luxon'
import CalendarPicker from '../CalendarPicker'
import { InputStyle, _InputProps } from './Input'
import { isMobileViewport } from '../../util/layout'

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

  const showPicker = !mobileViewport && pickerVisible
  const { minDate, maxDate } = pickerProps

  return (
    <InputStyle {...styledProps}>
      <input
        onFocus={(_) => setPickerVisible(true)}
        onClick={(_) => setPickerVisible(true)}
        onChange={(e) => dateChanged(e.target.value)}
        value={
          mobileViewport
            ? value.toFormat('yyyy-MM-dd')
            : value
              ? value.toFormat('MM / dd / yyyy')
              : ''
        }
        placeholder={!mobileViewport && 'MM / DD / YYYY'}
        {...rest}
        type={mobileViewport ? 'date' : 'text'}
      />
      {showPicker ? (
        <CalendarPicker
          minDetail="month"
          defaultValue={value ? new Date(value.valueOf()) : null}
          minDate={minDate ? new Date(minDate.valueOf()) : null}
          maxDate={maxDate ? new Date(maxDate.valueOf()) : null}
          onChange={dateChanged}
          onDismiss={() => setPickerVisible(false)}
        />
      ) : null}
    </InputStyle>
  )
}
