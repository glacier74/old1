import {
  $Block as Block,
  $List as List,
  $Group as Group,
  $H2 as H2,
  $Html as Html,
  $H3 as H3,
  $Toggle as Toggle,
  $Style as Style
} from '@earlybirdim/blocks'
import { IconPlus, IconMinus } from '@earlybirdim/icons'
const render = function ({ productId, block }) {
  return (
    <Block productId={productId} block={block}>
      <div className="faq2__container">
        <div className="faq2__wrapper">
          <H2 className="faq2__title" {...block.setting.H21} />

          <List className="faq2__list">
            {block.setting.List1?.map(List1 => (
              <Toggle key={List1.id}>
                {(isActive, toggle) => (
                  <Group className={`faq2__item ${isActive ? 'faq2__item-open' : ''}`}>
                    <Style className="faq2__item-header" onClick={toggle} {...List1.Group1.Style1}>
                      <H3 className="faq2__item-question" {...List1.Group1.H31} />
                      <div className="faq2__item-icon">
                        {isActive ? <IconMinus /> : <IconPlus />}
                      </div>
                    </Style>

                    <Html className="faq2__item-answer" {...List1.Group1.Html1} />
                  </Group>
                )}
              </Toggle>
            ))}
          </List>
        </div>
      </div>
    </Block>
  )
}

const settingSchemas = [
  {
    blockType: 'faq',
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
      html: '\r\n            Frequently asked questions\r\n          ',
      style: {
        color: '#0f172a'
      },
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
            name: 'Style1',
            default: {
              style: {
                color: '#111827'
              }
            },
            propertyName: 'List1.Group1.Style1',
            type: 'schema_style',
            children: []
          },
          {
            name: 'H31',
            title: 'Question',
            default: {
              as: 'h3',
              html: '\r\n                      How does the pricing work?\r\n                    ',
              style: {},
              type: 'html'
            },
            type: 'schema_html'
          },
          {
            name: 'Html1',
            title: 'Answer',
            default: {
              html: '\r\n                    Our business plan is based on volume and the packages and\r\n                    add-ons you choose. We tailor our plans to best fit your\r\n                    needs and volume, so please contact us for a custom quote.\r\n                  ',
              style: {
                color: '#4b5563'
              },
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
            name: 'Style1',
            default: {
              style: {
                color: '#111827'
              }
            },
            propertyName: 'List1.Group1.Style1',
            type: 'schema_style',
            children: []
          },
          {
            name: 'H31',
            title: 'Question',
            default: {
              as: 'h3',
              html: '\r\n                      I have a large database of contacts. Can you help?\r\n                    ',
              style: {},
              type: 'html'
            },
            type: 'schema_html'
          },
          {
            name: 'Html1',
            title: 'Answer',
            default: {
              html: '\r\n                    Yes, our integrations and infrastructure are designed to\r\n                    handle large volumes of contacts. If you have more than 1\r\n                    million contacts, contact us for a match test to get an idea\r\n                    of how much data we can return.\r\n                  ',
              style: {
                color: '#4b5563'
              },
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
            name: 'Style1',
            default: {
              style: {
                color: '#111827'
              }
            },
            propertyName: 'List1.Group1.Style1',
            type: 'schema_style',
            children: []
          },
          {
            name: 'H31',
            title: 'Question',
            default: {
              as: 'h3',
              html: '\r\n                      Do you provide premium support?\r\n                    ',
              style: {},
              type: 'html'
            },
            type: 'schema_html'
          },
          {
            name: 'Html1',
            title: 'Answer',
            default: {
              html: '\r\n                    Yes! All business plans include a dedicated account manager.\r\n                  ',
              style: {
                color: '#4b5563'
              },
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
            name: 'Style1',
            default: {
              style: {
                color: '#111827'
              }
            },
            propertyName: 'List1.Group1.Style1',
            type: 'schema_style',
            children: []
          },
          {
            name: 'H31',
            title: 'Question',
            default: {
              as: 'h3',
              html: '\r\n                      Can you invoice me?\r\n                    ',
              style: {},
              type: 'html'
            },
            type: 'schema_html'
          },
          {
            name: 'Html1',
            title: 'Answer',
            default: {
              html: '\r\n                    Yes! We offer invoicing for business and startup plans.\r\n                    Please contact us for details.\r\n                  ',
              style: {
                color: '#4b5563'
              },
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
            name: 'Style1',
            default: {
              style: {
                color: '#111827'
              }
            },
            propertyName: 'List1.Group1.Style1',
            type: 'schema_style',
            children: []
          },
          {
            name: 'H31',
            title: 'Question',
            default: {
              as: 'h3',
              html: '\r\n                      I have more questions!\r\n                    ',
              style: {},
              type: 'html'
            },
            type: 'schema_html'
          },
          {
            name: 'Html1',
            title: 'Answer',
            default: {
              html: "\r\n                    Just contact us and we'll be more than happy to help.\r\n                  ",
              style: {
                color: '#4b5563'
              },
              type: 'html'
            },
            type: 'schema_html'
          }
        ]
      }
    ]
  }
]

export const Faq2 = {
  type: 'faq',
  settingSchemas,
  render
}
