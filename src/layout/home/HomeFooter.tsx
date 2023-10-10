import { Select } from '@heyforms/ui'
import { date } from '@nily/utils'
import JsCookie from 'js-cookie'
import { useTranslation } from 'next-i18next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FC } from 'react'

import { IconLinkedin, IconTwitterGray } from '~/components'
import { LANGUAGE_OPTIONS } from '~/constants'
import { setCookie } from '~/utils'
import { i18n } from '~i18next-config'

const navigation = {
  product: [
    { name: 'features', href: '/features' },
    { name: 'pricing', href: '/pricing' },
    { name: 'whatsNew', href: 'https://changelog.earlybird.im' },
    { name: 'roadmap', href: 'https://earlybird.canny.io' },
    { name: 'templates', href: '/templates' },
    { name: 'integrations', href: '/integrations' }
  ],
  help: [
    {
      name: 'getStarted',
      href: 'https://help.earlybird.im/user/get-started/create-a-landing-page.html'
    },
    { name: 'helpCenter', href: 'https://help.earlybird.im/user/' },
    { name: 'contactSupport', href: 'https://help.earlybird.im/user/contact.html' },
    {
      name: 'developer',
      href: 'https://help.earlybird.im/developer/what-is-earlybird-template.html'
    }
  ],
  company: [
    { name: 'about', href: '/about' },
    { name: 'blog', href: '/blog' },
    { name: 'community', href: 'https://vue.mx/discord' }
  ],
  legal: [
    { name: 'terms', href: 'https://help.earlybird.im/user/tos.html' },
    { name: 'privacy', href: 'https://help.earlybird.im/user/privacy.html' },
    { name: 'dmca', href: 'https://help.earlybird.im/user/dmca.html' }
  ],
  social: [
    {
      name: 'Twitter',
      href: 'https://twitter.com/earlybirdim',
      icon: IconTwitterGray
    },
    {
      name: 'Linkedin',
      href: 'https://www.linkedin.com/company/earlybirdim/',
      icon: IconLinkedin
    }
  ]
}

// Locale cookie name
const LOCALE_COOKIE_NAME = process.env.NEXT_PUBLIC_LOCALE_COOKIE_NAME as string

export const HomeFooter: FC = () => {
  const { t } = useTranslation('common')
  const router = useRouter()

  function handleLocaleChange(newLocale: string) {
    const { pathname, asPath, query } = router

    setCookie(JsCookie, LOCALE_COOKIE_NAME, newLocale, date.milliseconds('1year')!)
    router.push({ pathname, query }, asPath, { locale: newLocale })
  }

  return (
    <footer className="bg-slate-900" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:py-24 lg:px-8">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-8 xl:col-span-1">
            <img className="h-10" src="https://earlybird.b-cdn.net/icon.png" alt="EarlyBird" />
            <p className="text-slate-400 text-base">{t('appSlogan')}</p>
            <div className="flex space-x-6">
              {navigation.social.map(item => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-slate-400 hover:text-slate-500"
                >
                  <span className="sr-only">{item.name}</span>
                  <item.icon className="h-6 w-6" aria-hidden="true" />
                </Link>
              ))}
            </div>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-8 xl:mt-0 xl:col-span-2">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold text-slate-200 tracking-wider uppercase">
                  {t('product')}
                </h3>
                <ul className="mt-4 space-y-2">
                  {navigation.product.map(item => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className="text-base text-slate-400 hover:text-slate-300"
                      >
                        {t(item.name)}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-12 md:mt-0">
                <h3 className="text-sm font-semibold text-slate-200 tracking-wider uppercase">
                  {t('help')}
                </h3>
                <ul className="mt-4 space-y-2">
                  {navigation.help.map(item => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className="text-base text-slate-400 hover:text-slate-300"
                      >
                        {t(item.name)}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold text-slate-200 tracking-wider uppercase">
                  {t('company')}
                </h3>
                <ul className="mt-4 space-y-2">
                  {navigation.company.map(item => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className="text-base text-slate-400 hover:text-slate-300"
                      >
                        {t(item.name)}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-12 md:mt-0">
                <h3 className="text-sm font-semibold text-slate-200 tracking-wider uppercase">
                  {t('legal')}
                </h3>
                <ul className="mt-4 space-y-2">
                  {navigation.legal.map(item => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className="text-base text-slate-400 hover:text-slate-300"
                      >
                        {t(item.name)}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-slate-700 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-slate-400 xl:text-left mb-4 md:mb-0">
            {t('copyright', { year: new Date().getFullYear() })}
          </p>
          <Select
            className="select-locale"
            options={LANGUAGE_OPTIONS}
            value={router.locale || i18n.defaultLocale}
            allowInput={false}
            onChange={handleLocaleChange}
          />
        </div>
      </div>
    </footer>
  )
}
