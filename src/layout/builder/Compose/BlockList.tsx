import { FC } from 'react'

import { BlockWrapper } from './blocks'
import { useComposeStore } from './store'

export const BlockList: FC = () => {
  const { state } = useComposeStore()

  return (
    <div className="block-list">
      {state.blocks.map(block => (
        <BlockWrapper key={block.id} block={block} />
      ))}
    </div>
  )
}
