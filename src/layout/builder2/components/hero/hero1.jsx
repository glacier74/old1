import {
  $Group as Group,
  $H1 as H1,
  $Html as Html,
  $Image as Image,
  $Link as Link,
  $List as List,
  $Text as Text
} from '@earlybirdim/blocks'

const render = function ({ data }) {
  return (
    <div className="hero__container">
      <div className="hero__wrapper">
        <div className="hero__left">
          <div className="hero__announcement-wrapper">
            <Html as="p" className="hero__announcement" {...data.setting.Html1} />
          </div>

          <H1 className="hero__title" {...data.setting.H11} />

          <Html as="p" className="hero__subtitle" {...data.setting.Html2} />

          <Group className="hero__cta">
            <List className="hero__cta-buttons">
              {data.setting.Group1.List1?.map(List1 => (
                <Link {...List1.Link1} key={List1.id}>
                  <Text {...List1.Link1.Text1} />
                </Link>
              ))}
            </List>

            <Text as="p" className="hero__cta-bottom-text" {...data.setting.Group1.Text1} />
          </Group>
        </div>

        <div className="hero__right">
          <Image {...data.setting.Image1} />
        </div>
      </div>
    </div>
  )
}

const settingSchemas = [
  {
    name: 'Html1',
    title: 'Caption',
    default: {
      as: 'p',
      html: '\r\n              Take a look at our latest <a href="#">blog post</a>.\r\n            ',
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
      html: '\r\n            A better way to ship your projects\r\n          ',
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
      html: '\r\n            Effortlessly create, pitch, and validate your early-stage business with our no-code\r\n            landing page builder.\r\n          ',
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
    propertyName: 'data.setting.Group1',
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
                background: '#2563eb'
              },
              type: 'link'
            },
            propertyName: 'List1.Link1',
            type: 'schema_link',
            children: [
              {
                name: 'Text1',
                default: {
                  html: 'Get started',
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
              style: {
                color: '#111827'
              },
              type: 'link'
            },
            propertyName: 'List1.Link1',
            type: 'schema_link',
            children: [
              {
                name: 'Text1',
                default: {
                  html: 'Learn more →',
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
        name: 'Text1',
        title: 'Bottom text',
        default: {
          html: 'No coding skills required',
          style: {
            color: '#6b7280'
          },
          type: 'text'
        },
        type: 'schema_text'
      }
    ]
  },
  {
    name: 'Image1',
    title: 'Right side image',
    default: {
      src: 'https://storage.earlybird.im/example/3d2.png',
      alt: 'EarlyBird',
      width: 504,
      height: 0,
      type: 'image'
    },
    type: 'schema_image'
  }
]

export const Hero1 = {
  type: 'hero',
  settingSchemas,
  render
}
