import { FC } from 'react'

import { BlockComponent, BlockPreview, BlockProps } from './Block'
import { Text } from './Text'

export interface ListProps extends BlockProps {
  block: ListBlock
}

export const ListPreview: FC<ListProps> = ({ block, ...restProps }) => {
  return (
    <BlockPreview block={block} {...restProps}>
      {block.content.map((b, index) => (
        <div className="rich-text" placeholder=" " key={index}>
          {b.html}
        </div>
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
          enableCommand={false}
          enableFormats={['basic']}
          enableAction={false}
          enableDropZone={false}
          enterBehavior="newBlock"
        />
      ))}
    </BlockComponent>
  )
}
