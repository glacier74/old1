import {
  $Block as Block,
  $H2 as H2,
  $Html as Html,
  $Link as Link,
  $List as List,
  $Text as Text,
  $Image as Image
} from '@earlybirdim/blocks'
const render = function ({ productId, block }) {
  return (
    <Block productId={productId} block={block}>
      <div className="feature2__container">
        <div className="feature2__wrapper">
          <div className="feature2__col-wrapper">
            <div className="feature2__col1">
              <div className="feature2__col1-body">
                <Html as="div" className="feature2__caption" {...block.setting.Html1} />

                <H2 className="feature2__title" {...block.setting.H21} />

                <Html as="div" className="feature2__subtitle" {...block.setting.Html2} />

                <List className="feature2__buttons">
                  {block.setting.List1?.map(List1 => (
                    <Link {...List1.Link1} key={List1.id}>
                      <Text {...List1.Link1.Text1} />
                    </Link>
                  ))}
                </List>
              </div>
            </div>
            <div className="feature2__col2">
              <div className="feature2__image">
                <Image {...block.setting.Image1} />
              </div>
            </div>
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
      html: '\r\n                  Turn your idea into a reality\r\n                ',
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
      html: '\r\n                  Pitch an idea and convince the audience\r\n                ',
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
      html: '\r\n                  Convince the audience that your idea is worth their attention\r\n                  and investment, and encourage them to take the desired action.\r\n                ',
      style: {
        color: '#4b5563'
      },
      type: 'html'
    },
    type: 'schema_html'
  },
  {
    name: 'List1',
    title: 'Call-to-action',
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
              html: 'Get started →',
              style: {
                color: '#1d4ed8'
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
    name: 'Image1',
    title: 'Feature image',
    default: {
      src: 'https://storage.earlybird.im/example/feature3.png',
      width: 590,
      height: 0,
      type: 'image'
    },
    type: 'schema_image'
  }
]

export const Feature2 = {
  type: 'feature',
  settingSchemas,
  render
}
