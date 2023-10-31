import { useGlobalContext } from '@earlybirdim/components'
import { date, isValid } from '@nily/utils'
import { useEffect, useMemo, useRef, useState, useTransition } from 'react'

import { MetadataService } from '~/service'
import { useAsyncEffect } from '~/utils'

import { WidgetConfig, WidgetData } from './WidgetProps'

export function useMetadata<T = WidgetData>(url: string) {
  const { isPreview } = useGlobalContext()

  const [isPending, startTransition] = useTransition()
  const [data, setData] = useState<T>()

  const intervalRef = useRef<any>()
  const [fetchedAt, setFetchedAt] = useState(0)

  async function fetchData() {
    if (isPending) {
      return
    }

    const newData = (await MetadataService.fetch(url)) as any

    if (isValid(newData)) {
      startTransition(() => {
        setData(newData)
      })
    }
  }

  useAsyncEffect(async () => {
    await fetchData()
  }, [url, fetchedAt])

  useEffect(() => {
    if (isPreview) {
      intervalRef.current = setInterval(() => {
        setFetchedAt(date.timestamp())
      }, 10_000)
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }
  }, [])

  return data
}

export function useComputedConfig(config: WidgetConfig) {
  return useMemo(() => {
    if (config.extra?.getComputedData) {
      return {
        ...config,
        data: {
          ...config.data,
          ...config.extra.getComputedData(config)
        }
      }
    }

    return config
  }, [config])
}
