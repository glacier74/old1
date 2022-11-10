import { useRouter } from 'next/router'
import { useCallback, useEffect, useRef, useState } from 'react'

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

export function useRequest(asyncFunction: (...args: any[]) => void, deps: any[] = []) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error>()

  const request = useCallback(async (...args: any[]) => {
    setLoading(true)
    setError(undefined)

    try {
      await asyncFunction(...args)
    } catch (err: any) {
      setError(err as Error)
    } finally {
      setLoading(false)
    }
  }, deps)

  return { loading, error, request }
}

export function useWindow(source: string, listener: (win: Window, payload: any) => void) {
  const winRef = useRef<Window | null>()

  const messageListener = useCallback(
    (event: MessageEvent) => {
      if (event.origin === window.location.origin && event.data.source === source) {
        listener(winRef.current!, event.data.payload)
      }
    },
    [winRef.current, source]
  )

  function openWindow(url: string, features?: string) {
    winRef.current = window.open(url, '_blank', features)
  }

  useEffect(() => {
    window.addEventListener('message', messageListener)

    return () => {
      window.removeEventListener('message', messageListener)
    }
  }, [])

  return openWindow
}
