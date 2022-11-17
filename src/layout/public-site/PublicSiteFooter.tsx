import {
  IconBrandInstagram,
  IconBrandLinkedin,
  IconBrandTelegram,
  IconBrandTwitter,
  IconBrandYoutube
} from '@tabler/icons'
import { FC } from 'react'

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
            <IconBrandTwitter />
          </a>
        )}

        {siteSetting.enableFacebook && siteSetting.facebook && (
          <a
            href={siteSetting.facebook}
            className="text-slate-400 hover:text-slate-500"
            target="_blank"
          >
            <IconBrandYoutube />
          </a>
        )}

        {siteSetting.enableInstagram && siteSetting.instagram && (
          <a
            href={siteSetting.instagram}
            className="text-slate-400 hover:text-slate-500"
            target="_blank"
          >
            <IconBrandInstagram />
          </a>
        )}

        {siteSetting.enableYoutube && siteSetting.youtube && (
          <a
            href={siteSetting.youtube}
            className="text-slate-400 hover:text-slate-500"
            target="_blank"
          >
            <IconBrandYoutube />
          </a>
        )}

        {siteSetting.enableTelegram && siteSetting.telegram && (
          <a
            href={siteSetting.telegram}
            className="text-slate-400 hover:text-slate-500"
            target="_blank"
          >
            <IconBrandTelegram />
          </a>
        )}

        {siteSetting.enableLinkedin && siteSetting.linkedin && (
          <a
            href={siteSetting.linkedin}
            className="text-slate-400 hover:text-slate-500"
            target="_blank"
          >
            <IconBrandLinkedin />
          </a>
        )}
      </div>

      <p className="mt-2 text-sm text-slate-700">
        {new Date().getFullYear()} {product?.name}
      </p>
    </div>
  )
}
