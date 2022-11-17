import {
  IconBrandInstagram,
  IconBrandLinkedin,
  IconBrandTelegram,
  IconBrandTwitter,
  IconBrandYoutube
} from '@tabler/icons'

import { useProduct, useSiteSettings } from '~/layout'

export const SiteFooter = () => {
  const product = useProduct()
  const settings = useSiteSettings()

  return (
    <div className="site-footer mt-32 py-10 text-center">
      <div className="flex items-center justify-center space-x-3">
        {settings.enableTwitter && settings.twitter && (
          <a
            href={settings.twitter}
            className="text-slate-400 hover:text-slate-500"
            target="_blank"
          >
            <IconBrandTwitter />
          </a>
        )}

        {settings.enableFacebook && settings.facebook && (
          <a
            href={settings.facebook}
            className="text-slate-400 hover:text-slate-500"
            target="_blank"
          >
            <IconBrandYoutube />
          </a>
        )}

        {settings.enableInstagram && settings.instagram && (
          <a
            href={settings.instagram}
            className="text-slate-400 hover:text-slate-500"
            target="_blank"
          >
            <IconBrandInstagram />
          </a>
        )}

        {settings.enableYoutube && settings.youtube && (
          <a
            href={settings.youtube}
            className="text-slate-400 hover:text-slate-500"
            target="_blank"
          >
            <IconBrandYoutube />
          </a>
        )}

        {settings.enableTelegram && settings.telegram && (
          <a
            href={settings.telegram}
            className="text-slate-400 hover:text-slate-500"
            target="_blank"
          >
            <IconBrandTelegram />
          </a>
        )}

        {settings.enableLinkedin && settings.linkedin && (
          <a
            href={settings.linkedin}
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
