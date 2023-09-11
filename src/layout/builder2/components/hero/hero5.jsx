import {
  $Block as Block,
  $EmailCapture as EmailCapture,
  $Media as Media,
  $Html as Html,
  $H1 as H1
} from '@earlybirdim/blocks'
import { isValid } from '@nily/utils'

const render = function ({ productId, block }) {
  return (
    <Block productId={productId} block={block}>
      <div className="hero5__container">
        <div className="hero5__wrapper">
          {isValid(block.setting.Html1) && (
            <div className="hero5__announcement-wrapper">
              <Html as="p" className="hero5__announcement" {...block.setting.Html1} />
            </div>
          )}

          <H1 className="hero5__title" {...block.setting.H11} />

          <Html as="p" className="hero5__subtitle" {...block.setting.Html2} />

          <div className="hero5__cta">
            <EmailCapture className="hero5__email-capture" {...block.setting.EmailCapture1} />
          </div>

          <div className="hero5__media">
            <Media {...block.setting.Media1} />
          </div>
        </div>
      </div>
    </Block>
  )
}

const settingSchemas = [
  {
    blockType: 'hero',
    default: {
      style: {
        background: '#fff'
      }
    },
    type: 'schema_block',
    children: []
  },
  {
    name: 'Html1',
    title: 'Caption',
    default: {
      as: 'p',
      html: '\r\n              Take a look at our latest \r\n              <a href="#" style="color:#2563eb">\r\n                blog post\r\n              </a>\r\n              .\r\n            ',
      style: {
        color: '#4b5563'
      },
      type: 'html'
    },
    type: 'schema_html'
  },
  {
    name: 'H11',
    title: 'Title',
    default: {
      as: 'h1',
      html: '\r\n            A better way to ship your projects\r\n          ',
      style: {
        color: '#111827'
      },
      type: 'html'
    },
    type: 'schema_html'
  },
  {
    name: 'Html2',
    title: 'Subtitle',
    default: {
      as: 'p',
      html: '\r\n            Effortlessly create, pitch, and validate your early-stage business with our no-code\r\n            landing page builder.\r\n          ',
      style: {
        color: '#4b5563'
      },
      type: 'html'
    },
    type: 'schema_html'
  },
  {
    name: 'EmailCapture1',
    title: 'Email capture',
    default: {
      isNameRequired: false,
      fullName: {
        style: {
          color: '#111827',
          background: '#fff',
          borderColor: '#d1d5db'
        }
      },
      email: {
        style: {
          color: '#111827',
          background: '#fff',
          borderColor: '#d1d5db'
        }
      },
      button: {
        appearance: 'filled',
        text: 'Subscribe',
        style: {
          color: '#fff',
          background: '#2563eb'
        }
      },
      type: 'email_capture'
    },
    type: 'schema_email_capture'
  },
  {
    name: 'Media1',
    title: 'Hero media',
    default: {
      type: 'image',
      src: 'https://storage.earlybird.im/example/feature-light.png',
      alt: 'Your company',
      width: 1216,
      height: 0
    },
    type: 'schema_media'
  }
]

export const Hero5 = {
  type: 'hero',
  settingSchemas,
  render
}
