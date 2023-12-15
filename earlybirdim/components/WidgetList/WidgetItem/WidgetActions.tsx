import { widgetListPath } from '@earlybirdim/components/WidgetList/constants'
import { Button, Tooltip } from '@heyforms/ui'
import { IconPencil, IconTrash } from '@tabler/icons'
import clsx from 'clsx'
import { IconSize1x1, IconSize2x05, IconSize2x1, IconSize2x2 } from 'earlybirdim/internalIcons'
import { FC, useCallback, useMemo } from 'react'

import { useBuilderContext, useOptions } from '~/layout/builder3/context'

import {
  WidgetActionItemButton,
  WidgetActionItemDivide,
  WidgetActionItemProps,
  WidgetActionsProps
} from '../WidgetProps'

const WIDGET_ACTIONS: Array<WidgetActionItemDivide | WidgetActionItemButton> = [
  {
    name: 'delete',
    label: 'Delete',
    icon: IconTrash
  },
  {
    name: 'edit',
    label: 'Edit',
    icon: IconPencil
  }
]

const ALL_SIZE_ACTIONS: Array<WidgetActionItemDivide | WidgetActionItemButton> = [
  {
    type: 'divide'
  },
  {
    name: '1x1',
    label: '1x1',
    icon: IconSize1x1
  },
  {
    name: '2x1',
    label: '2x1',
    icon: IconSize2x1
  },
  {
    name: '2x0.5',
    label: '2x0.5',
    icon: IconSize2x05
  },
  {
    name: '2x2',
    label: '2x2',
    icon: IconSize2x2
  }
]

const SKILLS_ACTIONS: Array<WidgetActionItemDivide | WidgetActionItemButton> = [
  {
    type: 'divide'
  },
  {
    name: '1x1',
    label: '1x1',
    icon: IconSize1x1
  },
  {
    name: '2x0.5',
    label: '2x0.5',
    icon: IconSize2x05
  }
]

const EXPERIENCE_ACTIONS: Array<WidgetActionItemDivide | WidgetActionItemButton> = [
  {
    type: 'divide'
  },
  {
    name: '1x1',
    label: '1x1',
    icon: IconSize1x1
  },
  {
    name: '2x1',
    label: '2x1',
    icon: IconSize2x1
  },
  {
    name: '2x0.5',
    label: '2x0.5',
    icon: IconSize2x05
  }
]

const MAP_IMAGE_ACTIONS = ALL_SIZE_ACTIONS.filter(
  a => (a as WidgetActionItemButton).name != '2x0.5'
)

const WidgetActionItem: FC<WidgetActionItemProps> = ({ item, onClick }) => {
  function handleClick() {
    onClick((item as WidgetActionItemButton).name)
  }

  if ((item as WidgetActionItemDivide).type) {
    return <div className="w-px h-[16px] bg-slate-300"></div>
  }

  const Icon = (item as WidgetActionItemButton).icon

  return (
    <Tooltip ariaLabel={(item as WidgetActionItemButton).label}>
      <div>
        <Button
          className="flex items-center p-0.5 hover:bg-slate-100 dark:hover:bg-slate-700 rounded"
          leading={<Icon className="w-5 h-5" />}
          onClick={handleClick}
        />
      </div>
    </Tooltip>
  )
}

export const WidgetActions: FC<WidgetActionsProps> = ({ className, config, ...restProps }) => {
  const { dispatch } = useBuilderContext()
  const { value: listValue, update } = useOptions<AnyMap<any>[]>(widgetListPath, [])

  const actions = useMemo(() => {
    switch (config.type) {
      case 'group_title':
        return WIDGET_ACTIONS

      case 'image':
      case 'video':
      case 'google_map':
      case 'payment':
      case 'email_capture':
        return [...WIDGET_ACTIONS, ...MAP_IMAGE_ACTIONS]

      case 'skills':
        return [...WIDGET_ACTIONS, ...SKILLS_ACTIONS]

      case 'experience':
        return [...WIDGET_ACTIONS, ...EXPERIENCE_ACTIONS]

      default:
        return [...WIDGET_ACTIONS, ...ALL_SIZE_ACTIONS]
    }
  }, [config.type])

  const handleClick = useCallback(
    (key: string) => {
      switch (key) {
        case 'edit':
          dispatch({
            type: 'updateState',
            payload: {
              selectedSection: {
                type: 'widget',
                id: config.id
              }
            }
          })
          break

        case 'delete':
          update(listValue.filter(v => v.id !== config.id))
          break

        case '1x1':
        case '2x1':
        case '2x0.5':
        case '2x2':
          update(
            listValue.map(v => {
              if (v.id === config.id) {
                return {
                  ...v,
                  size: key
                }
              }

              return v
            })
          )
          break
      }
    },
    [config.id, listValue]
  )

  return (
    <div
      className={clsx(
        'widget-actions absolute left-0 right-0 -bottom-9 flex justify-center will-change-auto opacity-0 duration-150 group-hover/widget:opacity-100 z-50',
        className
      )}
      {...restProps}
    >
      <div className="flex items-center border border-gray-300 dark:border-gray-600 px-2 py-2 gap-1 sm:text-sm font-medium bg-white dark:bg-[#0f172a] text-slate-700 dark:text-slate-50 rounded-lg shadow-lg">
        {actions.map((row, index) => (
          <WidgetActionItem key={index} item={row} onClick={handleClick} />
        ))}
      </div>
    </div>
  )
}
