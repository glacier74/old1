import { Button, Dropdown } from '@heyforms/ui'
import Image from 'next/image'
import { FC, useState } from 'react'

import { MediaPicker } from '~/components'

import { useOptions } from '../context'
import { OptionProps } from './OptionGroup'

export const ImageOption: FC<OptionProps> = ({ parentName, schema }) => {
  const { value, update } = useOptions<string>([parentName, schema.name].filter(Boolean).join('.'))
  const [visible, setVisible] = useState(false)

  function handleChange(_: string, src: string) {
    update(src)
    setVisible(false)
  }

  function handleClear() {
    update(undefined)
  }

  return (
    <div className="builder-option">
      <div className="builder-option__title">{schema.title}</div>
      <div className="builder-option__content">
        <div className="flex items-center gap-4">
          {value && <Image src={value} alt="" width={48} height={48} />}

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

            {value && (
              <Button.Link className="!py-1 !px-2 !text-slate-600" onClick={handleClear}>
                Clear
              </Button.Link>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
