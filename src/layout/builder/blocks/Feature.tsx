import { Switch, Tooltip } from '@heyforms/ui'
import { IconBoxAlignLeft, IconBoxAlignRight } from '@tabler/icons'
import { useTranslation } from 'next-i18next'
import { FC, useMemo } from 'react'

import { useBuilderContext } from '../context'
import { BlockComponent, BlockPreview, BlockProps } from './Block'
import { Heading } from './Heading'
import { Image, ImagePreview } from './Image'
import { Text } from './Text'

export interface FeatureProps extends BlockProps {
  block: FeatureBlock
}

const IMAGE_WIDTH = 500

export const FeaturePreview: FC<FeatureProps> = ({ block, ...restProps }) => {
  const CustomTag = `h${block.heading.level}` as any

  return (
    <BlockPreview block={block} {...restProps}>
      <div className={`block-feature-container block-feature-${block.align}`}>
        {/* Left column */}
        <div className="block-feature-col">
          <ImagePreview
            block={{
              ...block.image,
              width: IMAGE_WIDTH
            }}
          />
        </div>

        {/* Right column */}
        <div className="block-feature-col">
          {/* Heading */}
          <CustomTag className="block-feature-heading rich-text" placeholder=" ">
            {block.heading.html}
          </CustomTag>

          {/* Description */}
          <div className="block-context-container">
            <div className="rich-text" placeholder=" ">
              {block.content.html}
            </div>
          </div>
        </div>
      </div>
    </BlockPreview>
  )
}

export const FeatureSettings: FC<Pick<FeatureProps, 'block'>> = ({ block }) => {
  const { t } = useTranslation()
  const { dispatch } = useBuilderContext()

  const options: any[] = useMemo(
    () => [
      {
        value: 'left',
        label: (
          <Tooltip ariaLabel="Left to right">
            <IconBoxAlignLeft className="w-5 h-5" />
          </Tooltip>
        )
      },
      {
        value: 'right',
        label: (
          <Tooltip ariaLabel="Right to left">
            <IconBoxAlignRight className="w-5 h-5" />
          </Tooltip>
        )
      }
    ],
    []
  )

  function handleChange(align: any) {
    dispatch({
      type: 'updateBlock',
      payload: {
        blockId: block.id,
        updates: {
          align
        }
      }
    })
  }

  return (
    <div className="flex items-center justify-between px-4 py-2 text-slate-700">
      <span>{t('builder.layout')}</span>
      <Switch.Group value={block.align} options={options} onChange={handleChange} />
    </div>
  )
}

export const Feature: FC<FeatureProps> = ({ block, placeholder, ...restProps }) => {
  return (
    <BlockComponent block={block} {...restProps}>
      <div className={`block-feature-container block-feature-${block.align}`}>
        {/* Left column */}
        <div className="block-feature-col">
          <Image
            namespace="feature"
            block={{
              ...block.image,
              width: IMAGE_WIDTH
            }}
            uploadDesc1="builder.feature.uploadTip1"
            uploadDesc2="builder.feature.uploadTip2"
          />
        </div>

        {/* Right column */}
        <div className="block-feature-col">
          {/* Heading */}
          <Heading
            className="block-feature-heading"
            block={block.heading}
            placeholder="builder.feature.heading"
            enableFormats={null}
          />

          {/* Description */}
          <div className="block-context-container">
            <Text
              block={block.content}
              placeholder="builder.feature.description"
              enableFormats={['basic']}
            />
          </div>
        </div>
      </div>
    </BlockComponent>
  )
}
