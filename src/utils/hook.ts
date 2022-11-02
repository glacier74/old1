import { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/router'

export function useAsyncEffect<T, S extends unknown>(
  asyncFunction: () => Promise<T>,
  deps: S[] = []
) {
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
