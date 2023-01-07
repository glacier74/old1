import { IconMenu2 } from '@tabler/icons'
import { useTranslation } from 'next-i18next'

import { AuthorizedLayout } from '~/layout'

import { useProduct } from '../hook'
import { AccountSidebar } from './AccountSidebar'

export function AccountLayout({ seo, children }: LayoutProps) {
  const { t } = useTranslation()
  const product = useProduct()

  function openAccountSidebar() {
    // TODO - openAccountSidebar
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
          <AccountSidebar />

          <div className="root-container min-h-screen">
            <main className="relative z-0 focus:outline-none">
              <div className="md:hidden pl-1 pt-1 sm:pl-3 sm:pt-3">
                <button
                  className="-ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded-md text-slate-500 hover:text-slate-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                  onClick={openAccountSidebar}
                >
                  <span className="sr-only">Open sidebar</span>
                  <IconMenu2 className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              <div className="py-6">
                <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 md:px-8">{children}</div>
              </div>
            </main>
          </div>
        </div>
      </AuthorizedLayout>
    </>
  )
}
