import { FC } from 'react'

import {
  IconFacebook,
  IconGithub,
  IconInstagram,
  IconLinkedin,
  IconTelegram,
  IconTwitter,
  IconYoutube
} from '~/components'

export const PublicSiteFooter: FC<{ product: Product }> = ({ product }) => {
  const { siteSetting } = product

  return (
    <div className="max-w-6xl mx-auto sm:flex mt-10 py-10 border-t border-slate-100 sm:justify-between justify-center">
      <div className="flex my-4 sm:my-0 sm:justify-start justify-center space-x-3">
        {siteSetting.twitter && (
          <a
            href={siteSetting.twitter}
            className="text-slate-700 hover:text-slate-900"
            target="_blank"
          >
            <IconTwitter />
          </a>
        )}

        {siteSetting.facebook && (
          <a
            href={siteSetting.facebook}
            className="text-slate-700 hover:text-slate-900"
            target="_blank"
          >
            <IconFacebook />
          </a>
        )}

        {siteSetting.instagram && (
          <a
            href={siteSetting.instagram}
            className="text-slate-700 hover:text-slate-900"
            target="_blank"
          >
            <IconInstagram />
          </a>
        )}

        {siteSetting.youtube && (
          <a
            href={siteSetting.youtube}
            className="text-slate-700 hover:text-slate-900"
            target="_blank"
          >
            <IconYoutube />
          </a>
        )}

        {siteSetting.telegram && (
          <a
            href={siteSetting.telegram}
            className="text-slate-700 hover:text-slate-900"
            target="_blank"
          >
            <IconTelegram />
          </a>
        )}

        {siteSetting.linkedin && (
          <a
            href={siteSetting.linkedin}
            className="text-slate-700 hover:text-slate-900"
            target="_blank"
          >
            <IconLinkedin />
          </a>
        )}

        {siteSetting.github && (
          <a
            href={siteSetting.github}
            className="text-slate-700 hover:text-slate-900"
            target="_blank"
          >
            <IconGithub />
          </a>
        )}
      </div>

      <p className="text-base text-slate-900 text-center">
        Copyright © {new Date().getFullYear()} {product?.name}
      </p>
    </div>
  )
}
