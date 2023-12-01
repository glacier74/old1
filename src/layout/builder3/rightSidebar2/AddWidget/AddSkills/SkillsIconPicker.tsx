import { Button, Dropdown, Input, Menus, Tabs, stopPropagation } from '@heyforms/ui'
import { isValid } from '@nily/utils'
import { FC, useCallback, useMemo, useState } from 'react'

import { FileUploader } from '~/components'

import { SkillsIcon } from './SkillsIcons'
import SKILLS from './skills.json'

interface SvgIconPickerProps {
  onChange?: (name: string, title?: string) => void
}

interface SvgIconItemProps {
  icon: {
    name: string
    title: string
  }
  onClick: (name: string, title: string) => void
}

export interface SkillsIconType {
  type: 'svg' | 'image'
  value: string
  title?: string
}

interface SkillsIconPickerProps {
  value?: SkillsIconType
  onChange?: (value: SkillsIconType) => void
  onClose?: () => void
}

const SvgIconItem: FC<SvgIconItemProps> = ({ icon, onClick }) => {
  function handleClick() {
    onClick(icon.name, icon.title)
  }

  return (
    <button
      key={icon.name}
      className="group/picker h-10 w-10 rounded-lg hover:shadow"
      title={icon.title}
      onClick={handleClick}
    >
      <SkillsIcon iconType="svg" svgName={icon.name} />
    </button>
  )
}

export const SvgIconPicker: FC<SvgIconPickerProps> = ({ onChange }) => {
  const [keyword, setKeyword] = useState<string>()

  const Icons = useMemo(() => {
    if (isValid(keyword)) {
      return SKILLS.filter(icon =>
        icon.icons.some(i => i.name.toLowerCase().includes(keyword!.toLowerCase()))
      )
    }

    return SKILLS
  }, [keyword])

  function handleSearch(value: any) {
    setKeyword(value)
  }

  function handleChange(value: string, title: string) {
    onChange?.(value, title)
  }

  return (
    <div className="svg-icon-picker">
      <div className="px-3 pt-2.5">
        <Input.Search className="w-full" placeholder="Search" onChange={handleSearch} />
      </div>
      <div className="flex-1 px-3 py-4 space-y-6 select-none scrollbar">
        {Icons.map(row => (
          <div key={row.category}>
            <div className="text-sm font-bold text-slate-800">{row.category}</div>
            <div className="mt-3 grid grid-cols-6 gap-4">
              {row.icons.map(icon => (
                <SvgIconItem key={icon.name} icon={icon} onClick={handleChange} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export const SkillsIconPicker: FC<SkillsIconPickerProps> = ({ value, onChange, onClose }) => {
  const [type, setType] = useState<SkillsIconType['type']>('svg')
  const [visible, setVisible] = useState(false)

  const handleChange = useCallback(
    (value: string, title?: string) => {
      onChange?.({
        type,
        value,
        title
      })

      if (type === 'image') {
        onClose?.()
      }
    },
    [onChange, onClose, type]
  )

  const Overlay = useMemo(
    () => (
      <Menus className="icon-picker">
        <div onClick={stopPropagation}>
          <Tabs activeName={type} onChange={setType}>
            <Tabs.Pane name="svg" title="Icon">
              <SvgIconPicker onChange={handleChange} />
            </Tabs.Pane>

            <Tabs.Pane name="image" title="Image">
              <div className="file-uploader">
                <FileUploader
                  className="w-full h-full"
                  accept={['image/jpeg', 'image/png', 'image/bmp', 'image/gif', 'image/webp']}
                  onChange={handleChange}
                />
              </div>
            </Tabs.Pane>
          </Tabs>
        </div>
      </Menus>
    ),
    [handleChange, type]
  )

  return (
    <div className="flex items-center gap-4">
      {value && <SkillsIcon iconType={value.type} svgName={value.value} imageUrl={value.value} />}

      <div className="flex items-center gap-2">
        <Dropdown
          visible={visible}
          placement="left"
          overlay={Overlay}
          offset={[125, value ? 85 : 30]}
          onDropdownVisibleChange={setVisible}
        >
          <Button className="!py-1 !px-1.5">Change</Button>
        </Dropdown>
      </div>
    </div>
  )
}
