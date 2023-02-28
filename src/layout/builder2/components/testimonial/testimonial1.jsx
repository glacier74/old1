import { $H1 as H1, $Html as Html, $Testimonial as Testimonial } from '@earlybirdim/blocks'

const render = function ({ data }) {
  return (
    <div className="testimonial__container">
      <div className="testimonial__wrapper">
        <H1 className="testimonial__title" {...data.setting.H11} />

        <Html as="p" className="testimonial__subtitle" {...data.setting.Html1} />

        <Testimonial {...data.setting.Testimonial1} />
      </div>
    </div>
  )
}

const settingSchemas = [
  {
    name: 'H11',
    title: 'Title',
    default: {
      as: 'h1',
      html: '\r\n          What Clients Say\r\n        ',
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
      html: '\r\n          We place huge value on strong relationships and have seen the benefit they bring to our\r\n          business. Customer feedback is vital in helping us to get it right.\r\n        ',
      style: {
        color: '#4b5563'
      },
      type: 'html'
    },
    type: 'schema_html'
  },
  {
    name: 'Testimonial1',
    title: 'Embed code',
    default: {
      type: 'testimonial'
    },
    type: 'schema_testimonial'
  }
]

export const Testimonial1 = {
  type: 'testimonial',
  settingSchemas,
  render
}
