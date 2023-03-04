import { $Image } from '@earlybirdim/blocks'
import { Button, Dropdown, Input } from '@heyforms/ui'
import { FC, useState } from 'react'

import { MediaPicker } from '~/components'
import { useBlockSetting } from '~/layout/builder2/context'

import { SettingFieldProps } from './SettingField'

export const MediaSettingField: FC<SettingFieldProps> = ({ schema }) => {
  const { setting, updateSetting } = useBlockSetting<any>(schema.name)
  const [visible, setVisible] = useState(false)

  function handleImageChange(type: string, src: string) {
    updateSetting(type, 'type')
    updateSetting(src, 'src')
    setVisible(false)
  }

  function handleAltChange(alt: any) {
    updateSetting(alt, 'alt')
  }

  function handleClear() {
    updateSetting(undefined, 'src')
  }

  return (
    <div className="builder-setting-image space-y-3">
      <div>
        <div className="mb-1 text-sm text-slate-700">Media</div>
        <div className="flex items-center">
          <div className="builder-setting-image-preview">
            {setting?.src && setting?.type === 'image' && (
              <$Image src={setting?.src} alt={setting?.alt} width={48} height={48} />
            )}
          </div>

          <div className="ml-4 flex items-center space-x-2">
            <Dropdown
              visible={visible}
              placement="left"
              overlay={<MediaPicker onChange={handleImageChange} />}
              onDropdownVisibleChange={setVisible}
            >
              <Button className="!p-1">Change</Button>
            </Dropdown>
            <Button className="!p-1" onClick={handleClear}>
              Clear
            </Button>
          </div>
        </div>
      </div>

      <div>
        <div className="mb-1 text-sm text-slate-700">Alt Text</div>
        <Input value={setting?.alt} placeholder="Enter image alt here" onChange={handleAltChange} />
      </div>
    </div>
  )
}
