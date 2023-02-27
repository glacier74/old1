import { Input } from '@heyforms/ui'
import { FC } from 'react'

import { useBlockSetting } from '~/layout/builder2/context'

import { SettingFieldProps } from './SettingField'

export const PaymentSettingField: FC<SettingFieldProps> = ({ schema }) => {
  const { setting, updateSetting } = useBlockSetting<any>(schema.name)

  function handleChange(value: any) {
    updateSetting(value, 'html')
  }

  return (
    <div className="builder-setting-text space-y-2">
      <div>
        <div className="mb-1 text-sm text-gray-700">Button text</div>
        <Input value={setting?.html} placeholder={schema.placeholder} onChange={handleChange} />
      </div>
    </div>
  )
}
