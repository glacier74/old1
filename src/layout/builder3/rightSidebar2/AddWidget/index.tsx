import { widgetListPath } from '@earlybirdim/components/WidgetList/constants'
import {
  IconCreditCard,
  IconHash,
  IconLink,
  IconLocation,
  IconMail,
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
import { AddPayment } from './AddPayment'
import { AddSocial } from './AddSocial'
import { SOCIAL_TYPES, SocialList } from './SocialList'

interface WidgetConfig {
  type: string
  label: string
  icon: FC<any>
}

const WIDGET_CONFIGS: WidgetConfig[] = [
  {
    type: 'link',
    label: 'Link',
    icon: IconLink
  },
  {
    type: 'social',
    label: 'Social',
    icon: IconHash
  },
  {
    type: 'payment',
    label: 'Payment',
    icon: IconCreditCard
  },
  {
    type: 'google_map',
    label: 'Location',
    icon: IconLocation
  },
  {
    type: 'email_capture',
    label: 'Email Capture',
    icon: IconMail
  },
  {
    type: 'image',
    label: 'Image',
    icon: IconPhoto
  },
  {
    type: 'group_title',
    label: 'Group Title',
    icon: IconGroupTitle
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
      className="text-slate-700 hover:bg-slate-100 hover:text-slate-900 group flex items-center px-2 py-2.5 text-sm rounded-md"
      onClick={handleClick}
    >
      <config.icon className="text-slate-700 mr-3 flex-shrink-0 h-5 w-5" />
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

    case 'group_title':
      return <AddGroupTitle {...restProps} />

    default:
      return SOCIAL_TYPES.includes(type) ? <AddSocial type={type} {...restProps} /> : null
  }
}

export const AddWidget = () => {
  const { dispatch } = useBuilderContext()
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
      update([...listValue, newValue])
      dispatch({
        type: 'updateState',
        payload: {
          selectedListId: newValue.id,
          selectedSection: undefined
        }
      })
    },
    [listValue]
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
          type={type}
          onCreate={handleCreate}
          onGoBack={handleGoBack}
          onGoNext={handleGoNext}
        />
      ))}
    </>
  )
}
