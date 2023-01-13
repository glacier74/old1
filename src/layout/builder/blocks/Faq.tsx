import { Tooltip } from '@heyforms/ui'
import { IconPlus, IconTrash } from '@tabler/icons'
import { useTranslation } from 'next-i18next'
import { FC, useCallback } from 'react'

import { useBuilderContext } from '~/layout/builder/context'
import { blockByType } from '~/layout/builder/utils'

import { BlockComponent, BlockPreview, BlockProps } from './Block'
import { Heading } from './Heading'
import { Text } from './Text'

export interface FaqProps extends BlockProps {
  block: FaqBlock
}

interface FaqItemProps extends ComponentProps {
  paragraphBlock: ParagraphBlock
  deletable?: boolean
  onDelete: (paragraphBlock: ParagraphBlock) => void
}

const FaqItemPreview: FC<Omit<FaqItemProps, 'onDelete'>> = ({ paragraphBlock }) => {
  return (
    <div key={paragraphBlock.id} className="block-faq-item">
      <div className="block-faq-question">
        <h3 className="rich-text" placeholder=" ">
          {paragraphBlock.heading.html}
        </h3>
      </div>

      <div className="block-faq-answer">
        <div
          className="rich-text"
          placeholder=" "
          dangerouslySetInnerHTML={{
            __html: paragraphBlock.description.html
          }}
        />
      </div>
    </div>
  )
}

export const FaqPreview: FC<FaqProps> = ({ block, ...restProps }) => {
  return (
    <BlockPreview block={block} {...restProps}>
      <div className="block-faq-wrapper">
        <div className="block-faq-heading">
          <h3 className="rich-text" placeholder=" ">
            {block.heading.html}
          </h3>
        </div>

        <div className="block-faq-description">
          <div
            className="rich-text"
            placeholder=" "
            dangerouslySetInnerHTML={{
              __html: block.description.html
            }}
          />
        </div>

        <div className="block-faq-content">
          {block.content.content.map(paragraphBlock => (
            <FaqItemPreview key={paragraphBlock.id} paragraphBlock={paragraphBlock} />
          ))}
        </div>
      </div>
    </BlockPreview>
  )
}

const FaqItem: FC<FaqItemProps> = ({ paragraphBlock, deletable, onDelete }) => {
  const { t } = useTranslation()

  function handleDelete() {
    onDelete(paragraphBlock)
  }

  return (
    <div key={paragraphBlock.id} className="block-faq-item">
      {/* Question */}
      <Heading
        className="block-faq-question"
        block={paragraphBlock.heading}
        placeholder={t('builder.faq.question')}
        enableFormats={null}
      />

      {/* Answer */}
      <Text
        className="block-faq-answer"
        block={paragraphBlock.description}
        placeholder={t('builder.faq.answer')}
        enableFormats={['basic']}
        enterBehavior="newBlock"
        newBlockType="paragraph"
      />

      {deletable && (
        <Tooltip ariaLabel={t('builder.faq.deleteItem')}>
          <button className="block-faq-delete-button" onClick={handleDelete}>
            <IconTrash className="w-5 h-5" />
          </button>
        </Tooltip>
      )}
    </div>
  )
}

export const Faq: FC<FaqProps> = ({ block, ...restProps }) => {
  const { t } = useTranslation()
  const { dispatch } = useBuilderContext()

  const handleAddItem = useCallback(() => {
    dispatch({
      type: 'addBlock',
      payload: {
        block: blockByType('paragraph'),
        afterId: block.content.content.at(-1)!.id
      }
    })
  }, [block.content.content])

  function handleDeleteItem(paragraphBlock: ParagraphBlock) {
    dispatch({
      type: 'deleteBlock',
      payload: {
        blockId: paragraphBlock.id
      }
    })
  }

  return (
    <BlockComponent block={block} {...restProps}>
      <div className="block-faq-wrapper">
        {/* Heading */}
        <Heading
          className="block-faq-heading"
          block={block.heading}
          placeholder={t('builder.faq.heading')}
          enableFormats={null}
        />

        {/* Description */}
        <div className="block-faq-description">
          <Text
            block={block.description}
            placeholder={t('builder.faq.description')}
            enableFormats={['basic']}
          />
        </div>

        <div className="block-faq-content">
          {block.content.content.map(paragraphBlock => (
            <FaqItem
              key={paragraphBlock.id}
              paragraphBlock={paragraphBlock}
              deletable={block.content.content.length > 1}
              onDelete={handleDeleteItem}
            />
          ))}

          <div className="block-faq-item">
            <div className="py-2 h-full">
              <button type="button" className="block-faq-add-button" onClick={handleAddItem}>
                <IconPlus className="block-text-placeholder" />
                <span className="mt-2 block text-sm font-medium block-text-placeholder">
                  {t('builder.faq.addItem')}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </BlockComponent>
  )
}
