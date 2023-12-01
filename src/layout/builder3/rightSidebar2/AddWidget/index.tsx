import { widgetListPath } from '@earlybirdim/components/WidgetList/constants'
import { deepClone } from '@nily/utils'
import {
  IconCreditCard,
  IconHash,
  IconLink,
  IconLocation,
  IconMail,
  IconMusic,
  IconPhoto
} from '@tabler/icons'
import { FC, useCallback, useState } from 'react'

import { IconGroupTitle } from '~/components'
import { useBuilderContext, useOptions } from '~/layout/builder3/context'

import { OptionsContainer } from '../OptionsContainer'
import { AddEmailCapture } from './AddEmailCapture'
import { AddGroupTitle } from './AddGroupTitle'
import { AddImage } from './AddImage'
import { AddLink, AddLinkProps } from './AddLink'
import { AddLocation } from './AddLocation'
import { AddMusic } from './AddMusic'
import { AddPayment } from './AddPayment'
import { AddSocial } from './AddSocial'
import { SOCIAL_TYPES, SocialList } from './SocialList'

interface WidgetConfig {
  type: string
  label: string
  icon: FC<any>
  iconClassName: string
}

const WIDGET_CONFIGS: WidgetConfig[] = [
  {
    type: 'link',
    label: 'Link',
    icon: IconLink,
    iconClassName: 'bg-[#e5e7eb] text-[#334155]'
  },
  {
    type: 'social',
    label: 'Social',
    icon: IconHash,
    iconClassName: 'bg-[#dbeafe] text-[#1d4ed8]'
  },
  {
    type: 'payment',
    label: 'Payment',
    icon: IconCreditCard,
    iconClassName: 'bg-[#fef9c3] text-[#a16207]'
  },
  {
    type: 'google_map',
    label: 'Location',
    icon: IconLocation,
    iconClassName: 'bg-[#ccfbf1] text-[#0f766e]'
  },
  {
    type: 'email_capture',
    label: 'Email Capture',
    icon: IconMail,
    iconClassName: 'bg-[#fae8ff] text-[#a21caf]'
  },
  {
    type: 'image',
    label: 'Image',
    icon: IconPhoto,
    iconClassName: 'bg-[#e0f2fe] text-[#0369a1]'
  },
  {
    type: 'music',
    label: 'Music',
    icon: IconMusic,
    iconClassName: 'bg-[#bbf7d0] text-[#15803d]'
  },
  {
    type: 'group_title',
    label: 'Group Title',
    icon: IconGroupTitle,
    iconClassName: 'bg-[#fee2e2] text-[#b91c1c]'
  }
]

const AddWidgetItem: FC<{
  config: WidgetConfig
  onClick: (type: string) => void
}> = ({ config, onClick }) => {
  function handleClick() {
    onClick(config.type)
  }

  return (
    <div
      role="button"
      className="text-slate-900 hover:bg-slate-100 group flex items-center px-2 py-2.5 text-sm rounded-md"
      onClick={handleClick}
    >
      <config.icon className={`mr-3 flex-shrink-0 h-6 w-6 p-0.5 rounded ${config.iconClassName}`} />
      <span className="truncate">{config.label}</span>
    </div>
  )
}

const Panel: FC<{ type: string } & AddLinkProps> = ({ type, ...restProps }) => {
  switch (type) {
    case 'link':
      return <AddLink {...restProps} />

    case 'social':
      return <SocialList {...restProps} />

    case 'payment':
      return <AddPayment {...restProps} />

    case 'google_map':
      return <AddLocation {...restProps} />

    case 'email_capture':
      return <AddEmailCapture {...restProps} />

    case 'image':
      return <AddImage {...restProps} />

    case 'music':
      return <AddMusic {...restProps} />

    case 'group_title':
      return <AddGroupTitle {...restProps} />

    default:
      return SOCIAL_TYPES.includes(type) ? <AddSocial type={type} {...restProps} /> : null
  }
}

export const AddWidget = () => {
  const { state, dispatch } = useBuilderContext()
  const { value: listValue, update } = useOptions<AnyMap<any>[]>(widgetListPath, [])

  const [types, setTypes] = useState<string[]>([])

  const handleClick = useCallback(
    (newType: string) => {
      setTypes([...types, newType])
    },
    [types]
  )

  const handleCreate = useCallback(
    (newValue: AnyMap) => {
      const newList = deepClone(listValue)

      // 找出屏幕中间的 widget，将新 widget 插入到这里
      const index = Math.floor(state.widgetIds.length / 2)
      const widgetIndex = newList.findIndex(w => w.id === state.widgetIds[index])

      newList.splice(widgetIndex, 0, newValue)
      update(newList)

      dispatch({
        type: 'updateState',
        payload: {
          selectedListId: undefined,
          selectedSection: undefined
        }
      })
    },
    [dispatch, listValue, state.widgetIds, update]
  )

  const handleGoNext = useCallback(
    (type: string) => {
      setTypes([...types, type])
    },
    [types]
  )

  const handleGoBack = useCallback(() => {
    setTypes(types.slice(0, -1))
  }, [types])

  return (
    <>
      <OptionsContainer title="Add Widget">
        <div className="px-3 space-y-2">
          {WIDGET_CONFIGS.map(row => (
            <AddWidgetItem key={row.type} config={row} onClick={handleClick} />
          ))}
        </div>
      </OptionsContainer>

      {types.map(type => (
        <Panel
          key={type}
          type={type}
          onCreate={handleCreate}
          onGoBack={handleGoBack}
          onGoNext={handleGoNext}
        />
      ))}
    </>
  )
}
