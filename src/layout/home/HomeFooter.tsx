import { useTranslation } from 'next-i18next'
import Link from 'next/link'
import { FC } from 'react'

import { IconFacebook, IconLinkedin, IconTwitter, IconYoutube } from '~/components'

export const HomeFooter: FC = () => {
  const { t } = useTranslation()

  return (
    <footer className="p-4 bg-gray-800">
      <div className="flex items-center justify-between">
        <div className="flex items-center text-xs text-white space-x-5">
          <div>{new Date().getFullYear()} EarlyBird</div>
          <Link href="/privacy" title={t('home.privacy')}>
            Privacy
          </Link>
          <Link href="/terms" title={t('home.terms')}>
            Terms
          </Link>
        </div>

        <div className="flex items-center text-white space-x-3">
          <a href="#" target="_blank">
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
