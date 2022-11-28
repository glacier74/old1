import { useTranslation } from 'next-i18next'
import Link from 'next/link'
import { FC } from 'react'

import { IconLogo } from '~/components'

export const HomeHeader: FC = () => {
  const { t } = useTranslation()

  return (
    <header className="relative">
      <div className="absolute top-0 left-0 w-full z-20">
        <div className="max-w-7xl mx-auto">
          <div className="py-6 flex items-center justify-between">
            <div className="flex items-center text-slate-50 text-lg space-x-6">
              <Link href="/" title={t('common.name')} className="hover:opacity-80">
                <IconLogo className="w-12 h-12" />
              </Link>
            </div>

            <div className="flex items-center text-white space-x-5">
              <Link href="/login" title={t('common.name')} className="hover:opacity-80">
                Sign in
              </Link>
              <Link
                href="/sign-up"
                className="py-1 px-3 border border-white rounded-md hover:opacity-80"
                title={t('common.name')}
              >
                Sign up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
