import { Button, Tooltip } from '@heyforms/ui'
import { isNil } from '@nily/utils'
import {
  IconCircleChevronLeft,
  IconCircleChevronRight,
  IconPhotoEdit,
  IconTrash,
  IconZoomIn
} from '@tabler/icons'
import { useTranslation } from 'next-i18next'
import { FC, MutableRefObject, useCallback, useEffect, useMemo, useRef, useState } from 'react'

import { ImagePickerButton, PhotoPicker, SlideModal } from '~/components'
import { cropImage, useVisible } from '~/utils'

import { useBuilderContext } from '../context'
import { BlockComponent, BlockPreview, BlockProps } from './Block'

export interface SlideGalleryProps extends BlockProps {
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
        src={cropImage(source.source, IMAGE_WIDTH, IMAGE_HEIGHT)}
        className="w-full max-h-full object-cover"
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

export const SlideGalleryPreview: FC<SlideGalleryProps> = ({ block, ...restProps }) => {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const wrapperRef = useRef<HTMLDivElement | null>(null)

  const {
    isPreviousEnable,
    isNextEnable,
    index,
    slideVisible,
    openSlide,
    closeSlide,
    style,
    scrollLeft,
    scrollPrevious,
    scrollNext
  } = useSlideGallery(containerRef, block.sources, true)

  return (
    <>
      <BlockPreview block={block} {...restProps}>
        <div ref={containerRef} tabIndex={0} className="group relative">
          <div className="hidden md:flex block-slidegallery-button absolute flex items-center justify-center top-0 -left-16 w-16 pl-6 h-full z-10 opacity-0 group-hover:opacity-100">
            <Tooltip ariaLabel="Scroll to previous" disabled={!isPreviousEnable}>
              <Button.Link
                className="block-slide-gallery-button"
                disabled={!isPreviousEnable}
                leading={<IconCircleChevronLeft />}
                onClick={scrollPrevious}
              />
            </Tooltip>
          </div>

          <div className="max-w-full overflow-x-scroll md:overflow-x-hidden">
            <div
              ref={wrapperRef}
              className="block-slide-gallery-wrapper"
              style={{
                ...style,
                transform: `translate3d(-${scrollLeft}px, 0, 0)`
              }}
            >
              {block.sources.map((source, index) => (
                <div
                  key={index}
                  className="block-slide-gallery-item relative cursor-zoom-in"
                  onClick={() => openSlide(index)}
                >
                  <img
                    src={cropImage(source.source, IMAGE_WIDTH, IMAGE_HEIGHT)}
                    className="w-full max-h-full object-cover"
                    alt={source.caption}
                    width={IMAGE_WIDTH}
                    height={IMAGE_HEIGHT}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="hidden md:flex block-slidegallery-button absolute items-center justify-center top-0 -right-16 w-16 pr-6 h-full z-10 opacity-0 group-hover:opacity-100">
            <Tooltip ariaLabel="Scroll to next" disabled={!isNextEnable}>
              <Button.Link
                className="block-slide-gallery-button"
                disabled={!isNextEnable}
                leading={<IconCircleChevronRight />}
                onClick={scrollNext}
              />
            </Tooltip>
          </div>
        </div>
      </BlockPreview>

      {/* Slide modal */}
      {slideVisible && (
        <SlideModal sources={block.sources} defaultIndex={index!} onClose={closeSlide} />
      )}
    </>
  )
}

function useSlideGallery(
  containerRef: MutableRefObject<HTMLDivElement | null>,
  sources: SlideGallerySource[],
  isPreview = false
) {
  const [scrollLeft, setScrollLeft] = useState(0)
  const [index, setIndex] = useState<number | null>(null)
  const [slideVisible, open, closeSlide] = useVisible()
  const [containerWidth, setContainerWidth] = useState(0)

  // 服务端渲染和客户端渲染 ref 的判断不一致
  // 服务端使用 ref，客户端使用 ref.current
  useEffect(() => {
    if (containerRef?.current) {
      setContainerWidth(containerRef.current.getBoundingClientRect().width)
    }
  }, [containerRef, containerRef.current])

  const style = useMemo(() => {
    let length = sources.length

    if (isPreview) {
      length -= 1
    }

    return {
      width: length * IMAGE_PADDING + (length + 1) * IMAGE_WIDTH
    }
  }, [isPreview, sources.length])

  const isPreviousEnable = useMemo(() => scrollLeft > 0, [scrollLeft])
  const isNextEnable = useMemo(
    () => containerWidth > 0 && scrollLeft + containerWidth < style.width,
    [scrollLeft, containerWidth, style.width]
  )

  const scrollPrevious = useCallback(() => {
    return setScrollLeft(Math.max(0, scrollLeft - IMAGE_WIDTH - IMAGE_PADDING))
  }, [scrollLeft])

  const scrollNext = useCallback(() => {
    setScrollLeft(Math.min(style.width - containerWidth, scrollLeft + IMAGE_WIDTH + IMAGE_PADDING))
  }, [scrollLeft, containerWidth, style.width])

  function openSlide(index: number) {
    setIndex(index)
    open()
  }

  return {
    isPreviousEnable,
    isNextEnable,
    index,
    setIndex,
    containerWidth,
    slideVisible,
    openSlide,
    closeSlide,
    style,
    scrollLeft,
    scrollPrevious,
    scrollNext
  }
}

const SlideGalleryComponent: FC<SlideGalleryProps> = ({ block, ...restProps }) => {
  const { t } = useTranslation()
  const { dispatch } = useBuilderContext()

  const [pickerVisible, openPicker, closePicker] = useVisible()
  const containerRef = useRef<HTMLDivElement | null>(null)
  const wrapperRef = useRef<HTMLDivElement | null>(null)

  const {
    isPreviousEnable,
    isNextEnable,
    index,
    setIndex,
    slideVisible,
    openSlide,
    closeSlide,
    style,
    scrollLeft,
    scrollPrevious,
    scrollNext
  } = useSlideGallery(containerRef, block.sources)

  function handleSelect(index: number) {
    setIndex(index)
    openPicker()
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
    (source: any) => {
      let sources = block.sources

      if (isNil(index)) {
        sources = [
          ...sources,
          {
            type: 'image',
            source
          }
        ]
      } else {
        sources = sources.map((s, idx) => (idx === index ? { ...s, source } : s))
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
      <BlockComponent block={block} {...restProps}>
        <div className="py-12">
          <div ref={containerRef} tabIndex={0} className="group relative">
            <div className="absolute flex items-center justify-center top-0 -left-16 w-16 pl-6 h-full z-10 opacity-0 group-hover:opacity-100">
              <Tooltip ariaLabel="Scroll to previous" disabled={!isPreviousEnable}>
                <Button.Link
                  className="block-slide-gallery-button"
                  disabled={!isPreviousEnable}
                  leading={<IconCircleChevronLeft />}
                  onClick={scrollPrevious}
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
                    onPreview={openSlide}
                    onDelete={handleDelete}
                  />
                ))}

                <ImagePickerButton
                  className="block-upload"
                  tip1={t('builder.slideGallery.uploadTip1')}
                  tip2={t('builder.slideGallery.uploadTip2')}
                  onClick={openPicker}
                />
              </div>
            </div>

            <div className="absolute flex items-center justify-center top-0 -right-16 w-16 pr-6 h-full z-10 opacity-0 group-hover:opacity-100">
              <Tooltip ariaLabel="Scroll to next" disabled={!isNextEnable}>
                <Button.Link
                  className="block-slide-gallery-button"
                  disabled={!isNextEnable}
                  leading={<IconCircleChevronRight />}
                  onClick={scrollNext}
                />
              </Tooltip>
            </div>
          </div>
        </div>
      </BlockComponent>

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
