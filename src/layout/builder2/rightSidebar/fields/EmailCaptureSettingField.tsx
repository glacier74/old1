import { Input } from '@heyforms/ui'
import { FC } from 'react'

import { useBlockSetting } from '~/layout/builder2/context'

import { SettingFieldProps } from './SettingField'

export const EmailCaptureSettingField: FC<SettingFieldProps> = ({ schema }) => {
  const { setting, updateSetting } = useBlockSetting<any>(schema.name)

  function handleChange(value: any) {
    updateSetting(value, 'button.text')
  }

  return (
    <div className="builder-setting-text space-y-2">
      <div>
        <div className="mb-1 text-sm text-gray-700">Button Text</div>
        <Input
          value={setting?.button.text}
          placeholder={schema.placeholder}
          onChange={handleChange}
        />
      </div>
    </div>
  )
}
