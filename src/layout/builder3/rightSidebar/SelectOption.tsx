import { Switch } from '@heyforms/ui'
import { FC } from 'react'

import { useOptions } from '../context'
import { OptionProps } from './OptionGroup'

export const SelectOption: FC<OptionProps> = ({ parentName, schema }) => {
  const { value, update } = useOptions<string>([parentName, schema.name].filter(Boolean).join('.'))

  return (
    <div className="builder-option">
      <div className="flex items-center justify-between">
        <div className="builder-option__title">{schema.title}</div>

        <Switch.Group
          className="builder-cta-switch"
          value={value}
          options={schema.options}
          onChange={update}
        />
      </div>
    </div>
  )
}
