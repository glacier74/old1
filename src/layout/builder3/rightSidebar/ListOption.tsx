import { Icon } from '@earlybirdim/icons'
import { exclude } from '@nily/utils'
import { IconGripVertical, IconPlus, IconTrash } from '@tabler/icons'
import clsx from 'clsx'
import Image from 'next/image'
import { FC, useCallback, useMemo, useState } from 'react'
import { ReactSortable } from 'react-sortablejs'

import { SchemaTypeEnum } from '../constants'
import { useOptions } from '../context'
import { schemaFieldsToValue } from '../utils'
import { Option, OptionProps } from './OptionGroup'

interface ListItemProps {
  parentName?: string
  index: number
  fields: any[]
  value: AnyMap<any>
  isSelected?: boolean
  onSelect: (id: string) => void
  onDelete: (id: string) => void
}

const ListItem: FC<ListItemProps> = ({
  parentName,
  index,
  fields,
  value,
  isSelected,
  onSelect,
  onDelete
}) => {
  const name = [parentName, index].join('.')

  const label = useMemo(() => {
    const field = fields.find((f: any) => f.primary) || fields[0]

    if (field) {
      const val = value[field.name]

      if (!val) {
        return null
      }

      switch (field.type) {
        case SchemaTypeEnum.image:
          return (
            <Image
              className="w-[20px] h-[20px] rounded-sm object-cover"
              src={val}
              width={20}
              height={20}
              alt=""
            />
          )

        case SchemaTypeEnum.icon:
          return <Icon className="w-5 h-5 text-gray-700" name={val} />

        default:
          return val
      }
    }
  }, [fields, value])

  function handleSelect() {
    onSelect(value.id)
  }

  function handleDelete() {
    onDelete(value.id)
  }

  return (
    <div
      className={clsx('builder-option__list-item', {
        'builder-option__list-item-selected': isSelected
      })}
    >
      <div className="builder-option__list-item-title">
        <div className="builder-option__list-item-text" onClick={handleSelect}>
          {label}
        </div>
        <div className="h-[40px] pl-2 pr-4 flex items-center gap-1">
          <button className="builder-option__list-item-button builder-option__sort-handle cursor-grab">
            <IconGripVertical />
          </button>
          <button className="builder-option__list-item-button" onClick={handleDelete}>
            <IconTrash />
          </button>
        </div>
      </div>
      <div className="builder-option__list-item-content">
        {fields.map((f: any) => (
          <Option key={f.name} parentName={name} schema={f} />
        ))}
      </div>
    </div>
  )
}

export const ListOption: FC<OptionProps> = ({ parentName, schema }) => {
  const name = [parentName, schema.name].filter(Boolean).join('.')
  const { value: listValue, update } = useOptions<AnyMap<any>[]>(name, [])

  const [selected, setSelected] = useState<string | undefined>()

  const handleSelect = useCallback(
    (id: string) => {
      setSelected(id === selected ? undefined : id)
    },
    [selected]
  )

  const handleDelete = useCallback(
    (id: string) => {
      update(listValue.filter(v => v.id !== id))
    },
    [update, listValue]
  )

  const handleClick = useCallback(() => {
    const newValue = schemaFieldsToValue(schema.fields)

    setSelected(newValue.id)
    update([...listValue, newValue])
  }, [schema.fields, update, listValue])

  const handleSetList = useCallback(
    (newListValue: any[]) => {
      update(newListValue.map(v => exclude(v, ['chosen', 'selected'])))
    },
    [update]
  )

  return (
    <div className="builder-option builder-option__list">
      {parentName && <div className="builder-option__title">{schema.title}</div>}
      <div className="builder-option__content">
        <ReactSortable<any>
          className="space-y-3"
          handle=".builder-option__sort-handle"
          list={listValue || []}
          setList={handleSetList}
          delay={10}
          animation={150}
        >
          {listValue?.map((value, index) => (
            <ListItem
              key={value.id}
              parentName={name}
              index={index}
              fields={schema.fields}
              value={value}
              isSelected={selected === value.id}
              onSelect={handleSelect}
              onDelete={handleDelete}
            />
          ))}
        </ReactSortable>

        <button className="builder-option__list-item-create" onClick={handleClick}>
          <IconPlus />
          <span>Add {schema.title.toLowerCase()}</span>
        </button>
      </div>
    </div>
  )
}
