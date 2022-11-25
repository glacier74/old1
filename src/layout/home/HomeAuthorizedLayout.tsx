import { isValid } from '@nily/utils'
import JsCookie from 'js-cookie'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

import { Loading } from '~/components'
import { AuthorizedLayout } from '~/layout'
import { useStore } from '~/store'
import { deleteRedirectURL, getRedirectURL } from '~/utils'

export function HomeAuthorizedLayout({ seo }: Partial<LayoutProps>) {
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
          router.replace(`/product/${products[0].id}`)
        } else {
          router.replace('/onboarding')
        }
      }
    }
  }, [isReady])

  return (
    <AuthorizedLayout seo={seo}>
      <Loading className="h-screen bg-slate-50" />
    </AuthorizedLayout>
  )
}
