import { Modal, notification } from '@heyforms/ui'
import { date, isValid } from '@nily/utils'
import JsCookie from 'js-cookie'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { useEffect, useMemo } from 'react'

import { BaseLayout } from '~/layout/BaseLayout'
import { AuthService, ProductService, UserService } from '~/service'
import { useStore } from '~/store'
import { setRedirectURL, useAsyncEffect, useRequest } from '~/utils'
import { expireLocalStorage } from '~/utils/localstorage'

const userKey = process.env.NEXT_PUBLIC_USER_STORAGE_NAME!
const productsKey = process.env.NEXT_PUBLIC_PRODUCTS_STORAGE_NAME!

const DeletionAlertModal = () => {
  const { t } = useTranslation('dashboard')
  const { user, isDeletionAlertShow, updateUser, openDeletionAlert, closeDeletionAlert } =
    useStore()

  const remainingTime = useMemo(() => {
    if (user?.deletionScheduledAt > 0) {
      return Math.ceil((user.deletionScheduledAt - date.timestamp()) / 3600)
    }
    return 0
  }, [user.deletionScheduledAt])

  const { loading, error, request } = useRequest(async () => {
    await UserService.cancelDeletion()

    updateUser({
      isDeletionScheduled: false,
      deletionScheduledAt: 0
    })

    notification.success({
      title: t('account.dangerZone.canceledText')
    })

    closeDeletionAlert()
  }, [])

  useEffect(() => {
    if (user.isDeletionScheduled) {
      openDeletionAlert()
    } else {
      closeDeletionAlert()
    }
  }, [user.isDeletionScheduled])

  useEffect(() => {
    if (error) {
      notification.error({
        title: t(error.message)
      })
    }
  }, [error])

  return (
    <Modal.Confirm
      type="danger"
      visible={isDeletionAlertShow}
      title={t('account.dangerZone.deletionAlert')}
      description={
        <div className="space-y-2">
          <p>{t('account.dangerZone.alertTip1', { remainingTime })}</p>
          <p>{t('account.dangerZone.alertTip2')}</p>
        </div>
      }
      confirmLabel={t('account.dangerZone.cancel')}
      confirmLoading={loading}
      onClose={closeDeletionAlert}
      onConfirm={request}
    />
  )
}

export const AuthorizedLayout = ({ seo, children }: LayoutProps) => {
  const router = useRouter()
  const { setUser, setProducts, setIsReady } = useStore()

  async function fetchUser() {
    const user = await UserService.user()

    setUser(user)
    expireLocalStorage.setItem<User>(userKey, user)
  }

  async function fetchProducts() {
    const products = await ProductService.products()

    setProducts(products)
    expireLocalStorage.setItem<Product[]>(productsKey, products)
  }

  useAsyncEffect(async () => {
    const user = expireLocalStorage.getItem<User>(userKey)
    const products = expireLocalStorage.getItem<Product[]>(productsKey, [])

    try {
      if (isValid(user)) {
        setUser(user)
        fetchUser()
      } else {
        await fetchUser()
      }

      if (isValid(products)) {
        setProducts(products)
        fetchProducts()
      } else {
        await fetchProducts()
      }

      setIsReady(true)
    } catch (err: any) {
      if (err.response?.statusCode === 401 || err.statusCode === 401) {
        setRedirectURL(JsCookie, router.asPath)

        await AuthService.logout()
        await router.replace('/login')
      }
    }
  }, [])

  return (
    <BaseLayout seo={seo}>
      {children}
      <DeletionAlertModal />
    </BaseLayout>
  )
}
