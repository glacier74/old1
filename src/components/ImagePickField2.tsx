import { Button, Dropdown } from '@heyforms/ui'
import clsx from 'clsx'
import Image from 'next/image'
import { FC, ReactNode, useState } from 'react'
import isURL from 'validator/lib/isURL'

import { MediaPicker } from '~/components/MediaPicker'

interface ImagePickFieldProps extends ComponentProps {
  placeholder?: ReactNode
  offset?: [number, number]
  allowClear?: boolean
  value?: string
  onChange?: (value: any) => void
}

export const ImagePickField2: FC<ImagePickFieldProps> = ({
  className,
  placeholder,
  offset = [125, 30],
  allowClear,
  value,
  onChange,
  ...restProps
}) => {
  const [visible, setVisible] = useState(false)

  function handleChange(_: string, src: string) {
    setVisible(false)
    onChange?.(src)
  }

  function handleClear() {
    onChange?.(undefined)
  }

  return (
    <div className={clsx('flex items-center gap-4', className)} {...restProps}>
      {value ? (
        isURL(value) ? (
          <Image
            className="w-[48px] h-[48px] object-contain"
            src={value}
            alt=""
            width={96}
            height={96}
            quality={100}
          />
        ) : (
          <div
            className="w-[48px] h-[48px]"
            style={{
              backgroundImage: value
            }}
          />
        )
      ) : (
        placeholder
      )}

      <div className="flex items-center gap-2">
        <Dropdown
          visible={visible}
          placement="left"
          overlay={<MediaPicker allowed={['image']} onChange={handleChange} />}
          offset={offset}
          onDropdownVisibleChange={setVisible}
        >
          <Button className="!py-1 !px-1.5">Change</Button>
        </Dropdown>

        {allowClear && (
          <Button className="!py-1 !px-1.5" onClick={handleClear}>
            Clear
          </Button>
        )}
      </div>
    </div>
  )
}
