import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { Loading } from '@/components'
import { AuthorizedLayout } from '@/layout'
import { useStore } from '@/store'

export function HomeAuthorizedLayout({ seo }: Partial<LayoutProps>) {
  const router = useRouter()
  const { isReady, products } = useStore()

  useEffect(() => {
    if (isReady) {
      if (products.length > 0) {
        router.replace(`/product/${products[0].id}`)
      } else {
        router.replace('/onboarding')
      }
    }
  }, [isReady])

  return (
    <AuthorizedLayout seo={seo}>
      <Loading className="h-screen bg-slate-50" />
    </AuthorizedLayout>
  )
}
