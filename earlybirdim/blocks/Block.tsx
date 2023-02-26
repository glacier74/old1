import clsx from 'clsx'
import type { FC } from 'react'

export interface BlockProps<BlockSetting extends object> extends ComponentProps {
  data: BlockData<BlockSetting>
}

export const Block: FC<BlockProps<any>> = ({ className, data, children }) => {
  return (
    <div
      id={`earlybird-block-${data.id}`}
      className={clsx(
        'earlybird-block-v2',
        `earlybird-block-${data.type}`,
        `earlybird-block-${data.componentId}`,
        className
      )}
      style={data.style}
    >
      {children}
    </div>
  )
}
