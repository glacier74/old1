import { useMemo } from 'react'

import { useStore } from '~/store'
import { useParam } from '~/utils'

export function useProductId() {
  return Number(useParam('id') as string)
}

export function useProduct(): Product {
  const store = useStore()
  const productId = useProductId()

  return useMemo(() => {
    let product = store.products.find(p => p.id === productId)

    if (!product) {
      product = { id: productId, users: [] } as unknown as Product
    }

    return product
  }, [productId, store.products])
}

export function useSiteSettings() {
  const { siteSettings } = useStore()
  const productId = useProductId()

  return useMemo(() => {
    return {
      ...siteSettings,
      productId
    } as SiteSettings
  }, [productId, siteSettings])
}
