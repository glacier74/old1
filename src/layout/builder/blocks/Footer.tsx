import { Button, Menus } from '@heyforms/ui'
import { isEmpty } from '@nily/utils'
import { useTranslation } from 'next-i18next'
import { FC, useMemo } from 'react'

import { SocialMediaIcon } from '~/components'
import { SOCIAL_MEDIA_SETTINGS } from '~/constants'
import { useProduct } from '~/layout'
import { useBuilderContext } from '~/layout/builder/context'

import { BlockComponent, BlockPreview, BlockProps } from './Block'

export interface FooterProps extends BlockProps {
  block: FooterBlock
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

export const FooterPreview: FC<FooterProps & { product: Product }> = ({ block, product }) => {
  const socialMedias = useMemo(
    () =>
      block.socialMedias.map(row => ({
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
  const { dispatch } = useBuilderContext()

  function handleClick() {
    dispatch({
      type: 'update',
      payload: {
        isSocialMediaOpen: true
      }
    })
  }

  return (
    <BlockComponent block={block}>
      <div className="footer">
        <div className="flex items-center justify-center space-x-3">
          {isEmpty(block.socialMedias) ? (
            <Button.Link type="success" onClick={handleClick}>
              Click to add social medias
            </Button.Link>
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
