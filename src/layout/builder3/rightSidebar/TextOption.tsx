import { Input } from '@heyforms/ui'
import { FC } from 'react'

import { useOptions } from '../context'
import { OptionProps } from './OptionGroup'

export const TextOption: FC<OptionProps> = ({ parentName, schema }) => {
  const { value, update } = useOptions<string>([parentName, schema.name].filter(Boolean).join('.'))

  return (
    <div className="builder-option">
      <div className="builder-option__title">{schema.title}</div>
      <div className="builder-option__content">
        <Input className="w-full !px-2 !py-[0.34rem]" value={value} onChange={update} />
      </div>
    </div>
  )
}
