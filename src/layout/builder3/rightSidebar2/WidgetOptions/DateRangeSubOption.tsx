import { FC } from 'react'

import { useOptions } from '~/layout/builder3/context'

import { DateRangeField } from '../AddWidget/AddExperience/DateRangeField'

interface DateRangeSubOptionProps {
  title: string
  path: string
}

export const DateRangeSubOption: FC<DateRangeSubOptionProps> = ({ title, path }) => {
  const { value, update } = useOptions<[string, string | undefined]>(path)

  function handleChange(newValue?: [string, string | undefined]) {
    update(newValue)
  }

  return (
    <div className="builder-option">
      <div className="builder-option__title">{title}</div>
      <div className="builder-option__content">
        <DateRangeField value={value} onChange={handleChange} />
      </div>
    </div>
  )
}
