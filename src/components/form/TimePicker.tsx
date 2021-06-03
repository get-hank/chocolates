import React, { useMemo } from 'react'
import { DateTime } from 'luxon'
import { Select } from './Select'

export type TimePickerProps = Omit<
  React.ComponentProps<typeof Select>,
  'options'
> & {
  onChange: (d: DateTime) => void
  step?: number | null
  min?: DateTime | null
  max?: DateTime | null
  timezone?: string | null
}

export const TimePicker = ({
  nativeProps,
  onChange,
  min,
  max,
  timezone,
  step = 15,
  ...selectProps
}: TimePickerProps) => {
  const options = useMemo(() => {
    const defaultValue = nativeProps.defaultValue
      ? DateTime.fromISO(nativeProps.defaultValue as string)
      : DateTime.local()

    let initial = min || defaultValue.startOf('hour').set({ hour: 9 })
    let final = max || defaultValue.startOf('hour').set({ hour: 21 })
    if (timezone) {
      initial = initial.setZone(timezone)
      final = final.setZone(timezone)
    }

    let current = initial
    const opts = []
    while (current <= final) {
      opts.push({
        label: current.toFormat('h:mm a ZZZZ'),
        value: current.toISO(),
      })
      current = current.plus({ minutes: step })
    }

    return opts
  }, [nativeProps, step, min, max, timezone])

  return (
    <Select
      {...selectProps}
      nativeProps={{
        ...nativeProps,
        onChange: (e) => onChange(DateTime.fromISO(e.target.value)),
      }}
      options={options}
    />
  )
}
