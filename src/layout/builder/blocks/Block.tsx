import { IComponentProps } from '@heyforms/ui/types/typing'
import clsx from 'clsx'
import { FC } from 'react'

import { useBuilderContext } from '../context'

export interface BlockProps extends Omit<IComponentProps, 'onFocus' | 'onSelect'> {
  block: Block
  enableMultiple?: boolean
  enableFormats?: Array<'basic' | 'align'> | null
  enterBehavior?: BlockEnterBehavior
}

export const BlockPreview: FC<BlockProps> = ({ className, block, children }) => (
  <div
    id={`block-${block.id}`}
    className={clsx('earlybird-block-v1', `block-${block.type.toLowerCase()}`, className)}
  >
    {children}
  </div>
)

export const BlockComponent: FC<BlockProps> = ({ className, block, children }) => {
  const { state, dispatch } = useBuilderContext()

  function handleClick(event: any) {
    if (!event.target.hasAttribute('contenteditable')) {
      dispatch({
        type: 'selectBlock',
        payload: {
          blockId: block.id
        }
      })
    }
  }

  return (
    <div
      id={`block-${block.id}`}
      className={clsx('block-root', {
        'block-root-selected': block.id === state.selectBlockId
      })}
      onClick={handleClick}
    >
      <div
        className={clsx(
          'earlybird-block-v1',
          `block-${block.type.toLowerCase()}`,
          {
            'block-selected': block.id === state.selectBlockId
          },
          className
        )}
      >
        {children}
      </div>
    </div>
  )
}
