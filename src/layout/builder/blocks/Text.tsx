import { useTranslation } from 'next-i18next'
import { FC, useCallback } from 'react'

import { sanitizeHTML } from '~/layout/builder/utils'

import { useBuilderContext } from '../context'
import { RichText } from '../views'
import { BlockComponent, BlockPreview, BlockProps } from './Block'

export interface TextProps extends BlockProps {
  block: TextBlock
  newBlockType?: BlockType
}

export const TextPreview: FC<TextProps> = ({ block, ...restProps }) => {
  return (
    <BlockPreview block={block} {...restProps}>
      <div
        className="rich-text"
        placeholder=" "
        dangerouslySetInnerHTML={{ __html: sanitizeHTML(block.html) }}
      />
    </BlockPreview>
  )
}

export const Text: FC<TextProps> = ({
  block,
  placeholder = 'builder.text.placeholder',
  enableMultiple = false,
  enableFormats = ['basic', 'align'],
  enterBehavior = 'newBlock',
  newBlockType,
  children,
  ...restProps
}) => {
  const { t } = useTranslation()
  const { dispatch } = useBuilderContext()

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
    <BlockComponent block={block} {...restProps}>
      <RichText
        blockId={block.id}
        value={block.html}
        placeholder={t(placeholder)}
        multiple={enableMultiple}
        enableFormats={enableFormats}
        enterBehavior={enterBehavior}
        newBlockType={newBlockType}
        onChange={handleChange}
      />
      {children}
    </BlockComponent>
  )
}
