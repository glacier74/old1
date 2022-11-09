import { Input } from '@heyforms/ui'
import { Range } from '@tiptap/core'
import { Link } from '@tiptap/extension-link'
import { Placeholder } from '@tiptap/extension-placeholder'
import { Editor, EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { useTranslation } from 'next-i18next'

import { LogoPickerField } from '~/components'
import { useProduct } from '~/layout'

import { BubbleMenu } from './BubbleMenu'
import { Gallery } from './plugins/Gallery'
import { SlashMenu } from './plugins/SlashMenu'
import { UniqueID } from './plugins/UniqueID'

export const Compose = () => {
  const { t } = useTranslation()
  const product = useProduct()

  const editor = useEditor({
    extensions: [
      UniqueID.configure({
        types: ['paragraph', 'heading', 'gallery']
      }),
      StarterKit,
      Link.configure({
        protocols: ['http', 'https', 'mailto'],
        openOnClick: false,
        autolink: true,
        linkOnPaste: true
      }),
      Gallery,
      Placeholder.configure({
        placeholder: 'Type "/" to insert blocks'
      }),
      SlashMenu.configure({
        commands: [
          {
            title: 'gallery',
            command: ({ editor, range }: { editor: Editor; range: Range }) => {
              editor.chain().focus().deleteRange(range).setGallery().run()
            }
          }
        ]
      })
    ],
    content: '<p data-id="UJo5psGjtN88">Hello World!</p>',
    onUpdate: ({ editor }) => {
      const json = editor.getJSON()
      console.log(json)
    }
  })

  return (
    <div className="pl-72 pt-16">
      <div className="mx-auto max-w-3xl">
        <LogoPickerField value={product?.logo} size={100} enableUnsplash={false} />
        <div className="editor-name">
          <Input value={product?.name} placeholder={t('onboarding.name')} />
        </div>
        <div className="editor-tagline mt-3">
          <Input value={product?.tagline} placeholder={t('onboarding.tagline')} />
        </div>
        <div className="editor-content mt-6">
          <EditorContent editor={editor} />
          {editor && <BubbleMenu editor={editor} />}
        </div>
      </div>
    </div>
  )
}
