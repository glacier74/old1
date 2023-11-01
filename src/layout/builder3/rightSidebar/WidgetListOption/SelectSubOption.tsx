import { Select } from '@heyforms/ui'
import { FC } from 'react'

import { useOptions } from '~/layout/builder3/context'

interface SelectSubOptionProps {
  title: string
  path: string
  options: any[]
}

export const SelectSubOption: FC<SelectSubOptionProps> = ({ title, path, options }) => {
  const { value, update } = useOptions<string>(path)

  return (
    <div className="builder-option">
      <div className="builder-option__title">{title}</div>
      <div className="builder-option__content">
        <Select options={options} value={value} onChange={update} />
      </div>
    </div>
  )
}
