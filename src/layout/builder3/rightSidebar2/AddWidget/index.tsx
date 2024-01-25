import { widgetListPath } from '@earlybirdim/components/WidgetList/constants'
import { deepClone } from '@nily/utils'
import {
  IconBoxModel,
  IconBrandYoutube,
  IconCreditCard,
  IconHash,
  IconLink,
  IconLocation,
  IconMail,
  IconMusic,
  IconPhone,
  IconPhoto,
  IconTopologyStar
} from '@tabler/icons'
import { FC, useCallback, useState } from 'react'

import { IconGroupTitle } from '~/components'
import { useBuilderContext, useOptions } from '~/layout/builder3/context'

import { OptionsContainer } from '../OptionsContainer'
import { AddEmailCapture } from './AddEmailCapture'
import { AddExperience } from './AddExperience'
import { AddGroupTitle } from './AddGroupTitle'
import { AddImage } from './AddImage'
import { AddLink, AddLinkProps } from './AddLink'
import { AddLocation } from './AddLocation'
import { AddMusic } from './AddMusic'
import { AddPayment } from './AddPayment'
import { AddPhone } from './AddPhone'
import { AddSkills } from './AddSkills'
import { AddSocial } from './AddSocial'
import { AddVideo } from './AddVideo'
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
    iconClassName: 'bg-green-500 text-white'
  },
  {
    type: 'social',
    label: 'Social',
    icon: IconHash,
    iconClassName: 'bg-sky-500 text-white'
  },
  {
    type: 'payment',
    label: 'Payment',
    icon: IconCreditCard,
    iconClassName: 'bg-orange-500 text-white'
  },
  {
    type: 'email_capture',
    label: 'Email Capture',
    icon: IconMail,
    iconClassName: 'bg-blue-900 text-white'
  },
  {
    type: 'phone',
    label: 'Phone Number',
    icon: IconPhone,
    iconClassName: 'bg-blue-900 text-white'
  },
  {
    type: 'skills',
    label: 'Skills',
    icon: IconBoxModel,
    iconClassName: 'bg-lime-500 text-white'
  },
  {
    type: 'experience',
    label: 'Experience',
    icon: IconTopologyStar,
    iconClassName: 'bg-yellow-500 text-white'
  },
  {
    type: 'image',
    label: 'Image',
    icon: IconPhoto,
    iconClassName: 'bg-rose-500 text-white'
  },
  {
    type: 'video',
    label: 'Video',
    icon: IconBrandYoutube,
    iconClassName: 'bg-red-600 text-white'
  },
  {
    type: 'google_map',
    label: 'Location',
    icon: IconLocation,
    iconClassName: 'bg-blue-500 text-white'
  },
  {
    type: 'music',
    label: 'Music',
    icon: IconMusic,
    iconClassName: 'bg-emerald-400 text-white'
  },
  {
    type: 'group_title',
    label: 'Section Title',
    icon: IconGroupTitle,
    iconClassName: 'bg-[#e0f2fe] text-[#0369a1]'
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

    case 'skills':
      return <AddSkills {...restProps} />

    case 'experience':
      return <AddExperience {...restProps} />

    case 'video':
      return <AddVideo {...restProps} />

    case 'phone':
      return <AddPhone {...restProps} />

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
