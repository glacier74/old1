import { Button, ColorPicker, Dropdown, Menus, Select, stopPropagation } from '@heyforms/ui'
import { IconCheck, IconChevronDown } from '@tabler/icons'
import { useTranslation } from 'next-i18next'
import { FC } from 'react'

import { GOOGLE_FONTS_OPTIONS, THEME_COLOR_KEYS, THEME_PRESET_COLORS } from '~/constants'
import { useBuilderContext } from '~/layout/builder/context'

interface ColorPickerItemProps {
  label: string
  name: string
  value?: string
  onChange?: (name: string, value: string) => void
}

export const ColorPickerItem: FC<ColorPickerItemProps> = ({ label, name, value, onChange }) => {
  function handleChange(value: string) {
    onChange?.(name, value)
  }

  const Overlay = (
    <Menus className="w-[15rem]">
      <div className="py-3 px-4" onClick={stopPropagation}>
        <ColorPicker color={value} presetColors={THEME_PRESET_COLORS} onChange={handleChange} />
      </div>
    </Menus>
  )

  return (
    <div className="right-sidebar-settings-item">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium">{label}</label>
        <Dropdown overlay={Overlay}>
          <Button className="!px-2.5 !py-1.5" trailing={<IconChevronDown />}>
            <div
              className="w-4 h-4 rounded-full border border-slate-200"
              style={{ backgroundColor: value }}
            />
          </Button>
        </Dropdown>
      </div>
    </div>
  )
}

export const CustomizePane: FC = () => {
  const { t } = useTranslation()
  const { state, dispatch } = useBuilderContext()

  function handleChange(name: string, value: string) {
    dispatch({
      type: 'setTheme',
      payload: {
        [name]: value
      }
    })
  }

  function handleFontFamilyChange(value: any) {
    handleChange('fontFamily', value)
  }

  function optionRender(option: any) {
    return (
      <div className="flex flex-1 items-center justify-between p-2 cursor-pointer hover:bg-slate-100">
        <span
          className="text-sm"
          style={{
            fontFamily: option.value
          }}
        >
          {option.label}
        </span>
        {state.theme.fontFamily === option.value && (
          <IconCheck className="w-5 h-5 text-green-500" />
        )}
      </div>
    )
  }

  return (
    <div className="p-5 space-y-3">
      <Select
        value={state.theme.fontFamily}
        options={GOOGLE_FONTS_OPTIONS}
        optionRender={optionRender}
        onChange={handleFontFamilyChange}
      />

      {THEME_COLOR_KEYS.map(row => (
        <ColorPickerItem
          key={row.value}
          label={t(row.label)}
          name={row.value}
          value={(state.theme as AnyMap<string>)[row.value]}
          onChange={handleChange}
        />
      ))}
    </div>
  )
}
