import { Dropdown, Menus, ColorPicker as _ColorPicker, stopPropagation } from '@heyforms/ui'
import { ColorPickerProps as _ColorPickerProps } from '@heyforms/ui/types/color-picker'
import { FC } from 'react'

import { THEME_PRESET_COLORS } from '~/constants'

interface ColorPickerProps extends Omit<_ColorPickerProps, 'color'> {
  placement?: string
  value?: string
}

export const ColorPicker: FC<ColorPickerProps> = ({
  value,
  placement,
  presets = THEME_PRESET_COLORS,
  onChange
}) => {
  function handleChange(value: string) {
    onChange?.(value)
  }

  const Overlay = (
    <Menus className="w-[280px]">
      <div className="py-3 px-4" onClick={stopPropagation}>
        <_ColorPicker value={value} presets={presets} onChange={handleChange} />
      </div>
    </Menus>
  )

  return (
    <Dropdown placement={placement as any} overlay={Overlay}>
      <div className="color-picker-v2">
        <div className="color-picker__background" style={{ background: value }} />
        <div className="color-picker__value">{value || 'Change'}</div>
      </div>
    </Dropdown>
  )
}
