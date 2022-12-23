import type { ReactNode } from 'react'
import { forwardRef, useCallback, useEffect, useImperativeHandle, useState } from 'react'

export interface AsyncRequestProps extends ComponentProps {
  request: () => Promise<any>
  immediate?: boolean
  deps?: any[]
  cacheFirst?: boolean
  skeleton?: ReactNode
  emptyState?: ReactNode
  errorRender?: (err: Error) => ReactNode
}

export interface AsyncRequestInstance {
  reload: () => void
}

export const AsyncRequest = forwardRef<AsyncRequestInstance, AsyncRequestProps>(
  (
    {
      className,
      style,
      request,
      immediate = true,
      deps = [],
      cacheFirst = false,
      skeleton,
      emptyState,
      errorRender,
      children
    },
    ref
  ) => {
    // Fork from https://usehooks.com/useAsync/
    const [status, setStatus] = useState<'idle' | 'pending' | 'success' | 'error'>('idle')
    const [result, setResult] = useState<boolean>(false)
    const [error, setError] = useState<Error | null>(null)

    const execute = useCallback(() => {
      setStatus('pending')
      setError(null)

      return request()
        .then(data => {
          setResult(data)
          setStatus('success')
        })
        .catch((err: any) => {
          setError(err)
          setStatus('error')
        })
    }, [request])

    useImperativeHandle(ref, () => {
      return {
        reload() {
          execute()
        }
      }
    })

    useEffect(() => {
      if (immediate) {
        execute()
      }
    }, deps.concat(immediate))

    return (
      <div className={className} style={style}>
        {status === 'idle' && cacheFirst && children}
        {status === 'pending' && (!cacheFirst ? skeleton : children)}
        {status === 'error' && (errorRender ? errorRender(error!) : children)}
        {status === 'success' && (!result && emptyState ? emptyState : children)}
      </div>
    )
  }
)
