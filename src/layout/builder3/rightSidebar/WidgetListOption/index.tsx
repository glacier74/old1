import { exclude } from '@nily/utils'
import { FC, useCallback, useEffect, useState } from 'react'
import { ReactSortable } from 'react-sortablejs'

import { useBuilderContext, useOptions } from '~/layout/builder3/context'

import { OptionProps } from '../OptionGroup'
import { NewWidget } from './NewWidget'
import { WidgetItemOption } from './WidgetItemOption'

export const WidgetListOption: FC<OptionProps> = ({ parentName, schema }) => {
  const { dispatch } = useBuilderContext()

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

  const handleSetList = useCallback(
    (newListValue: any[]) => {
      update(newListValue.map(v => exclude(v, ['chosen', 'selected'])))
    },
    [update]
  )

  function handleCreate(newValue: any) {
    update([...listValue, newValue])
    setSelected(newValue.id)
  }

  useEffect(() => {
    dispatch({
      type: 'updateState',
      payload: {
        selectedListId: selected
      }
    })
  }, [selected])

  return (
    <div className="builder-option builder-option__list">
      {parentName && <div className="builder-option__title">{schema.title}</div>}

      <div className="builder-option__content">
        <ReactSortable<any>
          className="space-y-3"
          handle=".builder-option__sort-handle"
          list={listValue}
          setList={handleSetList}
          delay={10}
          animation={150}
        >
          {listValue.map((value, index) => (
            <WidgetItemOption
              key={value.id}
              parentName={name}
              index={index}
              value={value}
              isSelected={selected === value.id}
              onSelect={handleSelect}
              onDelete={handleDelete}
            />
          ))}
        </ReactSortable>

        <NewWidget onCreate={handleCreate} />
      </div>
    </div>
  )
}
