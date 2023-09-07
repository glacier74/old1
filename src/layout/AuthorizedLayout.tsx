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
  const { t } = useTranslation()
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

  async function fetchData() {
    try {
      const [user, products] = await Promise.all([UserService.user(), ProductService.products()])

      setUser(user)
      setProducts(products)

      // Save to localstorage
      expireLocalStorage.setItem<User>(userKey, user)
      expireLocalStorage.setItem<Product[]>(productsKey, products)
    } catch (err: any) {
      console.error(err)

      if (err.response?.statusCode === 401 || err.statusCode === 401) {
        setRedirectURL(JsCookie, router.asPath)

        await AuthService.logout()
        await router.replace('/login')
      }
    }
  }

  useAsyncEffect(async () => {
    const user = expireLocalStorage.getItem<User>(userKey)
    const products = expireLocalStorage.getItem<Product[]>(productsKey, [])

    if (isValid(user) && isValid(products)) {
      // Re-fetch new data without block
      fetchData()

      setUser(user)
      setProducts(products)
    } else {
      await fetchData()
    }

    setIsReady(true)
  }, [])

  return (
    <BaseLayout seo={seo}>
      {children}
      <DeletionAlertModal />
    </BaseLayout>
  )
}
