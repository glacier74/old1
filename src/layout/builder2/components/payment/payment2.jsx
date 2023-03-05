import {
  $Block as Block,
  $Group as Group,
  $H2 as H2,
  $Html as Html,
  $List as List,
  $Payment as Payment,
  $Text as Text
} from '@earlybirdim/blocks'
import { IconCheckCircleLine } from '@earlybirdim/icons'
import { useState } from 'react'

const render = function ({ productId, block }) {
  const [interval, setInterval] = useState('monthly')
  return (
    <Block productId={productId} block={block}>
      <div className="payment2__container">
        <div className="payment2__wrapper">
          <div className="payment2__header">
            <H2 className="payment2__title" {...block.setting.H21} />
            <Html as="p" className="payment2__subtitle" {...block.setting.Html1} />
          </div>

          <div className="payment2__interval-switcher">
            <button
              className={`payment2__interval-monthly ${
                interval === 'monthly' ? 'payment2__active' : ''
              }`}
              onClick={() => setInterval('monthly')}
            >
              Monthly
            </button>
            <button
              className={`payment2__interval-yearly ${
                interval === 'yearly' ? 'payment2__active' : ''
              }`}
              onClick={() => setInterval('yearly')}
            >
              Yearly
            </button>
          </div>

          <div className="payment2__plans">
            <List className="payment2__plans-wrapper">
              {block.setting.List1?.map(List1 => (
                <Group as="li" className="payment2__plan" key={List1.id}>
                  <Text as="h2" className="payment2__plan-name" {...List1.Group1.Text1} />

                  <Text as="p" className="payment2__plan-description" {...List1.Group1.Text2} />

                  {interval === 'monthly' ? (
                    <div className="payment2__plan-price">
                      <Text {...List1.Group1.Text3} />
                      <span className="payment2__plan-interval">/month</span>
                    </div>
                  ) : (
                    <div className="payment2__plan-price">
                      <Text {...List1.Group1.Text4} />
                      <span className="payment2__plan-interval">/year</span>
                    </div>
                  )}

                  <Payment className="payment2__payment-button" {...List1.Group1.Payment1} />

                  <List as="ul" className="payment2__features">
                    {List1.Group1.List1?.map(List1 => (
                      <Group as="li" key={List1.id}>
                        <IconCheckCircleLine />

                        <Text {...List1.Group1.Text1} />
                      </Group>
                    ))}
                  </List>
                </Group>
              ))}
            </List>
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
      html: '\r\n              EarlyBird is free to get started and scales with you as you grow.\r\n            ',
      style: {
        color: '#4b5563'
      },
      type: 'html'
    },
    type: 'schema_html'
  },
  {
    name: 'List1',
    title: 'Pricing',
    propertyName: 'List1',
    type: 'schema_list',
    children: [
      {
        name: 'Group1',
        propertyName: 'List1.Group1',
        type: 'schema_group',
        children: [
          {
            name: 'Text1',
            title: 'Plan name',
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
            title: 'Plan description',
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
            name: 'Text3',
            title: 'Monthly price',
            default: {
              html: '$0',
              style: {
                color: '#111827'
              },
              type: 'text'
            },
            type: 'schema_text'
          },
          {
            name: 'Text4',
            title: 'Yearly price',
            default: {
              html: '$0',
              style: {
                color: '#111827'
              },
              type: 'text'
            },
            type: 'schema_text'
          },
          {
            name: 'Payment1',
            title: 'Payment',
            default: {
              html: 'Get started for free',
              style: {
                color: '#fff',
                background: '#111827'
              },
              type: 'payment'
            },
            type: 'schema_payment'
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
              }
            ]
          }
        ]
      },
      {
        name: 'Group1',
        propertyName: 'List1.Group1',
        type: 'schema_group',
        children: [
          {
            name: 'Text1',
            title: 'Plan name',
            default: {
              html: 'Superior',
              style: {
                color: '#111827'
              },
              type: 'text'
            },
            type: 'schema_text'
          },
          {
            name: 'Text2',
            title: 'Plan description',
            default: {
              html: 'For creators with multiple ideas who want to efficiently test and refine them.',
              style: {
                color: '#4b5563'
              },
              type: 'text'
            },
            type: 'schema_text'
          },
          {
            name: 'Text3',
            title: 'Monthly price',
            default: {
              html: '$9',
              style: {
                color: '#111827'
              },
              type: 'text'
            },
            type: 'schema_text'
          },
          {
            name: 'Text4',
            title: 'Yearly price',
            default: {
              html: '$99',
              style: {
                color: '#111827'
              },
              type: 'text'
            },
            type: 'schema_text'
          },
          {
            name: 'Payment1',
            title: 'Payment',
            default: {
              html: 'Subscribe',
              style: {
                color: '#fff',
                background: '#111827'
              },
              type: 'payment'
            },
            type: 'schema_payment'
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
                    name: 'Text1',
                    default: {
                      html: 'All Free features',
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
              }
            ]
          }
        ]
      },
      {
        name: 'Group1',
        propertyName: 'List1.Group1',
        type: 'schema_group',
        children: [
          {
            name: 'Text1',
            title: 'Plan name',
            default: {
              html: 'Shipper',
              style: {
                color: '#111827'
              },
              type: 'text'
            },
            type: 'schema_text'
          },
          {
            name: 'Text2',
            title: 'Plan description',
            default: {
              html: 'For productive shippers who want to work more efficiently.',
              style: {
                color: '#4b5563'
              },
              type: 'text'
            },
            type: 'schema_text'
          },
          {
            name: 'Text3',
            title: 'Monthly price',
            default: {
              html: '$19',
              style: {
                color: '#111827'
              },
              type: 'text'
            },
            type: 'schema_text'
          },
          {
            name: 'Text4',
            title: 'Yearly price',
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
            title: 'Payment',
            default: {
              html: 'Subscribe',
              style: {
                color: '#fff',
                background: '#111827'
              },
              type: 'payment'
            },
            type: 'schema_payment'
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
                    name: 'Text1',
                    default: {
                      html: 'All Standard features',
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
                    name: 'Text1',
                    default: {
                      html: '50,000 visits/mo',
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
          }
        ]
      }
    ]
  }
]

export const Payment2 = {
  type: 'payment',
  settingSchemas,
  render
}
