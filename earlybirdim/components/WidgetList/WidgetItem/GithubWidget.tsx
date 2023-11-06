import dayjs from 'dayjs'
import { FC, Fragment, useMemo } from 'react'

import { WidgetIcon } from '../WidgetIcon'
import {
  GithubContributionProps,
  GithubContributionRect,
  GithubData,
  WidgetConfig,
  WidgetData,
  WidgetExtra
} from '../WidgetProps'
import { typeNames } from '../constants'
import BehanceWidget from './BehanceWidget'
import { WidgetFollowButton } from './WidgetFollowButton'

function getSvgFillColor(count: number) {
  if (count < 1) {
    return `rgba(0,0,0,0.05)`
  } else if (count <= 5) {
    return '#9be9a8'
  } else if (count <= 10) {
    return '#40c463'
  } else if (count <= 15) {
    return '#30a14e'
  } else {
    return '#216e39'
  }
}

const Contribution: FC<GithubContributionProps> = ({
  contributions: rawContributions = [],
  blockSize = 12,
  columnSize = 19.5,
  isMonthShow,
  ...restProps
}) => {
  const { width, height, contributions, monthLabels } = useMemo(() => {
    const monthLabelSize = isMonthShow ? columnSize : 0
    const width = rawContributions.length * columnSize
    const height = 7 * columnSize - (columnSize + blockSize) + monthLabelSize
    const monthLabels: Array<{
      x: number
      y: number
      label: string
    }> = []

    const contributions = rawContributions.reduce((prev, next, xIndex) => {
      if (isMonthShow) {
        const label = dayjs(next[0].date).format('MMM')

        if (!monthLabels.some(ml => ml.label === label)) {
          monthLabels.push({
            x: columnSize / 2 + xIndex * columnSize,
            y: columnSize / 2,
            label: label
          })
        }
      }

      return [
        ...prev,
        ...next.map((row, yIndex) => {
          return {
            x: xIndex * columnSize,
            y: yIndex * columnSize + monthLabelSize,
            fill: getSvgFillColor(row.count)
          }
        })
      ]
    }, [] as GithubContributionRect[])

    return {
      width,
      height,
      contributions,
      monthLabels
    }
  }, [blockSize, columnSize, isMonthShow, rawContributions])

  return (
    <div {...restProps}>
      <svg
        width="100%"
        height="100%"
        viewBox={`0 0 ${width} ${height}`}
        fill="none"
        preserveAspectRatio="xMaxYMin meet"
        xmlns="http://www.w3.org/2000/svg"
      >
        {isMonthShow &&
          monthLabels.map((row, index) => (
            <text
              key={index}
              x={row.x}
              y={row.y}
              fontSize="12"
              textAnchor="middle"
              fill="rgba(0,0,0,0.5)"
            >
              {row.label}
            </text>
          ))}

        {contributions.map((row, index) => (
          <Fragment key={index}>
            <rect
              x={row.x}
              y={row.y}
              width={blockSize}
              height={blockSize}
              rx="2.5"
              fill={row.fill}
            />
            <rect
              x={row.x + 0.5}
              y={row.y + 0.5}
              width={blockSize - 1}
              height={blockSize - 1}
              rx="2"
              strokeWidth="1"
              stroke="rgba(0,0,0,0.05)"
            />
          </Fragment>
        ))}
      </svg>
    </div>
  )
}

export default class GithubWidget<T extends GithubData & WidgetData> extends BehanceWidget<T> {
  override extras: AnyMap<WidgetExtra> = {}

  // 2x1
  override Render2x1(config: WidgetConfig<T>) {
    return (
      <a className="block w-full h-full" href={config.url}>
        <div className="flex h-full">
          <div className="flex flex-col">
            <WidgetIcon url={config.url} />

            <div className="mt-2 md:mt-3 flex-1">
              <h3 className="line-clamp-2 text-sm text-slate-950 dark:text-slate-50">
                {config.data.overrides?.title || config.data.name || typeNames[config.type!]}
              </h3>
              {config.data.description && (
                <div className="max-[400px]:hidden text-xs text-slate-500 dark:text-slate-400">
                  {config.data.description}
                </div>
              )}
            </div>

            <div className="inline-flex">
              <WidgetFollowButton
                followers={config.data.followers}
                followText={config.extra?.followText}
              />
            </div>
          </div>

          <div className="flex-1"></div>

          <div className="ml-6">
            <Contribution
              className="aspect-[6/5] h-full"
              contributions={config.data.contributions?.slice(0, 8)}
            />
          </div>
        </div>
      </a>
    )
  }

  // 2x1
  override Render2x2(config: WidgetConfig) {
    return (
      <a className="block w-full h-full" href={config.url}>
        <div className="flex h-full flex-col">
          <div>
            <div className="flex justify-between">
              <WidgetIcon url={config.url} />

              <div className="flex items-start">
                <WidgetFollowButton
                  followers={config.data.followers}
                  followText={config.extra?.followText}
                />
              </div>
            </div>

            <div className="mt-3">
              <h3 className="line-clamp-2 text-sm text-slate-950 dark:text-slate-50">
                {config.data.overrides?.title || config.data.name || typeNames[config.type!]}
              </h3>
              {config.data.description && (
                <div className="max-[400px]:hidden text-xs text-slate-500 dark:text-slate-400">
                  {config.data.description}
                </div>
              )}
            </div>
          </div>

          <div className="flex-1"></div>

          <Contribution
            className="aspect-[11/5] w-full"
            contributions={config.data.contributions}
            isMonthShow={true}
          />
          <div className="mt-2 text-xs text-black/50">
            {config.data.numContributions} contributions in the last year
          </div>
        </div>
      </a>
    )
  }
}
