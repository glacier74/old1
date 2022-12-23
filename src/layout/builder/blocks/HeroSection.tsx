import { isValid } from '@nily/utils'
import { FC } from 'react'

import { Heading } from '~/layout/builder/blocks/Heading'
import { Image, ImagePreview } from '~/layout/builder/blocks/Image'
import { Text } from '~/layout/builder/blocks/Text'

import { BlockComponent, BlockPreview, BlockProps } from './Block'

export interface HeroSectionProps extends BlockProps {
  block: HeroSectionBlock
}

const IMAGE_WIDTHS = {
  left: 500,
  center: 1_000
}

export const HeroSectionPreview: FC<HeroSectionProps> = ({ block }) => {
  const CustomTag = `h${block.name.level}` as any

  return (
    <BlockPreview className={`block-herosection-${block.layout}`} block={block}>
      <div className="block-herosection-col">
        <div className="block-herosection-name">
          <CustomTag className="rich-text" placeholder=" ">
            {block.name.html}
          </CustomTag>
        </div>

        <div className="block-herosection-tagline">
          <div
            className="rich-text"
            placeholder=" "
            dangerouslySetInnerHTML={{
              __html: block.tagline.html
            }}
          />
        </div>

        <div className="block-herosection-action">
          {block.buttons.map(button => {
            let href: string | undefined

            switch (button.action?.type) {
              case 'link':
                href = button.action.value
                break

              case 'block':
                href = `#block-${button.action.value}`
                break
            }

            return (
              <div key={button.id} className="block-herosection-button">
                <a href={href}>{button.html}</a>
              </div>
            )
          })}
        </div>
      </div>

      {isValid(block.image.source) && (
        <div className="block-herosection-image">
          <ImagePreview
            block={{
              ...block.image,
              width: IMAGE_WIDTHS[block.layout || 'center']
            }}
          />
        </div>
      )}
    </BlockPreview>
  )
}

export const HeroSection: FC<HeroSectionProps> = ({ block }) => {
  return (
    <BlockComponent className={`block-herosection-${block.layout}`} block={block}>
      <div className="block-herosection-col">
        {/* Name */}
        <Heading
          className="block-herosection-name"
          block={block.name}
          placeholder="builder.heroSection.heading"
          enableFormats={null}
        />

        {/* Tagline */}
        <div className="block-herosection-tagline">
          <Text
            block={block.tagline}
            placeholder="builder.heroSection.tagline"
            enableFormats={['basic']}
          />
        </div>

        <div className="block-herosection-action">
          {block.buttons.map(button => (
            <Text
              key={button.id}
              className="block-herosection-button"
              block={button}
              placeholder="builder.heroSection.button"
              enableFormats={null}
            />
          ))}
        </div>
      </div>

      {/* Image */}
      <div className="block-herosection-image">
        <Image
          namespace="heroSection"
          block={{
            ...block.image,
            width: IMAGE_WIDTHS[block.layout || 'center']
          }}
          uploadDesc1="builder.heroSection.uploadTip1"
          uploadDesc2="builder.heroSection.uploadTip2"
        />
      </div>
    </BlockComponent>
  )
}
