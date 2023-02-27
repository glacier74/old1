import { $EmailCapture as EmailCapture, $H2 as H2, $Html as Html } from '@earlybirdim/blocks'

const render = function ({ data }) {
  return (
    <div className="email-capture__container">
      <div className="email-capture__wrapper">
        <div className="email-capture__left">
          <H2 className="email-capture__title" {...data.setting.H21} />
          <Html as="p" className="email-capture__subtitle" {...data.setting.Html1} />
        </div>

        <div className="email-capture__right">
          <EmailCapture className="email-capture__form" {...data.setting.EmailCapture1} />
        </div>
      </div>
    </div>
  )
}

const settingSchemas = [
  {
    name: 'H21',
    title: 'Title',
    default: {
      as: 'h2',
      html: '\r\n            Join the newsletter!\r\n          ',
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
      html: '\r\n            Subscribe now for hand-pickerd holiday deals, inspiration and the latest tips, straight\r\n            to your inbox.\r\n          ',
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
