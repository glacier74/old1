import {
  $Group as Group,
  $Icon as Icon,
  $Image as Image,
  $Link as Link,
  $List as List,
  $Text as Text
} from '@earlybirdim/blocks'
import { useState } from 'react'

const render = function ({ data }) {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false)
  function handleClick() {
    setMobileMenuOpen(isMobileMenuOpen => !isMobileMenuOpen)
  }
  return (
    <div className={`header__container ${isMobileMenuOpen ? 'header__container-open' : ''}`}>
      <div className="header__wrapper">
        <div className="header__nav">
          <div className="header__nav-left">
            <Link className="header__logo" {...data.setting.Link1}>
              <Image {...data.setting.Link1.Image1} />
            </Link>

            <div className="header__nav-menu">
              <button type="button" onClick={handleClick}>
                <span className="sr-only">Open main menu</span>
                <Group>
                  {!isMobileMenuOpen ? (
                    <Icon {...data.setting.Group1.Icon1} />
                  ) : (
                    <Icon {...data.setting.Group1.Icon2} />
                  )}
                </Group>
              </button>
            </div>
          </div>

          <div className="header__nav-right">
            <List as="nav" className="header__navigation">
              {data.setting.List1?.map(List1 => (
                <Link {...List1.Link1} key={List1.id}>
                  <Text {...List1.Link1.Text1} />
                </Link>
              ))}
            </List>

            <List className="header__cta">
              {data.setting.List2?.map(List2 => (
                <Link {...List2.Link1} key={List2.id}>
                  <Icon {...List2.Link1.Icon1} />

                  <Text {...List2.Link1.Text1} />
                </Link>
              ))}
            </List>
          </div>
        </div>
      </div>
    </div>
  )
}

const settingSchemas = [
  {
    name: 'Link1',
    title: 'Brand',
    default: {
      href: '#',
      style: {},
      type: 'link'
    },
    propertyName: 'data.setting.Link1',
    type: 'schema_link',
    children: [
      {
        name: 'Image1',
        title: 'Brand logo',
        default: {
          src: 'https://storage.earlybird.im/example/logo.png',
          alt: 'EarlyBird',
          width: 36,
          height: 18,
          type: 'image'
        },
        type: 'schema_image'
      }
    ]
  },
  {
    name: 'Group1',
    title: 'Mobile Menu',
    propertyName: 'data.setting.Group1',
    type: 'schema_group',
    children: [
      {
        name: 'Icon1',
        title: 'Open Icon',
        default: {
          type: 'svg',
          name: 'menu',
          style: {
            color: '#374151'
          }
        },
        type: 'schema_icon'
      },
      {
        name: 'Icon2',
        title: 'Close Icon',
        default: {
          type: 'svg',
          name: 'close',
          style: {
            color: '#374151'
          }
        },
        type: 'schema_icon'
      }
    ]
  },
  {
    name: 'List1',
    title: 'Navigation',
    propertyName: 'List1',
    type: 'schema_list',
    children: [
      {
        name: 'Link1',
        default: {
          href: '#',
          style: {},
          type: 'link'
        },
        propertyName: 'List1.Link1',
        type: 'schema_link',
        children: [
          {
            name: 'Text1',
            default: {
              html: 'Features',
              style: {
                color: '#0f172a'
              },
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
          style: {},
          type: 'link'
        },
        propertyName: 'List1.Link1',
        type: 'schema_link',
        children: [
          {
            name: 'Text1',
            default: {
              html: 'Pricing',
              style: {
                color: '#0f172a'
              },
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
          style: {},
          type: 'link'
        },
        propertyName: 'List1.Link1',
        type: 'schema_link',
        children: [
          {
            name: 'Text1',
            default: {
              html: 'Changelog',
              style: {
                color: '#0f172a'
              },
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
          style: {},
          type: 'link'
        },
        propertyName: 'List1.Link1',
        type: 'schema_link',
        children: [
          {
            name: 'Text1',
            default: {
              html: 'Blog',
              style: {
                color: '#0f172a'
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
    name: 'List2',
    title: 'Call-to-action',
    propertyName: 'List2',
    type: 'schema_list',
    children: [
      {
        name: 'Link1',
        default: {
          href: '#',
          appearance: 'filled',
          style: {
            color: '#1a91ff',
            background: 'rgba(26,145,255,0.1)'
          },
          type: 'link'
        },
        propertyName: 'List2.Link1',
        type: 'schema_link',
        children: [
          {
            name: 'Icon1',
            default: {
              type: 'svg',
              name: 'brand-twitter',
              style: {}
            },
            type: 'schema_icon'
          },
          {
            name: 'Text1',
            default: {
              html: 'Follow us',
              style: {},
              type: 'text'
            },
            type: 'schema_text'
          }
        ]
      }
    ]
  }
]

export const Header1 = {
  type: 'header',
  settingSchemas,
  render
}
