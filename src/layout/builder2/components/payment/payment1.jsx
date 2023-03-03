import {
  $Group as Group,
  $H2 as H2,
  $Html as Html,
  $List as List,
  $Optional as Optional,
  $Payment as Payment,
  $Text as Text
} from '@earlybirdim/blocks'
import { IconCheckCircleLine } from '@earlybirdim/icons'
import { useState } from 'react'

const render = function ({ data }) {
  const [interval, setInterval] = useState('monthly')
  return (
    <div className="payment__container">
      <div className="payment__wrapper">
        <div className="payment__header">
          <H2 className="payment__title" {...data.setting.H21} />
          <Html as="p" className="payment__subtitle" {...data.setting.Html1} />
        </div>

        <Optional {...data.setting.Optional1}>
          <div className="payment__interval-switcher">
            <button
              className={`payment__interval-monthly ${
                interval === 'monthly' ? 'payment__active' : ''
              }`}
              onClick={() => setInterval('monthly')}
            >
              Monthly
            </button>
            <button
              className={`payment__interval-yearly ${
                interval === 'yearly' ? 'payment__active' : ''
              }`}
              onClick={() => setInterval('yearly')}
            >
              Yearly
            </button>
          </div>
        </Optional>

        <div className="payment__plans">
          <List className="payment__plans-wrapper">
            {data.setting.List1?.map(List1 => (
              <Group as="li" className="payment__plan" key={List1.id}>
                <Text as="h2" className="payment__plan-name" {...List1.Group1.Text1} />

                <Text as="p" className="payment__plan-description" {...List1.Group1.Text2} />

                {interval === 'monthly' ? (
                  <div className="payment__plan-price">
                    <Text {...List1.Group1.Text3} />
                  </div>
                ) : (
                  <div className="payment__plan-price">
                    <Text {...List1.Group1.Text4} />
                  </div>
                )}

                <Payment className="payment__payment-button" {...List1.Group1.Payment1} />

                <List as="ul" className="payment__features">
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
  )
}

const settingSchemas = [
  {
    name: 'H21',
    title: 'Title',
    default: {
      as: 'h2',
      html: '\r\n            Pricing for apps of all sizes\r\n          ',
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
      html: '\r\n            EarlyBird is free to get started and scales with you as you grow.\r\n          ',
      style: {
        color: '#4b5563'
      },
      type: 'html'
    },
    type: 'schema_html'
  },
  {
    name: 'Optional1',
    title: 'Billing cycle',
    default: {
      show: true
    },
    type: 'schema_optional',
    children: []
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

export const Payment1 = {
  type: 'payment',
  settingSchemas,
  render
}
