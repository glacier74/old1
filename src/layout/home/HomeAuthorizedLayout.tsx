import { isEqual, isValid } from '@nily/utils'
import JsCookie from 'js-cookie'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

import { IconLogo2 } from '~/components/Icon/IconLogo2'
import { AuthorizedLayout } from '~/layout'
import { useStore } from '~/store'
import { deleteRedirectURL, getRedirectURL } from '~/utils'

const productIdKey = process.env.NEXT_PUBLIC_PRODUCT_ID_STORAGE_NAME!

export function HomeAuthorizedLayout() {
  const { t } = useTranslation('common')
  const router = useRouter()
  const { isReady, products } = useStore()

  useEffect(() => {
    if (isReady) {
      const redirectURL = getRedirectURL(JsCookie)

      if (isValid(redirectURL)) {
        router.replace(isValid(redirectURL) ? redirectURL! : '/')
        return deleteRedirectURL(JsCookie)
      }

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
  }, [isReady, products])

  return (
    <AuthorizedLayout>
      <div className="w-screen h-screen flex flex-col items-center justify-center gap-4 bg-slate-50">
        <IconLogo2 className="animate-pulse w-[60px] h-[60px]" />
        <span className="text-xs text-slate-400">{t('loading')}</span>
      </div>
    </AuthorizedLayout>
  )
}
