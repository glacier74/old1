import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import Link from 'next/link'
import { FC, useEffect } from 'react'

import IconLogo from '~public/static/header-logo.png'

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
          <div className="py-6 flex items-center justify-between">
            <div className="flex items-center text-slate-900 text-base space-x-8">
              <Link href="/" title={t('common.name')} className="hover:opacity-80 mx-8">
                <Image src={IconLogo} alt="EarlyBird Logo" width={110} height={36} quality={100} />
              </Link>
              <Link href="/features" title={t('common.features')} className="hover:opacity-80">
                Features
              </Link>
              <Link href="/pricing" title={t('common.pricing')} className="hover:opacity-80">
                Pricing
              </Link>
              <Link href="/changelog" title={t('common.changelog')} className="hover:opacity-80">
                Changelog
              </Link>
              <Link href="/blog" title={t('common.blog')} className="hover:opacity-80">
                Blog
              </Link>
            </div>

            <div className="flex items-center text-slate-900 space-x-5">
              <Link href="/login" title={t('common.name')} className="hover:opacity-80">
                Sign in
              </Link>
              <Link
                href="/sign-up"
                className="py-1 px-3 border border-green-500 text-green-500 rounded-md hover:opacity-80"
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
