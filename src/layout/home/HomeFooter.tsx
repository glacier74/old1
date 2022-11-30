import { useTranslation } from 'next-i18next'
import Link from 'next/link'
import { FC } from 'react'

import { IconFacebook, IconLinkedin, IconTwitter, IconYoutube } from '~/components'

export const HomeFooter: FC = () => {
  const { t } = useTranslation()

  return (
    <footer className="p-6 bg-slate-900">
      <div className="max-w-7xl mx-auto px-5 flex flex-col md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col md:flex-row items-center text-sm text-slate-400 md:space-x-5">
          <div>Copyright © {new Date().getFullYear()} EarlyBird All Rights Reserved.</div>
          <div className="flex items-center justify-center mt-4 md:mt-0 space-x-5">
            <Link href="https://help.earlybird.im/privacy" title={t('home.privacy')}>
              Privacy
            </Link>
            <Link href="https://help.earlybird.im/tos" title={t('home.terms')}>
              Terms
            </Link>
          </div>
        </div>

        <div className="flex items-center justify-center md:justify-end mt-4 md:mt-0 text-slate-400 space-x-3">
          <a href="https://twitter.com/earlybirdim" target="_blank">
            <IconTwitter />
          </a>
          <a href="https://facebook.com/earlybirdim" target="_blank">
            <IconFacebook />
          </a>
          <a href="https://www.linkedin.com/company/earlybirdim/" target="_blank">
            <IconLinkedin />
          </a>
          <a href="https://www.youtube.com/@earlybirdim" target="_blank">
            <IconYoutube />
          </a>
        </div>
      </div>
    </footer>
  )
}
