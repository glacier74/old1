import { FC, useCallback } from 'react'

import { sanitizeHTML } from '~/layout/builder/utils'

import { useBuilderContext } from '../context'
import { RichText } from '../views'
import { BlockComponent, BlockPreview, BlockProps } from './Block'

export interface HeadingProps extends BlockProps {
  block: HeadingBlock
}

export const HeadingPreview: FC<HeadingProps> = ({ block, ...restProps }) => {
  const CustomTag = `h${block.level}` as any

  return (
    <BlockPreview block={block} {...restProps}>
      <CustomTag
        className="rich-text"
        placeholder=" "
        dangerouslySetInnerHTML={{ __html: sanitizeHTML(block.html) }}
      />
    </BlockPreview>
  )
}

export const Heading: FC<HeadingProps> = ({
  block,
  placeholder,
  enableFormats = ['align'],
  children,
  ...restProps
}) => {
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
        as={`h${block.level || 3}`}
        value={block.html}
        placeholder={placeholder}
        enableFormats={enableFormats}
        enterBehavior="focusBlock"
        onChange={handleChange}
      />
      {children}
    </BlockComponent>
  )
}
