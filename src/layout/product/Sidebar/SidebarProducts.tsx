import { Dropdown, Menus } from '@heyforms/ui'
import { isEqual } from '@nily/utils'
import { IconChevronDown, IconCircleCheck, IconPlus } from '@tabler/icons'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import type { FC } from 'react'
import { useEffect, useState } from 'react'

import { RoundImage } from '~/components'
import { PLAN_NAMES } from '~/constants'
import { useStore } from '~/store'
import { useVisible } from '~/utils'

import { useProduct, useProductId } from '../../hook'
import { UpgradeModal } from './UpgradeModal'

interface ProductItemProps {
  product: Product
  onClick: (product: Product) => void
}

const ProductItem: FC<ProductItemProps> = ({ product, onClick }) => {
  const { t } = useTranslation('dashboard')
  const productId = useProductId()

  function handleClick() {
    onClick(product)
  }

  return (
    <div
      className="group flex items-center px-4 py-2 text-sm text-slate-700 cursor-pointer hover:bg-slate-100"
      onClick={handleClick}
    >
      <RoundImage
        src={product?.logo}
        imageSize={32}
        text={product?.name}
        size={32}
        retainLength={2}
      />

      <div className="ml-2 flex-auto min-w-0 max-w-[9.75rem]">
        <p className="text-sm font-medium text-slate-700 truncate">{product?.name}</p>
        <p className="text-xs text-slate-500 truncate">
          {product.subscription ? PLAN_NAMES[product.subscription.planId] : 'Free'} Plan -{' '}
          {t('product.member', { count: product?.users.length })}
        </p>
      </div>

      {isEqual(productId, product?.id) && (
        <IconCircleCheck className="ml-1 w-5 h-5 text-emerald-500" />
      )}
    </div>
  )
}

const Current: FC = () => {
  const product = useProduct()

  return (
    <button className="flex items-center w-full rounded-md text-sm text-left text-slate-700 hover:text-slate-900">
      <span className="flex flex-1 items-center space-x-3">
        <RoundImage
          className="w-6 h-6 rounded-full flex-shrink-0"
          src={product?.logo}
          text={product?.name}
          retainLength={2}
          imageSize={24}
          size={24}
        />
        <span className="max-w-[12.5rem] text-sm font-medium truncate">{product?.name}</span>
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
  const { t } = useTranslation('dashboard')
  const router = useRouter()
  const { isReady, user, products } = useStore()

  const [visible, setVisible] = useState(false)
  const [upgradeModalVisible, openUpgradeModal, closeUpgradeModal] = useVisible()

  function handleCreate() {
    if (products.length >= user.subscription.plan.landingPages) {
      return openUpgradeModal()
    }

    router.push('/product/create')
  }

  function handleClick(product: Product) {
    setVisible(false)
    router.push(`/product/${product.id}`)
  }

  const Overlay = (
    <div className="menus product-dropdown-menus !w-[16rem]">
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
    router.prefetch('/product/create')
  }, [])

  return (
    <>
      <div className="px-4">
        {isReady ? (
          <Dropdown
            className="product-dropdown block w-full"
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

      <UpgradeModal visible={upgradeModalVisible} onClose={closeUpgradeModal} />
    </>
  )
}
