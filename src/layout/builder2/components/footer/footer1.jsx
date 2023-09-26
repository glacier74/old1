import {
  $Block as Block,
  $Link as Link,
  $List as List,
  $Html as Html,
  $Icon as Icon
} from '@earlybirdim/blocks'
const render = function ({ productId, block }) {
  return (
    <Block productId={productId} block={block}>
      <div className="footer1__container">
        <List className="footer1__left">
          {block.setting.List1?.map((List1, index) => (
            <Link {...List1.Link1} key={index}>
              <Icon {...List1.Link1.Icon1} />
            </Link>
          ))}
        </List>

        <div className="footer1__right">
          <Html className="footer1__copyright" {...block.setting.Html1} as="div" />
        </div>
      </div>
    </Block>
  )
}

const settingSchemas = [
  {
    blockType: 'footer',
    default: {
      style: {
        background: '#fff'
      }
    },
    type: 'schema_block',
    children: []
  },
  {
    name: 'List1',
    title: 'Social media',
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
      html: '\r\n            © 2023 Your Company, Inc. All rights reserved.\r\n          ',
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
