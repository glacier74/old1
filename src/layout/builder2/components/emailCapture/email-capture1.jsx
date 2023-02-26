import { $EmailCapture as EmailCapture, $H2 as H2, $Html as Html } from '@earlybirdim/blocks'

const render = function ({ data }) {
  return (
    <div className="email-capture__container">
      <H2 className="email-capture__title" {...data.setting.H21} />
      <Html as="p" className="email-capture__subtitle" {...data.setting.Html1} />

      <EmailCapture className="email-capture__form" {...data.setting.EmailCapture1} />
    </div>
  )
}

const settingSchemas = [
  {
    name: 'H21',
    title: 'Title',
    default: {
      as: 'h2',
      html: '\r\n        Want product news and updates?\r\n      ',
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
      html: '\r\n        Sign up for our newsletter.\r\n      ',
      style: {
        color: '#2563eb'
      },
      type: 'html'
    },
    type: 'schema_html'
  },
  {
    name: 'EmailCapture1',
    title: 'Email Capture',
    default: {
      email: {
        style: {
          color: '#111827',
          background: '#fff',
          borderColor: '#d1d5db'
        }
      },
      button: {
        text: 'Notify me',
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
