import { Button } from '@heyforms/ui'
import { isEmpty, isValidArray } from '@nily/utils'
import { IconMenu2, IconX } from '@tabler/icons'
import { FC, useState } from 'react'
import { useLockBodyScroll } from 'react-use'

import { useProduct } from '~/layout'
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
    <BlockPreview block={block}>
      <a className="block-header-logo" href="/" title={product.name}>
        {product.logo ? (
          <img src={cropImage(product.logo, 120, 120)} />
        ) : (
          <span>{product.name}</span>
        )}
      </a>
      <div className="block-header-nav">
        {block.links.map(row => (
          <a key={row.id} href={row.url} target={row.openInNewTab ? '_blank' : undefined}>
            {row.title}
          </a>
        ))}
      </div>

      <div className="md:hidden">
        {isValidArray(block.links) && (
          <Button.Link
            className="block-header-button"
            leading={isOpen ? <IconX /> : <IconMenu2 />}
            onClick={handleClick}
          />
        )}
      </div>

      {isOpen && (
        <div className="block-header-mobile-nav">
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
    <BlockComponent block={block}>
      <a
        className="block-header-logo"
        href={`https://${product.domain}.${process.env.NEXT_PUBLIC_PUBLIC_SITE_DOMAIN}`}
        title={product.name}
      >
        {product.logo ? (
          <img src={cropImage(product.logo, 120, 120)} />
        ) : (
          <span>{product.name}</span>
        )}
      </a>
      <div className="flex items-center space-x-4">
        {isEmpty(block.links) ? (
          <div className="font-normal block-text-placeholder">Set links in settings</div>
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
