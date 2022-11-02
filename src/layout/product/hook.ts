import { useStore } from '@/store'
import { useParam } from '@/utils'
import { isEqual } from '@nily/utils'
import { useMemo } from 'react'

export function useProductId() {
  return useParam('id') as string
}

export function useProduct() {
  const store = useStore()
  const productId = useProductId()

  return useMemo(
    () => store.products.find(p => isEqual(p.id, productId)),
    [productId, store.products]
  )
}
