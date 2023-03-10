import {
  $Block as Block,
  $EmailCapture as EmailCapture,
  $H2 as H2,
  $Html as Html
} from '@earlybirdim/blocks'
const render = function ({ productId, block }) {
  return (
    <Block productId={productId} block={block}>
      <div className="email_capture2__container">
        <div className="email_capture2__wrapper">
          <H2 className="email_capture2__title" {...block.setting.H21} />
          <Html as="p" className="email_capture2__subtitle" {...block.setting.Html1} />
          <EmailCapture className="email-capture2__form" {...block.setting.EmailCapture1} />
        </div>
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
    name: 'H21',
    title: 'Title',
    default: {
      as: 'h2',
      html: '\r\n            Join the newsletter!\r\n          ',
      style: {
        color: '#111827'
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
      html: '\r\n            Subscribe now for hand-pickerd holiday deals, inspiration and the\r\n            latest tips, straight to your inbox.\r\n          ',
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
  }
]

export const EmailCapture2 = {
  type: 'email_capture',
  settingSchemas,
  render
}
