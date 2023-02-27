import { FC } from 'react'

import { RichTextEditor } from '~/components'
import { useBlockSetting } from '~/layout/builder2/context'

import { SettingFieldProps } from './SettingField'

export const HtmlSettingField: FC<SettingFieldProps> = ({ schema }) => {
  const { setting, updateSetting } = useBlockSetting<any>(schema.name)

  function handleChange(html: string) {
    updateSetting(html, 'html')
  }

  return (
    <div className="builder-setting-text space-y-1">
      <RichTextEditor value={setting?.html} onChange={handleChange} />
    </div>
  )
}
