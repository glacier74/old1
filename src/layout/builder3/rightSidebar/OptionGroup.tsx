import { IconChevronLeft, IconChevronRight } from '@tabler/icons'
import clsx from 'clsx'
import { FC } from 'react'

import { EmailCaptureOption } from '~/layout/builder3/rightSidebar/EmailCaptureOption'

import { SchemaTypeEnum } from '../constants'
import { useBuilderContext } from '../context'
import { HTMLOption } from './HTMLOption'
import { IconOption } from './IconOption'
import { ImageOption } from './ImageOption'
import { ListOption } from './ListOption'
import { ObjectOption } from './ObjectOption'
import { PaymentOption } from './PaymentOption'
import { SelectOption } from './SelectOption'
import { TextListOption } from './TextListOption'
import { TextOption } from './TextOption'

export interface OptionProps {
  schema: any
  parentName?: string
}

interface OptionGroupProps extends OptionProps {
  isSelected?: boolean
  onSelect: (name: string) => void
}

export const Option: FC<OptionProps> = ({ schema, parentName }) => {
  switch (schema.type) {
    case SchemaTypeEnum.text:
      return <TextOption parentName={parentName} schema={schema} />

    case SchemaTypeEnum.image:
      return <ImageOption parentName={parentName} schema={schema} />

    case SchemaTypeEnum.icon:
      return <IconOption parentName={parentName} schema={schema} />

    case SchemaTypeEnum.select:
      return <SelectOption parentName={parentName} schema={schema} />

    case SchemaTypeEnum.html:
      return <HTMLOption parentName={parentName} schema={schema} />

    case SchemaTypeEnum.object:
      return <ObjectOption parentName={parentName} schema={schema} />

    case SchemaTypeEnum.payment:
      return <PaymentOption parentName={parentName} schema={schema} />

    case SchemaTypeEnum.emailCapture:
      return <EmailCaptureOption parentName={parentName} schema={schema} />

    case SchemaTypeEnum.textList:
      return <TextListOption parentName={parentName} schema={schema} />

    case SchemaTypeEnum.list:
      return <ListOption parentName={parentName} schema={schema} />

    default:
      return null
  }
}

export const OptionGroup: FC<OptionGroupProps> = ({ schema, onSelect }) => {
  const { state } = useBuilderContext()

  function handleClick() {
    onSelect(schema.name)
  }

  if (state.selectedOptionName && state.selectedOptionName !== schema.name) {
    return null
  }

  const isSelected = !!state.selectedOptionName

  return (
    <div
      className={clsx('builder-option__group', {
        'builder-option__group-selected': isSelected
      })}
    >
      <div className="builder-option__group-title" onClick={handleClick}>
        {isSelected ? (
          <>
            <IconChevronLeft />
            <span>{schema.title}</span>
          </>
        ) : (
          <>
            <span>{schema.title}</span>
            <IconChevronRight />
          </>
        )}
      </div>

      {isSelected && (
        <div className="builder-option__group-content">
          {schema.type === SchemaTypeEnum.list ? (
            <Option schema={schema} />
          ) : (
            schema.fields.map((child: any) => (
              <Option key={child.name} parentName={schema.name} schema={child} />
            ))
          )}
        </div>
      )}
    </div>
  )
}
