import { Button, Dropdown, Menus, Tabs } from '@heyforms/ui'
import clsx from 'clsx'
import Image from 'next/image'
import { FC, useState } from 'react'
import isURL from 'validator/lib/isURL'

import { FileUploader } from '~/components'

import { Gradient } from './Gradient'
import { Unsplash } from './Unsplash'

interface MediaPickerProps {
  onColorChange?: (color: string) => void
  onChange?: (type: 'image' | 'gradient' | 'unsplash', value: any) => void
}

interface ImagePickFieldProps extends Pick<MediaPickerProps, 'onColorChange'>, ComponentProps {
  value?: string
  onClear?: () => void
  onChange?: (value: any) => void
}

const MediaPicker: FC<MediaPickerProps> = ({ onColorChange, onChange }) => {
  const [activeName, setActiveName] = useState('image')

  function handleActiveNameChange(activeName: any) {
    setActiveName(activeName)
  }

  return (
    <Menus className="customize-picker">
      <Tabs className="h-full" activeName={activeName} onChange={handleActiveNameChange}>
        <Tabs.Pane name="image" title="Image">
          <div className="file-uploader">
            <FileUploader
              className="w-full h-full"
              accept={['image/jpeg', 'image/webp', 'image/png', 'image/bmp', 'image/gif']}
              onChange={value => onChange?.('image', value)}
            />
          </div>
        </Tabs.Pane>

        <Tabs.Pane name="gradient" title="Gradient">
          <Gradient onChange={value => onChange?.('gradient', value)} />
        </Tabs.Pane>

        <Tabs.Pane name="unsplash" title="Unsplash">
          <Unsplash
            onColorChange={onColorChange}
            onChange={value => onChange?.('unsplash', value)}
          />
        </Tabs.Pane>
      </Tabs>
    </Menus>
  )
}

export const ImagePickField: FC<ImagePickFieldProps> = ({
  className,
  value,
  onColorChange,
  onClear,
  onChange,
  ...restProps
}) => {
  const [visible, setVisible] = useState(false)

  function handleChange(type: string, src: string) {
    if (type === 'image') {
      setVisible(false)
    }

    onChange?.(src)
  }

  return (
    <div className={clsx('flex items-center gap-4', className)} {...restProps}>
      {value &&
        (isURL(value) ? (
          <Image
            className="w-[36px] h-[36px] object-contain"
            src={value}
            alt=""
            width={96}
            height={96}
            quality={100}
          />
        ) : (
          <div
            className="w-[36px] h-[36px]"
            style={{
              backgroundImage: value
            }}
          />
        ))}

      <div className="flex items-center gap-2">
        <Dropdown
          visible={visible}
          placement="left"
          overlay={<MediaPicker onColorChange={onColorChange} onChange={handleChange} />}
          offset={[120, 30]}
          dismissOnClickInside={false}
          onDropdownVisibleChange={setVisible}
        >
          <Button className="!py-1 !px-1.5">Change</Button>
        </Dropdown>

        {value && (
          <Button className="!py-1 !px-1.5" onClick={onClear}>
            Clear
          </Button>
        )}
      </div>
    </div>
  )
}
