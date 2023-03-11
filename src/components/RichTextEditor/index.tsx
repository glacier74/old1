import { Button, Input, stopPropagation } from '@heyforms/ui'
import {
  IconBold,
  IconCheck,
  IconItalic,
  IconLink,
  IconStrikethrough,
  IconUnderline
} from '@tabler/icons'
import Tippy from '@tippyjs/react/headless'
import { Bold } from '@tiptap/extension-bold'
import { Color } from '@tiptap/extension-color'
import Document from '@tiptap/extension-document'
import History from '@tiptap/extension-history'
import { Italic } from '@tiptap/extension-italic'
import { Link } from '@tiptap/extension-link'
import Paragraph from '@tiptap/extension-paragraph'
import Placeholder from '@tiptap/extension-placeholder'
import { Strike } from '@tiptap/extension-strike'
import Text from '@tiptap/extension-text'
import TextStyle from '@tiptap/extension-text-style'
import { Underline } from '@tiptap/extension-underline'
import { BubbleMenu, EditorContent, useEditor } from '@tiptap/react'
import clsx from 'clsx'
import { FC, useState } from 'react'

import { BackgroundColorPlugin } from './BackgroundColorPlugin'
import { ColorPane } from './ColorPane'

export interface RichTextEditorProps extends ComponentProps {
  value?: string
  placeholder?: string
  onChange?: (value: string) => void
}

export const RichTextEditor: FC<RichTextEditorProps> = ({
  className,
  value,
  placeholder = 'Write something …',
  onChange,
  ...resetProps
}) => {
  const editor = useEditor({
    content: value,
    extensions: [
      Document,
      Paragraph,
      Text,
      Bold,
      Strike,
      Italic,
      Underline,
      Link.configure({
        openOnClick: false
      }),
      TextStyle,
      Color,
      BackgroundColorPlugin,
      History,
      Placeholder.configure({
        placeholder
      })
    ],
    onUpdate: ({ editor }) => {
      const html = editor.getHTML()

      onChange?.(html === '<p></p>' ? '' : html)
    }
  })

  const [isLinkMenuOpen, setLinkMenuOpen] = useState(false)
  const [linkURL, setLinkURL] = useState<string | null>()

  function handleBold() {
    editor?.chain().focus().toggleBold().run()
  }

  function handleItalic() {
    editor?.chain().focus().toggleItalic().run()
  }

  function handleStrike() {
    editor?.chain().focus().toggleStrike().run()
  }

  function handleUnderline() {
    editor?.chain().focus().toggleUnderline().run()
  }

  function handleLink() {
    setLinkMenuOpen(true)
    setLinkURL(editor?.getAttributes('link').href)
  }

  function handleLinkURLChange(value: any) {
    setLinkURL(value)
  }

  function handleSetLink() {
    editor?.commands.setLink({ href: linkURL! })
    handleBubbleMenuHidden()
  }

  function handleKeyDown(event: any) {
    if (event.code === 'Enter') {
      setLinkURL((event.target as any).value)
      handleSetLink()
    }
  }

  function handleBubbleMenuHidden() {
    setLinkURL(null)
    setLinkMenuOpen(false)
  }

  function handleColor(color?: string) {
    editor?.commands.setColor(color!)
  }

  function handleBackground(backgroundColor?: string) {
    editor?.commands.setBackgroundColor(backgroundColor!)
  }

  return (
    <div className={clsx('rich-text-editor', className)} {...resetProps}>
      {editor && (
        <BubbleMenu
          className="editor__menu-wrapper"
          editor={editor}
          tippyOptions={{
            interactive: true,
            duration: 100,
            offset: isLinkMenuOpen ? [-160, 12] : undefined,
            onHidden: handleBubbleMenuHidden
          }}
        >
          {isLinkMenuOpen ? (
            <div className="editor__link-menu">
              <Input
                value={linkURL!}
                placeholder="https://example.com"
                onKeyDown={handleKeyDown}
                onChange={handleLinkURLChange}
              />
              <Button type="success" leading={<IconCheck />} onClick={handleSetLink} />
            </div>
          ) : (
            <div className="editor__bubble-menu">
              <button
                type="button"
                className={editor.isActive('bold') ? 'is-active' : ''}
                onClick={handleBold}
              >
                <IconBold />
              </button>
              <button
                type="button"
                className={editor.isActive('italic') ? 'is-active' : ''}
                onClick={handleItalic}
              >
                <IconItalic />
              </button>
              <button
                type="button"
                className={editor.isActive('strike') ? 'is-active' : ''}
                onClick={handleStrike}
              >
                <IconStrikethrough />
              </button>
              <button
                type="button"
                className={editor.isActive('underline') ? 'is-active' : ''}
                onClick={handleUnderline}
              >
                <IconUnderline />
              </button>
              <button
                type="button"
                className={editor.isActive('link') ? 'is-active' : ''}
                onClick={handleLink}
              >
                <IconLink />
              </button>
              <Tippy
                trigger="mouseenter"
                placement="bottom-end"
                interactive={true}
                delay={50}
                render={attrs => (
                  <ColorPane
                    color={editor.getAttributes('textStyle').color}
                    backgroundColor={editor.getAttributes('textStyle').backgroundColor}
                    onColorChange={handleColor}
                    onBackgroundColorChange={handleBackground}
                    {...attrs}
                  />
                )}
              >
                <button
                  type="button"
                  style={{
                    color: editor.getAttributes('textStyle').color,
                    background: editor.getAttributes('textStyle').backgroundColor
                  }}
                  onClick={stopPropagation}
                >
                  <span>A</span>
                </button>
              </Tippy>
            </div>
          )}
        </BubbleMenu>
      )}
      <EditorContent editor={editor} />
    </div>
  )
}
