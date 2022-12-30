import { isEmpty } from '@nily/utils'
import { FC, useMemo } from 'react'

import { SocialMediaIcon } from '~/components'
import { SOCIAL_MEDIA_SETTINGS } from '~/constants'
import { useProduct } from '~/layout'

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
      <div className="block-footer-wrapper">
        <div className="block-footer-socialmedias">
          {socialMedias.map(row => (
            <a key={row.id} href={row.value} target={row.openInNewTab ? '_blank' : undefined}>
              <SocialMediaIcon type={row.type} />
            </a>
          ))}
        </div>

        <p className="block-footer-copyright">
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
      <div className="block-footer-wrapper">
        <div className="block-footer-socialmedias">
          {isEmpty(block.socialMedias) ? (
            <div className="font-normal text-sm">Set social medias in settings</div>
          ) : (
            block.socialMedias.map(row => (
              <a key={row.id} href={row.value} target={row.openInNewTab ? '_blank' : undefined}>
                <SocialMediaIcon type={row.type} />
              </a>
            ))
          )}
        </div>

        <p className="block-footer-copyright">
          {new Date().getFullYear()} {product?.name}
        </p>
      </div>
    </BlockComponent>
  )
}
