import { isArray } from '@nily/utils'
import { CSSProperties, FC, useEffect, useMemo, useRef, useState } from 'react'
import { useFrame } from 'react-frame-component'

import WidgetItem from './WidgetItem'
import { WidgetGridData, WidgetGridProps } from './WidgetProps'

const groupTitleType = 'group_title'

const WidgetGroup: FC<{ list: WidgetGridData | WidgetGridData[] }> = ({ list }) => {
  if (Array.isArray(list)) {
    return (
      <div className="widget-grid grid grid-flow-dense grid-cols-[repeat(auto-fill,var(--widget-size))] grid-rows-[repeat(auto-fill,var(--widget-size))] justify-center gap-[var(--widget-gap-size)]">
        {list.map((row, index) => (
          <WidgetItem key={index} {...row} />
        ))}
      </div>
    )
  }

  return <WidgetItem {...list} />
}

export const WidgetList: FC<WidgetGridProps> = ({
  itemSize: rawItemSize = 180,
  gapSize: rawGapSize = 32,
  list: rawList = [],
  style,
  ...restProps
}) => {
  const { window: frameWindow } = useFrame()
  const gridRef = useRef<HTMLDivElement>(null)
  const [itemSize, setItemSize] = useState(rawItemSize / 2)

  function handleLayout() {
    if (!gridRef.current) {
      return
    }

    const win = frameWindow || window

    const innerWidth = win.innerWidth
    const scrollBarWidth = innerWidth < 800 ? 0 : 15

    const rect = gridRef.current.getBoundingClientRect()

    const width = Math.min(rect.width, win.innerWidth) - scrollBarWidth
    const colNum = Math.round((width + rawGapSize) / (rawItemSize + rawGapSize))
    const itemSize = (width - (2 * colNum - 1) * rawGapSize) / (2 * colNum)

    setItemSize(itemSize)
  }

  const list = useMemo(() => {
    const result: Array<WidgetGridData | WidgetGridData[]> = []

    for (let index = 0; index < rawList.length; index++) {
      const raw = rawList[index]

      if (raw.type === groupTitleType) {
        result.push(raw)
      } else {
        const last = result[result.length - 1]

        if (!isArray(last)) {
          result.push([])
        }

        ;(result[result.length - 1] as WidgetGridData[]).push(raw)
      }
    }

    return result
  }, [rawList])

  useEffect(() => {
    const win = frameWindow || window

    handleLayout()
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
          `
        }}
      />
      {list.map((row, index) => (
        <WidgetGroup key={index} list={row} />
      ))}
    </div>
  )
}
