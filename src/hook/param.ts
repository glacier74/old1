import { useRouter } from 'next/router'

export function useParam(key?: string) {
  const router = useRouter()

  if (key) {
    return router.query[key] as string
  }

  return router.query
}
