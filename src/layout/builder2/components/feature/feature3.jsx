import {
  $Block as Block,
  $List as List,
  $Icon as Icon,
  $Html as Html,
  $H2 as H2,
  $H3 as H3,
  $Group as Group
} from '@earlybirdim/blocks'
const render = function ({ productId, block }) {
  return (
    <Block productId={productId} block={block}>
      <div className="feature3__container">
        <div className="feature3__wrapper">
          <div className="feature3__header">
            <Html className="feature3__caption" {...block.setting.Html1} as="div" />
            <H2 className="feature3__title" {...block.setting.H21} />
            <Html className="feature3__subtitle" {...block.setting.Html2} as="div" />
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
      html: '\r\n              Convince the audience that your idea is worth their attention and\r\n              investment, and encourage them to take the desired action.\r\n            ',
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
              html: '\r\n                  Add your own logo, colors, and other branding elements to\r\n                  reflect your own brand.\r\n                ',
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
              html: '\r\n                  Show testimonials and ratings to build trust and credibility\r\n                  with potential customers.\r\n                ',
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
              html: '\r\n                  Showcase your product, service, or other visual content in an\r\n                  engaging way to your customers that your offering is worth\r\n                  investing in.\r\n                ',
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
              html: '\r\n                  Highlight the key benefits and features of your product, and\r\n                  explain how it solves specific problems that your target\r\n                  customers have.\r\n                ',
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
              html: '\r\n                  Get your content stand out and attract more attention on\r\n                  social media with custom title, description, image, and other\r\n                  information.\r\n                ',
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
              html: '\r\n                  Use your own domain name to create a more professional-looking\r\n                  and cohesive experience for your customers.\r\n                ',
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
