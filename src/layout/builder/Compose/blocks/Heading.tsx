import { useTranslation } from 'next-i18next'
import { FC, useCallback } from 'react'

import { useComposeStore } from '../store'
import { RichText } from '../views'
import { BlockComponent, BlockPreview, BlockProps } from './Block'

export interface HeadingProps extends BlockProps {
  block: HeadingBlock
}

export const HeadingPreview: FC<HeadingProps> = ({ block, ...restProps }) => {
  const CustomTag = `h${block.level}` as any

  return (
    <BlockPreview block={block} {...restProps}>
      <CustomTag className="rich-text" placeholder=" ">
        {block.html}
      </CustomTag>
    </BlockPreview>
  )
}

export const Heading: FC<HeadingProps> = ({
  block,
  placeholder,
  enableAction = true,
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
        as={`h${block.level}`}
        value={block.html}
        placeholder={t(placeholder!)}
        enableCommand={false}
        enableTextFormat={false}
        enterBehavior="focusBlock"
        onChange={handleChange}
      />
      {children}
    </BlockComponent>
  )
}
