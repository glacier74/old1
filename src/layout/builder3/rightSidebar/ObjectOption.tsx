import { FC } from 'react'

import { Option, OptionProps } from './OptionGroup'

export const ObjectOption: FC<OptionProps> = ({ parentName, schema }) => {
  const name = [parentName, schema.name].filter(Boolean).join('.')

  return (
    <div className="builder-option builder-option__object">
      <div className="builder-option__title">{schema.title}</div>
      <div className="builder-option__content">
        <div className="builder-option__list-item">
          {schema.fields.map((f: any) => (
            <Option key={f.name} parentName={name} schema={f} />
          ))}
        </div>
      </div>
    </div>
  )
}
