import { isEmpty } from '@nily/utils'
import { FC, useMemo } from 'react'

import { SocialMediaIcon } from '~/components'
import { SOCIAL_MEDIA_SETTINGS } from '~/constants'
import { useProduct } from '~/layout'
import { useBuilderContext } from '~/layout/builder/context'

import { BlockComponent, BlockPreview, BlockProps } from './Block'

export interface FooterProps extends BlockProps {
  block: FooterBlock
}

export const FooterPreview: FC<FooterProps & { product: Product }> = ({ block, product }) => {
  const socialMedias = useMemo(
    () =>
      (block.socialMedias || []).map(row => ({
        ...row,
        value: SOCIAL_MEDIA_SETTINGS.find(s => s.value === row.type)!.prefixUri + row.value
      })),
    [block.socialMedias]
  )

  return (
    <BlockPreview block={block}>
      <div className="footer">
        <div className="flex items-center justify-center space-x-3">
          {socialMedias.map(row => (
            <a key={row.id} href={row.value} target={row.openInNewTab ? '_blank' : undefined}>
              <SocialMediaIcon type={row.type} />
            </a>
          ))}
        </div>

        <p className="copyright">
          {new Date().getFullYear()} {product?.name}
        </p>
      </div>
    </BlockPreview>
  )
}

export const Footer: FC<FooterProps> = ({ block }) => {
  const product = useProduct()

  return (
    <BlockComponent block={block}>
      <div className="footer">
        <div className="flex items-center justify-center space-x-3">
          {isEmpty(block.socialMedias) ? (
            <div className="font-normal text-sm text-slate-400">Set social medias in settings</div>
          ) : (
            block.socialMedias.map(row => (
              <a key={row.id} href={row.value} target={row.openInNewTab ? '_blank' : undefined}>
                <SocialMediaIcon type={row.type} />
              </a>
            ))
          )}
        </div>

        <p className="copyright">
          {new Date().getFullYear()} {product?.name}
        </p>
      </div>
    </BlockComponent>
  )
}
