import { Editor, BubbleMenu as TiptapBubbleMenu } from '@tiptap/react'
import { FC } from 'react'

interface BubbleMenuProps {
  editor: Editor
}

export const BubbleMenu: FC<BubbleMenuProps> = ({ editor }) => {
  return (
    <TiptapBubbleMenu
      className="bg-white shadow p-2 rounded space-x-2"
      editor={editor}
      tippyOptions={{ duration: 100 }}
    >
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={editor.isActive('bold') ? 'is-active' : ''}
      >
        bold
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={editor.isActive('italic') ? 'is-active' : ''}
      >
        italic
      </button>
      <button
        onClick={() => editor.chain().focus().toggleStrike().run()}
        className={editor.isActive('strike') ? 'is-active' : ''}
      >
        strike
      </button>
    </TiptapBubbleMenu>
  )
}
