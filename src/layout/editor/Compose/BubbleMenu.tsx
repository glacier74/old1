import { Button, Tooltip } from '@heyforms/ui'
import {
  IconAlignCenter,
  IconAlignLeft,
  IconAlignRight,
  IconBold,
  IconItalic,
  IconLink,
  IconLinkOff,
  IconStrikethrough,
  IconUnderline
} from '@tabler/icons'
import { Editor, BubbleMenu as TiptapBubbleMenu } from '@tiptap/react'
import clsx from 'clsx'
import { useTranslation } from 'next-i18next'
import { FC } from 'react'

interface BubbleMenuProps {
  editor: Editor
}

export const BubbleMenu: FC<BubbleMenuProps> = ({ editor }) => {
  const { t } = useTranslation()

  function handleShouldShow(props: any) {
    return (
      !props.editor.view.state.selection.empty &&
      !(props.editor.isActive('slideshow') || props.editor.isActive('payment'))
    )
  }

  function handleBold() {
    editor.chain().focus().toggleBold().run()
  }

  function handleItalic() {
    editor.chain().focus().toggleItalic().run()
  }

  function handleStrike() {
    editor.chain().focus().toggleStrike().run()
  }

  function handleUnderline() {
    editor.chain().focus().toggleUnderline().run()
  }

  function handleLinkOff() {
    editor.commands.unsetLink()
  }

  function handleAlignLeft() {
    if (editor.isActive({ textAlign: 'left' })) {
      editor.chain().focus().unsetTextAlign().run()
    } else {
      editor.chain().focus().setTextAlign('left').run()
    }
  }

  function handleAlignCenter() {
    if (editor.isActive({ textAlign: 'center' })) {
      editor.chain().focus().unsetTextAlign().run()
    } else {
      editor.chain().focus().setTextAlign('center').run()
    }
  }

  function handleAlignRight() {
    if (editor.isActive({ textAlign: 'right' })) {
      editor.chain().focus().unsetTextAlign().run()
    } else {
      editor.chain().focus().setTextAlign('right').run()
    }
  }

  return (
    <TiptapBubbleMenu
      className="editor-bubble-menu flex items-center bg-white shadow p-2 rounded divide-x divide-slate-200 space-x-2"
      editor={editor}
      tippyOptions={{ duration: 100 }}
      shouldShow={handleShouldShow}
    >
      <div className="flex items-center space-x-2">
        <Tooltip ariaLabel={t('editor.bold')}>
          <Button.Link
            className={clsx({ 'editor-bubble-menu-active': editor.isActive('bold') })}
            leading={<IconBold />}
            onClick={handleBold}
          />
        </Tooltip>
        <Tooltip ariaLabel={t('editor.italic')}>
          <Button.Link
            className={clsx({ 'editor-bubble-menu-active': editor.isActive('italic') })}
            leading={<IconItalic />}
            onClick={handleItalic}
          />
        </Tooltip>
        <Tooltip ariaLabel={t('editor.strikethrough')}>
          <Button.Link
            className={clsx({ 'editor-bubble-menu-active': editor.isActive('strike') })}
            leading={<IconStrikethrough />}
            onClick={handleStrike}
          />
        </Tooltip>
        <Tooltip ariaLabel={t('editor.underline')}>
          <Button.Link
            className={clsx({ 'editor-bubble-menu-active': editor.isActive('underline') })}
            leading={<IconUnderline />}
            onClick={handleUnderline}
          />
        </Tooltip>
        <Tooltip ariaLabel={t('editor.link')}>
          <Button.Link
            className={clsx({ 'editor-bubble-menu-active': editor.isActive('link') })}
            leading={<IconLink />}
          />
        </Tooltip>
        {editor.isActive('link') && (
          <Tooltip ariaLabel={t('editor.linkOff')}>
            <Button.Link leading={<IconLinkOff />} onClick={handleLinkOff} />
          </Tooltip>
        )}
      </div>

      <div className="flex items-center space-x-2 pl-2">
        <Tooltip ariaLabel={t('editor.alignLeft')}>
          <Button.Link
            className={clsx({
              'editor-bubble-menu-active': editor.isActive({ textAlign: 'left' })
            })}
            leading={<IconAlignLeft />}
            onClick={handleAlignLeft}
          />
        </Tooltip>
        <Tooltip ariaLabel={t('editor.alignCenter')}>
          <Button.Link
            className={clsx({
              'editor-bubble-menu-active': editor.isActive({ textAlign: 'center' })
            })}
            leading={<IconAlignCenter />}
            onClick={handleAlignCenter}
          />
        </Tooltip>
        <Tooltip ariaLabel={t('editor.alignRight')}>
          <Button.Link
            className={clsx({
              'editor-bubble-menu-active': editor.isActive({ textAlign: 'right' })
            })}
            leading={<IconAlignRight />}
            onClick={handleAlignRight}
          />
        </Tooltip>
      </div>
    </TiptapBubbleMenu>
  )
}
