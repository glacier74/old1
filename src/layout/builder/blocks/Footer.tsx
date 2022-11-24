import { Menus } from '@heyforms/ui'
import { useTranslation } from 'next-i18next'
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
import { useProduct, useSiteSettings } from '~/layout'
import { useBuilderContext } from '~/layout/builder/context'

import { BlockComponent, BlockPreview, BlockProps } from './Block'

const ShareComponent: FC<{ product: Product; siteSetting: SiteSettings }> = ({
  product,
  siteSetting
}) => {
  return (
    <div className="sm:flex mt-10 py-10 border-t border-slate-100 sm:justify-between justify-center">
      <div className="flex items-center justify-center space-x-3">
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

        {siteSetting.linkedin && (
          <a
            href={siteSetting.linkedin}
            className="text-slate-700 hover:text-slate-900"
            target="_blank"
          >
            <IconLinkedin />
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

      <p className="pt-2 md:pt-0 text-base text-slate-900 text-center">
        {new Date().getFullYear()} {product?.name}
      </p>
    </div>
  )
}

export const FooterSettings: FC = () => {
  const { t } = useTranslation()
  const { dispatch } = useBuilderContext()

  function handleClick() {
    dispatch({
      type: 'update',
      payload: {
        isSocialMediaOpen: true
      }
    })
  }

  return <Menus.Item label={t('builder.footer.settings')} onClick={handleClick} />
}

export const FooterPreview: FC<BlockProps & { product: Product; siteSetting: SiteSettings }> = ({
  block,
  product,
  siteSetting
}) => {
  return (
    <BlockPreview block={block}>
      <ShareComponent product={product} siteSetting={siteSetting} />
    </BlockPreview>
  )
}

export const Footer: FC<BlockProps> = ({ block }) => {
  const product = useProduct()
  const siteSetting = useSiteSettings()

  return (
    <BlockComponent block={block}>
      <ShareComponent product={product} siteSetting={siteSetting} />
    </BlockComponent>
  )
}
