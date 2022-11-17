import { FC } from 'react'

import { Block, BlockProps } from './Block'
import { BlockWrapper } from './index'

interface GroupProps extends Omit<BlockProps, 'enableCommand' | 'enableTextFormat'> {
  block: GroupBlock
}

export const Group: FC<GroupProps> = ({ block, placeholder, ...restProps }) => {
  return (
    <Block block={block} {...restProps}>
      {block.blocks.map(child => (
        <BlockWrapper
          key={child.id}
          block={child}
          enableAction={false}
          enableDropZone={child.enableDropZone}
          enterBehavior={child.enterBehavior}
        />
      ))}
    </Block>
  )
}
