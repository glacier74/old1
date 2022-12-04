import { Switch, Tooltip } from '@heyforms/ui'
import { useTranslation } from 'next-i18next'
import { FC, useMemo } from 'react'

import { IconLayoutCenter, IconLayoutLeft } from '~/components'
import { Heading } from '~/layout/builder/blocks/Heading'
import { Image, ImagePreview } from '~/layout/builder/blocks/Image'
import { Text } from '~/layout/builder/blocks/Text'
import { useBuilderContext } from '~/layout/builder/context'

import { BlockComponent, BlockPreview, BlockProps } from './Block'

export interface HeroSectionProps extends BlockProps {
  block: HeroSectionBlock
}

const IMAGE_WIDTH = 120
const IMAGE_HEIGHT = 120

export const HeroSectionPreview: FC<HeroSectionProps> = ({ block }) => {
  const CustomTag = `h${block.name.level}` as any

  return (
    <BlockPreview className={`block-herosection-${block.layout}`} block={block}>
      <div className="pt-10">
        {block.logo && (
          <a className="mb-12" href="/">
            <ImagePreview
              block={{
                ...block.logo,
                width: IMAGE_WIDTH,
                height: IMAGE_HEIGHT
              }}
            />
          </a>
        )}

        <CustomTag
          className="sm:text-5xl text-3xl text-slate-900 font-bold rich-text"
          placeholder=" "
        >
          {block.name.html}
        </CustomTag>

        <div
          className="block-herosection-tagline mt-4 max-w-3xl text-xl text-slate-500 rich-text"
          placeholder=" "
          dangerouslySetInnerHTML={{
            __html: block.tagline.html
          }}
        />
      </div>
    </BlockPreview>
  )
}

export const HeroSectionSettings: FC<Pick<HeroSectionProps, 'block'>> = ({ block }) => {
  const { t } = useTranslation()
  const { dispatch } = useBuilderContext()

  const options: any[] = useMemo(
    () => [
      {
        value: 'left',
        label: (
          <Tooltip ariaLabel="Align left">
            <IconLayoutLeft className="w-5 h-5" />
          </Tooltip>
        )
      },
      {
        value: 'center',
        label: (
          <Tooltip ariaLabel="Align center">
            <IconLayoutCenter className="w-5 h-5" />
          </Tooltip>
        )
      }
    ],
    []
  )

  function handleChange(layout: any) {
    dispatch({
      type: 'updateBlock',
      payload: {
        blockId: block.id,
        updates: {
          layout
        }
      }
    })
  }

  return (
    <div className="flex items-center justify-between px-4 py-2 text-slate-700">
      <span>{t('builder.layout')}</span>
      <Switch.Group value={block.layout} options={options} onChange={handleChange} />
    </div>
  )
}

export const HeroSection: FC<HeroSectionProps> = ({ block }) => {
  return (
    <BlockComponent className={`block-herosection-${block.layout}`} block={block}>
      <div className="pt-10">
        {/* Logo */}
        <Image
          className="block-herosection-image"
          namespace="avatar"
          block={{
            ...block.logo,
            width: IMAGE_WIDTH,
            height: IMAGE_HEIGHT
          }}
          uploadDesc1="builder.herosection.uploadTip1"
          uploadDesc2="builder.herosection.uploadTip2"
        />

        {/* Name */}
        <Heading
          className="block-herosection-name"
          block={block.name}
          placeholder="onboarding.name"
          enableFormats={null}
        />

        {/* Tagline */}
        <div className="block-herosection-tagline">
          <Text block={block.tagline} placeholder="onboarding.tagline" enableFormats={['basic']} />
        </div>
      </div>
    </BlockComponent>
  )
}
