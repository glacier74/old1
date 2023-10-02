import { useTranslation } from 'next-i18next'
import Link from 'next/link'
import { FC } from 'react'

import { IconLinkedin, IconTwitterGray} from '~/components'

import { IconChevronDown } from '@tabler/icons'

const navigation = {
  product: [
    { name: 'Features', href: '/features' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'What\'s new', href: 'https://changelog.earlybird.im' },
    { name: 'Roadmap', href: 'https://earlybird.canny.io' },
    { name: 'Templates', href: '/templates' },
    { name: 'Integrations', href: '/integrations' },
  ],
  help: [
    { name: 'Get started', href: 'https://help.earlybird.im/user/get-started/create-a-landing-page.html' },
    { name: 'Help center', href: 'https://help.earlybird.im/user/' },
    { name: 'Contact support', href: 'https://help.earlybird.im/user/contact.html' },
    { name: 'Developer', href: 'https://help.earlybird.im/developer/what-is-earlybird-template.html' },
  ],
  company: [
    { name: 'About', href: '/about' },
    { name: 'Blog', href: '/blog' },
    { name: 'Community', href: 'https://vue.mx/discord' },
  ],
  legal: [
    { name: 'Terms', href: 'https://help.earlybird.im/user/tos.html' },
    { name: 'Privacy', href: 'https://help.earlybird.im/user/privacy.html' },
    { name: 'DMCA', href: 'https://help.earlybird.im/user/dmca.html' },
  ],
  social: [
    {
      name: 'Twitter',
      href: '#',
      icon: IconTwitterGray,
    },
    {
      name: 'Linkedin',
      href: '#',
      icon: IconLinkedin,
    },
  ],
}

export const HomeFooter: FC = () => {
  const { t } = useTranslation()

  return (
    <footer className="bg-slate-900" aria-labelledby="footer-heading">
    <h2 id="footer-heading" className="sr-only">
      Footer
    </h2>
    <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:py-24 lg:px-8">
      <div className="xl:grid xl:grid-cols-3 xl:gap-8">
        <div className="space-y-8 xl:col-span-1">
          <img
            className="h-10"
            src="https://earlybird.b-cdn.net/icon.png"
            alt="EarlyBird"
          />
          <p className="text-slate-400 text-base">
            Your landing page builder for effortless lead capture and idea validation.
          </p>
          <div className="flex space-x-6">
            {navigation.social.map((item) => (
              <a key={item.name} href={item.href} className="text-slate-400 hover:text-slate-500">
                <span className="sr-only">{item.name}</span>
                <item.icon className="h-6 w-6" aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>
        <div className="mt-12 grid grid-cols-2 gap-8 xl:mt-0 xl:col-span-2">
          <div className="md:grid md:grid-cols-2 md:gap-8">
            <div>
              <h3 className="text-sm font-semibold text-slate-200 tracking-wider uppercase">Product</h3>
              <ul className="mt-4 space-y-2">
                {navigation.product.map((item) => (
                  <li key={item.name}>
                    <a href={item.href} className="text-base text-slate-400 hover:text-slate-300">
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-12 md:mt-0">
              <h3 className="text-sm font-semibold text-slate-200 tracking-wider uppercase">Help</h3>
              <ul className="mt-4 space-y-2">
                {navigation.help.map((item) => (
                  <li key={item.name}>
                    <a href={item.href} className="text-base text-slate-400 hover:text-slate-300">
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="md:grid md:grid-cols-2 md:gap-8">
            <div>
              <h3 className="text-sm font-semibold text-slate-200 tracking-wider uppercase">Company</h3>
              <ul className="mt-4 space-y-2">
                {navigation.company.map((item) => (
                  <li key={item.name}>
                    <a href={item.href} className="text-base text-slate-400 hover:text-slate-300">
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-12 md:mt-0">
              <h3 className="text-sm font-semibold text-slate-200 tracking-wider uppercase">Legal</h3>
              <ul className="mt-4 space-y-2">
                {navigation.legal.map((item) => (
                  <li key={item.name}>
                    <a href={item.href} className="text-base text-slate-400 hover:text-slate-300">
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-12 border-t border-slate-700 pt-8 flex flex-col md:flex-row justify-between items-center">
        <p className="text-sm text-slate-400 xl:text-left mb-4 md:mb-0">Copyright © {new Date().getFullYear()} EarlyBird, Inc. All rights reserved.</p>
        <fieldset className="w-full md:w-auto">
            <label htmlFor="language" className="sr-only">
                Language
            </label>
            <div className="relative">
                <select
                    id="language"
                    name="language"
                    className="appearance-none block w-full bg-none bg-gray-700 border border-transparent rounded-md py-2 pl-3 pr-10 text-base text-white focus:outline-none focus:ring-white focus:border-white sm:text-sm"
                    defaultValue="English"
                >
                    <option>English</option>
                    <option>简体中文</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 px-2 flex items-center">
                    <IconChevronDown className="h-4 w-4 text-white" aria-hidden="true" />
                </div>
            </div>
        </fieldset>
      </div>

    </div>
  </footer>
  )
}
