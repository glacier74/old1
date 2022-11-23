import Chart from 'chart.js/auto'
import dayjs from 'dayjs'
import { useTranslation } from 'next-i18next'
import { FC, useRef } from 'react'

import { dateFormatter, numberFormatter, useAsyncEffect } from '~/utils'

interface ChartGraphProps {
  period: string
  graphData: any[]
}

function getPresentIndex(period: string, plotsLength: number) {
  switch (period) {
    case 'realtime':
      return dayjs().minute()

    case 'day':
      return dayjs().hour()

    case '7d':
      return 6

    case '30d':
      return plotsLength - 1

    case 'month':
      return dayjs().date()

    case '6mo':
      return 5

    case '12mo':
      return 11
  }
}

function getInterval(period: string) {
  switch (period) {
    case 'realtime':
      return 'minute'

    case 'day':
      return 'hour'

    case 'last6Months':
    case 'last12Months':
      return 'month'

    default:
      return 'date'
  }
}

function buildDataSet(
  plot: (number | undefined)[],
  presentIndex: number | undefined,
  ctx: CanvasRenderingContext2D,
  label: any,
  isPrevious?: boolean
) {
  const gradient = ctx.createLinearGradient(0, 0, 0, 300)
  const prevGradient = ctx.createLinearGradient(0, 0, 0, 300)

  gradient.addColorStop(0, 'rgba(34,197,94, 0.2)')
  gradient.addColorStop(1, 'rgba(34,197,94, 0)')
  prevGradient.addColorStop(0, 'rgba(34,197,94, 0.075)')
  prevGradient.addColorStop(1, 'rgba(34,197,94, 0)')

  if (!isPrevious) {
    if (presentIndex) {
      const dashedPart = plot.slice(presentIndex - 1, presentIndex + 1)
      const dashedPlot = new Array(presentIndex - 1).concat(dashedPart)
      const _plot = [...plot]

      for (let i = presentIndex; i < _plot.length; i++) {
        _plot[i] = undefined
      }

      return [
        {
          label,
          data: _plot,
          borderWidth: 3,
          borderColor: 'rgb(34,197,94)',
          pointBackgroundColor: 'rgb(34,197,94)',
          pointHoverBackgroundColor: 'rgb(134, 239, 172)',
          pointBorderColor: 'transparent',
          pointHoverRadius: 4,
          backgroundColor: gradient,
          fill: true
        },
        {
          label,
          data: dashedPlot,
          borderWidth: 3,
          borderDash: [3, 3],
          borderColor: 'rgb(34,197,94)',
          pointHoverBackgroundColor: 'rgb(22, 163, 74)',
          pointBorderColor: 'transparent',
          pointHoverRadius: 4,
          backgroundColor: gradient,
          fill: true
        }
      ]
    } else {
      return [
        {
          label,
          data: plot,
          borderWidth: 3,
          borderColor: 'rgb(34,197,94)',
          pointHoverBackgroundColor: 'rgb(22, 163, 74)',
          pointBorderColor: 'transparent',
          pointHoverRadius: 4,
          backgroundColor: gradient,
          fill: true
        }
      ]
    }
  } else {
    return [
      {
        label,
        data: plot,
        borderWidth: 2,
        borderColor: 'rgba(166,187,210,0.5)',
        pointHoverBackgroundColor: 'rgba(166,187,210,0.8)',
        pointBorderColor: 'transparent',
        pointHoverBorderColor: 'transparent',
        pointHoverRadius: 4,
        backgroundColor: prevGradient,
        fill: true
      }
    ]
  }
}

export const ChartGraph: FC<ChartGraphProps> = ({ period, graphData }) => {
  const { t } = useTranslation()
  const chatRef = useRef<Chart | null>(null)

  function regenerateChart(plots: number[], labels: string[]) {
    if (chatRef.current) {
      chatRef.current.destroy()
    }

    const interval = getInterval(period)
    const presentIndex = getPresentIndex(period, plots.length)

    const graphEl = document.getElementById('chart-graph') as HTMLCanvasElement
    const ctx = graphEl.getContext('2d')!
    const dataSet = buildDataSet(plots, presentIndex, ctx, t('productStats.visitors'))

    chatRef.current = new Chart(ctx, {
      type: 'line',
      data: {
        labels,
        datasets: dataSet
      },
      options: {
        animation: false,
        responsive: true,
        plugins: {
          legend: { display: false },
          tooltip: {
            enabled: true
          }
        },
        elements: { line: { tension: 0 }, point: { radius: 0 } },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: numberFormatter as any,
              maxTicksLimit: 8
            },
            grid: {
              zeroLineColor: 'transparent',
              drawBorder: false
            } as any
          },
          x: {
            grid: { display: false },
            ticks: {
              maxTicksLimit: 8,
              callback: function (val) {
                return dateFormatter(interval)(this.getLabelForValue(val as number))
              }
            }
          }
        },
        interaction: {
          mode: 'index',
          intersect: false
        }
      }
    })
  }

  useAsyncEffect(async () => {
    const plots = graphData.map(r => r.visitors)
    const labels = graphData.map(r => r.date)

    regenerateChart(plots, labels)
  }, [graphData, period])

  return (
    <div className="relative px-2">
      <canvas id="chart-graph" className="mt-4 cursor-pointer" width="1054" height="342" />
    </div>
  )
}
