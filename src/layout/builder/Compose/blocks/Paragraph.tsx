import { FC, useCallback } from 'react'

import { useComposeStore } from '../store'
import { RichText } from '../views'
import { Block, BlockProps } from './Block'

interface ParagraphProps extends BlockProps {
  block: ParagraphBlock
}

export const Paragraph: FC<ParagraphProps> = ({
  block,
  placeholder,
  enableCommand,
  enableTextFormat,
  enterBehavior,
  children,
  ...restProps
}) => {
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
        placeholder={placeholder || block.placeholder}
        enableCommand={enableCommand}
        enableTextFormat={enableTextFormat}
        enterBehavior={enterBehavior}
        onChange={handleChange}
      />
      {children}
    </Block>
  )
}
