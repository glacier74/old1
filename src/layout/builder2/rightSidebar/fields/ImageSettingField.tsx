import { $Image } from '@earlybirdim/blocks'
import { Button, Input } from '@heyforms/ui'
import { FC } from 'react'

import { useBlockSetting } from '~/layout/builder2/context'

import { SettingFieldProps } from './SettingField'

export const ImageSettingField: FC<SettingFieldProps> = ({ schema }) => {
  const { setting, updateSetting } = useBlockSetting<any>(schema.name)

  function handleAltChange(alt: any) {
    updateSetting(alt, 'alt')
  }

  return (
    <div className="builder-setting-image space-y-3">
      <div>
        <div className="mb-1 text-sm text-gray-700">Image</div>
        <div className="flex items-center">
          {setting?.src && (
            <div className="builder-setting-image-preview">
              <$Image src={setting?.src} alt={setting?.alt} width={48} height={48} />
            </div>
          )}

          <div className="ml-4 flex items-center space-x-2">
            <Button className="!p-1">Change</Button>
            <Button className="!p-1">Clear</Button>
          </div>
        </div>
      </div>

      <div>
        <div className="mb-1 text-sm text-gray-700">Alt Text</div>
        <Input value={setting?.alt} placeholder="Enter image alt here" onChange={handleAltChange} />
      </div>
    </div>
  )
}
