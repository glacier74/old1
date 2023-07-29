import { Input } from '@heyforms/ui'
import { IconPlus, IconX } from '@tabler/icons'
import { FC, useCallback } from 'react'

import { useOptions } from '../context'
import { OptionProps } from './OptionGroup'

interface TextInputProps {
  index: number
  value: string
  onChange: (value: string, index: number) => void
  onDelete: (index: number) => void
}

const TextInput: FC<TextInputProps> = ({ index, value, onChange, onDelete }) => {
  function handleChange(newValue: string) {
    onChange(newValue, index)
  }

  function handleClick() {
    onDelete(index)
  }

  return (
    <div className="flex items-center gap-1">
      <Input className="w-full !px-2 !py-[0.34rem]" value={value} onChange={handleChange} />
      <button
        className="p-1 cursor-pointer text-slate-500 hover:text-slate-900"
        onClick={handleClick}
      >
        <IconX className="w-5 h-5" />
      </button>
    </div>
  )
}

export const TextListOption: FC<OptionProps> = ({ parentName, schema }) => {
  const { value, update } = useOptions<string[]>(
    [parentName, schema.name].filter(Boolean).join('.')
  )

  const handleClick = useCallback(() => {
    update(value?.concat(''))
  }, [update, value])

  const handleChange = useCallback(
    (newValue: string, index: number) => {
      update(value?.map((val, m) => (m === index ? newValue : val)))
    },
    [update, value]
  )

  const handleDelete = useCallback(
    (index: number) => {
      update(value?.filter((_, i) => i !== index))
    },
    [update, value]
  )

  return (
    <div className="builder-option builder-option__text-list">
      <div className="builder-option__title">{schema.title}</div>
      <div className="builder-option__content">
        {value?.map((value, index) => (
          <TextInput
            key={index}
            value={value}
            index={index}
            onChange={handleChange}
            onDelete={handleDelete}
          />
        ))}

        <button className="builder-option__list-item-create" onClick={handleClick}>
          <IconPlus />
          <span>Add {schema.title.toLowerCase()}</span>
        </button>
      </div>
    </div>
  )
}
