import { useGlobalContext } from '@earlybirdim/components'
import { date, isEmpty, isValid } from '@nily/utils'
import { isGoogleMap } from '@tinaryan/dp'
import { useEffect, useMemo, useRef, useState, useTransition } from 'react'
import isURL from 'validator/lib/isURL'

import { MetadataService } from '~/service'
import { useAsyncEffect } from '~/utils'

import { WidgetConfig, WidgetData } from './WidgetProps'

const UNFETCH_TYPES = [
  'group_title',
  'payment',
  'email_capture',
  'image',
  'skills',
  'experience',
  'text'
]

export function useMetadata<T = WidgetData>(config: WidgetConfig) {
  const { isPreview } = useGlobalContext()

  const [isPending, startTransition] = useTransition()
  const [data, setData] = useState<T>()

  const intervalRef = useRef<any>()
  const [fetchedAt, setFetchedAt] = useState(0)

  const isFetchType = useMemo(
    () =>
      config.type &&
      !UNFETCH_TYPES.includes(config.type) &&
      !isGoogleMap(config.url) &&
      !config.disableMetadata,
    [config.disableMetadata, config.type, config.url]
  )

  async function fetchData() {
    if (isPending) {
      return
    }

    if (isFetchType) {
      const newData = (await MetadataService.fetch(config.url)) as any

      if (isValid(newData)) {
        startTransition(() => {
          setData(newData)
        })
      }
    }
  }

  useAsyncEffect(async () => {
    await fetchData()
  }, [config.url, isFetchType, fetchedAt])

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

const NEXT_PUBLIC_SHORT_URL = process.env.NEXT_PUBLIC_SHORT_URL as string

export function useShortLinkURL(widgetId: string, url: string) {
  const { domain } = useGlobalContext()

  if (isEmpty(url) || !isURL(url)) {
    return url
  }

  return [NEXT_PUBLIC_SHORT_URL, domain, widgetId].join('/')
}
