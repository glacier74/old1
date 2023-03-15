import { isValid } from '@nily/utils'
import { FC } from 'react'

import { StylePicker } from '~/components'
import { useBlockSetting } from '~/layout/builder2/context'

import { SettingFieldProps } from './SettingField'

export const SwitchGroupSettingField: FC<SettingFieldProps> = ({ schema }) => {
  const { setting, updateSetting } = useBlockSetting<any>(schema.name)

  function handleStyleChange(property: string, value: string) {
    updateSetting(value, `style.${property}`)
  }

  return (
    <div className="builder-setting-text space-y-2">
      {isValid(setting?.style) && (
        <div className="flex items-center justify-between">
          <div className="text-sm text-slate-700">Style</div>
          <StylePicker
            properties={Object.keys(setting!.style)}
            value={setting!.style}
            onChange={handleStyleChange}
          />
        </div>
      )}
    </div>
  )
}
