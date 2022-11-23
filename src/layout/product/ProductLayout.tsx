import { Button } from '@heyforms/ui'
import { useTranslation } from 'next-i18next'
import Link from 'next/link'

import { RoundImage } from '~/components'
import { AuthorizedLayout } from '~/layout'
import { useStore } from '~/store'

import { useProduct } from '../hook'
import { AccountSettingsModal } from './AccountSettings'
import { ProductMemberModal } from './Members'
import { Sidebar } from './Sidebar'

const Skeleton = () => {
  return (
    <div className="flex items-center flex-1 min-w-0 pt-1">
      <div className="flex items-center mr-5">
        <div className="bg-slate-200 rounded-full" style={{ width: 54, height: 54 }}></div>
      </div>
      <div className="flex-1 min-w-0">
        <div className="w-72 h-6 mt-0.5 mb-2 rounded-sm skeleton"></div>
        <div className="w-24 h-4 rounded-sm skeleton"></div>
      </div>
    </div>
  )
}

const TaglineSkeleton = () => {
  return <div className="mt-6 w-64 h-4 rounded-sm skeleton"></div>
}

export function ProductLayout({ seo, children }: LayoutProps) {
  const { t } = useTranslation()
  const { isReady, isMemberListShow, isAccountSettingsShow } = useStore()
  const product = useProduct()

  function handlePreview() {
    window.open(`https://${product.domain}.${process.env.NEXT_PUBLIC_PUBLIC_SITE_DOMAIN}`)
  }

  return (
    <>
      <AuthorizedLayout
        seo={{
          ...seo,
          title: t(seo.title, { name: product?.name || '' })
        }}
      >
        <div className="w-full min-h-screen bg-white">
          <Sidebar />

          <div className="root-container min-h-screen">
            <main className="relative z-0 focus:outline-none">
              <div className="py-6">
                <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 md:px-8">
                  <div>
                    <div className="relative lg:flex lg:items-center lg:justify-between">
                      {isReady ? (
                        <div className="flex items-center flex-1 min-w-0">
                          <div className="flex items-center mr-5">
                            <RoundImage src={product.logo} size={54} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-3xl font-bold text-slate-900">{product.name}</div>
                            <div className="text-sm text-slate-500 mt-1 flex flex-col sm:flex-row sm:flex-wrap sm:space-x-6">
                              {t('product.member', { count: product.users.length })}
                            </div>
                          </div>
                        </div>
                      ) : (
                        <Skeleton />
                      )}

                      <div className="flex items-center space-x-3">
                        <Link className="link-button" href={`/product/${product?.id}/edit`}>
                          {t('product.edit')}
                        </Link>
                        <Button type="success" onClick={handlePreview}>
                          {t('product.viewSite')}
                        </Button>
                      </div>
                    </div>

                    {isReady ? <div className="mt-4">{product?.tagline}</div> : <TaglineSkeleton />}
                  </div>

                  {children}
                </div>
              </div>
            </main>
          </div>
        </div>
      </AuthorizedLayout>

      <AccountSettingsModal visible={isAccountSettingsShow} />
      <ProductMemberModal visible={isMemberListShow} />
    </>
  )
}
