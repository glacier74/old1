import { FC } from 'react'

import { Block, BlockProps } from './Block'
import { BlockWrapper } from './index'

interface ListProps extends BlockProps {
  block: ListBlock
}

export const List: FC<ListProps> = ({
  block,
  enableCommand = false,
  enableTextFormat = true,
  children,
  ...restProps
}) => {
  return (
    <Block block={block} {...restProps}>
      {block.blocks.map(child => (
        <BlockWrapper
          key={child.id}
          block={child}
          enableCommand={enableCommand}
          enableTextFormat={enableTextFormat}
          enableAction={false}
          enableDropZone={false}
          enterBehavior="createBlock"
        />
      ))}
    </Block>
  )
}
