import { IconChevronLeft, IconChevronRight } from '@tabler/icons'
import { FC, useMemo } from 'react'
import DatePicker from 'react-datepicker'

interface DateRangerFieldProps {
  value?: [string, string | undefined]
  onChange?: (value?: [string, string | undefined]) => void
}

export const DateRangeField: FC<DateRangerFieldProps> = ({ value = [], onChange }) => {
  const [startDate, endDate] = useMemo(
    () => [value[0] ? new Date(value[0]) : null, value[1] ? new Date(value[1]) : null],
    [value]
  )

  function handleChange(value: [Date, Date | null]) {
    if (!value || !value[0]) {
      return onChange?.()
    }

    onChange?.([value[0]?.toUTCString(), value[1]?.toUTCString()])
  }

  return (
    <DatePicker
      selected={startDate}
      onChange={handleChange}
      startDate={startDate}
      endDate={endDate}
      popperPlacement="bottom"
      previousYearButtonLabel={<IconChevronLeft className="mt-1 -ml-3" />}
      nextYearButtonLabel={<IconChevronRight className="mt-1 -ml-3" />}
      showMonthYearPicker
      dateFormat="MMM yyyy"
      selectsRange
    />
  )
}
