import { isEqual, isValid } from '@nily/utils'
import JsCookie from 'js-cookie'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

import { Loading } from '~/components'
import { AuthorizedLayout } from '~/layout'
import { useStore } from '~/store'
import { deleteRedirectURL, getRedirectURL } from '~/utils'

const productIdKey = process.env.NEXT_PUBLIC_PRODUCT_ID_STORAGE_NAME!

export function HomeAuthorizedLayout() {
  const router = useRouter()
  const { isReady, products } = useStore()

  useEffect(() => {
    if (isReady) {
      const redirectURL = getRedirectURL(JsCookie)

      if (isValid(redirectURL)) {
        deleteRedirectURL(JsCookie)
        router.replace(isValid(redirectURL) ? redirectURL! : '/')
      } else {
        if (products.length > 0) {
          const currentProductId = window.localStorage.getItem(productIdKey)

          if (products.some(p => isEqual(p.id, currentProductId))) {
            router.replace(`/product/${currentProductId}`)
          } else {
            router.replace(`/product/${products[0].id}`)
          }
        } else {
          router.replace('/product/create')
        }
      }
    }
  }, [isReady])

  return (
    <AuthorizedLayout>
      <Loading className="h-screen bg-slate-50" />
    </AuthorizedLayout>
  )
}
