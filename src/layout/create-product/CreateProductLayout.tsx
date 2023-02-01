import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import Link from 'next/link'
import { ReactNode } from 'react'

import { AuthorizedLayout } from '~/layout'
import IconLogo from '~public/static/header-logo.png'

import { LoggedAccount } from './LoggedAccount'

interface CreateProductLayoutProps extends LayoutProps {
  logoElement?: ReactNode
}

export function CreateProductLayout({ seo, logoElement, children }: CreateProductLayoutProps) {
  const { t } = useTranslation()

  return (
    <AuthorizedLayout seo={seo}>
      <div className="min-h-screen bg-slate-50 flex flex-col py-5 sm:px-6 lg:px-8">
        <div className="w-full flex items-center justify-between">
          {logoElement ? (
            logoElement
          ) : (
            <Link
              href="/"
              title={t('common.name')}
              className="h-[1.75rem] md:h-[2rem] hover:opacity-80"
            >
              <Image src={IconLogo} alt="EarlyBird Logo" width={110} height={36} quality={100} />
            </Link>
          )}
          <LoggedAccount />
        </div>
        <div className="flex-1 flex flex-col justify-center py-5 sm:mx-auto sm:w-full sm:max-w-md">
          {children}
        </div>
      </div>
    </AuthorizedLayout>
  )
}
