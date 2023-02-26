import { Input } from '@heyforms/ui'
import { isValid } from '@nily/utils'
import { FC } from 'react'

import { StylePicker } from '~/components'
import { useBlockSetting } from '~/layout/builder2/context'

import { SettingFieldProps } from './SettingField'

export const EmailCaptureSettingField: FC<SettingFieldProps> = ({ schema }) => {
  const { setting, updateSetting } = useBlockSetting<any>(schema.name)

  function handleChange(value: any) {
    updateSetting(value, 'button.text')
  }

  function handleButtonStyleChange(property: string, value: string) {
    updateSetting(value, `button.style.${property}`)
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

      {isValid(setting?.button?.style) && (
        <div className="flex items-center justify-between">
          <div className="text-sm">Style</div>
          <StylePicker
            properties={Object.keys(setting.button.style)}
            value={setting.button.style}
            onChange={handleButtonStyleChange}
          />
        </div>
      )}
    </div>
  )
}
