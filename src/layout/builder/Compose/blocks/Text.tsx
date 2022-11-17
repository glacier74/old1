import { useTranslation } from 'next-i18next'
import { FC, useCallback } from 'react'

import { useComposeStore } from '../store'
import { RichText } from '../views'
import { Block, BlockProps } from './Block'

interface TextProps extends BlockProps {
  block: TextBlock
}

export const Text: FC<TextProps> = ({
  block,
  placeholder = 'builder.text.placeholder',
  enableCommand,
  enableTextFormat,
  enterBehavior = 'createBlock',
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
    <Block block={block} {...restProps}>
      <RichText
        blockId={block.id}
        value={block.html}
        placeholder={t(block.placeholder || placeholder)}
        enableCommand={enableCommand}
        enableTextFormat={enableTextFormat}
        enterBehavior={block.enterBehavior || enterBehavior}
        onChange={handleChange}
      />
      {children}
    </Block>
  )
}
