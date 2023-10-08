import { Modal } from '@heyforms/ui'
import { IconDoorExit } from '@tabler/icons'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import type { FC } from 'react'
import { useState } from 'react'

import { useProductId } from '~/layout'
import { ProductService } from '~/service'
import { useStore } from '~/store'

export const LeaveProduct: FC<IModalProps> = ({ visible, onClose }) => {
  const { t } = useTranslation('dashboard')
  const router = useRouter()
  const { user, removeProduct } = useStore()
  const productId = useProductId()

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  async function handleConfirm() {
    setLoading(true)
    setError(null)

    try {
      await ProductService.removeMember(productId, user.id)
      removeProduct(productId)

      router.replace('/')
    } catch (err: any) {
      setError(err)
    }

    setLoading(false)
  }

  return (
    <Modal.Confirm
      type="success"
      visible={visible}
      icon={<IconDoorExit />}
      title={t('member.leaveModal.heading')}
      description={
        <div className="space-y-2">
          <p>{t('member.leaveModal.description')}</p>
          {error && <div className="form-item-error">{error.message}</div>}
        </div>
      }
      cancelLabel={t('common.cancel')}
      confirmLabel={t('member.leaveModal.button')}
      confirmDisabled={loading}
      confirmLoading={loading}
      onClose={onClose}
      onCancel={onClose}
      onConfirm={handleConfirm}
    />
  )
}
