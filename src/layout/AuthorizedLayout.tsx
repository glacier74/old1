import { Modal, notification } from '@heyforms/ui'
import { date } from '@nily/utils'
import Cookies from 'js-cookie'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { useEffect, useMemo } from 'react'

import { BaseLayout } from '~/layout/BaseLayout'
import { AuthService, ProductService, UserService } from '~/service'
import { useStore } from '~/store'
import { getBrowserId, setBrowserId, useAsyncEffect, useRequest } from '~/utils'

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

  useAsyncEffect(async () => {
    // 检查是否有 browserId
    const browserId = getBrowserId(Cookies)

    if (!browserId) {
      setBrowserId(Cookies)
    }

    try {
      const [user, products] = await Promise.all([UserService.user(), ProductService.products()])

      setUser(user)
      setProducts(products)
      setIsReady(true)
    } catch (err: any) {
      if (err.statusCode === 401) {
        await AuthService.logout()
        router.replace('/login')
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
