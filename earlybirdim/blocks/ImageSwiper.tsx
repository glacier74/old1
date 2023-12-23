import { IconChevronLeft, IconChevronRight, IconX } from '@tabler/icons'
import { HTMLElement } from '@tiptap/core'
import clsx from 'clsx'
import Image from 'next/image'
import { FC, useEffect, useMemo, useRef, useState } from 'react'
import { useFrame } from 'react-frame-component'
import Swiper from 'swiper'
import 'swiper/swiper.css'

import { Portal } from './Portal'

interface PaginationDotProps {
  index: number
  isActive?: boolean
  onClick: (index: number) => void
}

const PaginationDot: FC<PaginationDotProps> = ({ index, isActive, onClick }) => {
  function handleClick() {
    if (!isActive) {
      onClick(index)
    }
  }

  return (
    <div
      className={clsx('image_swiper__pagination-dot', {
        'image_swiper__pagination-active': isActive
      })}
      onClick={handleClick}
    />
  )
}

export interface ImageSwiperProps {
  selector: string
}

export const ImageSwiper: FC<ImageSwiperProps> = ({ selector }) => {
  const { document: frameDocument } = useFrame()

  const [images, setImages] = useState<string[]>([])
  const [activeIndex, setActiveIndex] = useState(0)
  const [visible, setVisible] = useState(false)

  const swiper = useRef<Swiper | null>(null)
  const paginations = useMemo(() => Array.from({ length: images.length }), [images.length])

  function handleSlidePrev() {
    swiper.current?.slidePrev()
  }

  function handleSlideNext() {
    swiper.current?.slideNext()
  }

  function handleSlideTo(index: number) {
    swiper.current?.slideTo(index)
  }

  function handleClose() {
    setVisible(false)
  }

  function destroy() {
    if (swiper.current) {
      swiper.current?.destroy()
      swiper.current = null
    }
  }

  useEffect(() => {
    const elements = Array.from(
      (frameDocument || document).querySelectorAll(selector)
    ) as HTMLElement[]

    setImages(elements.map(el => (el as any).getAttribute('data-src') as string))

    elements.forEach((el, index) => {
      ;(el as any).parentNode.onclick = () => {
        setVisible(true)
        setActiveIndex(index)
      }
    })

    return () => {
      destroy()
    }
  }, [])

  useEffect(() => {
    if (visible) {
      swiper.current = new Swiper('.image_swiper__root .swiper', {
        slidesPerView: 1,
        initialSlide: activeIndex,
        spaceBetween: 60,
        keyboard: {
          enabled: true
        },
        on: {
          slideChange(swiper) {
            setActiveIndex(swiper.activeIndex)
          }
        }
      })
    } else {
      destroy()
    }
  }, [visible])

  return (
    <Portal visible={visible}>
      <div className="image_swiper__root">
        <div className="swiper">
          <div className="swiper-wrapper">
            {images.map((src, index) => (
              <div key={index} className="swiper-slide">
                <Image src={src} alt="" loading="lazy" width={9999} />
              </div>
            ))}
          </div>
        </div>
        {activeIndex > 0 && (
          <button type="button" className="image_swiper__prev" onClick={handleSlidePrev}>
            <IconChevronLeft />
          </button>
        )}
        {activeIndex < images.length - 1 && (
          <button type="button" className="image_swiper__next" onClick={handleSlideNext}>
            <IconChevronRight />
          </button>
        )}

        <div className="image_swiper__pagination">
          {paginations.length > 1 &&
            paginations.map((_, index) => (
              <PaginationDot
                key={index}
                index={index}
                isActive={index === activeIndex}
                onClick={handleSlideTo}
              />
            ))}
        </div>
        <button type="button" className="image_swiper__close" onClick={handleClose}>
          <IconX />
        </button>
      </div>
    </Portal>
  )
}
