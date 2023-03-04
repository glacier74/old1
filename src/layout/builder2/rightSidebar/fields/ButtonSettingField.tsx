import { Input, Switch } from '@heyforms/ui'
import { FC, useMemo } from 'react'

import { ColorPicker } from '~/components/ColorPicker'
import { useBlockSetting } from '~/layout/builder2/context'

import { SettingFieldProps } from './SettingField'

export const ButtonSettingField: FC<SettingFieldProps> = ({ schema }) => {
  const { setting, updateSetting } = useBlockSetting<any>(schema.name)

  function handleTextChange(text: any) {
    updateSetting(text, 'text')
  }

  function handleUrlChange(url: any) {
    updateSetting(url, 'url')
  }

  function handleInNewTabChange(isInNewTab: boolean) {
    updateSetting(isInNewTab, 'isInNewTab')
  }

  function handleBackgroundChange(background: string) {
    updateSetting(background, 'style.background')
  }

  function handleColorChange(color: string) {
    updateSetting(color, 'style.color')
  }

  const TextColorPicker = useMemo(() => {
    if (setting?.style?.color) {
      return <ColorPicker value={setting?.style?.color} onChange={handleColorChange} />
    }
  }, [setting?.style?.color])

  const Background = useMemo(() => {
    if (setting?.style?.background) {
      return (
        <div className="flex items-center justify-between">
          <div className="mb-1 text-sm">Background</div>
          <ColorPicker
            value={setting?.style?.background as string}
            onChange={handleBackgroundChange}
          />
        </div>
      )
    }
  }, [setting?.style?.background])

  return (
    <div className="builder-setting-button space-y-2">
      <div>
        <div className="mb-1 text-sm text-slate-700">Text</div>
        <Input
          value={setting?.text}
          trailing={TextColorPicker}
          placeholder="Enter button text"
          onChange={handleTextChange}
        />
      </div>

      {Background}

      <div>
        <div className="mb-1 text-sm text-slate-700">URL</div>
        <Input
          value={setting?.url}
          placeholder="Enter button URL, etc, https://example.com"
          onChange={handleUrlChange}
        />
      </div>

      <div className="flex items-center justify-between">
        <div className="text-sm">Open in a new tab</div>
        <Switch value={setting?.isInNewTab} onChange={handleInNewTabChange} />
      </div>
    </div>
  )
}
