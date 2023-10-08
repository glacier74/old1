import { Modal } from '@heyforms/ui'
import { useTranslation } from 'next-i18next'
import type { FC } from 'react'
import { useState } from 'react'

import { useProductId } from '~/layout'
import { ProductService } from '~/service'
import { useStore } from '~/store'

interface RemoveMemberProps extends IModalProps {
  member?: User
}

export const RemoveMember: FC<RemoveMemberProps> = ({ visible, member, onClose }) => {
  const { t } = useTranslation('dashboard')
  const { removeMember } = useStore()
  const productId = useProductId()

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  async function handleConfirm() {
    setLoading(true)
    setError(null)

    try {
      await ProductService.removeMember(productId, member!.id)
      removeMember(productId, member!.id)

      // Hide modal
      onClose?.()
    } catch (err: any) {
      setError(err)
    }

    setLoading(false)
  }

  return (
    <Modal.Confirm
      type="danger"
      visible={visible}
      title={t('member.removeModal.heading')}
      description={
        <div className="space-y-2">
          <p>{t('member.removeModal.description')}</p>
          {error && <div className="form-item-error">{error.message}</div>}
        </div>
      }
      cancelLabel={t('common.cancel')}
      confirmLabel={t('member.removeModal.button')}
      confirmDisabled={loading}
      confirmLoading={loading}
      onClose={onClose}
      onCancel={onClose}
      onConfirm={handleConfirm}
    />
  )
}
