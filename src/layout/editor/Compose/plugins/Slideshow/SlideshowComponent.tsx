import { NodeViewProps, NodeViewWrapper } from '@tiptap/react'
import { FC, useMemo } from 'react'

import { PhotoPicker } from '~/components'
import { cropImage, useVisible } from '~/utils'

import { UploadButton } from './UploadButton'

interface SlideshowItemProps {
  url: string
  caption: string
}

const SlideshowItem: FC<SlideshowItemProps> = ({ url, caption }) => {
  return (
    <div className="editor-slideshow-item group block w-full">
      <img
        src={cropImage(url, 368, 220)}
        className="object-cover pointer-events-none group-hover:opacity-75"
        alt={caption}
      />
    </div>
  )
}

export const SlideshowComponent: FC<NodeViewProps> = props => {
  const [visible, open, close] = useVisible()
  const style = useMemo(() => {
    return {
      width: props.node.attrs.items.length * 8 + (props.node.attrs.items.length + 1) * 368
    }
  }, [props.node.attrs.items.length])

  function handleChange(url: string) {
    props.updateAttributes({
      items: [...props.node.attrs.items, { url }]
    })
  }

  return (
    <NodeViewWrapper>
      <div
        tabIndex={0}
        className="mt-4 max-w-full overflow-x-auto rounded hover:ring-1 focus:ring-1 ring-blue-700"
      >
        <div className="editor-slideshow flex direction-row space-x-2" style={style}>
          {props.node.attrs.items.map((row: SlideshowItemProps, index: number) => (
            <SlideshowItem key={index} {...row} />
          ))}
          <UploadButton onClick={open} />
        </div>
      </div>

      {/* Photo picker modal */}
      <PhotoPicker
        visible={visible}
        enableUnsplash={false}
        onClose={close}
        onChange={handleChange}
      />
    </NodeViewWrapper>
  )
}
