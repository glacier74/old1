import { useCallback, useEffect } from 'react'
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
