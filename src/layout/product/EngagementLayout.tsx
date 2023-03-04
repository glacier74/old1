import { Navbar } from '@heyforms/ui'
import clsx from 'clsx'
import { useTranslation } from 'next-i18next'
import Link from 'next/link'

import { AsyncRequest, AsyncRequestProps } from '~/components'
import { ProductSidebarLayout, useProductId } from '~/layout'

const Skeleton = () => {
  return (
    <div>
      <div className="flex items-center h-16 py-4">
        <div className="w-9 h-9 bg-slate-200 rounded-full"></div>
        <div className="flex flex-1 justify-between">
          <div className="w-40 h-4 ml-4 rounded-sm skeleton"></div>
          <div className="w-40 h-4 ml-4 rounded-sm skeleton"></div>
          <div className="w-40 h-4 ml-4 rounded-sm skeleton"></div>
        </div>
      </div>
      <div className="flex items-center h-16 py-4">
        <div className="w-9 h-9 bg-slate-200 rounded-full"></div>
        <div className="flex flex-1 justify-between">
          <div className="w-40 h-4 ml-4 rounded-sm skeleton"></div>
          <div className="w-40 h-4 ml-4 rounded-sm skeleton"></div>
          <div className="w-40 h-4 ml-4 rounded-sm skeleton"></div>
        </div>
      </div>
    </div>
  )
}

interface EngagementLayoutProps extends LayoutProps, Omit<AsyncRequestProps, 'children'> {
  activeRouteName: string
}

const LINKS = [
  {
    href: '/product/{productId}/engagements',
    routeName: 'payment'
  },
  {
    href: '/product/{productId}/engagements/email-captures',
    routeName: 'emailCapture'
  }
]

export function EngagementLayout({
  seo,
  activeRouteName,
  request,
  deps,
  emptyState,
  children
}: EngagementLayoutProps) {
  const { t } = useTranslation()
  const productId = useProductId()

  return (
    <ProductSidebarLayout seo={seo}>
      <h1 className="mb-4 text-3xl leading-6 font-bold text-slate-900">
        {t('engagements.heading')}
      </h1>
      <div className="mt-4 text-slate-600">{t('engagements.description')}</div>

      <div className="mt-6">
        <Navbar className="mt-4">
          {LINKS.map(link => (
            <Link
              key={link.routeName}
              href={link.href.replace('{productId}', String(productId))}
              className={clsx({
                active: activeRouteName === link.routeName
              })}
            >
              {t(`engagements.${link.routeName}`)}
            </Link>
          ))}
        </Navbar>

        <AsyncRequest request={request} deps={deps} skeleton={<Skeleton />} emptyState={emptyState}>
          {children}
        </AsyncRequest>
      </div>
    </ProductSidebarLayout>
  )
}
