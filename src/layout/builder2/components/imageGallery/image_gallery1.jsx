import {
  $Block as Block,
  $Group as Group,
  $H1 as H1,
  $Html as Html,
  $Image as Image,
  ImageSwiper,
  $List as List
} from '@earlybirdim/blocks'
const render = function ({ productId, block }) {
  return (
    <>
      <Block productId={productId} block={block}>
        <div className="image_gallery1__container">
          <div className="image_gallery1__wrapper">
            <Html as="p" className="image_gallery1__caption" {...block.setting.Html1} />

            <H1 className="image_gallery1__title" {...block.setting.H11} />

            <Html as="p" className="image_gallery1__subtitle" {...block.setting.Html2} />

            <List as="ul" className="image_gallery1__list">
              {block.setting.List1?.map(List1 => (
                <Group as="li" key={List1.id}>
                  <Image {...List1.Group1.Image1} />
                </Group>
              ))}
            </List>
          </div>
        </div>
      </Block>

      <ImageSwiper selector=".image_gallery1__list li img" />
    </>
  )
}

const settingSchemas = [
  {
    blockType: 'image_gallery',
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
    name: 'H11',
    title: 'Title',
    default: {
      as: 'h1',
      html: '\r\n              A better way to ship your projects\r\n            ',
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
      html: '\r\n              Effortlessly create, pitch, and validate your early-stage business\r\n              with our no-code landing page builder.\r\n            ',
      style: {
        color: '#4b5563'
      },
      type: 'html'
    },
    type: 'schema_html'
  },
  {
    name: 'List1',
    title: 'Images',
    propertyName: 'List1',
    type: 'schema_list',
    children: [
      {
        name: 'Group1',
        propertyName: 'List1.Group1',
        type: 'schema_group',
        children: [
          {
            name: 'Image1',
            default: {
              src: 'https://images.unsplash.com/photo-1664436341001-b02974ae7524?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
              width: 400,
              height: 250,
              type: 'image'
            },
            type: 'schema_image'
          }
        ]
      },
      {
        name: 'Group1',
        propertyName: 'List1.Group1',
        type: 'schema_group',
        children: [
          {
            name: 'Image1',
            default: {
              src: 'https://images.unsplash.com/photo-1677782685362-7d54592471d0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
              width: 400,
              height: 250,
              type: 'image'
            },
            type: 'schema_image'
          }
        ]
      },
      {
        name: 'Group1',
        propertyName: 'List1.Group1',
        type: 'schema_group',
        children: [
          {
            name: 'Image1',
            default: {
              src: 'https://images.unsplash.com/photo-1674157984325-331a660c9c46?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
              width: 400,
              height: 250,
              type: 'image'
            },
            type: 'schema_image'
          }
        ]
      },
      {
        name: 'Group1',
        propertyName: 'List1.Group1',
        type: 'schema_group',
        children: [
          {
            name: 'Image1',
            default: {
              src: 'https://images.unsplash.com/photo-1675710051172-11e13131da37?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=627&q=80',
              width: 400,
              height: 250,
              type: 'image'
            },
            type: 'schema_image'
          }
        ]
      },
      {
        name: 'Group1',
        propertyName: 'List1.Group1',
        type: 'schema_group',
        children: [
          {
            name: 'Image1',
            default: {
              src: 'https://images.unsplash.com/photo-1676101499906-cd3bec37abc0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=682&q=80',
              width: 400,
              height: 250,
              type: 'image'
            },
            type: 'schema_image'
          }
        ]
      },
      {
        name: 'Group1',
        propertyName: 'List1.Group1',
        type: 'schema_group',
        children: [
          {
            name: 'Image1',
            default: {
              src: 'https://images.unsplash.com/photo-1590369099888-b0e7bd8be246?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1476&q=80',
              width: 400,
              height: 250,
              type: 'image'
            },
            type: 'schema_image'
          }
        ]
      }
    ]
  }
]

export const ImageGallery1 = {
  type: 'image_gallery',
  settingSchemas,
  render
}
