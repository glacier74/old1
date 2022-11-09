import { Node, mergeAttributes } from '@tiptap/core'
import { ReactNodeViewRenderer } from '@tiptap/react'

import { GalleryComponent } from './GalleryComponent'

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    gallery: {
      /**
       * Insert gallery
       */
      setGallery: () => ReturnType
    }
  }
}

export const Gallery = Node.create({
  name: 'gallery',
  group: 'block',
  atom: true,

  addAttributes() {
    return {
      items: {
        default: []
      }
    }
  },

  parseHTML() {
    return [
      {
        tag: 'gallery'
      }
    ]
  },

  addCommands() {
    return {
      setGallery: () => {
        return ({ commands }) => {
          return commands.insertContent({
            type: this.name
          })
        }
      }
    }
  },

  // TODO - render html
  // https://github.com/ueberdosis/tiptap/blob/main/packages/extension-youtube/src/youtube.ts#L135
  renderHTML({ HTMLAttributes }) {
    return ['gallery', mergeAttributes(HTMLAttributes)]
  },

  addNodeView() {
    return ReactNodeViewRenderer(GalleryComponent)
  }
})
