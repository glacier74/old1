import { Select } from '@heyforms/ui'
import { FC } from 'react'

import { useOptions } from '../context'
import { OptionProps } from './OptionGroup'

export const SelectOption: FC<OptionProps> = ({ parentName, schema }) => {
  const { value, update } = useOptions<string>([parentName, schema.name].filter(Boolean).join('.'))

  return (
    <div className="builder-option">
      <div className="builder-option__title">{schema.title}</div>
      <div className="builder-option__content">
        <Select
          options={schema.options}
          defaultValue={schema.options[0]?.value}
          value={value}
          onChange={update}
        />
      </div>
    </div>
  )
}
