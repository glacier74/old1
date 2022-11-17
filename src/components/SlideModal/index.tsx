import { Portal, stopPropagation } from '@heyforms/ui'
import { FC, MouseEvent, useCallback, useMemo, useState } from 'react'

import { IconArrowLeft, IconArrowRight } from '~/components'
import { cropImage } from '~/utils'

import { SlideIndicator } from './SlideIndicator'

interface SlideModalProps extends IModalProps {
  sources: SlideGallerySource[]
  defaultIndex?: number
  onChange?: (index: number) => void
}

const IMAGE_COMMEND_WIDTH = 1100
const IMAGE_COMMEND_HEIGHT = 480

export const SlideModal: FC<SlideModalProps> = ({
  visible = true,
  sources,
  defaultIndex = 0,
  onClose,
  onChange
}) => {
  const [active, setActive] = useState(defaultIndex)
  const source = useMemo(() => sources[active], [sources, active])

  function handleChange(index: number) {
    setActive(index)
    onChange?.(index)
  }

  const handlePrevious = useCallback(
    (event: MouseEvent) => {
      stopPropagation(event)
      setActive(Math.max(0, active - 1))
    },
    [active]
  )

  const handleNext = useCallback(
    (event: MouseEvent) => {
      stopPropagation(event)
      setActive(Math.min(sources.length - 1, active + 1))
    },
    [sources.length, active]
  )

  return (
    <Portal visible={visible}>
      <div className="slide-modal" onClick={onClose}>
        <div className="slide-container">
          {active > 0 && (
            <button
              className="slide-button-previous"
              aria-label="Previous Slide"
              onClick={handlePrevious}
            >
              <IconArrowLeft />
            </button>
          )}

          <div className="slide-image">
            <div onClick={stopPropagation}>
              <img
                key={cropImage(source?.url, IMAGE_COMMEND_WIDTH, IMAGE_COMMEND_HEIGHT)}
                src={source?.url}
                loading="eager"
              />
            </div>
          </div>

          {active < sources.length - 1 && (
            <button className="slide-button-next" aria-label="Next Slide" onClick={handleNext}>
              <IconArrowRight />
            </button>
          )}

          {sources.length > 1 && (
            <SlideIndicator active={active} length={sources.length} onChange={handleChange} />
          )}
        </div>
      </div>
    </Portal>
  )
}
