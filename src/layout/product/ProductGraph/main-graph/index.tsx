import { useState } from 'react'

import { Loading } from '~/components'
import { useProduct } from '~/layout'
import { ProductService } from '~/service'
import { useAsyncEffect } from '~/utils'

import { ChartGraph } from './ChartGraph'
import { TotalStats } from './TotalStats'

export interface MainGraphProps extends ComponentProps {
  date: string
  period: string
}

export function MainGraph({ date, period }: MainGraphProps) {
  const product = useProduct()

  const [loading, setLoading] = useState(false)
  const [graphData, setGraphData] = useState<any[]>([])
  const [totalStats, setTotalStats] = useState<AnyMap<any>>()

  useAsyncEffect(async () => {
    if (product?.id) {
      setLoading(true)

      const [totalStats, graphData] = await Promise.all([
        ProductService.totalStats(product?.id, date, period),
        ProductService.timeseries(product?.id, date, period)
      ])

      setTotalStats(totalStats)
      setGraphData(graphData)

      setLoading(false)
    }
  }, [product?.id, date, period])

  return (
    <div className="relative w-full bg-slate-50 px-4 py-8 rounded">
      <div>
        <TotalStats totalStats={totalStats} />
        <ChartGraph graphData={graphData} period={period} />
      </div>
      {loading && <Loading className="absolute inset-0 bg-slate-50 rounded" />}
    </div>
  )
}
