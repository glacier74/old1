import { Input } from '@heyforms/ui'
import { FC } from 'react'

import { ColorPicker } from '~/components/ColorPicker'
import { useBlockSetting } from '~/layout/builder2/context'

import { SettingFieldProps } from './SettingField'

export const TextSettingField: FC<SettingFieldProps> = ({ schema }) => {
  const { setting, updateSetting } = useBlockSetting<any>(schema.name)

  function handleChange(value: any) {
    updateSetting(value, 'html')
  }

  function handleColorChange(color: string) {
    updateSetting(color, 'style.color')
  }

  return (
    <div className="builder-setting-text space-y-2">
      <div className="flex items-center justify-between">
        <div className="builder-text-title">Content</div>
        <Input className="!px-2 !py-[0.34rem]" value={setting?.html} onChange={handleChange} />
      </div>

      {setting?.style?.color && (
        <div className="flex items-center justify-between">
          <div className="text-sm">Color</div>
          <ColorPicker value={setting?.style?.color as string} onChange={handleColorChange} />
        </div>
      )}
    </div>
  )
}
