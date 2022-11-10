import { IComponentProps } from '@heyforms/ui/types/typing'
import clsx from 'clsx'
import { FC } from 'react'
import { useDrop } from 'react-dnd'

interface DropZoneProps extends IComponentProps {
  onDrop: (item: any) => void
}

export const DropZone: FC<DropZoneProps> = ({ className, onDrop }) => {
  const [{ isOver }, drop] = useDrop({
    accept: 'block-drag-handle',
    drop: item => {
      onDrop(item)
    },
    canDrop: () => {
      return true
    },
    collect: monitor => ({
      isOver: monitor.isOver()
    })
  })

  return (
    <div
      className={clsx('block-dropzone', { 'block-dropzone-active': isOver }, className)}
      ref={drop}
    />
  )
}
