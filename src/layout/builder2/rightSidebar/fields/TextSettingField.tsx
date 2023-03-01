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
      <div className="builder-text-title">{schema.title || 'Content'}</div>
      <Input className="!px-2 !py-1.5" value={setting?.html} onChange={handleChange} />
    </div>
  )
}
