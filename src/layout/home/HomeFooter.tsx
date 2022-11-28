import { useTranslation } from 'next-i18next'
import Link from 'next/link'
import { FC } from 'react'

import { IconFacebook, IconLinkedin, IconTwitter, IconYoutube } from '~/components'

export const HomeFooter: FC = () => {
  const { t } = useTranslation()

  return (
    <footer className="p-6 bg-slate-900">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center text-sm text-slate-400 space-x-5">
          <div>© {new Date().getFullYear()}. EarlyBird All Rights Reserved.</div>
          <Link href="/privacy" title={t('home.privacy')}>
            Privacy
          </Link>
          <Link href="/terms" title={t('home.terms')}>
            Terms
          </Link>
        </div>

        <div className="flex items-center text-slate-400 space-x-3">
          <a href="https://twitter.com/earlybirdim" target="_blank">
            <IconTwitter />
          </a>
          <a href="#" target="_blank">
            <IconFacebook />
          </a>
          <a href="#" target="_blank">
            <IconLinkedin />
          </a>
          <a href="#" target="_blank">
            <IconYoutube />
          </a>
        </div>
      </div>
    </footer>
  )
}
