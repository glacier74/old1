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
    <header className="sticky top-0 z-20">
      {/* relative */}
      <div className="header-container bg-white top-0 left-0 w-full z-20">
        {/* absolute */}
        <div className="md:px-5">
          <div className="py-6 flex items-center justify-between">
            <div className="flex items-center text-slate-500 text-base font-medium md:space-x-8">
              <Link
                href="/"
                title={t('common.name')}
                className="h-[2rem] md:h-[2.25rem] hover:opacity-80 mx-5 lg:mx-8"
              >
                <Image src={IconLogo} alt="EarlyBird Logo" width={110} height={36} quality={100} />
              </Link>
              <Link
                href="/features"
                title={t('features.title')}
                className="hidden md:block hover:text-slate-950 hover:opacity-80"
              >
                Features
              </Link>
              <Link
                href="/pricing"
                title={t('pricing.title')}
                className="hidden md:block hover:text-slate-950 hover:opacity-80"
              >
                Pricing
              </Link>
              <Link
                href="/templates"
                title={t('templates.title')}
                className="hidden md:block hover:text-slate-950 hover:opacity-80"
              >
                Templates
              </Link>
              <Link
                href="/integrations"
                title={t('integrations.title')}
                className="hidden md:block hover:text-slate-950 hover:opacity-80" 
              >
                Integrations
              </Link>
              <Link
                href="/about"
                title={t('about.title')}
                className="hidden md:block hover:text-slate-950 hover:opacity-80"
              >
                About
              </Link>
              <Link
                href="/blog"
                title={t('blog.title')}
                className="hidden md:block hover:text-slate-950 hover:opacity-80"
              >
                Blog
              </Link>
            </div>

            <div className="hidden items-center font-medium space-x-5 md:flex">
              <Link
                href="/login"
                className="py-2 px-4 rounded text-slate-500 font-medium"
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
                className="mr-2.5 block-header-button"
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
          <div className="flex flex-col py-8 px-5">
            <div className="flex flex-col space-y-4 text-center">
              <Link href="/features" title={t('features.title')} className="hover:opacity-80">
                Features
              </Link>
              <Link href="/pricing" title={t('pricing.title')} className="hover:opacity-80">
                Pricing
              </Link>
              <Link href="/templates" title={t('templates.title')} className="hover:opacity-80">
                Templates
              </Link>
              <Link href="/integrations" title={t('integrations.title')} className="hover:opacity-80">
                Integrations
              </Link>
              <Link href="/about" title={t('about.title')} className="hover:opacity-80">
                About
              </Link>
              <Link href="/blog" title={t('blog.title')} className="hover:opacity-80">
                Blog
              </Link>
            </div>

            <div className="flex flex-col text-slate-900 space-y-4 border-t border-slate-200 mt-5 pt-5">
              <Link
                href="/login"
                className="py-2 px-3 border border-emerald-500 text-emerald-500 rounded-full font-medium text-center"
                title={t('common.name')}
              >
                Login
              </Link>
              <Link
                href="/sign-up"
                className="py-2 px-6 rounded-full text-white bg-slate-900 font-medium text-center"
                title={t('common.signup')}
              >
                Sign up
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
