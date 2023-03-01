import { Switch } from '@heyforms/ui'
import { FC } from 'react'

import { useBlockSetting } from '~/layout/builder2/context'

import { SettingFieldProps } from './SettingField'

export const OptionalSettingField: FC<SettingFieldProps> = ({ schema }) => {
  const { setting, updateSetting } = useBlockSetting<any>(schema.name)

  function handleChange(value: any) {
    updateSetting(value, 'show')
  }

  return (
    <div className="builder-setting-text space-y-2">
      <div className="flex items-center justify-between">
        <div className="mb-1 text-sm text-gray-700">{schema.title || 'Enable'}</div>
        <Switch value={setting?.show} onChange={handleChange} />
      </div>
    </div>
  )
}
