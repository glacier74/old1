import { Input } from '@heyforms/ui'
import { Link } from '@tiptap/extension-link'
import { Placeholder } from '@tiptap/extension-placeholder'
import { TextAlign } from '@tiptap/extension-text-align'
import Underline from '@tiptap/extension-underline'
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { useTranslation } from 'next-i18next'

import { LogoPickerField } from '~/components'
import { useProduct } from '~/layout'

import { BubbleMenu } from './BubbleMenu'
import { Payment } from './plugins/Payment'
import { SlashMenu } from './plugins/SlashMenu'
import { Slideshow } from './plugins/Slideshow'
import { TrailingNode } from './plugins/TrailingNode'
import { UniqueID } from './plugins/UniqueID'

export const Compose = () => {
  const { t } = useTranslation()
  const product = useProduct()

  const editor = useEditor({
    extensions: [
      UniqueID.configure({
        types: ['paragraph', 'heading', 'slideshow']
      }),
      StarterKit,
      Underline,
      Link.configure({
        protocols: ['http', 'https', 'mailto'],
        openOnClick: false,
        autolink: true,
        linkOnPaste: true
      }),
      Slideshow,
      Payment,
      TrailingNode,
      TextAlign.configure({
        types: ['heading', 'paragraph']
      }),
      Placeholder.configure({
        placeholder: 'Type "/" to insert blocks'
      }),
      SlashMenu
    ],
    content:
      '<p data-id="UJo5psGjtN88">Hello World! <a href="https://www.github.com">Github</a></p>',
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
