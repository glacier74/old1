import { Tabs } from '@heyforms/ui'
import { FC, useMemo } from 'react'

import { useBlockSetting } from '~/layout/builder2/context'
import { getObjectPath } from '~/layout/builder2/utils'

import { SettingField, SettingFieldProps } from './SettingField'

export const SegmentSettingField: FC<SettingFieldProps> = ({ schema }) => {
  const { setting, updateSetting } = useBlockSetting<any>(schema.name)
  const options = useMemo(
    () =>
      Object.keys(schema.options).map(name => ({
        name,
        ...schema.options[name]
      })),
    [schema.options]
  )

  function handleChange(value: any) {
    updateSetting(value, 'paymentType')
  }

  return (
    <Tabs
      className="builder-setting-payment-methods"
      type="segment"
      activeName={setting?.paymentType || 'subscription'}
      onChange={handleChange}
    >
      {options.map(option => (
        <Tabs.Pane key={option.name} name={option.name} title={option.label}>
          <div className="mt-2 space-y-2">
            {option.children.map((childSchema: any, index: number) => (
              <SettingField
                key={index}
                schema={{
                  ...childSchema,
                  name: getObjectPath(schema.name.replace(/\.[^.]+$/, ''), childSchema.name)
                }}
              />
            ))}
          </div>
        </Tabs.Pane>
      ))}
    </Tabs>
  )
}
