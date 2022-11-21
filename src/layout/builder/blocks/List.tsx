import { FC } from 'react'

import { sanitizeHTML } from '~/layout/builder/utils'

import { BlockComponent, BlockPreview, BlockProps } from './Block'
import { Text } from './Text'

export interface ListProps extends BlockProps {
  block: ListBlock
}

export const ListPreview: FC<ListProps> = ({ block, ...restProps }) => {
  return (
    <BlockPreview block={block} {...restProps}>
      {block.content.map((b, index) => (
        <div
          key={index}
          className="rich-text"
          placeholder=" "
          dangerouslySetInnerHTML={{ __html: sanitizeHTML(b.html) }}
        />
      ))}
    </BlockPreview>
  )
}

export const List: FC<ListProps> = ({ block, placeholder, children, ...restProps }) => {
  return (
    <BlockComponent block={block} {...restProps}>
      {block.content.map(child => (
        <Text
          key={child.id}
          block={child}
          placeholder={placeholder}
          enableFormats={['basic']}
          enterBehavior="newBlock"
        />
      ))}
    </BlockComponent>
  )
}
