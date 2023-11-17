import { Button, Dropdown } from '@heyforms/ui'
import clsx from 'clsx'
import Image from 'next/image'
import { FC, useState } from 'react'

import { MediaPicker } from '~/components/MediaPicker'

interface ImagePickFieldProps extends ComponentProps {
  value?: string
  onChange?: (value: string) => void
}

export const ImagePickField2: FC<ImagePickFieldProps> = ({
  className,
  value,
  onChange,
  ...restProps
}) => {
  const [visible, setVisible] = useState(false)

  function handleChange(_: string, src: string) {
    onChange?.(src)
  }

  return (
    <div className={clsx('flex items-center gap-4', className)} {...restProps}>
      {value && (
        <Image
          className="w-[48px] h-[48px] object-contain"
          src={value}
          alt=""
          width={96}
          height={96}
          quality={100}
        />
      )}

      <div className="flex items-center gap-2">
        <Dropdown
          visible={visible}
          placement="left"
          overlay={<MediaPicker allowed={['image']} onChange={handleChange} />}
          offset={[0, 30]}
          onDropdownVisibleChange={setVisible}
        >
          <Button className="!py-1 !px-1.5">Change</Button>
        </Dropdown>
      </div>
    </div>
  )
}
