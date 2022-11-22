import { Menus } from '@heyforms/ui'
import { useTranslation } from 'next-i18next'
import { FC } from 'react'

import { useProduct } from '~/layout'
import { useBuilderContext } from '~/layout/builder/context'

import { BlockComponent, BlockPreview, BlockProps } from './Block'

export interface NavigationProps extends BlockProps {
  block: NavigationBlock
}

export const NavigationPreview: FC<NavigationProps & { product: Product }> = ({
  block,
  product
}) => {
  return (
    <BlockPreview className="block-navigation-container" block={block}>
      <a
        className="text-2xl"
        href={`https://${product.domain}.${process.env.NEXT_PUBLIC_PUBLIC_SITE_DOMAIN}`}
        title={product.name}
      >
        {product.name}
      </a>
      <div className="flex items-center space-x-4">
        {block.links.map(row => (
          <a key={row.id} href={row.url} target={row.openInNewTab ? '_blank' : undefined}>
            {row.title}
          </a>
        ))}
      </div>
    </BlockPreview>
  )
}

export const NavigationSettings: FC<Pick<NavigationProps, 'block'>> = () => {
  const { t } = useTranslation()
  const { dispatch } = useBuilderContext()

  function handleClick() {
    dispatch({
      type: 'update',
      payload: {
        isNavigationOpen: true
      }
    })
  }

  return <Menus.Item label={t('builder.navigation.settings')} onClick={handleClick} />
}

export const Navigation: FC<NavigationProps> = ({ block }) => {
  const product = useProduct()

  return (
    <BlockComponent className="block-navigation-container" block={block}>
      <a
        className="text-2xl"
        href={`https://${product.domain}.${process.env.NEXT_PUBLIC_PUBLIC_SITE_DOMAIN}`}
        title={product.name}
      >
        {product.name}
      </a>
      <div className="flex items-center space-x-4">
        {block.links.map(row => (
          <a key={row.id} href={row.url} target={row.openInNewTab ? '_blank' : undefined}>
            {row.title}
          </a>
        ))}
      </div>
    </BlockComponent>
  )
}
