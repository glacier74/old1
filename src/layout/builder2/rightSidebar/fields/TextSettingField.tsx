import { Input } from '@heyforms/ui'
import { FC } from 'react'

import { useBlockSetting } from '~/layout/builder2/context'

import { SettingFieldProps } from './SettingField'

export const TextSettingField: FC<SettingFieldProps> = ({ schema }) => {
  const { setting, updateSetting } = useBlockSetting<any>(schema.name)

  function handleChange(value: any) {
    updateSetting(value, 'html')
  }

  return (
    <div className="builder-setting-text">
      <div className="flex items-center justify-between">
        <div className="mb-1 text-sm text-gray-700">{schema.title || 'Content'}</div>
        <Input
          className="!px-2 !py-1.5"
          value={setting?.html}
          placeholder={schema.placeholder}
          onChange={handleChange}
        />
      </div>
    </div>
  )
}
