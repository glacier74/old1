import { FC } from 'react'

import { getObjectPath } from '~/layout/builder2/utils'

import { SettingField, SettingFieldProps } from './SettingField'

export const GroupSettingField: FC<SettingFieldProps> = ({ schema: groupSchema }) => {
  return (
    <div className="builder-setting-group divide-y divide-gray-200 space-y-3">
      {(groupSchema as any).children.map((childSchema: any) => (
        <div key={childSchema.name} className="py-2">
          <div className="builder-group-title">{childSchema.title}</div>
          <SettingField
            schema={{
              ...childSchema,
              name: getObjectPath(groupSchema.name, childSchema.name)
            }}
          />
        </div>
      ))}
    </div>
  )
}
