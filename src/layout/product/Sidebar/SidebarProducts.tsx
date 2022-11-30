import { Dropdown, Menus } from '@heyforms/ui'
import { isEqual } from '@nily/utils'
import { IconChevronDown, IconCircleCheck, IconPlus } from '@tabler/icons'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import type { FC } from 'react'
import { useEffect, useState } from 'react'

import { RoundImage } from '~/components'
import { useStore } from '~/store'

import { useProduct, useProductId } from '../../hook'

interface ProductItemProps {
  product: Product
  onClick: (product: Product) => void
}

const ProductItem: FC<ProductItemProps> = ({ product, onClick }) => {
  const { t } = useTranslation()
  const productId = useProductId()

  function handleClick() {
    onClick(product)
  }

  return (
    <div
      className="group flex items-center px-4 py-2 text-sm text-slate-700 cursor-pointer hover:bg-slate-100"
      onClick={handleClick}
    >
      <RoundImage src={product?.logo} imageSize={120} size={32} retainLength={2} />

      <div className="ml-4 flex-auto">
        <p className="text-sm font-medium text-slate-700 truncate">{product?.name}</p>
        <p className="text-xs text-slate-500 truncate">
          {t('product.member', { count: product?.users.length })}
        </p>
      </div>

      {isEqual(productId, product?.id) && (
        <IconCircleCheck className="ml-4 w-5 h-5 text-green-500" />
      )}
    </div>
  )
}

const Current: FC = () => {
  const product = useProduct()

  return (
    <button className="flex items-center w-full rounded-md text-sm text-left text-slate-700 hover:text-slate-900">
      <span className="flex min-w-0 items-center justify-between space-x-3">
        <RoundImage
          className="w-6 h-6 rounded-full flex-shrink-0"
          src={product?.logo}
          imageSize={120}
          size={24}
        />
        <span className="flex-1 text-sm font-medium truncate">{product?.name}</span>
      </span>
      <IconChevronDown className="flex-shrink-0 h-4 w-4 ml-1" />
    </button>
  )
}

const Skeleton = () => {
  return (
    <div className="flex items-center">
      <div className="w-6 h-6 bg-slate-200 rounded-full"></div>
      <div className="ml-3 h-4 rounded-sm skeleton" style={{ width: 100 }}></div>
    </div>
  )
}

export const SidebarProducts: FC = () => {
  const { t } = useTranslation()
  const router = useRouter()
  const { isReady, products } = useStore()

  const [visible, setVisible] = useState(false)

  function handleCreate() {
    router.push('/onboarding')
  }

  function handleClick(product: Product) {
    setVisible(false)
    router.push(`/product/${product.id}`)
  }

  const Overlay = (
    <div className="menus w-64">
      {products.map(product => (
        <ProductItem key={product.id} product={product} onClick={handleClick} />
      ))}
      <Menus.Divider />
      <Menus.Item
        value="create"
        icon={<IconPlus />}
        label={t('sidebar.createProduct')}
        onClick={handleCreate}
      />
    </div>
  )

  useEffect(() => {
    router.prefetch('/onboarding')
  }, [])

  return (
    <div className="px-4">
      {isReady ? (
        <Dropdown
          className="block w-full"
          placement="bottom-start"
          overlay={Overlay}
          visible={visible}
        >
          <Current />
        </Dropdown>
      ) : (
        <Skeleton />
      )}
    </div>
  )
}
