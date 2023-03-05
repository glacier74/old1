import clsx from 'clsx'
import type { FC } from 'react'
import { createContext, useContext } from 'react'

export interface $BlockProps<BlockSetting extends object> extends ComponentProps {
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

export const $Block: FC<$BlockProps<any>> = ({ productId, block, children }) => {
  return (
    <div
      id={`earlybird-block-${block.id}`}
      className={clsx(
        'earlybird-block',
        `earlybird-block-${block.type}`,
        `earlybird-block-${block.componentId}`
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
