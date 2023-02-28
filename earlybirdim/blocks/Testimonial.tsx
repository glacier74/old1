import { isValid } from '@nily/utils'
import clsx from 'clsx'
import { FC } from 'react'
import { useFrame } from 'react-frame-component'

import { loadScript } from '~/utils'

interface $TestimonialProps extends ComponentProps {
  code: string
}

const PRAISEHIVE_REGEX = /id="([^"]+)"/i
const SENJA_REGEX = /data-id="([^"]+)"/i
const TESTIMONIAL_REGEX = /<iframe.+id="([^"]+).+src="([^"]+)"[^<]+<\/iframe>/i

const Embed: FC<{ code: string }> = ({ code }) => {
  const { window, document } = useFrame()

  if (isValid(code)) {
    // PraiseHive
    if (code.includes('praisehive-embed')) {
      const matches = code.match(PRAISEHIVE_REGEX)

      if (matches) {
        if (document) {
          loadScript(document.body, 'https://embed.praisehive.com/js/embed.js')
        }

        return <div className="praisehive-embed" id={matches[1]} />
      }
    }

    // Senja
    else if (code.includes('senja-frame-embed')) {
      const matches = code.match(SENJA_REGEX)

      if (matches) {
        if (document) {
          loadScript(document.body, 'https://widget.senja.io/embed/frame.js')
        }

        return <div className="senja-frame-embed" data-id={matches[1]} />
      }
    }

    // Testimonial
    else if (code.includes('testimonialto')) {
      const matches = code.match(TESTIMONIAL_REGEX)

      if (matches) {
        if (document) {
          loadScript(document.body, 'https://testimonial.to/js/iframeResizer.min.js', 2, () => {
            ;(window as any).iFrameResize({ log: false, checkOrigin: false }, `#${matches![1]}`)
          })
        }

        return (
          <iframe id={matches[1]} src={matches[2]} frameBorder="0" scrolling="no" width="100%" />
        )
      }
    }
  }

  return null
}

export const $Testimonial: FC<$TestimonialProps> = ({ className, code, ...restProps }) => {
  function handleClick() {
    alert('Testimonial is disabled in preview mode.')
  }

  return (
    <div className={clsx('earlybird-testimonial', className)} onClick={handleClick} {...restProps}>
      <Embed code={code} />
    </div>
  )
}
