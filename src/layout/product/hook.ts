import { useStore } from '@/store'
import { useParam } from '@/utils'
import { useMemo } from 'react'

export function useProductId() {
  return Number(useParam('id') as string)
}

export function useProduct() {
  const store = useStore()
  const productId = useProductId()

  return useMemo(() => store.products.find(p => p.id === productId), [productId, store.products])
}
