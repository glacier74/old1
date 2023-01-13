import { useTranslation } from 'next-i18next'
import { FC } from 'react'

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
      <div className={`block-feature-wrapper block-feature-${block.layout}`}>
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
          <div className="block-feature-content">
            <div
              className="rich-text"
              placeholder=" "
              dangerouslySetInnerHTML={{ __html: block.content.html }}
            />
          </div>
        </div>
      </div>
    </BlockPreview>
  )
}

export const Feature: FC<FeatureProps> = ({ block, placeholder, ...restProps }) => {
  const { t } = useTranslation()

  return (
    <BlockComponent block={block} {...restProps}>
      <div className={`block-feature-wrapper block-feature-${block.layout}`}>
        {/* Left column */}
        <div className="block-feature-col">
          <Image
            namespace="feature"
            block={{
              ...block.image,
              width: IMAGE_WIDTH
            }}
            tip1={t('builder.feature.uploadTip1')}
            tip2={t('builder.feature.uploadTip2')}
          />
        </div>

        {/* Right column */}
        <div className="block-feature-col">
          {/* Heading */}
          <Heading
            className="block-feature-heading"
            block={block.heading}
            placeholder={t('builder.feature.heading')}
            enableFormats={null}
          />

          {/* Description */}
          <div className="block-feature-content">
            <Text
              block={block.content}
              placeholder={t('builder.feature.description')}
              enableFormats={['basic']}
            />
          </div>
        </div>
      </div>
    </BlockComponent>
  )
}
