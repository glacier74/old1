import {
  $Block as Block,
  $Link as Link,
  $List as List,
  $Html as Html,
  $Text as Text,
  $H1 as H1,
  $Group as Group,
  $Image as Image,
  $Icon as Icon,
  $Style as Style
} from '@earlybirdim/blocks'
import { isValid } from '@nily/utils'

const render = function ({ productId, block }) {
  return (
    <Block productId={productId} block={block}>
      <div className="hero3__container">
        <div className="hero3__wrapper">
          <div className="hero3__left">
            <div className="hero3__left-body">
              <Link className="hero3__logo" {...block.setting.Link1}>
                <Image {...block.setting.Link1.Image1} />
              </Link>

              {isValid(block.setting.Html1) && (
                <div className="hero3__announcement-wrapper">
                  <Html className="hero3__announcement" {...block.setting.Html1} />
                </div>
              )}

              <H1 className="hero3__title" {...block.setting.H11} />

              <Html as="div" className="hero3__subtitle" {...block.setting.Html2} />

              <Group className="hero3__cta">
                <List className="hero3__cta-buttons">
                  {block.setting.Group1.List1?.map(List1 => (
                    <Link {...List1.Link1} key={List1.id}>
                      <Icon {...List1.Link1.Icon1} />

                      <Text {...List1.Link1.Text1} />
                    </Link>
                  ))}
                </List>

                <Html className="hero3__cta-bottom-text" {...block.setting.Group1.Html1} />
              </Group>
            </div>
          </div>

          <Style className="hero3__right" {...block.setting.Style1}>
            <div className="hero3__image">
              <Image {...block.setting.Image1} />
            </div>
          </Style>
        </div>
      </div>
    </Block>
  )
}

const settingSchemas = [
  {
    blockType: 'hero',
    default: {
      style: {
        background: '#fff'
      }
    },
    type: 'schema_block',
    children: []
  },
  {
    name: 'Link1',
    title: 'Brand',
    default: {
      href: '#',
      style: {},
      type: 'link'
    },
    propertyName: 'block.setting.Link1',
    type: 'schema_link',
    children: [
      {
        name: 'Image1',
        title: 'Brand logo',
        default: {
          src: 'https://storage.earlybird.im/example/logo.png',
          alt: 'Your company',
          width: 200,
          height: 36,
          type: 'image'
        },
        type: 'schema_image'
      }
    ]
  },
  {
    name: 'Html1',
    title: 'Caption',
    default: {
      html: '\r\n                  Brand-new version v3.0.0 released. \r\n                  <a href="#" style="color:#2563eb">\r\n                    Upgrade now →\r\n                  </a>\r\n                ',
      style: {
        color: '#4b5563'
      },
      type: 'html'
    },
    type: 'schema_html'
  },
  {
    name: 'H11',
    title: 'Title',
    default: {
      as: 'h1',
      html: '\r\n                A better way to ship your projects\r\n              ',
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
      html: '\r\n                Effortlessly create, pitch, and validate your early-stage business with our no-code\r\n                landing page builder.\r\n              ',
      style: {
        color: '#4b5563'
      },
      type: 'html'
    },
    type: 'schema_html'
  },
  {
    name: 'Group1',
    title: 'Call-to-action',
    propertyName: 'block.setting.Group1',
    type: 'schema_group',
    children: [
      {
        name: 'List1',
        title: 'Buttons',
        propertyName: 'List1',
        type: 'schema_list',
        children: [
          {
            name: 'Link1',
            default: {
              href: '#',
              appearance: 'filled',
              style: {
                color: '#fff',
                background: '#000'
              },
              type: 'link'
            },
            propertyName: 'List1.Link1',
            type: 'schema_link',
            children: [
              {
                name: 'Icon1',
                default: {
                  type: 'svg',
                  name: 'brand-apple',
                  width: 20,
                  height: 20,
                  style: {}
                },
                type: 'schema_icon'
              },
              {
                name: 'Text1',
                default: {
                  html: 'App Store',
                  style: {},
                  type: 'text'
                },
                type: 'schema_text'
              }
            ]
          },
          {
            name: 'Link1',
            default: {
              href: '#',
              appearance: 'filled',
              style: {
                color: '#fff',
                background: '#000'
              },
              type: 'link'
            },
            propertyName: 'List1.Link1',
            type: 'schema_link',
            children: [
              {
                name: 'Icon1',
                default: {
                  type: 'svg',
                  name: 'brand-google-playstore',
                  width: 20,
                  height: 20,
                  style: {}
                },
                type: 'schema_icon'
              },
              {
                name: 'Text1',
                default: {
                  html: 'Google Play',
                  style: {},
                  type: 'text'
                },
                type: 'schema_text'
              }
            ]
          }
        ]
      },
      {
        name: 'Html1',
        title: 'Bottom text',
        default: {
          html: '\r\n                  Subscribe to get the private beta invitation.\r\n                ',
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
    name: 'Style1',
    title: 'Hero background',
    default: {
      style: {
        background: '#eff6ff'
      }
    },
    propertyName: 'block.setting.Style1',
    type: 'schema_style',
    children: []
  },
  {
    name: 'Image1',
    title: 'Hero image',
    default: {
      src: 'https://storage.earlybird.im/example/app-light3.png',
      alt: 'Your company',
      width: 500,
      height: 0,
      type: 'image'
    },
    type: 'schema_image'
  }
]

export const Hero3 = {
  type: 'hero',
  settingSchemas,
  render
}
