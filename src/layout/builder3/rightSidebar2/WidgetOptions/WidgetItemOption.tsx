import { FC, useMemo } from 'react'

import { MAP_MEDIA_SIZE_OPTIONS, WIDGET_SIZE_OPTIONS } from '~/layout/builder3/constants'
import { useOptions } from '~/layout/builder3/context'

import { EmailCaptureOption } from '../../rightSidebar/EmailCaptureOption'
import { PaymentOption } from '../../rightSidebar/PaymentOption'
import { EXPERIENCE_FIELDS, EXPERIENCE_TYPES } from '../AddWidget/AddExperience'
import { SkillsIcon } from '../AddWidget/AddSkills/SkillsIcons'
import { DateRangeSubOption } from './DateRangeSubOption'
import { ImageSubOption } from './ImageSubOption'
import { LocationSubOption } from './LocationSubOption'
import { RatingSubOption } from './RatingSubOption'
import { SelectSubOption } from './SelectSubOption'
import { SkillsIconSubOption } from './SkillsIconSubOption'
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
      <TextSubOption
        title="Description"
        path={[parentName, index, 'overrides.description'].join('.')}
      />
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

const VideoWidgetOption: FC<Pick<WidgetItemOptionProps, 'parentName' | 'index'>> = ({
  parentName,
  index
}) => {
  return (
    <>
      <URLSubOption title="URL" path={[parentName, index, 'url'].join('.')} />
      <SelectSubOption
        title="Size"
        options={MAP_MEDIA_SIZE_OPTIONS}
        path={[parentName, index, 'size'].join('.')}
      />
      <ImageSubOption title="Image" path={[parentName, index, 'overrides.imageUrl'].join('.')} />
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

const SkillsItemOption: FC<Pick<WidgetItemOptionProps, 'parentName' | 'index'>> = ({
  parentName,
  index
}) => {
  return (
    <>
      <TextSubOption title="Name" path={[parentName, index, 'data.title'].join('.')} />
      <SkillsIconSubOption title="Icon" path={[parentName, index, 'data.icon'].join('.')} />
      <RatingSubOption title="Rating" path={[parentName, index, 'data.rating'].join('.')} />
    </>
  )
}

const TextWidgetOption: FC<Pick<WidgetItemOptionProps, 'parentName' | 'index'>> = ({
  parentName,
  index
}) => {
  return (
    <>
      <SelectSubOption
        title="Size"
        options={WIDGET_SIZE_OPTIONS}
        path={[parentName, index, 'size'].join('.')}
      />
      <TextSubOption title="Text" path={[parentName, index, 'overrides.title'].join('.')} />
      <URLSubOption
        title="URL"
        path={[parentName, index, 'url'].join('.')}
        allowHyperlink={true}
        description={
          <div className="mt-1 text-xs text-slate-500">
            You can enter a URL address starting with{' '}
            <span className="text-slate-800">http://</span> or{' '}
            <span className="text-slate-800">https://</span>, or a hyperlink starting with{' '}
            <span className="text-slate-800">tel:</span> or{' '}
            <span className="text-slate-800">mailto:</span>.
          </div>
        }
      />
    </>
  )
}

const ExperienceItemOption: FC<Pick<WidgetItemOptionProps, 'parentName' | 'index'>> = ({
  parentName,
  index
}) => {
  const { value: experienceType } = useOptions<string>(
    [parentName, index, 'data.experienceType'].join('.')
  )

  return (
    <>
      <SelectSubOption
        title=""
        path={[parentName, index, 'data.experienceType'].join('.')}
        options={EXPERIENCE_TYPES}
      />

      <ImageSubOption
        title="Image"
        path={[parentName, index, 'data.imageUrl'].join('.')}
        placeholder={<SkillsIcon iconType="svg" svgName={experienceType!} />}
        offset={[125, 85]}
      />

      {(EXPERIENCE_FIELDS[experienceType!] as AnyMap[]).map(row => {
        switch (row.type) {
          case 'date':
            return (
              <DateRangeSubOption
                title={row.label}
                path={[parentName, index, `data.${row.name}`].join('.')}
              />
            )

          case 'input':
            return (
              <TextSubOption
                title={row.label}
                path={[parentName, index, `data.${row.name}`].join('.')}
              />
            )
        }
      })}
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
        return <ImageWidgetOption parentName={parentName} index={index} />

      case 'video':
        return <VideoWidgetOption parentName={parentName} index={index} />

      case 'skills':
        return <SkillsItemOption parentName={parentName} index={index} />

      case 'experience':
        return <ExperienceItemOption parentName={parentName} index={index} />

      case 'text':
        return <TextWidgetOption parentName={parentName} index={index} />

      default:
        return <WebsiteWidgetOption parentName={parentName} index={index} provider={provider} />
    }
  }, [provider, index, parentName])

  return <div className="px-5">{children}</div>
}
