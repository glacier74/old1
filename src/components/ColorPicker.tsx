import { Dropdown, Menus, ColorPicker as _ColorPicker, stopPropagation } from '@heyforms/ui'
import { ColorPickerProps as _ColorPickerProps } from '@heyforms/ui/types/color-picker'
import { FC } from 'react'

import { THEME_PRESET_COLORS } from '~/constants'

interface ColorPickerProps extends Omit<_ColorPickerProps, 'color'> {
  value?: string
}

const IconDroplet: FC<{ fill?: string }> = ({ fill = '#fff' }) => (
  <svg
    className="w-5 h-5"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M6.79999 11C6.27409 11.9122 5.9975 12.9467 5.99799 13.9996C5.99847 15.0525 6.27602 16.0867 6.80276 16.9984C7.32949 17.9101 8.08686 18.6671 8.99879 19.1934C9.91071 19.7197 10.9451 19.9968 11.998 19.9968C13.0509 19.9968 14.0853 19.7197 14.9972 19.1934C15.9091 18.6671 16.6665 17.9101 17.1932 16.9984C17.7199 16.0867 17.9975 15.0525 17.998 13.9996C17.9985 12.9467 17.7219 11.9122 17.196 11L11.999 3L6.79899 11H6.79999Z"
      fill={fill}
      stroke={fill}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      opacity="0.2"
      d="M6.79999 11C6.27409 11.9122 5.9975 12.9467 5.99799 13.9996C5.99847 15.0525 6.27602 16.0867 6.80276 16.9984C7.32949 17.9101 8.08686 18.6671 8.99879 19.1934C9.91071 19.7197 10.9451 19.9968 11.998 19.9968C13.0509 19.9968 14.0853 19.7197 14.9972 19.1934C15.9091 18.6671 16.6665 17.9101 17.1932 16.9984C17.7199 16.0867 17.9975 15.0525 17.998 13.9996C17.9985 12.9467 17.7219 11.9122 17.196 11L11.999 3L6.79899 11H6.79999Z"
      stroke="black"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export const ColorPicker: FC<ColorPickerProps> = ({
  value,
  presetColors = THEME_PRESET_COLORS,
  onChange
}) => {
  function handleChange(value: string) {
    onChange?.(value)
  }

  const Overlay = (
    <Menus className="w-[15rem]">
      <div className="py-3 px-4" onClick={stopPropagation}>
        <_ColorPicker color={value} presetColors={presetColors} onChange={handleChange} />
      </div>
    </Menus>
  )

  return (
    <Dropdown overlay={Overlay}>
      <div className="color-picker-v2">
        <div className="color-picker__background" style={{ background: value }} />
        <div className="color-picker__value">{value || 'Add...'}</div>
      </div>
    </Dropdown>
  )
}
