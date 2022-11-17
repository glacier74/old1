import { IComponentProps } from '@heyforms/ui/types/typing'
import clsx from 'clsx'
import { FC } from 'react'
import { useDrag, useDrop } from 'react-dnd'

import { useComposeStore } from '../store'
import { ActionMenu } from '../views'

export interface BlockProps extends Omit<IComponentProps, 'onFocus' | 'onSelect'> {
  block: Block
  enableAction?: boolean
  enableCommand?: boolean
  enableTextFormat?: boolean
  enableDropZone?: boolean
  enterBehavior?: 'createBlock' | 'focusNextBlock'
}

const BlockComponent: FC<BlockProps> = ({
  className,
  block,
  enableAction = true,
  enableDropZone = true,
  children
}) => {
  const { state, dispatch } = useComposeStore()

  const [{ isDragging }, connectDrag, connectPreview] = useDrag(
    () => ({
      type: 'block-drag-handle',
      item: {
        id: block.id
      },
      collect: monitor => ({
        isDragging: monitor.isDragging()
      })
    }),
    [block.id]
  )

  const [{ isOver }, connectDrop] = useDrop(
    () => ({
      accept: 'block-drag-handle',
      drop({ id: draggedId }: Block) {
        dispatch({
          type: 'moveBlock',
          payload: {
            blockId: draggedId,
            afterId: block.id
          }
        })
      },
      collect: monitor => ({
        isOver: monitor.isOver()
      })
    }),
    []
  )

  return (
    <div
      className={clsx(
        'block-container',
        `block-${block.type}`,
        {
          'block-dragging': isDragging,
          'block-hovering': isOver,
          'block-selected': block.id === state.selectedBlockId
        },
        className
      )}
      data-block-id={`block-${block.id}`}
    >
      {enableAction && <ActionMenu block={block} connectDrag={connectDrag} />}

      <div ref={ref => connectDrop(connectPreview(ref))} className="block-content">
        {children}
      </div>

      {enableDropZone && <div className="block-dropzone" />}
    </div>
  )
}
export const Block = BlockComponent
