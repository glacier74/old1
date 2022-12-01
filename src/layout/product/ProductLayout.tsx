import { useTranslation } from 'next-i18next'

import { AuthorizedLayout } from '~/layout'
import { useStore } from '~/store'

import { useProduct } from '../hook'
import { AccountSettingsModal } from './AccountSettings'
import { ProductMemberModal } from './Members'
import { Sidebar } from './Sidebar'

export function ProductLayout({ seo, children }: LayoutProps) {
  const { t } = useTranslation()
  const { isMemberListShow, isAccountSettingsShow } = useStore()
  const product = useProduct()

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
                <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 md:px-8">{children}</div>
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
