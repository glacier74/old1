import clsx from 'clsx'
import type { FC } from 'react'
import { createContext, useContext } from 'react'

export interface BlockProps<BlockSetting extends object> extends ComponentProps {
  productId: number
  block: BlockData<BlockSetting>
}

interface BlockContext {
  productId: number
  blockId: string
}

const Context = createContext<BlockContext>({} as BlockContext)

export function useBlockContext(): BlockContext {
  return useContext(Context)
}

export const Block: FC<BlockProps<any>> = ({ className, productId, block, children }) => {
  return (
    <div
      id={`earlybird-block-${block.id}`}
      className={clsx(
        'earlybird-block-v2',
        `earlybird-block-${block.type}`,
        `earlybird-block-${block.componentId}`,
        className
      )}
      style={block.style}
    >
      <Context.Provider
        value={{
          productId,
          blockId: block.id
        }}
      >
        {children}
      </Context.Provider>
    </div>
  )
}
