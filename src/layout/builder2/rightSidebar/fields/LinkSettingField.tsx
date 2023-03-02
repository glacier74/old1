import { Select, Switch } from '@heyforms/ui'
import { FC, useMemo } from 'react'

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
      return <div className="px-2 py-1 pointer-events-none text-gray-500">{option.label}</div>
    }

    return (
      <BlockIconText className="flex-1 p-2 cursor-pointer hover:bg-slate-100" type={option.type} />
    )
  }

  return (
    <div className="builder-setting-link space-y-2">
      <div className="builder-setting-group space-y-2">
        {(schema as any).children.map((childSchema: any) => (
          <div key={childSchema.name}>
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

      <div>
        <div className="mb-1 text-sm text-gray-700">Link to</div>
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

      <div className="flex items-center justify-between">
        <div className="text-sm">Open in a new tab</div>
        <Switch value={setting?.isInNewTab} onChange={handleInNewTabChange} />
      </div>
    </div>
  )
}
