import { Dropdown, Menus, stopPropagation } from '@heyforms/ui'
import { CSSProperties, FC } from 'react'

import { ColorPicker } from '~/components/ColorPicker'

interface StylePickerProps {
  value?: CSSProperties
  properties: string[]
  onChange: (property: string, value: string) => void
}

const propertyNames: AnyMap<string> = {
  color: 'Color',
  background: 'Background',
  paddingTop: 'Padding Top',
  paddingBottom: 'Padding Bottom'
}

interface StylePickerItemProps {
  property: string
  value?: string
  onChange: (property: string, value: string) => void
}

export const StylePickerItem: FC<StylePickerItemProps> = ({ property, value, onChange }) => {
  function handleChange(value: string) {
    onChange(property, value)
  }

  return (
    <div className="w-full flex items-center justify-between">
      <div className="text-sm">{propertyNames[property]}</div>
      <ColorPicker value={value} onChange={handleChange} />
    </div>
  )
}

export const StylePicker: FC<StylePickerProps> = ({ value, properties, onChange }) => {
  const Overlay = (
    <Menus className="w-[15rem]">
      <div className="py-3 px-4 space-y-1" onClick={stopPropagation}>
        <div className="mb-2 text-sm font-bold">Style</div>

        {properties.map(property => (
          <StylePickerItem
            property={property}
            value={value ? (value as AnyMap<string>)[property] : undefined}
            onChange={onChange}
          />
        ))}
      </div>
    </Menus>
  )

  return (
    <Dropdown overlay={Overlay}>
      <div className="color-picker__background" style={value}>
        <span>A</span>
      </div>
    </Dropdown>
  )
}
