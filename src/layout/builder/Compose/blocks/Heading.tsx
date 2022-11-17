import { FC, useCallback } from 'react'

import { useComposeStore } from '../store'
import { RichText } from '../views'
import { Block, BlockProps } from './Block'

interface HeadingProps extends BlockProps {
  block: HeadingBlock
}

export const Heading: FC<HeadingProps> = ({ block, placeholder, children, ...restProps }) => {
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
        as={`h${block.level}`}
        value={block.html}
        placeholder={block.placeholder || placeholder}
        enableCommand={false}
        enableTextFormat={false}
        enterBehavior="focusNextBlock"
        onChange={handleChange}
      />
      {children}
    </Block>
  )
}
