import { Button, Menus } from '@heyforms/ui'
import { IconMenu2, IconX } from '@tabler/icons'
import { useTranslation } from 'next-i18next'
import { FC, useState } from 'react'
import { useLockBodyScroll } from 'react-use'

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
  const [isOpen, setIsOpen] = useState(false)

  function handleClick() {
    setIsOpen(isOpen => !isOpen)
  }

  useLockBodyScroll(isOpen)

  return (
    <BlockPreview className="block-navigation-container" block={block}>
      <a
        className="text-2xl"
        href={`https://${product.domain}.${process.env.NEXT_PUBLIC_PUBLIC_SITE_DOMAIN}`}
        title={product.name}
      >
        {product.name}
      </a>
      <div className="hidden md:flex md:items-center space-x-4">
        {block.links.map(row => (
          <a key={row.id} href={row.url} target={row.openInNewTab ? '_blank' : undefined}>
            {row.title}
          </a>
        ))}
      </div>

      <div className="md:hidden">
        <Button.Link leading={isOpen ? <IconX /> : <IconMenu2 />} onClick={handleClick} />
      </div>
      {isOpen && (
        <div className="fixed top-24 left-5 right-5 bg-white rounded-lg shadow-xl z-10 md:hidden">
          <div className="flex flex-col py-2 space-y-2">
            {block.links.map(row => (
              <a
                key={row.id}
                className="px-5 py-2"
                href={row.url}
                target={row.openInNewTab ? '_blank' : undefined}
              >
                {row.title}
              </a>
            ))}
          </div>
        </div>
      )}
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
