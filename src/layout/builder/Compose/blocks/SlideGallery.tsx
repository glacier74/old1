import { Button, Tooltip } from '@heyforms/ui'
import { isNil } from '@nily/utils'
import { IconPhotoEdit, IconTrash, IconZoomIn } from '@tabler/icons'
import { useTranslation } from 'next-i18next'
import { FC, useCallback, useMemo, useRef, useState } from 'react'

import {
  IconChevronLeftCircle,
  IconChevronRightCircle,
  PhotoPicker,
  SlideModal
} from '~/components'
import { cropImage, useVisible } from '~/utils'

import { useComposeStore } from '../store'
import { Upload } from '../views'
import { Block, BlockProps } from './Block'

interface SlideGalleryProps extends BlockProps {
  block: SlideGalleryBlock
}

interface SlideGalleryItemProps {
  source: SlideGallerySource
  index: number
  onSelect: (index: number) => void
  onPreview: (index: number) => void
  onDelete: (index: number) => void
}

const IMAGE_WIDTH = 368
const IMAGE_HEIGHT = 220
const IMAGE_PADDING = 8

const SlideGalleryItem: FC<SlideGalleryItemProps> = ({
  source,
  index,
  onSelect,
  onPreview,
  onDelete
}) => {
  function handleSelect() {
    onSelect(index)
  }

  function handlePreview() {
    onPreview(index)
  }

  function handleDelete() {
    onDelete(index)
  }

  return (
    <div className="block-slide-gallery-item relative group/item block">
      <img
        src={cropImage(source.url, IMAGE_WIDTH, IMAGE_HEIGHT)}
        className="object-cover"
        alt={source.caption}
      />

      <div className="block-image-toolbar space-x-1.5">
        <Tooltip ariaLabel="Preview">
          <Button leading={<IconZoomIn />} onClick={handlePreview} />
        </Tooltip>
        <Tooltip ariaLabel="Change">
          <Button leading={<IconPhotoEdit />} onClick={handleSelect} />
        </Tooltip>
        <Tooltip ariaLabel="Delete">
          <Button leading={<IconTrash />} onClick={handleDelete} />
        </Tooltip>
        {/* TODO - reorder images */}
        {/*<Tooltip ariaLabel="Reorder">*/}
        {/*  <Button leading={<IconGripVertical />} />*/}
        {/*</Tooltip>*/}
      </div>
    </div>
  )
}

const SlideGalleryComponent: FC<SlideGalleryProps> = ({ block, ...restProps }) => {
  const { t } = useTranslation()
  const { dispatch } = useComposeStore()

  const [pickerVisible, openPicker, closePicker] = useVisible()
  const [slideVisible, openSlide, closeSlide] = useVisible()

  const containerRef = useRef<HTMLDivElement | null>(null)
  const wrapperRef = useRef<HTMLDivElement | null>(null)
  const [index, setIndex] = useState<number | null>(null)
  const [scrollLeft, setScrollLeft] = useState(0)

  const containerWidth = useMemo(() => {
    return containerRef.current?.getBoundingClientRect().width || 0
  }, [containerRef.current])

  const style = useMemo(() => {
    const length = block.sources.length

    return {
      width: length * IMAGE_PADDING + (length + 1) * IMAGE_WIDTH
    }
  }, [block.sources.length])

  const isPreviousEnable = useMemo(() => scrollLeft > 0, [scrollLeft])
  const isNextEnable = useMemo(
    () => containerWidth > 0 && scrollLeft + containerWidth < style.width,
    [scrollLeft, containerWidth, style.width]
  )

  function handleSelect(index: number) {
    setIndex(index)
    openPicker()
  }

  const handleScrollPrevious = useCallback(() => {
    return setScrollLeft(Math.max(0, scrollLeft - IMAGE_WIDTH - IMAGE_PADDING))
  }, [scrollLeft])

  const handleScrollNext = useCallback(() => {
    setScrollLeft(Math.min(style.width - containerWidth, scrollLeft + IMAGE_WIDTH + IMAGE_PADDING))
  }, [scrollLeft, containerWidth, style.width])

  function handlePreview(index: number) {
    setIndex(index)
    openSlide()
  }

  const handleDelete = useCallback(
    (index: number) => {
      const { sources } = block

      dispatch({
        type: 'updateBlock',
        payload: {
          blockId: block.id,
          updates: {
            sources: sources.filter((_, idx) => idx !== index)
          }
        }
      })
    },
    [block.sources]
  )

  const handleChange = useCallback(
    (url: any) => {
      let sources = block.sources

      if (isNil(index)) {
        sources = [
          ...sources,
          {
            type: 'image',
            url
          }
        ]
      } else {
        sources = sources.map((s, idx) => (idx === index ? { ...s, url } : s))
      }

      dispatch({
        type: 'updateBlock',
        payload: {
          blockId: block.id,
          updates: {
            sources
          }
        }
      })

      setIndex(null)
    },
    [block.sources, index]
  )

  return (
    <>
      <Block block={block} {...restProps}>
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
                <SlideGalleryItem
                  key={index}
                  index={index}
                  source={source}
                  onSelect={handleSelect}
                  onPreview={handlePreview}
                  onDelete={handleDelete}
                />
              ))}

              <Upload
                description1={t('builder.slideGallery.uploadTip1')}
                description2={t('builder.slideGallery.uploadTip2')}
                onClick={openPicker}
              />
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
      </Block>

      {/* Photo picker modal */}
      <PhotoPicker
        visible={pickerVisible}
        enableUnsplash={false}
        onClose={closePicker}
        onChange={handleChange}
      />

      {/* Slide modal */}
      {slideVisible && (
        <SlideModal sources={block.sources} defaultIndex={index!} onClose={closeSlide} />
      )}
    </>
  )
}
export const SlideGallery = SlideGalleryComponent
