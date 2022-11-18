import { IComponentProps } from '@heyforms/ui/types/typing'
import clsx from 'clsx'
import { FC } from 'react'
import { useDrag, useDrop } from 'react-dnd'

import { useComposeStore } from '../store'
import { ActionMenu } from '../views'

export interface BlockProps extends Omit<IComponentProps, 'onFocus' | 'onSelect'> {
  block: Block
  enableMultiple?: boolean
  enableAction?: boolean
  enableCommand?: boolean
  enableDropZone?: boolean
  enableFormats?: Array<'basic' | 'align'>
  enterBehavior?: BlockEnterBehavior
}

export const BlockPreview: FC<BlockProps> = ({ className, block, children }) => (
  <div
    className={clsx('block-container', `block-${block.type}`, className)}
    data-block-id={block.id}
  >
    {children}
  </div>
)

export const BlockComponent: FC<BlockProps> = ({
  className,
  block,
  enableAction,
  enableDropZone,
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
          'block-selected': block.id === state.selectBlockId
        },
        className
      )}
      data-block-id={block.id}
    >
      {/* Action menu */}
      {enableAction && <ActionMenu block={block} connectDrag={connectDrag} />}

      {/* Preview */}
      <div ref={ref => connectDrop(connectPreview(ref))} className="block-preview">
        {children}
      </div>

      {/* Dropzone */}
      {enableDropZone && <div className="block-dropzone" />}
    </div>
  )
}
