import { Button } from '@heyforms/ui'
import { IconMenu2, IconX } from '@tabler/icons'
import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import Link from 'next/link'
import { FC, useEffect, useState } from 'react'
import { useLockBodyScroll } from 'react-use'

import IconLogo from '~public/static/header-logo.png'

export const HomeHeader: FC = () => {
  const { t } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)

  function handleClick() {
    setIsOpen(isOpen => !isOpen)
  }

  function handleScroll() {
    if (window.scrollY > 100) {
      document.body.classList.add('header-sticky')
    } else {
      document.body.classList.remove('header-sticky')
    }
  }

  useLockBodyScroll(isOpen)

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, false)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <header className="relative sticky top-0 z-20">
      <div className="header-container absolute top-0 left-0 w-full z-20">
        <div className="max-w-7xl mx-auto md:px-5">
          <div className="py-3 flex items-center justify-between">
            <div className="flex items-center text-slate-900 text-base font-medium md:space-x-8">
              <Link
                href="/"
                title={t('common.name')}
                className="h-[2rem] md:h-[2.25rem] hover:opacity-80 mx-5 md:mx-8"
              >
                <Image src={IconLogo} alt="EarlyBird Logo" width={110} height={36} quality={100} />
              </Link>
              <Link
                href="/features"
                title={t('features.title')}
                className="hidden md:block hover:opacity-80"
              >
                Features
              </Link>
              <Link
                href="/pricing"
                title={t('pricing.title')}
                className="hidden md:block hover:opacity-80"
              >
                Pricing
              </Link>
              <Link
                href="https://earlybird.im/blog/tag/changelog/"
                title={t('common.changelog')}
                className="hidden md:block hover:opacity-80"
              >
                Changelog
              </Link>
              <Link
                href="/blog"
                title={t('common.blog')}
                className="hidden md:block hover:opacity-80"
              >
                Blog
              </Link>
            </div>

            <div className="hidden items-center text-slate-900 font-medium space-x-5 md:flex">
              <Link
                href="/login"
                className="py-2 px-4 rounded text-slate-900 font-medium"
                title={t('common.login')}
              >
                Log in
              </Link>
              <Link
                href="/sign-up"
                className="py-2 px-6 rounded-full text-white bg-slate-900 font-medium"
                title={t('common.signup')}
              >
                Sign up
              </Link>
            </div>

            <div className="md:hidden">
              <Button.Link
                className="block-header-button"
                leading={isOpen ? <IconX /> : <IconMenu2 />}
                onClick={handleClick}
                aria-label="Menu"
              />
            </div>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="fixed top-20 left-0 right-0 bg-white rounded-lg shadow-xl z-10 md:hidden">
          <div className="flex flex-col py-5 px-5">
            <div className="flex flex-col space-y-2 text-center">
              <Link href="/features" title={t('common.features')} className="hover:opacity-80">
                Features
              </Link>
              <Link href="/pricing" title={t('common.pricing')} className="hover:opacity-80">
                Pricing
              </Link>
              <Link
                href="https://earlybird.im/blog/tag/changelog/"
                title={t('common.changelog')}
                className="hover:opacity-80"
              >
                Changelog
              </Link>
              <Link href="/blog" title={t('common.blog')} className="hover:opacity-80">
                Blog
              </Link>
            </div>

            <div className="flex flex-col text-slate-900 space-y-2 border-t border-slate-200 mt-5 pt-5">
              <Link
                href="/login"
                className="py-1 px-3 border border-emerald-500 text-emerald-500 rounded hover:opacity-80 text-center"
                title={t('common.name')}
              >
                Login
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
