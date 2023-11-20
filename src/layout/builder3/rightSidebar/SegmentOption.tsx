import { Tabs } from '@heyforms/ui'
import { FC, useMemo } from 'react'

import { useOptions } from '~/layout/builder3/context'

import { Option, OptionProps } from './OptionGroup'

export const SegmentOption: FC<OptionProps> = ({ schema, parentName }) => {
  const { value, update } = useOptions<string>([parentName, schema.name].filter(Boolean).join('.'))
  const options = useMemo(
    () =>
      Object.keys(schema.options).map(name => ({
        name,
        ...schema.options[name]
      })),
    [schema.options]
  )

  return (
    <Tabs
      className="builder-setting-payment-methods"
      type="segment"
      activeName={value || 'subscription'}
      onChange={update}
    >
      {options.map(option => (
        <Tabs.Pane key={option.name} name={option.name} title={option.label}>
          <div className="mt-2 space-y-2">
            {option.fields.map((child: any) => (
              <Option key={child.name} parentName={parentName} schema={child} />
            ))}
          </div>
        </Tabs.Pane>
      ))}
    </Tabs>
  )
}
