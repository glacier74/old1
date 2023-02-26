import { Input, Switch } from '@heyforms/ui'
import { isValid } from '@nily/utils'
import { FC } from 'react'

import { StylePicker } from '~/components'
import { useBlockSetting } from '~/layout/builder2/context'
import { getObjectPath } from '~/layout/builder2/utils'

import { SettingField, SettingFieldProps } from './SettingField'

export const LinkSettingField: FC<SettingFieldProps> = ({ schema }) => {
  const { setting, updateSetting } = useBlockSetting<any>(schema.name)

  function handleStyleChange(property: string, value: string) {
    updateSetting(value, `style.${property}`)
  }

  function handleHrefChange(href: any) {
    updateSetting(href, 'href')
  }

  function handleInNewTabChange(isInNewTab: boolean) {
    updateSetting(isInNewTab, 'isInNewTab')
  }

  return (
    <div className="builder-setting-link space-y-1 divide-y divide-gray-200">
      <div className="py-2">
        <div className="text-sm text-gray-700 font-medium select-none">Link</div>
        <div className="space-y-1">
          <div className="flex items-center justify-between">
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
          {isValid(setting?.style) && (
            <div className="flex items-center justify-between">
              <div className="text-sm">Style</div>
              <StylePicker
                properties={Object.keys(setting.style)}
                value={setting.style}
                onChange={handleStyleChange}
              />
            </div>
          )}
        </div>
      </div>

      <div className="builder-setting-group space-y-1 divide-y divide-gray-200">
        {(schema as any).children.map((childSchema: any) => (
          <div key={childSchema.name} className="py-2">
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
    </div>
  )
}
