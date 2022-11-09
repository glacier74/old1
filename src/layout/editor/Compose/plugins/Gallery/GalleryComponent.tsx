import { NodeViewProps, NodeViewWrapper } from '@tiptap/react'
import { FC, useMemo } from 'react'

import { PhotoPicker } from '~/components'
import { cropImage, useVisible } from '~/utils'

import { UploadButton } from './UploadButton'

interface GalleryItemProps {
  url: string
  caption: string
}

const GalleryItem: FC<GalleryItemProps> = ({ url, caption }) => {
  return (
    <div className="gallery-item group block w-full">
      <img
        src={cropImage(url, 368, 220)}
        className="object-cover pointer-events-none group-hover:opacity-75"
        alt={caption}
      />
    </div>
  )
}

export const GalleryComponent: FC<NodeViewProps> = props => {
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
      <div tabIndex={0} className="py-8 max-w-full overflow-x-auto focus:ring-1 ring-blue-700">
        <div className="gallery flex direction-row space-x-2" style={style}>
          {props.node.attrs.items.map((row: GalleryItemProps, index: number) => (
            <GalleryItem key={index} {...row} />
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
