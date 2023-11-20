import {
  $Block as Block,
  $Group as Group,
  $H2 as H2,
  $Html as Html,
  $Icon as Icon,
  $List as List,
  $Payment as Payment,
  $Style as Style,
  $SwitchGroup as SwitchGroup,
  SwitchItem,
  $Text as Text
} from '@earlybirdim/blocks'
import { useState } from 'react'

const render = function ({ productId, block }) {
  const [interval, setInterval] = useState('monthly')
  return (
    <Block productId={productId} block={block}>
      <div className="payment2__container">
        <div className="payment2__wrapper">
          <div className="payment2__header">
            <H2 className="payment2__title" {...block.setting.H21} />
            <Html className="payment2__subtitle" {...block.setting.Html1} as="div" />
          </div>

          {block.setting.List1?.some(
            List1 => List1.Group1.Segment1?.paymentType !== 'one_time'
          ) && (
            <div className="payment2__interval-switcher">
              <SwitchGroup
                defaultValue="monthly"
                onChange={setInterval}
                {...block.setting.SwitchGroup1}
              >
                <SwitchItem value="monthly">Monthly</SwitchItem>
                <SwitchItem value="yearly">Yearly</SwitchItem>
              </SwitchGroup>
            </div>
          )}

          <div className="payment2__plans">
            <List className="payment2__plans-wrapper">
              {block.setting.List1?.map(List1 => (
                <Group as="li" className="payment2__plan" key={List1.id}>
                  <Style className="payment2__plan-container" {...List1.Group1.Style1}>
                    <Text as="h2" className="payment2__plan-name" {...List1.Group1.Text1} />
                    <Text as="p" className="payment2__plan-description" {...List1.Group1.Text2} />

                    <Style className="payment2__plan-price" {...List1.Group1.Style2}>
                      {List1.Group1.Segment1?.paymentType === 'one_time' ? (
                        <Text {...List1.Group1.Text5} />
                      ) : interval === 'monthly' ? (
                        <>
                          <Text {...List1.Group1.Text3} />
                          <span className="payment2__plan-interval">/month</span>
                        </>
                      ) : (
                        <>
                          <Text {...List1.Group1.Text4} />
                          <span className="payment2__plan-interval">/year</span>
                        </>
                      )}
                    </Style>

                    <Payment className="payment2__payment-button" {...List1.Group1.Payment1} />

                    <List as="ul" className="payment2__features">
                      {List1.Group1.List1?.map(List1 => (
                        <Group as="li" key={List1.id}>
                          <Icon {...List1.Group1.Icon1} />

                          <Text {...List1.Group1.Text1} />
                        </Group>
                      ))}
                    </List>
                  </Style>
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
      html: '\r\n              Your company is free to get started and scales with you as you grow.\r\n            ',
      style: {
        color: '#4b5563'
      },
      type: 'html'
    },
    type: 'schema_html'
  },
  {
    name: 'SwitchGroup1',
    title: 'Billing cycle',
    default: {
      style: {
        color: '#111827',
        background: '#fff',
        tintColor: '#fff',
        tintBackground: '#2563eb'
      }
    },
    propertyName: 'block.setting.SwitchGroup1',
    type: 'schema_switch_group',
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
            name: 'Style1',
            title: 'Background',
            default: {
              style: {
                background: '#fff'
              }
            },
            propertyName: 'List1.Group1.Style1',
            type: 'schema_style',
            children: []
          },
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
            name: 'Style2',
            title: 'Price style',
            default: {
              style: {
                color: '#111827'
              }
            },
            propertyName: 'List1.Group1.Style2',
            type: 'schema_style',
            children: []
          },
          {
            name: 'Segment1',
            type: 'schema_segment',
            title: 'Price',
            options: {
              one_time: {
                label: 'One time',
                children: [
                  {
                    name: 'Text5',
                    title: 'One time price',
                    style: 'style2',
                    default: {
                      html: '$0',
                      style: {},
                      type: 'text'
                    },
                    type: 'schema_text'
                  }
                ]
              },
              subscription: {
                label: 'Subscription',
                children: [
                  {
                    name: 'Text3',
                    title: 'Monthly price',
                    style: 'style2',
                    default: {
                      html: '$0',
                      style: {},
                      type: 'text'
                    },
                    type: 'schema_text'
                  },
                  {
                    name: 'Text4',
                    title: 'Yearly price',
                    style: 'style2',
                    default: {
                      html: '$0',
                      style: {},
                      type: 'text'
                    },
                    type: 'schema_text'
                  }
                ]
              }
            }
          },
          {
            name: 'Payment1',
            title: 'Payment button',
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
                    name: 'Icon1',
                    default: {
                      type: 'svg',
                      name: 'check-circle-line',
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
                      name: 'check-circle-line',
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
                      name: 'check-circle-line',
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
                      name: 'check-circle-line',
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
            name: 'Style1',
            title: 'Background',
            default: {
              style: {
                background: '#fff'
              }
            },
            propertyName: 'List1.Group1.Style1',
            type: 'schema_style',
            children: []
          },
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
            name: 'Style2',
            default: {
              style: {
                color: '#111827'
              }
            },
            propertyName: 'List1.Group1.Style2',
            type: 'schema_style',
            children: []
          },
          {
            name: 'Segment1',
            type: 'schema_segment',
            title: 'Price',
            options: {
              one_time: {
                label: 'One time',
                children: [
                  {
                    name: 'Text5',
                    title: 'One time price',
                    style: 'style2',
                    default: {
                      html: '$99',
                      style: {},
                      type: 'text'
                    },
                    type: 'schema_text'
                  }
                ]
              },
              subscription: {
                label: 'Subscription',
                children: [
                  {
                    name: 'Text3',
                    title: 'Monthly price',
                    style: 'style2',
                    default: {
                      html: '$9',
                      style: {},
                      type: 'text'
                    },
                    type: 'schema_text'
                  },
                  {
                    name: 'Text4',
                    title: 'Yearly price',
                    style: 'style2',
                    default: {
                      html: '$99',
                      style: {},
                      type: 'text'
                    },
                    type: 'schema_text'
                  }
                ]
              }
            }
          },
          {
            name: 'Payment1',
            title: 'Payment button',
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
                    name: 'Icon1',
                    default: {
                      type: 'svg',
                      name: 'check-circle-line',
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
                    name: 'Icon1',
                    default: {
                      type: 'svg',
                      name: 'check-circle-line',
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
                      name: 'check-circle-line',
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
                      name: 'check-circle-line',
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
                      name: 'check-circle-line',
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
            name: 'Style1',
            title: 'Background',
            default: {
              style: {
                background: '#fff'
              }
            },
            propertyName: 'List1.Group1.Style1',
            type: 'schema_style',
            children: []
          },
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
            name: 'Style2',
            default: {
              style: {
                color: '#111827'
              }
            },
            propertyName: 'List1.Group1.Style2',
            type: 'schema_style',
            children: []
          },
          {
            name: 'Segment1',
            type: 'schema_segment',
            title: 'Price',
            options: {
              one_time: {
                label: 'One time',
                children: [
                  {
                    name: 'Text5',
                    title: 'One time price',
                    style: 'style2',
                    default: {
                      html: '$199',
                      style: {},
                      type: 'text'
                    },
                    type: 'schema_text'
                  }
                ]
              },
              subscription: {
                label: 'Subscription',
                children: [
                  {
                    name: 'Text3',
                    title: 'Monthly price',
                    style: 'style2',
                    default: {
                      html: '$19',
                      style: {},
                      type: 'text'
                    },
                    type: 'schema_text'
                  },
                  {
                    name: 'Text4',
                    title: 'Yearly price',
                    style: 'style2',
                    default: {
                      html: '$199',
                      style: {},
                      type: 'text'
                    },
                    type: 'schema_text'
                  }
                ]
              }
            }
          },
          {
            name: 'Payment1',
            title: 'Payment button',
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
                    name: 'Icon1',
                    default: {
                      type: 'svg',
                      name: 'check-circle-line',
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
                    name: 'Icon1',
                    default: {
                      type: 'svg',
                      name: 'check-circle-line',
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
                      name: 'check-circle-line',
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
                    name: 'Icon1',
                    default: {
                      type: 'svg',
                      name: 'check-circle-line',
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
                      name: 'check-circle-line',
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
