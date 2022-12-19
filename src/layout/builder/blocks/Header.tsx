import { Button } from '@heyforms/ui'
import { isEmpty } from '@nily/utils'
import { IconMenu2, IconX } from '@tabler/icons'
import { FC, useState } from 'react'
import { useLockBodyScroll } from 'react-use'

import { useProduct } from '~/layout'
import { useBuilderContext } from '~/layout/builder/context'
import { cropImage } from '~/utils'

import { BlockComponent, BlockPreview, BlockProps } from './Block'

export interface HeaderProps extends BlockProps {
  block: HeaderBlock
}

export const HeaderPreview: FC<HeaderProps & { product: Product }> = ({ block, product }) => {
  const [isOpen, setIsOpen] = useState(false)

  function handleClick() {
    setIsOpen(isOpen => !isOpen)
  }

  useLockBodyScroll(isOpen)

  return (
    <BlockPreview className="block-header-container" block={block}>
      <a
        className="block-header-logo text-2xl"
        href={`https://${product.domain}.${process.env.NEXT_PUBLIC_PUBLIC_SITE_DOMAIN}`}
        title={product.name}
      >
        {product.logo ? (
          <img src={cropImage(product.logo, 120, 120)} />
        ) : (
          <span>{product.name}</span>
        )}
      </a>
      <div className="hidden text-lg md:flex md:items-center space-x-4">
        {block.links.map(row => (
          <a key={row.id} href={row.url} target={row.openInNewTab ? '_blank' : undefined}>
            {row.title}
          </a>
        ))}
      </div>

      <div className="md:hidden">
        <Button.Link
          className="block-header-button"
          leading={isOpen ? <IconX /> : <IconMenu2 />}
          onClick={handleClick}
        />
      </div>
      {isOpen && (
        <div className="fixed top-20 left-0 right-0 bg-white rounded-lg shadow-xl z-10 md:hidden">
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

export const Header: FC<HeaderProps> = ({ block }) => {
  const product = useProduct()

  return (
    <BlockComponent className="block-header-container" block={block}>
      <a
        className="text-2xl"
        href={`https://${product.domain}.${process.env.NEXT_PUBLIC_PUBLIC_SITE_DOMAIN}`}
        title={product.name}
      >
        {product.name}
      </a>
      <div className="flex items-center space-x-4">
        {isEmpty(block.links) ? (
          <div className="font-normal text-slate-400">Set links in settings</div>
        ) : (
          block.links.map(row => (
            <a key={row.id} href={row.url} target={row.openInNewTab ? '_blank' : undefined}>
              {row.title}
            </a>
          ))
        )}
      </div>
    </BlockComponent>
  )
}
