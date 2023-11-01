import { Button, Dropdown, Input, Tooltip } from '@heyforms/ui'
import { IconCreditCard, IconLink, IconLocation, IconMail, IconPhoto, IconX } from '@tabler/icons'
import { nanoid } from 'nanoid'
import { FC, useEffect, useMemo, useRef, useState } from 'react'

import { IconGroupTitle, MediaPicker } from '~/components'
import { CREATE_WIDGET_LABELS } from '~/layout/builder3/constants'
import { MapboxPlace } from '~/service'

import { PlaceSearch } from './LocationSubOption'

interface NewWidgetItemProps {
  type: string
  label: string
  icon: FC<any>
  onClick: (type: string) => void
}

const NEW_WIDGET_CONFIGS: Omit<NewWidgetItemProps, 'onClick'>[] = [
  {
    type: 'website',
    label: 'Add Link',
    icon: IconLink
  },
  {
    type: 'payment',
    label: 'Add Payment',
    icon: IconCreditCard
  },
  {
    type: 'email_capture',
    label: 'Add Email Capture',
    icon: IconMail
  },
  {
    type: 'google_map',
    label: 'Add Location',
    icon: IconLocation
  },
  {
    type: 'image',
    label: 'Add Image',
    icon: IconPhoto
  },
  {
    type: 'group_title',
    label: 'Add Group Title',
    icon: IconGroupTitle
  }
]

interface NewWidgetProps {
  onCreate: (value: AnyMap) => void
}

interface NewWidgetPanelProps extends NewWidgetProps {
  type: string
  onCancel: () => void
}

const NewWidgetItem: FC<NewWidgetItemProps & NewWidgetProps> = ({
  type,
  label,
  icon: Icon,
  onClick,
  onCreate
}) => {
  const [visible, setVisible] = useState(false)

  function handleClick() {
    switch (type) {
      case 'group_title':
        return onCreate({
          id: nanoid(6),
          type,
          size: '1x1'
        })

      case 'payment':
        return onCreate({
          id: nanoid(6),
          type,
          size: '1x1',
          data: {
            buttonText: 'Pay',
            successMessage: 'Thank you for your payment!'
          },
          overrides: {
            title: ''
          }
        })

      case 'email_capture':
        return onCreate({
          id: nanoid(6),
          type,
          size: '1x1',
          data: {
            emailPlaceholder: 'Enter email address',
            buttonText: 'Subscribe',
            successMessage: 'Thank you for subscribing!'
          },
          overrides: {
            title: ''
          }
        })

      default:
        onClick(type)
    }
  }

  function handleCreateImage(type: string, imageUrl: string) {
    setVisible(false)
    onCreate({
      id: nanoid(6),
      type,
      size: '1x1',
      overrides: {
        imageUrl
      }
    })
  }

  switch (type) {
    case 'image':
      return (
        <Tooltip ariaLabel={label}>
          <div>
            <Dropdown
              visible={visible}
              placement="auto"
              overlay={<MediaPicker allowed={['image']} onChange={handleCreateImage} />}
              offset={[0, 30]}
              onDropdownVisibleChange={setVisible}
            >
              <Button
                className="!p-1.5 !border-none !bg-transparent hover:!bg-slate-200/80"
                leading={<IconPhoto className="!text-slate-800" />}
              />
            </Dropdown>
          </div>
        </Tooltip>
      )

    default:
      return (
        <Tooltip ariaLabel={label}>
          <div>
            <Button
              className="!p-1.5 !border-none !bg-transparent hover:!bg-slate-200/80"
              leading={<Icon className="!text-slate-800" />}
              onClick={handleClick}
            />
          </div>
        </Tooltip>
      )
  }
}

const NewWidgetPanel: FC<NewWidgetPanelProps> = ({ type, onCreate, onCancel }) => {
  const elemRef = useRef<HTMLDivElement>(null)

  function handleCreateWebsite(url: string) {
    onCancel()
    onCreate({
      id: nanoid(8),
      size: '1x1',
      url
    })
  }

  function handleCreateMap(place: MapboxPlace) {
    onCancel()
    onCreate({
      id: nanoid(8),
      size: '1x1',
      url: `https://www.google.com/maps/@${place.latitude},${place.longitude},13z`,
      data: {
        location: place.placeName
      }
    })
  }

  const children = useMemo(() => {
    switch (type) {
      case 'website':
        return (
          <Input type="url" placeholder="Enter or paste link here" onEnter={handleCreateWebsite} />
        )

      case 'google_map':
        return <PlaceSearch onChange={handleCreateMap} />
    }
  }, [type])

  useEffect(() => {
    elemRef.current?.scrollIntoView()
  }, [])

  return (
    <div ref={elemRef} className="p-4 text-sm gap-2 w-full rounded-lg bg-slate-200/50">
      <div className="builder-option">
        <div className="builder-option__title flex items-center justify-between">
          <span>{CREATE_WIDGET_LABELS[type]}</span>
          <Button
            className="!border-none !bg-transparent !p-1 hover:!bg-white text-xs text-slate-600 hover:text-slate-900"
            leading={<IconX />}
            onClick={onCancel}
          />
        </div>
        <div className="builder-option__content">{children}</div>
      </div>
    </div>
  )
}

export const NewWidget: FC<{ onCreate: (value: AnyMap) => void }> = ({ onCreate }) => {
  const [type, setType] = useState<string>()

  function handleCancel() {
    setType(undefined)
  }

  if (type) {
    return <NewWidgetPanel type={type} onCreate={onCreate} onCancel={handleCancel} />
  }

  return (
    <div className="flex items-center justify-center text-sm gap-2 w-full py-1.5">
      <span>Add</span>
      <div className="flex items-center">
        {NEW_WIDGET_CONFIGS.map(config => (
          <NewWidgetItem key={config.type} {...config} onClick={setType} onCreate={onCreate} />
        ))}
      </div>
    </div>
  )
}
