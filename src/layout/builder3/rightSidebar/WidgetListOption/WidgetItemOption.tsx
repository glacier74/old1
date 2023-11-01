import { parseURL } from '@earlybirdim/components/utils'
import { IconGripVertical, IconTrash } from '@tabler/icons'
import clsx from 'clsx'
import { FC, useMemo } from 'react'

import {
  MAP_MEDIA_SIZE_OPTIONS,
  WIDGET_SIZE_OPTIONS,
  WIDGET_URL_PROVIDERS
} from '~/layout/builder3/constants'
import { useOptions } from '~/layout/builder3/context'
import { EmailCaptureOption } from '~/layout/builder3/rightSidebar/EmailCaptureOption'
import { SwitchSubOption } from '~/layout/builder3/rightSidebar/WidgetListOption/SwitchSubOption'

import { PaymentOption } from '../PaymentOption'
import { ImageSubOption } from './ImageSubOption'
import { LocationSubOption } from './LocationSubOption'
import { SelectSubOption } from './SelectSubOption'
import { TextSubOption, URLSubOption } from './TextSubOption'

interface WidgetItemOptionProps {
  parentName?: string
  index: number
  value: AnyMap<any>
  isSelected?: boolean
  onSelect: (id: string) => void
  onDelete: (id: string) => void
}

const WebsiteWidgetOption: FC<Pick<WidgetItemOptionProps, 'parentName' | 'index'>> = ({
  parentName,
  index
}) => {
  const { value: sizeValue } = useOptions<string>([parentName, index, 'size'].join('.'))

  return (
    <>
      <URLSubOption title="URL" path={[parentName, index, 'url'].join('.')} />
      <SelectSubOption
        title="Size"
        options={WIDGET_SIZE_OPTIONS}
        path={[parentName, index, 'size'].join('.')}
      />
      <TextSubOption title="Title" path={[parentName, index, 'overrides.title'].join('.')} />
      {(sizeValue === '2x1' || sizeValue === '2x2') && (
        <ImageSubOption title="Image" path={[parentName, index, 'overrides.imageUrl'].join('.')} />
      )}
    </>
  )
}

const GroupTitleWidgetOption: FC<Pick<WidgetItemOptionProps, 'parentName' | 'index'>> = ({
  parentName,
  index
}) => {
  return <TextSubOption title="Title" path={[parentName, index, 'overrides.title'].join('.')} />
}

const MapWidgetOption: FC<Pick<WidgetItemOptionProps, 'parentName' | 'index'>> = ({
  parentName,
  index
}) => {
  return (
    <>
      <LocationSubOption title="Location" path={[parentName, index].join('.')} />
      <SelectSubOption
        title="Size"
        options={MAP_MEDIA_SIZE_OPTIONS}
        path={[parentName, index, 'size'].join('.')}
      />
      <TextSubOption title="Caption" path={[parentName, index, 'overrides.title'].join('.')} />
    </>
  )
}

const ImageWidgetOption: FC<Pick<WidgetItemOptionProps, 'parentName' | 'index'>> = ({
  parentName,
  index
}) => {
  return (
    <>
      <ImageSubOption title="Image" path={[parentName, index, 'overrides.imageUrl'].join('.')} />
      <SelectSubOption
        title="Size"
        options={MAP_MEDIA_SIZE_OPTIONS}
        path={[parentName, index, 'size'].join('.')}
      />
      <URLSubOption title="Link" path={[parentName, index, 'url'].join('.')} />
      <TextSubOption title="Caption" path={[parentName, index, 'overrides.title'].join('.')} />
    </>
  )
}

const PaymentWidgetOption: FC<Pick<WidgetItemOptionProps, 'parentName' | 'index'>> = ({
  parentName,
  index
}) => {
  const { value: sizeValue } = useOptions<string>([parentName, index, 'size'].join('.'))

  return (
    <>
      <SelectSubOption
        title="Size"
        options={MAP_MEDIA_SIZE_OPTIONS}
        path={[parentName, index, 'size'].join('.')}
      />
      <TextSubOption title="Title" path={[parentName, index, 'overrides.title'].join('.')} />
      <TextSubOption title="Button" path={[parentName, index, 'data.buttonText'].join('.')} />

      {(sizeValue === '2x1' || sizeValue === '2x2') && (
        <ImageSubOption title="Image" path={[parentName, index, 'overrides.imageUrl'].join('.')} />
      )}

      <div className="builder-option__widget-content">
        <PaymentOption
          parentName={[parentName, index].join('.')}
          schema={{
            name: 'data',
            fields: []
          }}
        />
      </div>
    </>
  )
}

const EmailCaptureWidgetOption: FC<Pick<WidgetItemOptionProps, 'parentName' | 'index'>> = ({
  parentName,
  index
}) => {
  const { value: sizeValue } = useOptions<string>([parentName, index, 'size'].join('.'))

  return (
    <>
      <SelectSubOption
        title="Size"
        options={MAP_MEDIA_SIZE_OPTIONS}
        path={[parentName, index, 'size'].join('.')}
      />
      <TextSubOption title="Title" path={[parentName, index, 'overrides.title'].join('.')} />

      <SwitchSubOption
        title="Collect Name"
        path={[parentName, index, 'data.isNameRequired'].join('.')}
      />

      <TextSubOption title="Button" path={[parentName, index, 'data.buttonText'].join('.')} />

      {(sizeValue === '2x1' || sizeValue === '2x2') && (
        <ImageSubOption title="Image" path={[parentName, index, 'overrides.imageUrl'].join('.')} />
      )}

      <div className="builder-option__email-capture-content">
        <EmailCaptureOption
          parentName={[parentName, index].join('.')}
          schema={{
            name: 'data',
            fields: []
          }}
        />
      </div>
    </>
  )
}

export const WidgetItemOption: FC<WidgetItemOptionProps> = ({
  parentName,
  index,
  isSelected,
  value,
  onSelect,
  onDelete
}) => {
  function handleSelect() {
    onSelect(value.id)
  }

  function handleDelete() {
    onDelete(value.id)
  }

  const customURL = useMemo(() => parseURL(value?.url, value?.type), [value?.type, value?.url])

  const children = useMemo(() => {
    switch (customURL.provider) {
      case 'group_title':
        return <GroupTitleWidgetOption parentName={parentName} index={index} />

      case 'payment':
        return <PaymentWidgetOption parentName={parentName} index={index} />

      case 'email_capture':
        return <EmailCaptureWidgetOption parentName={parentName} index={index} />

      case 'google_map':
        return <MapWidgetOption parentName={parentName} index={index} />

      case 'image':
      case 'video':
        return <ImageWidgetOption parentName={parentName} index={index} />

      default:
        return <WebsiteWidgetOption parentName={parentName} index={index} />
    }
  }, [customURL.provider, index, parentName])

  return (
    <div
      className={clsx('builder-option__list-item', {
        'builder-option__list-item-selected': isSelected
      })}
    >
      <div className="builder-option__list-item-title">
        <div className="builder-option__list-item-text" onClick={handleSelect}>
          <span
            className={clsx({
              'font-semibold': customURL.provider === 'group_title'
            })}
          >
            {WIDGET_URL_PROVIDERS[customURL.provider]}
          </span>
          {value?.overrides?.title && (
            <span className="ml-1 text-slate-500">({value.overrides.title})</span>
          )}
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
      <div className="builder-option__list-item-content">{children}</div>
    </div>
  )
}
