import { FC } from 'react'

import { RichTextEditor } from '~/components'
import { ColorPicker } from '~/components/ColorPicker'
import { useBlockSetting } from '~/layout/builder2/context'

import { SettingFieldProps } from './SettingField'

export const HtmlSettingField: FC<SettingFieldProps> = ({ schema }) => {
  const { setting, updateSetting } = useBlockSetting<any>(schema.name)

  function handleChange(html: string) {
    updateSetting(html, 'html')
  }

  function handleColorChange(color: string) {
    updateSetting(color, 'style.color')
  }

  return (
    <div className="builder-setting-text space-y-2">
      <RichTextEditor value={setting?.html} onChange={handleChange} />

      {setting?.style?.color && (
        <div className="flex items-center justify-between">
          <div className="text-sm">Color</div>
          <ColorPicker value={setting?.style?.color as string} onChange={handleColorChange} />
        </div>
      )}
    </div>
  )
}
