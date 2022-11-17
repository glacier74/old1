import { Button, Form, Input, Tooltip } from '@heyforms/ui'
import clsx from 'clsx'
import { useTranslation } from 'next-i18next'
import { FC, ReactNode, useCallback, useMemo, useRef, useState } from 'react'

import { IconChevronLeftCircle, IconChevronRightCircle, SlideModal } from '~/components'
import { StripeService } from '~/service'
import { cropImage, currencyFormatter, useVisible } from '~/utils'

const Block: FC<{ block: Block; children: ReactNode }> = ({ block, children }) => (
  <div className={clsx('block', `block-${block.type}`)} data-block-id={block.id}>
    {children}
  </div>
)

const Group: FC<{ block: GroupBlock }> = ({ block }) => (
  <Block block={block}>
    {block.blocks.map(child => (
      <BlockWrapper key={child.id} block={child} />
    ))}
  </Block>
)

const IMAGE_WIDTH = 368
const IMAGE_HEIGHT = 220
const IMAGE_PADDING = 8

const SlideGalleryItem: FC<{
  source: SlideGallerySource
  index: number
  onClick: (index: number) => void
}> = ({ source, index, onClick }) => {
  function handleClick() {
    onClick(index)
  }

  return (
    <div style={{ width: IMAGE_WIDTH, height: IMAGE_HEIGHT }} onClick={handleClick}>
      <img
        src={cropImage(source.url, IMAGE_WIDTH, IMAGE_HEIGHT)}
        className="object-cover cursor-zoom-in"
        alt={source.caption}
      />
    </div>
  )
}

const SlideGallery: FC<{ block: SlideGalleryBlock }> = ({ block }) => {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const wrapperRef = useRef<HTMLDivElement | null>(null)
  const [index, setIndex] = useState<number | null>(null)
  const [scrollLeft, setScrollLeft] = useState(0)
  const [visible, open, close] = useVisible()

  const containerWidth = useMemo(() => {
    return containerRef.current?.getBoundingClientRect().width || 0
  }, [containerRef.current])

  const style = useMemo(() => {
    const length = block.sources.length

    return {
      width: (length - 1) * IMAGE_PADDING + length * IMAGE_WIDTH
    }
  }, [block.sources.length])

  const isPreviousEnable = useMemo(() => scrollLeft > 0, [scrollLeft])
  const isNextEnable = useMemo(
    () => containerWidth > 0 && scrollLeft + containerWidth < style.width,
    [scrollLeft, containerWidth, style.width]
  )

  const handleScrollPrevious = useCallback(() => {
    return setScrollLeft(Math.max(0, scrollLeft - IMAGE_WIDTH - IMAGE_PADDING))
  }, [scrollLeft])

  const handleScrollNext = useCallback(() => {
    setScrollLeft(Math.min(style.width - containerWidth, scrollLeft + IMAGE_WIDTH + IMAGE_PADDING))
  }, [scrollLeft, containerWidth, style.width])

  function handlePreview(index: number) {
    setIndex(index)
    open()
  }

  return (
    <Block block={block}>
      <div ref={containerRef} tabIndex={0} className="group relative">
        <div className="absolute flex items-center justify-center top-0 -left-16 w-16 pl-6 h-full z-10 opacity-0 group-hover:opacity-100">
          <Tooltip ariaLabel="Scroll to previous" disabled={!isPreviousEnable}>
            <Button.Link
              className="block-slide-gallery-button"
              disabled={!isPreviousEnable}
              leading={<IconChevronLeftCircle />}
              onClick={handleScrollPrevious}
            />
          </Tooltip>
        </div>

        <div className="max-w-full overflow-x-hidden">
          <div
            ref={wrapperRef}
            className="block-slide-gallery-wrapper"
            style={{
              ...style,
              transform: `translate3d(-${scrollLeft}px, 0, 0)`
            }}
          >
            {block.sources.map((source, index: number) => (
              <SlideGalleryItem key={index} index={index} source={source} onClick={handlePreview} />
            ))}
          </div>
        </div>

        <div className="absolute flex items-center justify-center top-0 -right-16 w-16 pr-6 h-full z-10 opacity-0 group-hover:opacity-100">
          <Tooltip ariaLabel="Scroll to next" disabled={!isNextEnable}>
            <Button.Link
              className="block-slide-gallery-button"
              disabled={!isNextEnable}
              leading={<IconChevronRightCircle />}
              onClick={handleScrollNext}
            />
          </Tooltip>
        </div>
      </div>

      {/* Slide modal */}
      {visible && <SlideModal sources={block.sources} defaultIndex={index!} onClose={close} />}
    </Block>
  )
}

