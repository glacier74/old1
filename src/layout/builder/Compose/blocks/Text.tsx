import { useTranslation } from 'next-i18next'
import { FC, useCallback } from 'react'

import { useComposeStore } from '../store'
import { RichText } from '../views'
import { BlockComponent, BlockPreview, BlockProps } from './Block'

export interface TextProps extends BlockProps {
  block: TextBlock
}

export const TextPreview: FC<TextProps> = ({ block, ...restProps }) => {
  return (
    <BlockPreview block={block} {...restProps}>
      <div className="rich-text" placeholder=" " dangerouslySetInnerHTML={{ __html: block.html }} />
    </BlockPreview>
  )
}

export const Text: FC<TextProps> = ({
  block,
  placeholder = 'builder.text.placeholder',
  enableMultiple = false,
  enableAction = true,
  enableCommand = true,
  enableFormats = ['basic', 'align'],
  enterBehavior = 'newBlock',
  children,
  ...restProps
}) => {
  const { t } = useTranslation()
  const { dispatch } = useComposeStore()

  const handleChange = useCallback((html: string) => {
    dispatch({
      type: 'updateBlock',
      payload: {
        blockId: block.id,
        updates: {
          html
        }
      }
    })
  }, [])

  return (
    <BlockComponent block={block} enableAction={enableAction} {...restProps}>
      <RichText
        blockId={block.id}
        value={block.html}
        placeholder={t(placeholder)}
        enableCommand={enableCommand}
        enableTextFormat={!!enableFormats}
        enterBehavior={enterBehavior}
        onChange={handleChange}
      />
      {children}
    </BlockComponent>
  )
}
