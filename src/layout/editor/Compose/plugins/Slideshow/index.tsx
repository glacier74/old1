import { Node, mergeAttributes } from '@tiptap/core'
import { ReactNodeViewRenderer } from '@tiptap/react'

import { SlideshowComponent } from './SlideshowComponent'

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    slideshow: {
      /**
       * Insert slideshow
       */
      setSlideshow: () => ReturnType
    }
  }
}

export const Slideshow = Node.create({
  name: 'slideshow',
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
        tag: 'slideshow'
      }
    ]
  },

  addCommands() {
    return {
      setSlideshow: () => {
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
    return ['slideshow', mergeAttributes(HTMLAttributes)]
  },

  addNodeView() {
    return ReactNodeViewRenderer(SlideshowComponent)
  }
})
