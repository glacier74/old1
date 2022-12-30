import { FC, ReactNode } from 'react'

import { sanitizeHTML } from '~/layout/builder/utils'

import { BlockComponent, BlockPreview, BlockProps } from './Block'
import { Text } from './Text'

export interface ListProps extends Omit<BlockProps, 'prefix'> {
  block: ListBlock
  prefix?: ReactNode
}

export const ListPreview: FC<ListProps> = ({ block, prefix, ...restProps }) => {
  return (
    <BlockPreview block={block} {...restProps}>
      {block.content.map(b => (
        <div key={b.id} className="flex">
          {prefix && <div className="block-list-prefix">{prefix}</div>}
          <div
            className="rich-text"
            placeholder=" "
            dangerouslySetInnerHTML={{ __html: sanitizeHTML(b.html) }}
          />
        </div>
      ))}
    </BlockPreview>
  )
}

export const List: FC<ListProps> = ({ block, placeholder, prefix, children, ...restProps }) => {
  return (
    <BlockComponent block={block} {...restProps}>
      {block.content.map(child => (
        <div key={child.id} className="flex">
          {prefix && <div className="block-list-prefix">{prefix}</div>}
          <Text
            block={child}
            placeholder={placeholder}
            enableFormats={['basic']}
            enterBehavior="newBlock"
          />
        </div>
      ))}
    </BlockComponent>
  )
}
