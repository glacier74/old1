import { FC, useMemo } from 'react'

import { MAP_MEDIA_SIZE_OPTIONS, WIDGET_SIZE_OPTIONS } from '~/layout/builder3/constants'
import { useOptions } from '~/layout/builder3/context'

import { EmailCaptureOption } from '../../rightSidebar/EmailCaptureOption'
import { PaymentOption } from '../../rightSidebar/PaymentOption'
import { ImageSubOption } from './ImageSubOption'
import { LocationSubOption } from './LocationSubOption'
import { SelectSubOption } from './SelectSubOption'
import { SwitchSubOption } from './SwitchSubOption'
import { TextSubOption, URLSubOption } from './TextSubOption'

interface WidgetItemOptionProps {
  parentName?: string
  index: number
  provider: string
}

const WebsiteWidgetOption: FC<Pick<WidgetItemOptionProps, 'parentName' | 'index' | 'provider'>> = ({
  parentName,
  index,
  provider
}) => {
  const { value: sizeValue } = useOptions<string>([parentName, index, 'size'].join('.'))
  const isImageAllowed = useMemo(
    () =>
      (sizeValue === '2x1' || sizeValue === '2x2') &&
      (provider === 'website' || provider === 'twitter'),
    [provider, sizeValue]
  )

  return (
    <>
      <URLSubOption title="URL" path={[parentName, index, 'url'].join('.')} />
      <SelectSubOption
        title="Size"
        options={WIDGET_SIZE_OPTIONS}
        path={[parentName, index, 'size'].join('.')}
      />
      <TextSubOption title="Title" path={[parentName, index, 'overrides.title'].join('.')} />
      {isImageAllowed && (
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

export const WidgetItemOption: FC<WidgetItemOptionProps> = ({ parentName, index, provider }) => {
  const children = useMemo(() => {
    switch (provider) {
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
        return <WebsiteWidgetOption parentName={parentName} index={index} provider={provider} />
    }
  }, [provider, index, parentName])

  return <div className="px-5">{children}</div>
}
