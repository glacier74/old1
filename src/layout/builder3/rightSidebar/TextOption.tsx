import { FC } from 'react'

import { AutoSizeTextarea } from '~/components'

import { useOptions } from '../context'
import { OptionProps } from './OptionGroup'

export const TextOption: FC<OptionProps> = ({ parentName, schema }) => {
  const { value, update } = useOptions<string>([parentName, schema.name].filter(Boolean).join('.'))

  return (
    <div className="builder-option">
      <div className="builder-option__title">{schema.title}</div>
      <div className="builder-option__content">
        <AutoSizeTextarea value={value} minRows={schema.defaultRows} onChange={update} />
      </div>
    </div>
  )
}
