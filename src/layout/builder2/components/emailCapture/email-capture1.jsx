import {
  $Block as Block,
  $EmailCapture as EmailCapture,
  $H2 as H2,
  $Html as Html,
  $Style as Style
} from '@earlybirdim/blocks'

const render = function ({ productId, block }) {
  return (
    <Block productId={productId} block={block}>
      <div className="email-capture1__container">
        <Style className="email-capture1__wrapper" {...block.setting.Style1}>
          <div className="email-capture1__left">
            <H2 className="email-capture1__title" {...block.setting.H21} />
            <Html as="p" className="email-capture1__subtitle" {...block.setting.Html1} />
          </div>

          <div className="email-capture1__right">
            <EmailCapture className="email-capture1__form" {...block.setting.EmailCapture1} />
          </div>
        </Style>
      </div>
    </Block>
  )
}

const settingSchemas = [
  {
    blockType: 'email_capture',
    default: {
      style: {
        background: '#fff'
      }
    },
    type: 'schema_block',
    children: []
  },
  {
    name: 'Style1',
    title: 'Style',
    default: {
      style: {
        background: '#1d4ed8'
      }
    },
    propertyName: 'block.setting.Style1',
    type: 'schema_style',
    children: []
  },
  {
    name: 'H21',
    title: 'Title',
    default: {
      as: 'h2',
      html: '\r\n              Join the newsletter!\r\n            ',
      style: {
        color: '#fff'
      },
      type: 'html'
    },
    type: 'schema_html'
  },
  {
    name: 'Html1',
    title: 'Subtitle',
    default: {
      as: 'p',
      html: '\r\n              Subscribe now for hand-pickerd holiday deals, inspiration and the latest tips,\r\n              straight to your inbox.\r\n            ',
      style: {
        color: '#bfdbfe'
      },
      type: 'html'
    },
    type: 'schema_html'
  },
  {
    name: 'EmailCapture1',
    title: 'Email capture',
    default: {
      email: {
        style: {
          color: '#111827',
          background: '#fff',
          borderColor: '#d1d5db'
        }
      },
      button: {
        text: 'Subscribe',
        style: {
          color: '#fff',
          background: '#2563eb'
        }
      },
      type: 'email_capture'
    },
    type: 'schema_email_capture'
  }
]

export const EmailCapture1 = {
  type: 'email_capture',
  settingSchemas,
  render
}
