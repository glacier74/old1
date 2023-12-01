import { Button, Dropdown } from '@heyforms/ui'
import Image from 'next/image'
import { FC, useState } from 'react'

import { MediaPicker } from '~/components'
import { useOptions } from '~/layout/builder3/context'

interface ImageSubOptionProps {
  title: string
  path: string
}

export const ImageSubOption: FC<ImageSubOptionProps> = ({ title, path }) => {
  const { value, update } = useOptions<string>(path)
  const [visible, setVisible] = useState(false)

  function handleChange(_: string, src: string) {
    setVisible(false)
    update(src)
  }

  return (
    <div className="builder-option">
      <div className="builder-option__title">{title}</div>
      <div className="builder-option__content">
        <div className="flex items-center gap-4">
          {value && (
            <Image
              className="w-[48px] h-[48px] object-contain rounded-md"
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
      </div>
    </div>
  )
}
