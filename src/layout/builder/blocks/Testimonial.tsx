import { isValid } from '@nily/utils'
import { useTranslation } from 'next-i18next'
import Script from 'next/script'
import { FC, useMemo } from 'react'

import { Heading } from '~/layout/builder/blocks/Heading'
import { Text } from '~/layout/builder/blocks/Text'

import { BlockComponent, BlockPreview, BlockProps } from './Block'

export interface TestimonialProps extends BlockProps {
  block: TestimonialBlock
}

const PRAISEHIVE_REGEX = /id="([^"]+)"/i
const SENJA_REGEX = /data-id="([^"]+)"/i
const TESTIMONIAL_REGEX = /<iframe.+id="([^"]+).+src="([^"]+)"[^<]+<\/iframe>/i

const TestimonialEmbed: FC<{ embedCode: string }> = ({ embedCode }) => {
  if (isValid(embedCode)) {
    // PraiseHive
    if (embedCode.includes('praisehive-embed')) {
      const matches = embedCode.match(PRAISEHIVE_REGEX)

      if (matches) {
        return (
          <>
            <div className="praisehive-embed" id={matches[1]} />
            <Script
              id="praisehive-embed"
              src={`https://embed.praisehive.com/js/embed.js?v=${Date.now()}`}
            />
          </>
        )
      }
    }

    // Senja
    else if (embedCode.includes('senja-frame-embed')) {
      const matches = embedCode.match(SENJA_REGEX)

      if (matches) {
        return (
          <>
            <div className="senja-frame-embed" data-id={matches[1]} />
            <Script id="senja-frame-embed" src="https://widget.senja.io/embed/frame.js" />
          </>
        )
      }
    }

    // Testimonial
    else if (embedCode.includes('testimonialto')) {
      const matches = embedCode.match(TESTIMONIAL_REGEX)

      if (matches) {
        function handleOnLoad() {
          ;(window as any).iFrameResize({ log: false, checkOrigin: false }, `#${matches![1]}`)
        }

        return (
          <>
            <iframe id={matches[1]} src={matches[2]} frameBorder="0" scrolling="no" width="100%" />
            <Script src="https://testimonial.to/js/iframeResizer.min.js" onLoad={handleOnLoad} />
          </>
        )
      }
    }
  }

  return null
}

export const TestimonialPreview: FC<TestimonialProps> = ({ block, ...restProps }) => {
  return (
    <BlockPreview block={block} {...restProps}>
      <div className="block-testimonial-container">
        <div className="block-testimonial-heading">
          <h3 className="rich-text" placeholder=" ">
            {block.heading.html}
          </h3>
        </div>

        <div className="block-testimonial-description">
          <div
            className="rich-text"
            placeholder=" "
            dangerouslySetInnerHTML={{
              __html: block.description.html
            }}
          />
        </div>

        <div className="block-testimonial-content">
          <TestimonialEmbed embedCode={block.embedCode} />
        </div>
      </div>
    </BlockPreview>
  )
}

export const Testimonial: FC<TestimonialProps> = ({ block, ...restProps }) => {
  const { t } = useTranslation()

  const MemoTestimonialEmbed = useMemo(
    () => <TestimonialEmbed embedCode={block.embedCode} />,
    [block.embedCode]
  )

  return (
    <BlockComponent block={block} {...restProps}>
      <div className="block-testimonial-container">
        {/* Heading */}
        <Heading
          className="block-testimonial-heading"
          block={block.heading}
          placeholder={t('builder.testimonial.heading')}
          enableFormats={null}
        />

        {/* Description */}
        <div className="block-testimonial-description">
          <Text
            block={block.description}
            placeholder={t('builder.testimonial.description')}
            enableFormats={['basic']}
          />
        </div>

        <div className="block-testimonial-content">{MemoTestimonialEmbed}</div>
      </div>
    </BlockComponent>
  )
}
