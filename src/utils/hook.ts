import { notification } from '@heyforms/ui'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

import { PLAN_LEVELS } from '~/constants'

export function useAsyncEffect<T, S>(asyncFunction: () => Promise<T>, deps: S[] = []) {
  const execute = useCallback(() => {
    return asyncFunction()
  }, [asyncFunction])

  useEffect(() => {
    execute()
  }, deps)
}

export function useParam(key?: string) {
  const router = useRouter()

  if (key) {
    return router.query[key] as string
  }

  return router.query
}

export function useVisible(visible = false): [boolean, () => void, () => void] {
  const [_visible, setVisible] = useState(visible)

  const open = useCallback(() => {
    setVisible(true)
  }, [])

  const close = useCallback(() => {
    setVisible(false)
  }, [])

  return [_visible, open, close]
}

interface UseRequestOptions {
  fetchWhenDepsChange?: boolean
  errorNotify?: boolean
}

export function useRequest(
  asyncFunction: (...args: any[]) => void,
  deps: any[] = [],
  options?: UseRequestOptions
) {
  const { t } = useTranslation()

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error>()

  const request = useCallback(async (...args: any[]) => {
    setLoading(true)
    setError(undefined)

    try {
      await asyncFunction(...args)
    } catch (err: any) {
      setError(err as Error)

      if (options?.errorNotify) {
        notification.error({
          title: t(err.message)
        })
      }
    } finally {
      setLoading(false)
    }
  }, deps)

  useEffect(() => {
    if (options?.fetchWhenDepsChange) {
      request()
    }
  }, deps)

  return { loading, error, request }
}

export function useWindow(
  source: string,
  onMessage: (win: Window, payload: any) => void,
  onClose?: () => void
) {
  const winRef = useRef<Window | null>()

  const messageListener = useCallback(
    (event: MessageEvent) => {
      if (event.origin === window.location.origin && event.data.source === source) {
        onMessage(winRef.current!, event.data.payload)
      }
    },
    [winRef.current, source]
  )

  function openWindow(
    url: string,
    features = 'scrollbars=yes, resizable=yes, width=600, height=800'
  ) {
    const win = window.open(url, '', features)!
    const timer = setInterval(() => {
      if (win.closed) {
        clearInterval(timer)
        onClose?.()
      }
    }, 1_000)

    winRef.current = win
  }

  useEffect(() => {
    window.addEventListener('message', messageListener)

    return () => {
      window.removeEventListener('message', messageListener)
    }
  }, [])

  return openWindow
}

export function useUnsaveChanges(isChanged?: boolean, message?: string) {
  const router = useRouter()

  useEffect(() => {
    const handleWindowClose = (e: any) => {
      if (!isChanged) {
        return
      }

      e.preventDefault()
      return (e.returnValue = message)
    }

    const handleBrowseAway = () => {
      if (!isChanged) {
        return
      }

      if (window.confirm(message)) {
        return
      }

      router.events.emit('routeChangeError')
      throw 'Nextjs route change aborted'
    }

    window.addEventListener('beforeunload', handleWindowClose)
    router.events.on('routeChangeStart', handleBrowseAway)

    return () => {
      window.removeEventListener('beforeunload', handleWindowClose)
      router.events.off('routeChangeStart', handleBrowseAway)
    }
  }, [isChanged])
}

export const useSubscription = (user: User): Subscription | undefined => {
  if (user.subscription?.isActive) {
    return user.subscription
  }
}

export const useSubscriptionPlanLevel = (subscription?: Subscription) => {
  return useMemo(() => {
    if (subscription?.isActive) {
      return PLAN_LEVELS[subscription.planId]
    }

    return PLAN_LEVELS.plan_free
  }, [subscription?.isActive, subscription?.planId])
}

export const useProductURL = (product: Product) => {
  const planLevel = useSubscriptionPlanLevel(product.subscription)

  return useMemo(() => {
    if (product.subscription?.isActive && planLevel >= PLAN_LEVELS.plan_superior) {
      const customDomain = product.customDomains?.find(c => c.isPrimary)

      if (customDomain) {
        return customDomain.domain
      }
    }

    return `${product.domain}.${process.env.NEXT_PUBLIC_PUBLIC_SITE_DOMAIN}`
  }, [product.customDomains, product.domain, product.subscription?.isActive, planLevel])
}
