import { AuthorizedLayout } from '@/layout'
import { useStore } from '@/store'
import { Avatar, Button } from '@heyforms/ui'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { AccountSettingsModal } from './AccountSettings'
import { useProduct } from './hook'
import { ProductMemberModal } from './Members'
import { Sidebar } from './Sidebar'

export function ProductLayout({ seo, children }: LayoutProps) {
  const { t } = useTranslation()
  const router = useRouter()
  const { isMemberListShow, isAccountSettingsShow } = useStore()
  const product = useProduct()

  function handleEdit() {
    router.push(`/product/${product?.id}/edit`)
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
                    <div className="lg:flex lg:items-center lg:justify-between">
                      <div className="flex items-center flex-1 min-w-0">
                        <div className="flex items-center mr-5">
                          <Avatar src={product?.logo} size={54} rounded circular />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-3xl font-bold text-slate-900">{product?.name}</div>
                          <div className="text-sm text-slate-500 mt-1 flex flex-col sm:flex-row sm:flex-wrap sm:space-x-6">
                            {t('product.member', { count: product?.users.length })}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3">
                        <Button onClick={handleEdit}>{t('product.edit')}</Button>
                        <Button type="primary">{t('product.viewSite')}</Button>
                      </div>
                    </div>
                    <div className="mt-4">{product?.tagline}</div>
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
