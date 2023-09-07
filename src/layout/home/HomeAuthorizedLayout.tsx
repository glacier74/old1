import { isEqual, isValid } from '@nily/utils'
import JsCookie from 'js-cookie'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

import { IconLogo2 } from '~/components/Icon/IconLogo2'
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
      <div className="w-screen h-screen flex flex-col items-center justify-center gap-4 bg-slate-50">
        <IconLogo2 className="animate-pulse w-[60px] h-[60px]" />
        <span className="text-xs text-slate-400">Loading...</span>
      </div>
    </AuthorizedLayout>
  )
}
