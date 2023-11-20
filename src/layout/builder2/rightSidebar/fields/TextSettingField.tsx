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
      {schema.style === 'style2' ? (
        <div className="flex flex-col gap-0.5">
          <div className="builder-text-title">{schema.title}</div>
          <Input
            className="w-full !px-2 !py-[0.34rem]"
            value={setting?.html}
            onChange={handleChange}
          />
        </div>
      ) : (
        <div className="flex items-center justify-between gap-2">
          <div className="builder-text-title">Content</div>
          <Input
            className="max-w-[11.25rem] !px-2 !py-[0.34rem]"
            value={setting?.html}
            onChange={handleChange}
          />
        </div>
      )}

      {setting?.style?.color && (
        <div className="flex items-center justify-between">
          <div className="text-sm">Color</div>
          <ColorPicker value={setting?.style?.color as string} onChange={handleColorChange} />
        </div>
      )}
    </div>
  )
}
