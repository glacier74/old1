import { Select, Switch } from '@heyforms/ui'
import { isValid } from '@nily/utils'
import clsx from 'clsx'
import { FC, useMemo } from 'react'

import { StylePicker } from '~/components'
import { useBlockSetting, useBuilderContext } from '~/layout/builder2/context'
import { BlockIconText } from '~/layout/builder2/leftSidebar/BlockItem'
import { getObjectPath } from '~/layout/builder2/utils'

import { SettingField, SettingFieldProps } from './SettingField'

export const LinkSettingField: FC<SettingFieldProps> = ({ schema }) => {
  const { setting, updateSetting } = useBlockSetting<any>(schema.name)
  const { state } = useBuilderContext()

  function handleHrefChange(href: any) {
    updateSetting(href, 'href')
  }

  function handleInNewTabChange(isInNewTab: boolean) {
    updateSetting(isInNewTab, 'isInNewTab')
  }

  function handleStyleChange(property: string, value: string) {
    updateSetting(value, `style.${property}`)
  }

  const options = useMemo(() => {
    return [
      {
        type: 'blocks',
        label: 'Blocks',
        disabled: true
      },
      ...state.blocks
        .filter(b => b.id !== state.selectedBlockId)
        .map(b => ({
          value: `#earlybird-block-${b.id}`,
          type: b.type
        }))
    ] as any
  }, [state.blocks, state.selectedBlockId])

  function optionRender(option: any) {
    if (option.type === 'blocks') {
      return <div className="px-2 py-1 pointer-events-none text-slate-500">{option.label}</div>
    }

    return (
      <BlockIconText className="flex-1 p-2 cursor-pointer hover:bg-slate-100" type={option.type} />
    )
  }

  return (
    <div className="builder-setting-link space-y-2">
      <div className="builder-setting-group divide-y divide-slate-200 space-y-2">
        {(schema as any).children.map((childSchema: any, index: number) => (
          <div key={childSchema.name} className={clsx({ 'pt-4': index > 0 })}>
            <div className="builder-list-title">{childSchema.title}</div>
            <SettingField
              schema={{
                ...childSchema,
                name: getObjectPath(schema.name, childSchema.name)
              }}
            />
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between">
        <div className="mb-1 text-sm text-slate-700">Link to</div>
        <Select
          className="builder-setting-link-select"
          options={options}
          value={setting?.href}
          optionRender={optionRender}
          allowInput={true}
          alwaysInput={true}
          placeholder="Enter link URL, etc, https://example.com"
          onChange={handleHrefChange}
        />
      </div>

      {!setting?.href?.startsWith('#') && (
        <div className="flex items-center justify-between">
          <div className="text-sm">Open in a new tab</div>
          <Switch value={setting?.isInNewTab} onChange={handleInNewTabChange} />
        </div>
      )}

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
