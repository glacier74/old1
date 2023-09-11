import {
  $Block as Block,
  $H1 as H1,
  $Html as Html,
  $Testimonial as Testimonial
} from '@earlybirdim/blocks'
const render = function ({ productId, block }) {
  return (
    <Block productId={productId} block={block}>
      <div className="testimonial1__container">
        <div className="testimonial1__wrapper">
          <H1 className="testimonial1__title" {...block.setting.H11} />

          <Html as="div" className="testimonial1__subtitle" {...block.setting.Html1} />

          <Testimonial {...block.setting.Testimonial1} />
        </div>
      </div>
    </Block>
  )
}

const settingSchemas = [
  {
    blockType: 'testimonial',
    default: {
      style: {
        background: '#fff'
      }
    },
    type: 'schema_block',
    children: []
  },
  {
    name: 'H11',
    title: 'Title',
    default: {
      as: 'h1',
      html: '\r\n            What Clients Say\r\n          ',
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
      html: '\r\n            We place huge value on strong relationships and have seen the\r\n            benefit they bring to our business. Customer feedback is vital in\r\n            helping us to get it right.\r\n          ',
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
