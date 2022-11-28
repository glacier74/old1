import { useTranslation } from 'next-i18next'
import Link from 'next/link'
import { FC, useEffect } from 'react'

import { IconLogoWhite } from '~/components'

export const HomeHeader: FC = () => {
  const { t } = useTranslation()

  function handleScroll() {
    if (window.scrollY > 100) {
      document.body.classList.add('header-sticky')
    } else {
      document.body.classList.remove('header-sticky')
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, false)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <header className="relative sticky top-0 z-20">
      <div className="header-container absolute top-0 left-0 w-full z-20">
        <div className="max-w-7xl mx-auto px-5">
          <div className="py-4 flex items-center justify-between">
            <div className="flex items-center text-slate-50 text-lg space-x-6">
              <Link href="/" title={t('common.name')} className="hover:opacity-80">
                <IconLogoWhite className="w-8 h-8" />
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
