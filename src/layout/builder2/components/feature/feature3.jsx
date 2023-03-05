import {
  $Block as Block,
  $Group as Group,
  $H2 as H2,
  $H3 as H3,
  $Html as Html,
  $Icon as Icon,
  $List as List
} from '@earlybirdim/blocks'

const render = function ({ productId, block }) {
  return (
    <Block productId={productId} block={block}>
      <div className="feature3__container">
        <div className="feature3__wrapper">
          <div className="feature3__header">
            <Html as="p" className="feature3__caption" {...block.setting.Html1} />
            <H2 className="feature3__title" {...block.setting.H21} />
            <Html as="p" className="feature3__subtitle" {...block.setting.Html2} />
          </div>

          <div className="feature3__list">
            <List className="feature3__list-wrapper">
              {block.setting.List1?.map(List1 => (
                <Group as="li" className="feature3__list-item" key={List1.id}>
                  <Icon className="feature3__item-icon" {...List1.Group1.Icon1} />

                  <H3 className="feature3__item-title" {...List1.Group1.H31} />

                  <Html className="feature3__item-subtitle" {...List1.Group1.Html1} />
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
    blockType: 'feature',
    default: {
      style: {
        background: '#fff'
      }
    },
    type: 'schema_block',
    children: []
  },
  {
    name: 'Html1',
    title: 'Caption',
    default: {
      as: 'p',
      html: '\r\n              Turn your idea into a reality\r\n            ',
      style: {
        color: '#2563eb'
      },
      type: 'html'
    },
    type: 'schema_html'
  },
  {
    name: 'H21',
    title: 'Title',
    default: {
      as: 'h2',
      html: '\r\n              Pitch an idea and convince the audience\r\n            ',
      style: {
        color: '#111827'
      },
      type: 'html'
    },
    type: 'schema_html'
  },
  {
    name: 'Html2',
    title: 'Subtitle',
    default: {
      as: 'p',
      html: '\r\n              Convince the audience that your idea is worth their attention and investment, and\r\n              encourage them to take the desired action.\r\n            ',
      style: {
        color: '#4b5563'
      },
      type: 'html'
    },
    type: 'schema_html'
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
              type: 'emoji',
              text: '📦',
              width: 36,
              height: 36,
              style: {
                color: '#2563eb',
                background: '#f3f4f6'
              }
            },
            type: 'schema_icon'
          },
          {
            name: 'H31',
            title: 'Title',
            default: {
              as: 'h3',
              html: '\r\n                  Custom branding\r\n                ',
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
              html: '\r\n                  Add your own logo, colors, and other branding elements to reflect your own brand.\r\n                ',
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
            name: 'Icon1',
            default: {
              type: 'emoji',
              text: '🧲',
              width: 36,
              height: 36,
              style: {
                color: '#2563eb',
                background: '#f3f4f6'
              }
            },
            type: 'schema_icon'
          },
          {
            name: 'H31',
            title: 'Title',
            default: {
              as: 'h3',
              html: '\r\n                  Social proof\r\n                ',
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
              html: '\r\n                  Show testimonials and ratings to build trust and credibility with potential\r\n                  customers.\r\n                ',
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
            name: 'Icon1',
            default: {
              type: 'emoji',
              text: '🌁',
              width: 36,
              height: 36,
              style: {
                color: '#2563eb',
                background: '#f3f4f6'
              }
            },
            type: 'schema_icon'
          },
          {
            name: 'H31',
            title: 'Title',
            default: {
              as: 'h3',
              html: '\r\n                  Image Carousel\r\n                ',
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
              html: '\r\n                  Showcase your product, service, or other visual content in an engaging way to your\r\n                  customers that your offering is worth investing in.\r\n                ',
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
            name: 'Icon1',
            default: {
              type: 'emoji',
              text: '⛺',
              width: 36,
              height: 36,
              style: {
                color: '#2563eb',
                background: '#f3f4f6'
              }
            },
            type: 'schema_icon'
          },
          {
            name: 'H31',
            title: 'Title',
            default: {
              as: 'h3',
              html: '\r\n                  Features walkthrough\r\n                ',
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
              html: '\r\n                  Highlight the key benefits and features of your product, and explain how it solves\r\n                  specific problems that your target customers have.\r\n                ',
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
            name: 'Icon1',
            default: {
              type: 'emoji',
              text: '✨',
              width: 36,
              height: 36,
              style: {
                color: '#2563eb',
                background: '#f3f4f6'
              }
            },
            type: 'schema_icon'
          },
          {
            name: 'H31',
            title: 'Title',
            default: {
              as: 'h3',
              html: '\r\n                  Custom Open Graph\r\n                ',
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
              html: '\r\n                  Get your content stand out and attract more attention on social media with custom\r\n                  title, description, image, and other information.\r\n                ',
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
            name: 'Icon1',
            default: {
              type: 'emoji',
              text: '🥅',
              width: 36,
              height: 36,
              style: {
                color: '#2563eb',
                background: '#f3f4f6'
              }
            },
            type: 'schema_icon'
          },
          {
            name: 'H31',
            title: 'Title',
            default: {
              as: 'h3',
              html: '\r\n                  Custom domain\r\n                ',
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
              html: '\r\n                  Use your own domain name to create a more professional-looking and cohesive\r\n                  experience for your customers.\r\n                ',
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

export const Feature3 = {
  type: 'feature',
  settingSchemas,
  render
}
