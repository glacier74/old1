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
    <div className="flex mt-10 py-10 border-t border-slate-100 justify-between">
      <div className="flex justify-start space-x-3 inline-block">
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

      <p className="text-base text-slate-900 inline-block">
        Copyright © {new Date().getFullYear()} {product?.name}
      </p>
    </div>
  )
}