const Payment: FC<{ productId: number; block: PaymentBlock }> = ({ productId, block }) => {
  const { t } = useTranslation()

  async function handleFinish(values: AnyMap<string>) {
    const result = await StripeService.checkout({
      productId,
      blockId: block.id,
      productUrl: window.location.href,
      email: values.email
    })

    window.location.href = result.sessionUrl
  }

  return (
    <Block block={block}>
      <div className="flex items-start justify-between">
        <div className="w-96">
          {block.blocks.map(child => (
            <BlockWrapper key={child.id} block={child} />
          ))}
        </div>
        <div className="w-96 rounded-lg bg-white overflow-hidden text-sm shadow">
          {block.priceId && (
            <div className="p-6 cursor-default">
              <div className="text-lg font-medium text-slate-900">{block.productName}</div>
              <p className="mt-1 text-sm text-slate-600 line-clamp-2">{block.productDescription}</p>
              <div className="mt-4 text-base font-semibold text-slate-800">
                {currencyFormatter(block.currency, block.amount)}
              </div>

              <Form.Custom
                submitText={t('publicSite.buyNow')}
                submitOptions={{
                  type: 'primary',
                  block: true
                }}
                request={handleFinish}
              >
                <Form.Item
                  name="email"
                  rules={[{ required: true, type: 'email', message: t('publicSite.invalidEmail') }]}
                >
                  <Input placeholder={t('publicSite.email')} />
                </Form.Item>
              </Form.Custom>
            </div>
          )}
        </div>
      </div>
    </Block>
  )
}

const Feature: FC<{ block: FeatureBlock }> = ({ block }) => {
  return (
    <Block block={block}>
      <div
        className={clsx('flex flex-start justify-between', {
          'flex-row-reverse': block.align === 'right'
        })}
      >
        {block.blocks.map(child => (
          <BlockWrapper key={child.id} block={child} />
        ))}
      </div>
    </Block>
  )
}

const List: FC<{ block: ListBlock }> = ({ block }) => {
  return (
    <Block block={block}>
      {block.blocks.map(child => (
        <BlockWrapper key={child.id} block={child} />
      ))}
    </Block>
  )
}

const Heading: FC<{ block: HeadingBlock }> = ({ block }) => {
  const CustomTag = `h${block.level}` as any

  return (
    <Block block={block}>
      <CustomTag className="rich-text" placeholder="&nbsp;">
        {block.html}
      </CustomTag>
    </Block>
  )
}

const Image: FC<{ block: ImageBlock }> = ({ block }) => {
  return (
    <Block block={block}>
      <img
        src={cropImage(block.source, block.width, block.height)}
        width={block.width}
        height={block.height}
        alt={block.caption}
      />
    </Block>
  )
}

const Paragraph: FC<{ block: ParagraphBlock }> = ({ block }) => {
  return (
    <Block block={block}>
      <div
        className="rich-text"
        placeholder="&nbsp;"
        dangerouslySetInnerHTML={{ __html: block.html }}
      />
    </Block>
  )
}

const BlockWrapper: FC<{ productId?: number; block: any }> = ({ productId, block }) => {
  switch (block.type) {
    case 'group':
      return <Group key={block.id} block={block} />

    case 'slideGallery':
      return <SlideGallery key={block.id} block={block} />

    case 'payment':
      return <Payment key={block.id} productId={productId!} block={block} />

    case 'feature':
      return <Feature key={block.id} block={block} />

    case 'list':
      return <List key={block.id} block={block} />

    case 'heading':
      return <Heading key={block.id} block={block} />

    case 'image':
      return <Image key={block.id} block={block} />

    default:
      return <Paragraph key={block.id} block={block} />
  }
}

export const PublicBlocks: FC<{ productId: number; blocks: Block[] }> = ({
  productId,
  blocks = []
}) => (
  <div className="blocks">
    {blocks.map(block => (
      <BlockWrapper key={block.id} productId={productId} block={block} />
    ))}
  </div>
)
