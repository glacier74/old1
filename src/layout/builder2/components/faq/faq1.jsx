import {
  $Group as Group,
  $H2 as H2,
  $H3 as H3,
  $Html as Html,
  $List as List,
  $Toggle as Toggle
} from '@earlybirdim/blocks'
import { IconMinus, IconPlus } from '@earlybirdim/icons'

const render = function ({ data }) {
  return (
    <div className="faq__container">
      <div className="faq__wrapper">
        <H2 className="faq__title" {...data.setting.H21} />

        <List className="faq__list">
          {data.setting.List1?.map(List1 => (
            <Toggle key={List1.id}>
              {(isActive, toggle) => (
                <Group className={`faq__item ${isActive ? 'faq__item-open' : ''}`}>
                  <div className="faq__item-header" onClick={toggle}>
                    <H3 className="faq__item-question" {...List1.Group1.H31} />
                    <div className="faq__item-icon">{isActive ? <IconMinus /> : <IconPlus />}</div>
                  </div>

                  <Html className="faq__item-answer" {...List1.Group1.Html1} />
                </Group>
              )}
            </Toggle>
          ))}
        </List>
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
      html: '\r\n          Frequently asked questions\r\n        ',
      style: {},
      type: 'html'
    },
    type: 'schema_html'
  },
  {
    name: 'List1',
    title: 'Questions and answers',
    propertyName: 'List1',
    type: 'schema_list',
    children: [
      {
        name: 'Group1',
        propertyName: 'List1.Group1',
        type: 'schema_group',
        children: [
          {
            name: 'H31',
            title: 'Question',
            default: {
              as: 'h3',
              html: '\r\n                    How does the pricing work?\r\n                  ',
              style: {},
              type: 'html'
            },
            type: 'schema_html'
          },
          {
            name: 'Html1',
            title: 'Answer',
            default: {
              html: '\r\n                  Our business plan is based on volume and the packages and add-ons you choose. We\r\n                  tailor our plans to best fit your needs and volume, so please contact us for a\r\n                  custom quote.\r\n                ',
              style: {},
              type: 'html'
            },
            type: 'schema_html'
          }
        ]
      },
      {
        name: 'Group1',
        propertyName: 'List1.Group1',
        type: 'schema_group',
        children: [
          {
            name: 'H31',
            title: 'Question',
            default: {
              as: 'h3',
              html: '\r\n                    I have a large database of contacts. Can you help?\r\n                  ',
              style: {},
              type: 'html'
            },
            type: 'schema_html'
          },
          {
            name: 'Html1',
            title: 'Answer',
            default: {
              html: '\r\n                  Yes, our integrations and infrastructure are designed to handle large volumes of\r\n                  contacts. If you have more than 1 million contacts, contact us for a match test to\r\n                  get an idea of how much data we can return.\r\n                ',
              style: {},
              type: 'html'
            },
            type: 'schema_html'
          }
        ]
      },
      {
        name: 'Group1',
        propertyName: 'List1.Group1',
        type: 'schema_group',
        children: [
          {
            name: 'H31',
            title: 'Question',
            default: {
              as: 'h3',
              html: '\r\n                    Do you provide premium support?\r\n                  ',
              style: {},
              type: 'html'
            },
            type: 'schema_html'
          },
          {
            name: 'Html1',
            title: 'Answer',
            default: {
              html: '\r\n                  Yes! All business plans include a dedicated account manager.\r\n                ',
              style: {},
              type: 'html'
            },
            type: 'schema_html'
          }
        ]
      },
      {
        name: 'Group1',
        propertyName: 'List1.Group1',
        type: 'schema_group',
        children: [
          {
            name: 'H31',
            title: 'Question',
            default: {
              as: 'h3',
              html: '\r\n                    Can you invoice me?\r\n                  ',
              style: {},
              type: 'html'
            },
            type: 'schema_html'
          },
          {
            name: 'Html1',
            title: 'Answer',
            default: {
              html: '\r\n                  Yes! We offer invoicing for business and startup plans. Please contact us for\r\n                  details.\r\n                ',
              style: {},
              type: 'html'
            },
            type: 'schema_html'
          }
        ]
      },
      {
        name: 'Group1',
        propertyName: 'List1.Group1',
        type: 'schema_group',
        children: [
          {
            name: 'H31',
            title: 'Question',
            default: {
              as: 'h3',
              html: '\r\n                    I have more questions!\r\n                  ',
              style: {},
              type: 'html'
            },
            type: 'schema_html'
          },
          {
            name: 'Html1',
            title: 'Answer',
            default: {
              html: "\r\n                  Just contact us and we'll be more than happy to help.\r\n                ",
              style: {},
              type: 'html'
            },
            type: 'schema_html'
          }
        ]
      }
    ]
  }
]

export const Faq1 = {
  type: 'faq',
  settingSchemas,
  render
}
