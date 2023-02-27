import { Input, Switch } from '@heyforms/ui'
import { FC } from 'react'

import { useBlockSetting } from '~/layout/builder2/context'
import { getObjectPath } from '~/layout/builder2/utils'

import { SettingField, SettingFieldProps } from './SettingField'

export const LinkSettingField: FC<SettingFieldProps> = ({ schema }) => {
  const { setting, updateSetting } = useBlockSetting<any>(schema.name)

  function handleHrefChange(href: any) {
    updateSetting(href, 'href')
  }

  function handleInNewTabChange(isInNewTab: boolean) {
    updateSetting(isInNewTab, 'isInNewTab')
  }

  return (
    <div className="builder-setting-link space-y-2">
      <div className="builder-setting-group space-y-2">
        {(schema as any).children.map((childSchema: any) => (
          <div key={childSchema.name}>
            <div className="mb-2 text-sm text-gray-700 font-medium select-none">
              {childSchema.title}
            </div>
            <SettingField
              schema={{
                ...childSchema,
                name: getObjectPath(schema.name, childSchema.name)
              }}
            />
          </div>
        ))}
      </div>

      <div className="pt-2 flex items-center justify-between">
        <div className="mb-1 text-sm text-gray-700">Link to</div>
        <Input
          className="!px-2 !py-1.5"
          value={setting?.href}
          placeholder="Enter link URL, etc, https://example.com"
          onChange={handleHrefChange}
        />
      </div>

      <div className="flex items-center justify-between">
        <div className="text-sm">Open in a new tab</div>
        <Switch value={setting?.isInNewTab} onChange={handleInNewTabChange} />
      </div>
    </div>
  )
}
