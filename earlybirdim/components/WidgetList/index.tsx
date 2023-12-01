import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors
} from '@dnd-kit/core'
import { UniqueIdentifier } from '@dnd-kit/core/dist/types/other'
import { SortableContext, arrayMove, sortableKeyboardCoordinates } from '@dnd-kit/sortable'
import { ImageSwiper } from '@earlybirdim/blocks'
import { useGlobalContext } from '@earlybirdim/components'
import { CSSProperties, FC, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Flipper } from 'react-flip-toolkit'
import { useFrame } from 'react-frame-component'

import { useBuilderContext } from '~/layout/builder3/context'

import WidgetItem, { WidgetActiveItem } from './WidgetItem'
import { WidgetGridProps } from './WidgetProps'
import { widgetListPath } from './constants'

export const WidgetList: FC<WidgetGridProps> = ({
  itemSize: rawItemSize = 180,
  gapSize: rawGapSize = 32,
  list = [],
  style,
  ...restProps
}) => {
  const { dispatch } = useBuilderContext()
  const { isPreview } = useGlobalContext()
  const { window: frameWindow } = useFrame()

  const gridRef = useRef<HTMLDivElement>(null)

  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null)
  const [itemSize, setItemSize] = useState(rawItemSize / 2)

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(TouchSensor, {
      activationConstraint: {
        distance: 15
      }
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates
    })
  )

  const flipKey = useMemo(() => list.map(a => [a.id, a.size].join('')).join(''), [list])

  function handleLayout() {
    if (!gridRef.current) {
      return
    }

    const win = frameWindow || window
    const cache = win.localStorage.getItem('item_size')

    if (cache) {
      setItemSize(Number(cache))
    }

    const innerWidth = win.innerWidth
    const rect = gridRef.current.getBoundingClientRect()

    const width = Math.min(rect.width, innerWidth)
    const colNum = Math.round((width + rawGapSize) / (rawItemSize + rawGapSize))
    let itemSize = (width - (2 * colNum - 1) * rawGapSize) / (2 * colNum)

    if (width < itemSize * 4 + rawGapSize * 3) {
      itemSize = (width - rawGapSize * 3) / 4
    }

    setItemSize(itemSize)
    win.localStorage.setItem('item_size', String(itemSize))
  }

  function handleDragStart({ active }: DragEndEvent) {
    console.log('handleDragStart true', activeId)
    setActiveId(active.id)
  }

  const handleDragOver = useCallback(
    ({ active, over }: DragEndEvent) => {
      if (!active.id || !over?.id || active.id === over.id) {
        return
      }

      const activeIndex = list.findIndex(w => w.id === active.id)
      const overIndex = list.findIndex(w => w.id === over?.id)

      dispatch({
        type: 'updateOptions',
        payload: {
          options: {
            [widgetListPath]: arrayMove(list, activeIndex, overIndex)
          }
        }
      })
    },
    [list]
  )

  function handleDragEnd() {
    console.log('handleDragEnd false', activeId)
    setActiveId(null)
  }

  useEffect(() => {
    if (gridRef.current) {
      handleLayout()
    }
  }, [gridRef.current])

  useEffect(() => {
    const win = frameWindow || window

    win.addEventListener('resize', handleLayout)

    return () => {
      win.removeEventListener('resize', handleLayout)
    }
  }, [])

  return (
    <div
      ref={gridRef}
      style={
        {
          ...style,
          '--widget-size': itemSize + 'px',
          '--widget-gap-size': rawGapSize + 'px',
          '--widget-small-size': itemSize + 'px',
          '--widget-medium-size': 2 * itemSize + rawGapSize + 'px',
          '--widget-large-size': 4 * itemSize + 3 * rawGapSize + 'px'
        } as CSSProperties
      }
      {...restProps}
    >
      <style
        dangerouslySetInnerHTML={{
          __html: `
            .mapboxgl-canvas-container {
              position: relative;
            }

            .mapboxgl-control-container {
              display: none
            }

            @property --widget-rotating {
              syntax: '<angle>';
              inherits: false;
              initial-value: 0deg;
            }

            @keyframes widget-rotating {
              0% {
                --widget-rotating: 0deg;
              }
              100% {
                --widget-rotating: 360deg;
              }
            }
          `
        }}
      />

      {isPreview ? (
        <DndContext
          sensors={sensors}
          autoScroll={true}
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDragEnd={handleDragEnd}
        >
          <SortableContext items={list} strategy={() => null}>
            <Flipper
              className="widget-grid grid grid-cols-[repeat(auto-fill,var(--widget-size))] grid-rows-[repeat(auto-fill,var(--widget-size),min-content)] justify-center gap-[var(--widget-gap-size)] pb-12 -mb-12 overflow-x-hidden"
              flipKey={flipKey}
              staggerConfig={{
                default: {
                  speed: 0.1
                }
              }}
            >
              {list.map(row => (
                <WidgetItem key={row.id} activeId={activeId} {...row} />
              ))}
            </Flipper>
          </SortableContext>

          <DragOverlay>
            <WidgetActiveItem activeId={activeId} list={list} isDragOverlay={true} />
          </DragOverlay>
        </DndContext>
      ) : (
        <div
          id="widget-grid"
          className="widget-grid grid grid-cols-[repeat(auto-fill,var(--widget-size))] grid-rows-[repeat(auto-fill,var(--widget-size),min-content)] justify-center gap-[var(--widget-gap-size)]"
        >
          {list.map(row => (
            <WidgetItem key={row.id} activeId={activeId} {...row} />
          ))}

          <ImageSwiper selector=".widget-image:not(.widget-image-link) img" />
        </div>
      )}
    </div>
  )
}
