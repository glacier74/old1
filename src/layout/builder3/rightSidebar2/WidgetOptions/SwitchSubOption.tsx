import { Switch } from '@heyforms/ui'
import { FC } from 'react'

import { useOptions } from '~/layout/builder3/context'

interface SwitchSubOptionProps {
  title: string
  path: string
}

export const SwitchSubOption: FC<SwitchSubOptionProps> = ({ title, path }) => {
  const { value, update } = useOptions<boolean>(path)

  function handleChange(newValue: boolean) {
    update(newValue)
  }

  return (
    <div className="builder-option">
      <div className="builder-option__title flex items-center justify-between">
        <div>{title}</div>
        <Switch value={value} onChange={handleChange} />
      </div>
    </div>
  )
}
