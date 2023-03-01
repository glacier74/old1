import { Icon } from '@earlybirdim/icons'
import FilledIcons from '@earlybirdim/icons/filled.json'
import OutlineIcons from '@earlybirdim/icons/outline.json'
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import { Input, Menus, Switch, Tabs, stopPropagation } from '@heyforms/ui'
import { isValid } from '@nily/utils'
import { FC, useMemo, useState } from 'react'

import { FileUploader } from '~/components/FileUploader'

interface EmojiPickerProps {
  onChange?: (value: string) => void
}

export const EmojiPicker: FC<EmojiPickerProps> = ({ onChange }) => {
  function handleEmojiSelect(emoji: any) {
    onChange?.(emoji.native)
  }

  return (
    <div className="emoji-picker">
      <Picker
        data={data}
        skinTonePosition="search"
        previewPosition="none"
        onEmojiSelect={handleEmojiSelect}
      />
    </div>
  )
}

const svgCompactOptions = [
  {
    value: 'outline',
    label: 'Outline'
  },
  {
    value: 'filled',
    label: 'Filled'
  }
]

interface SvgIconItemProps {
  icon: {
    name: string
    title: string
  }
  onClick: (name: string) => void
}

const SvgIconItem: FC<SvgIconItemProps> = ({ icon, onClick }) => {
  function handleClick() {
    onClick(icon.name)
  }

  return (
    <button
      key={icon.name}
      className="w-8 h-8 p-1 rounded-full text-gray-900 hover:bg-gray-400/10"
      title={icon.title}
      onClick={handleClick}
    >
      <Icon className="w-6 h-6" name={icon.name} aria-label={icon.title} />
    </button>
  )
}

export const SvgIconPicker: FC<EmojiPickerProps> = ({ onChange }) => {
  const [compact, setCompact] = useState<string>('filled')
  const [keyword, setKeyword] = useState<string>()

  const Icons = useMemo(() => {
    const _icons = compact === 'outline' ? OutlineIcons : FilledIcons

    if (isValid(keyword)) {
      return _icons.filter(icon => icon.name.toLowerCase().includes(keyword!.toLowerCase()))
    }

    return _icons
  }, [compact, keyword])

  function handleSearch(value: any) {
    setKeyword(value)
  }

  function handleCompactChange(compact: any) {
    setCompact(compact)
  }

  function handleChange(value: string) {
    onChange?.(value)
  }

  return (
    <div className="svg-icon-picker">
      <div className="flex item-center px-3 pt-2.5">
        <Input.Search className="flex-1" placeholder="Search" onChange={handleSearch} />
        <Switch.Group
          className="builder-cta-switch"
          value={compact}
          options={svgCompactOptions}
          onChange={handleCompactChange}
        />
      </div>
      <div className="flex-1 px-1.5 py-2 select-none scrollbar">
        <div className="grid grid-cols-10">
          {Icons.map(icon => (
            <SvgIconItem key={icon.name} icon={icon} onClick={handleChange} />
          ))}
        </div>
      </div>
    </div>
  )
}

interface IconPickerProps {
  onChange?: (type: string, value: string) => void
  onClose?: () => void
}

export const IconPicker: FC<IconPickerProps> = ({ onChange, onClose }) => {
  const [activeName, setActiveName] = useState('emoji')

  function handleChange(value: string) {
    onChange?.(activeName, value)

    if (activeName === 'image') {
      onClose?.()
    }
  }

  function handleActiveNameChange(activeName: any) {
    setActiveName(activeName)
  }

  return (
    <Menus className="icon-picker">
      <div onClick={stopPropagation}>
        <Tabs defaultActiveName={activeName} onChange={handleActiveNameChange}>
          <Tabs.Pane name="emoji" title="Emoji">
            <EmojiPicker onChange={handleChange} />
          </Tabs.Pane>

          <Tabs.Pane name="svg" title="Icon">
            <SvgIconPicker onChange={handleChange} />
          </Tabs.Pane>

          <Tabs.Pane name="image" title="Image">
            <div className="file-uploader">
              <FileUploader
                className="w-full h-full"
                namespace=""
                accept={['image/jpeg', 'image/png', 'image/bmp']}
                onChange={handleChange}
              />
            </div>
          </Tabs.Pane>
        </Tabs>
      </div>
    </Menus>
  )
}
