import {
  $Block as Block,
  $List as List,
  $Group as Group,
  $H2 as H2,
  $Html as Html,
  $H3 as H3
} from '@earlybirdim/blocks'
const render = function ({ productId, block }) {
  return (
    <Block productId={productId} block={block}>
      <div className="faq1__container">
        <div className="faq1__wrapper">
          <H2 className="faq1__title" {...block.setting.H21} />

          <List className="faq1__list">
            {block.setting.List1?.map(List1 => (
              <Group className="faq1__item" key={List1.id}>
                <H3 className="faq1__item-question" {...List1.Group1.H31} />

                <Html className="faq1__item-answer" {...List1.Group1.Html1} />
              </Group>
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
            name: 'H31',
            title: 'Question',
            default: {
              as: 'h3',
              html: '\r\n                How does the pricing work?\r\n              ',
              style: {
                color: '#111827'
              },
              type: 'html'
            },
            type: 'schema_html'
          },
          {
            name: 'Html1',
            title: 'Answer',
            default: {
              html: '\r\n                Our business plan is based on volume and the packages and\r\n                add-ons you choose. We tailor our plans to best fit your needs\r\n                and volume, so please contact us for a custom quote.\r\n              ',
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
            name: 'H31',
            title: 'Question',
            default: {
              as: 'h3',
              html: '\r\n                I have a large database of contacts. Can you help?\r\n              ',
              style: {
                color: '#111827'
              },
              type: 'html'
            },
            type: 'schema_html'
          },
          {
            name: 'Html1',
            title: 'Answer',
            default: {
              html: '\r\n                Yes, our integrations and infrastructure are designed to handle\r\n                large volumes of contacts. If you have more than 1 million\r\n                contacts, contact us for a match test to get an idea of how much\r\n                data we can return.\r\n              ',
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
            name: 'H31',
            title: 'Question',
            default: {
              as: 'h3',
              html: '\r\n                Can I cancel my plan anytime?\r\n              ',
              style: {
                color: '#111827'
              },
              type: 'html'
            },
            type: 'schema_html'
          },
          {
            name: 'Html1',
            title: 'Answer',
            default: {
              html: '\r\n                Yes, you can cancel your plan at any time through your\r\n                dashboard. Simply log in to your dashboard and navigate to the\r\n                billing section to cancel your plan.\r\n              ',
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
            name: 'H31',
            title: 'Question',
            default: {
              as: 'h3',
              html: '\r\n                Do you provide premium support?\r\n              ',
              style: {
                color: '#111827'
              },
              type: 'html'
            },
            type: 'schema_html'
          },
          {
            name: 'Html1',
            title: 'Answer',
            default: {
              html: '\r\n                Yes! All business plans include a dedicated account manager.\r\n              ',
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
            name: 'H31',
            title: 'Question',
            default: {
              as: 'h3',
              html: '\r\n                Can you invoice me?\r\n              ',
              style: {
                color: '#111827'
              },
              type: 'html'
            },
            type: 'schema_html'
          },
          {
            name: 'Html1',
            title: 'Answer',
            default: {
              html: '\r\n                Yes! We offer invoicing for business and startup plans. Please\r\n                contact us for details.\r\n              ',
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
            name: 'H31',
            title: 'Question',
            default: {
              as: 'h3',
              html: '\r\n                I have more questions!\r\n              ',
              style: {
                color: '#111827'
              },
              type: 'html'
            },
            type: 'schema_html'
          },
          {
            name: 'Html1',
            title: 'Answer',
            default: {
              html: "\r\n                Just contact us and we'll be more than happy to help.\r\n              ",
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

export const Faq1 = {
  type: 'faq',
  settingSchemas,
  render
}
