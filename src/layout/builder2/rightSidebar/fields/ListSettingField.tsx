import { $Icon } from '@earlybirdim/blocks'
import { Button, Dropdown, Menus } from '@heyforms/ui'
import { isObject } from '@nily/utils'
import { IconChevronDown, IconChevronUp, IconDotsVertical, IconPlus } from '@tabler/icons'
import { convert } from 'html-to-text'
import { FC, useCallback, useMemo, useState } from 'react'
import { ReactSortable } from 'react-sortablejs'
import { v4 } from 'uuid'

import { useBlockSetting } from '~/layout/builder2/context'
import { createListChildSetting, getObjectPath } from '~/layout/builder2/utils'

import { SettingField, SettingFieldProps } from './SettingField'

interface ListSettingItemProps {
  parentSchema: any
  index: number
  path: string
  setting: any
  isOpen?: boolean
  onToggle: (id: string) => void
  onDelete: (id: string) => void
  onDuplicate: (id: string) => void
}

function findListTitle(setting: any) {
  let title: string | undefined
  let icon: any

  if (isObject(setting)) {
    for (const key of Object.keys(setting)) {
      const value = setting[key]

      if (value.type === 'text' || value.type === 'html') {
        title = convert(value.html, { wordwrap: 20 })
      } else if (value.type === 'svg' || value.type === 'emoji' || value.type === 'image') {
        icon = value
      } else {
        const result = findListTitle(value)

        title = result.title
        icon = result.icon
      }

      if (title) {
        break
      }
    }
  }

  return {
    title,
    icon
  }
}

const ListSettingItem: FC<ListSettingItemProps> = ({
  parentSchema,
  index,
  path,
  setting,
  isOpen,
  onToggle,
  onDelete,
  onDuplicate
}) => {
  const Icon = useMemo(
    () =>
      isOpen ? (
        <IconChevronUp className="w-4 h-4 text-slate-700" />
      ) : (
        <IconChevronDown className="w-4 h-4 text-slate-700" />
      ),
    [isOpen]
  )

  function handleDuplicate() {
    onDuplicate(setting.id)
  }

  function handleDelete() {
    onDelete(setting.id)
  }

  function handleToggle() {
    onToggle(setting.id)
  }

  const Overlay = (
    <Menus className="w-32">
      <Menus.Item label="Duplicate" onClick={handleDuplicate} />
      <Menus.Item className="text-red-600" label="Delete" onClick={handleDelete} />
    </Menus>
  )

  const childSchema = parentSchema.children[0]
  const Title = useMemo(() => {
    const { title, icon } = findListTitle(setting)

    if (title) {
      return <span>{title}</span>
    } else if (icon) {
      return (
        <div className="builder-list-image-preview">
          <$Icon className="w-5 h-5" {...icon} width={24} height={24} />
        </div>
      )
    } else {
      return <span className="text-slate-500 italic">{parentSchema.title}</span>
    }
  }, [parentSchema.title, setting])

  return (
    <div className="bg-white border border-slate-200 rounded">
      <div className="flex items-center">
        <div className="builder-setting-handle min-w-0 h-9 pl-3 py-2 flex-1 text-sm text-slate-700 font-medium truncate select-none cursor-move">
          {Title}
        </div>

        <div className="px-2 flex items-center">
          <Dropdown
            className="w-6 h-6 p-1 rounded cursor-pointer hover:bg-slate-100"
            overlay={Overlay}
          >
            <IconDotsVertical className="w-4 h-4 text-slate-700" />
          </Dropdown>
          <div className="p-1 rounded cursor-pointer hover:bg-slate-100" onClick={handleToggle}>
            {Icon}
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="px-3 pb-3 space-y-2 border-t border-slate-100">
          <SettingField
            schema={{
              ...childSchema,
              name: getObjectPath(path, childSchema.name)
            }}
          />
        </div>
      )}
    </div>
  )
}

export const ListSettingField: FC<SettingFieldProps> = ({ schema }) => {
  const { setting, updateSetting } = useBlockSetting<any[]>(schema.name, [])
  const [openedId, setOpenedId] = useState<string>()

  function handleUpdate(newState: any[]) {
    updateSetting(
      newState.map(r => {
        delete r.chosen
        delete r.selected

        return r
      })
    )
  }

  const handleToggle = useCallback(
    (id: string) => {
      setOpenedId(id === openedId ? undefined : id)
    },
    [openedId]
  )

  const handleCreate = useCallback(() => {
    const newSetting = createListChildSetting(schema as any)

    handleUpdate([...setting!, newSetting])
    handleToggle(newSetting.id)
  }, [schema, setting])

  const handleDuplicate = useCallback(
    (id: string) => {
      const $setting = [...setting!]
      const index = $setting.findIndex(p => p.id === id)

      if (index > -1) {
        $setting.splice(index, 0, {
          ...$setting[index],
          id: v4()
        })

        handleUpdate($setting)
      }
    },
    [setting]
  )

  const handleDelete = useCallback(
    (id: string) => {
      handleUpdate(setting!.filter(p => p.id !== id))

      if (openedId === id) {
        setOpenedId(undefined)
      }
    },
    [openedId, setting]
  )

  return (
    <div className="space-y-2">
      <ReactSortable<any>
        className="builder-setting-list space-y-2 rounded"
        handle=".builder-setting-handle"
        list={setting}
        setList={handleUpdate}
        delay={10}
        animation={150}
      >
        {setting?.map((childSetting, index) => (
          <ListSettingItem
            key={childSetting.id}
            parentSchema={schema as any}
            index={index}
            path={getObjectPath(schema.name, index)}
            setting={childSetting}
            isOpen={openedId === childSetting.id}
            onToggle={handleToggle}
            onDelete={handleDelete}
            onDuplicate={handleDuplicate}
          />
        ))}
      </ReactSortable>

      <Button className="w-full !py-[0.4375rem]" leading={<IconPlus />} onClick={handleCreate}>
        Create new item
      </Button>
    </div>
  )
}
