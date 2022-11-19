import { FC } from 'react'

import {
  IconFacebook,
  IconInstagram,
  IconLinkedin,
  IconTelegram,
  IconTwitter,
  IconYoutube
} from '~/components'

export const PublicSiteFooter: FC<{ product: Product }> = ({ product }) => {
  const { siteSetting } = product

  return (
    <div className="mt-32 py-10 text-center">
      <div className="flex items-center justify-center space-x-3">
        {siteSetting.enableTwitter && siteSetting.twitter && (
          <a
            href={siteSetting.twitter}
            className="text-slate-400 hover:text-slate-500"
            target="_blank"
          >
            <IconTwitter />
          </a>
        )}

        {siteSetting.enableFacebook && siteSetting.facebook && (
          <a
            href={siteSetting.facebook}
            className="text-slate-400 hover:text-slate-500"
            target="_blank"
          >
            <IconFacebook />
          </a>
        )}

        {siteSetting.enableInstagram && siteSetting.instagram && (
          <a
            href={siteSetting.instagram}
            className="text-slate-400 hover:text-slate-500"
            target="_blank"
          >
            <IconInstagram />
          </a>
        )}

        {siteSetting.enableYoutube && siteSetting.youtube && (
          <a
            href={siteSetting.youtube}
            className="text-slate-400 hover:text-slate-500"
            target="_blank"
          >
            <IconYoutube />
          </a>
        )}

        {siteSetting.enableTelegram && siteSetting.telegram && (
          <a
            href={siteSetting.telegram}
            className="text-slate-400 hover:text-slate-500"
            target="_blank"
          >
            <IconTelegram />
          </a>
        )}

        {siteSetting.enableLinkedin && siteSetting.linkedin && (
          <a
            href={siteSetting.linkedin}
            className="text-slate-400 hover:text-slate-500"
            target="_blank"
          >
            <IconLinkedin />
          </a>
        )}
      </div>

      <p className="mt-2 text-sm text-slate-500">
        Copyright © {new Date().getFullYear()} {product?.name}
      </p>
    </div>
  )
}
