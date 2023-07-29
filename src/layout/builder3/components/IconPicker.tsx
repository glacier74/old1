import { Icon } from '@earlybirdim/icons'
import LineIcons from '@earlybirdim/icons/line.json'
import SolidIcons from '@earlybirdim/icons/solid.json'
import { Input, Switch } from '@heyforms/ui'
import { isValid } from '@nily/utils'
import { FC, useMemo, useState } from 'react'

const options = [
  {
    value: 'line',
    label: 'Line'
  },
  {
    value: 'solid',
    label: 'Solid'
  }
]

interface IconItemProps {
  icon: {
    name: string
    title: string
  }
  onClick: (name: string) => void
}

interface IconPickerProps {
  onChange?: (value: string) => void
}

const IconItem: FC<IconItemProps> = ({ icon, onClick }) => {
  function handleClick() {
    onClick(icon.name)
  }

  return (
    <div
      className="w-8 h-8 mb-2 flex items-center justify-center rounded-full text-slate-600 hover:bg-slate-400/10 cursor-pointer"
      title={icon.title}
      onClick={handleClick}
    >
      <Icon className="w-5 h-5" name={icon.name} aria-label={icon.title} />
    </div>
  )
}

export const IconPicker: FC<IconPickerProps> = ({ onChange }) => {
  const [type, setType] = useState<string>('line')
  const [query, setQuery] = useState<string>()

  const list = useMemo(() => {
    const l = type === 'line' ? LineIcons : SolidIcons

    if (isValid(query)) {
      return l.filter(icon =>
        icon.icons.some(i => i.name.toLowerCase().includes(query!.toLowerCase()))
      )
    }

    return l
  }, [type, query])

  function handleChange(value: string) {
    onChange?.(value)
  }

  return (
    <div className="svg-icon-picker">
      <div className="flex item-center px-3 pt-2.5">
        <Input.Search className="flex-1" placeholder="Search" onChange={setQuery} />
        <Switch.Group
          className="builder-cta-switch"
          value={type}
          options={options}
          onChange={setType}
        />
      </div>
      <div className="flex-1 px-3 py-2 select-none scrollbar space-y-4">
        {list.map(row => (
          <div key={row.category}>
            <div className="py-1 text-sm font-medium text-slate-700">{row.category}</div>
            <div className="grid grid-cols-8">
              {row.icons.map(icon => (
                <IconItem key={icon.name} icon={icon} onClick={handleChange} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
