import { $Image } from '@earlybirdim/blocks'
import { Icon } from '@earlybirdim/icons'
import { Button, Dropdown } from '@heyforms/ui'
import { FC } from 'react'

import { IconPicker } from '~/components/IconPicker'
import { useBlockSetting } from '~/layout/builder2/context'

import { SettingFieldProps } from './SettingField'

const IconPreview: FC<any> = ({ type, src, alt, name, text }) => {
  switch (type) {
    case 'image':
      return <$Image src={src} alt={alt} width={48} height={48} />

    case 'svg':
      return (
        <div className="flex items-center justify-center w-full h-full">
          <Icon className="w-9 h-9" name={name} />
        </div>
      )

    case 'emoji':
      return (
        <div className="flex items-center justify-center w-full h-full text-[32px]">{text}</div>
      )

    default:
      return null
  }
}

export const IconSettingField: FC<SettingFieldProps> = ({ schema }) => {
  const { setting, updateSetting } = useBlockSetting<any>(schema.name)

  function handleIconChange(type: string, value: string) {
    updateSetting(type, 'type')

    switch (type) {
      case 'image':
        updateSetting(value, 'src')
        break

      case 'svg':
        updateSetting(value, 'name')
        break

      case 'emoji':
        updateSetting(value, 'text')
        break
    }
  }

  function handleClear() {
    updateSetting(undefined, 'src')
    updateSetting(undefined, 'name')
    updateSetting(undefined, 'text')
  }

  return (
    <div className="builder-setting-icon">
      <div className="flex items-center">
        <div className="builder-setting-image-preview">
          <IconPreview {...(setting as any)} />
        </div>

        <div className="ml-4 flex items-center space-x-2">
          <Dropdown placement="left" overlay={<IconPicker onChange={handleIconChange} />}>
            <Button className="!p-1">Change</Button>
          </Dropdown>
          <Button className="!p-1" onClick={handleClear}>
            Clear
          </Button>
        </div>
      </div>
    </div>
  )
}
