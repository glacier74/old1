import {
  $Block as Block,
  $List as List,
  $Text as Text,
  $Html as Html,
  $H2 as H2,
  $Group as Group,
  $Payment as Payment,
  $Style as Style,
  $Icon as Icon
} from '@earlybirdim/blocks'
const render = function ({ productId, block }) {
  return (
    <Block productId={productId} block={block}>
      <div className="payment1__container">
        <div className="payment1__wrapper">
          <div className="payment1__header">
            <H2 className="payment1__title" {...block.setting.H21} />
            <Html as="div" className="payment1__subtitle" {...block.setting.Html1} />
          </div>

          <div className="payment1__body">
            <div className="payment1__left">
              <Text as="h2" className="payment1__name" {...block.setting.Text1} />
              <Text as="p" className="payment1__description" {...block.setting.Text2} />

              <List as="ul" className="payment1__features">
                {block.setting.List1?.map(List1 => (
                  <Group as="li" key={List1.id}>
                    <Icon {...List1.Group1.Icon1} />

                    <Text {...List1.Group1.Text1} />
                  </Group>
                ))}
              </List>
            </div>

            <div className="payment1__right">
              <Style className="payment1__right-wrapper" {...block.setting.Style1}>
                <div className="payment1__right-main">
                  <div className="payment1__price">
                    <Text {...block.setting.Text3} />
                  </div>

                  <Payment className="payment1__payment-button" {...block.setting.Payment1} />

                  <Html as="div" className="payment1__bottom-text" {...block.setting.Html2} />
                </div>
              </Style>
            </div>
          </div>
        </div>
      </div>
    </Block>
  )
}

const settingSchemas = [
  {
    blockType: 'payment',
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
      html: '\r\n              Pricing for apps of all sizes\r\n            ',
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
      html: '\r\n              Your company is free to get started and scales with you as you grow.\r\n            ',
      style: {
        color: '#4b5563'
      },
      type: 'html'
    },
    type: 'schema_html'
  },
  {
    name: 'Text1',
    title: 'Product name',
    default: {
      html: 'Starter',
      style: {
        color: '#111827'
      },
      type: 'text'
    },
    type: 'schema_text'
  },
  {
    name: 'Text2',
    title: 'Product description',
    default: {
      html: 'For new makers who want to fine-tune and test an idea.',
      style: {
        color: '#4b5563'
      },
      type: 'text'
    },
    type: 'schema_text'
  },
  {
    name: 'List1',
    title: 'Features',
    propertyName: 'List1',
    type: 'schema_list',
    children: [
      {
        name: 'Group1',
        propertyName: 'List1.Group1',
        type: 'schema_group',
        children: [
          {
            name: 'Icon1',
            default: {
              type: 'svg',
              name: 'check-line',
              width: 20,
              height: 20,
              style: {
                color: '#2563eb'
              }
            },
            type: 'schema_icon'
          },
          {
            name: 'Text1',
            default: {
              html: '50 conversion actions included',
              style: {
                color: '#4b5563'
              },
              type: 'text'
            },
            type: 'schema_text'
          }
        ]
      },
      {
        name: 'Group1',
        propertyName: 'List1.Group1',
        type: 'schema_group',
        children: [
          {
            name: 'Icon1',
            default: {
              type: 'svg',
              name: 'check-line',
              width: 20,
              height: 20,
              style: {
                color: '#2563eb'
              }
            },
            type: 'schema_icon'
          },
          {
            name: 'Text1',
            default: {
              html: 'Access to all UI blocks',
              style: {
                color: '#4b5563'
              },
              type: 'text'
            },
            type: 'schema_text'
          }
        ]
      },
      {
        name: 'Group1',
        propertyName: 'List1.Group1',
        type: 'schema_group',
        children: [
          {
            name: 'Icon1',
            default: {
              type: 'svg',
              name: 'check-line',
              width: 20,
              height: 20,
              style: {
                color: '#2563eb'
              }
            },
            type: 'schema_icon'
          },
          {
            name: 'Text1',
            default: {
              html: 'Real-time analytics',
              style: {
                color: '#4b5563'
              },
              type: 'text'
            },
            type: 'schema_text'
          }
        ]
      },
      {
        name: 'Group1',
        propertyName: 'List1.Group1',
        type: 'schema_group',
        children: [
          {
            name: 'Icon1',
            default: {
              type: 'svg',
              name: 'check-line',
              width: 20,
              height: 20,
              style: {
                color: '#2563eb'
              }
            },
            type: 'schema_icon'
          },
          {
            name: 'Text1',
            default: {
              html: 'Basic transaction anonymization',
              style: {
                color: '#4b5563'
              },
              type: 'text'
            },
            type: 'schema_text'
          }
        ]
      },
      {
        name: 'Group1',
        propertyName: 'List1.Group1',
        type: 'schema_group',
        children: [
          {
            name: 'Icon1',
            default: {
              type: 'svg',
              name: 'check-line',
              width: 20,
              height: 20,
              style: {
                color: '#2563eb'
              }
            },
            type: 'schema_icon'
          },
          {
            name: 'Text1',
            default: {
              html: 'Real-time analytics',
              style: {
                color: '#4b5563'
              },
              type: 'text'
            },
            type: 'schema_text'
          }
        ]
      },
      {
        name: 'Group1',
        propertyName: 'List1.Group1',
        type: 'schema_group',
        children: [
          {
            name: 'Icon1',
            default: {
              type: 'svg',
              name: 'check-line',
              width: 20,
              height: 20,
              style: {
                color: '#2563eb'
              }
            },
            type: 'schema_icon'
          },
          {
            name: 'Text1',
            default: {
              html: 'Custom domain',
              style: {
                color: '#4b5563'
              },
              type: 'text'
            },
            type: 'schema_text'
          }
        ]
      }
    ]
  },
  {
    name: 'Style1',
    title: 'Payment background',
    default: {
      style: {
        background: '#f9fafb'
      }
    },
    propertyName: 'block.setting.Style1',
    type: 'schema_style',
    children: []
  },
  {
    name: 'Text3',
    title: 'Price',
    default: {
      html: '$199',
      style: {
        color: '#111827'
      },
      type: 'text'
    },
    type: 'schema_text'
  },
  {
    name: 'Payment1',
    title: 'Payment button',
    default: {
      html: 'Get access',
      style: {
        color: '#fff',
        background: '#111827'
      },
      type: 'payment'
    },
    type: 'schema_payment'
  },
  {
    name: 'Html2',
    title: 'Bottom text',
    default: {
      as: 'p',
      html: '\r\n                    Invoices and receipts available for easy company reimbursement\r\n                  ',
      style: {
        color: '#4b5563'
      },
      type: 'html'
    },
    type: 'schema_html'
  }
]

export const Payment1 = {
  type: 'payment',
  settingSchemas,
  render
}
