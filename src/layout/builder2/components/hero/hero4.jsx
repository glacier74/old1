import {
  $Block as Block,
  $EmailCapture as EmailCapture,
  $Html as Html,
  $Text as Text,
  $H1 as H1,
  $Group as Group,
  $Image as Image
} from '@earlybirdim/blocks'
const render = function ({ productId, block }) {
  return (
    <Block productId={productId} block={block}>
      <div className="hero4__container">
        <div className="hero4__wrapper">
          <div className="hero4__left">
            <div className="hero4__announcement-wrapper">
              <Html as="p" className="hero4__announcement" {...block.setting.Html1} />
            </div>

            <H1 className="hero4__title" {...block.setting.H11} />

            <Html as="p" className="hero4__subtitle" {...block.setting.Html2} />

            <Group className="hero4__cta">
              <EmailCapture
                className="hero4__email-capture"
                {...block.setting.Group1.EmailCapture1}
              />

              <Text as="p" className="hero4__cta-bottom-text" {...block.setting.Group1.Text1} />
            </Group>
          </div>

          <div className="hero4__right">
            <Image {...block.setting.Image1} />
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
      html: '\r\n                Take a look at our latest \r\n                <a href="#" style="color:#2563eb">\r\n                  blog post\r\n                </a>\r\n                .\r\n              ',
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
      html: '\r\n              A better way to ship your projects\r\n            ',
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
      html: '\r\n              Effortlessly create, pitch, and validate your early-stage business with our no-code\r\n              landing page builder.\r\n            ',
      style: {
        color: '#4b5563'
      },
      type: 'html'
    },
    type: 'schema_html'
  },
  {
    name: 'Group1',
    title: 'Call-to-action',
    propertyName: 'block.setting.Group1',
    type: 'schema_group',
    children: [
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
        name: 'Text1',
        title: 'Bottom text',
        default: {
          html: 'No coding skills required',
          style: {
            color: '#6b7280'
          },
          type: 'text'
        },
        type: 'schema_text'
      }
    ]
  },
  {
    name: 'Image1',
    title: 'Hero image',
    default: {
      src: 'https://storage.earlybird.im/example/3d51.png',
      alt: 'Your company',
      width: 504,
      height: 0,
      type: 'image'
    },
    type: 'schema_image'
  }
]

export const Hero4 = {
  type: 'hero',
  settingSchemas,
  render
}
