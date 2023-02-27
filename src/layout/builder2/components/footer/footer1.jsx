import { $Html as Html, $Icon as Icon, $Link as Link, $List as List } from '@earlybirdim/blocks'

const render = function ({ data }) {
  return (
    <div className="footer__container">
      <List className="footer__left">
        {data.setting.List1?.map(List1 => (
          <Link {...List1.Link1} key={List1.id}>
            <Icon {...List1.Link1.Icon1} />
          </Link>
        ))}
      </List>

      <div className="footer__right">
        <Html as="p" className="footer__copyright" {...data.setting.Html1} />
      </div>
    </div>
  )
}

const settingSchemas = [
  {
    name: 'List1',
    title: 'Social networks',
    propertyName: 'List1',
    type: 'schema_list',
    children: [
      {
        name: 'Link1',
        default: {
          href: '#',
          style: {
            color: '#6b7280'
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
              name: 'brand-facebook',
              width: 24,
              height: 24,
              style: {}
            },
            type: 'schema_icon'
          }
        ]
      },
      {
        name: 'Link1',
        default: {
          href: '#',
          style: {
            color: '#6b7280'
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
              name: 'brand-twitter',
              width: 24,
              height: 24,
              style: {}
            },
            type: 'schema_icon'
          }
        ]
      },
      {
        name: 'Link1',
        default: {
          href: '#',
          style: {
            color: '#6b7280'
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
              name: 'brand-instagram',
              width: 24,
              height: 24,
              style: {}
            },
            type: 'schema_icon'
          }
        ]
      }
    ]
  },
  {
    name: 'Html1',
    title: 'Copyright',
    default: {
      as: 'p',
      html: '\r\n          © 2023 Your Company, Inc. All rights reserved.\r\n        ',
      style: {
        color: '#6b7280'
      },
      type: 'html'
    },
    type: 'schema_html'
  }
]

export const Footer1 = {
  type: 'footer',
  settingSchemas,
  render
}
