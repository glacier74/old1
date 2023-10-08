import { Modal } from '@heyforms/ui'
import { useTranslation } from 'next-i18next'
import type { FC } from 'react'
import { useCallback, useState } from 'react'

import { IconTransfer } from '~/components'
import { useProductId } from '~/layout'
import { ProductService } from '~/service'
import { useStore } from '~/store'

interface TransferProductProps extends IModalProps {
  member?: User
}

export const TransferProduct: FC<TransferProductProps> = ({ visible, member, onClose }) => {
  const { t } = useTranslation('dashboard')
  const productId = useProductId()
  const { user, updateMember } = useStore()

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  const handleConfirm = useCallback(async () => {
    setLoading(true)
    setError(null)

    try {
      await ProductService.transfer(productId, member!.id)

      updateMember(productId, [
        {
          id: user.id,
          role: 'admin'
        },
        {
          id: member!.id,
          role: 'owner'
        }
      ])

      // Hide modal
      onClose?.()
    } catch (err: any) {
      setError(err)
    }

    setLoading(false)
  }, [productId, member?.id])

  return (
    <Modal.Confirm
      type="danger"
      visible={visible}
      icon={<IconTransfer />}
      title={t('member.transferModal.heading', { name: member?.name })}
      description={
        <div className="space-y-2">
          <p>{t('member.transferModal.description', { name: member?.name })}</p>
          {error && <div className="form-item-error">{error.message}</div>}
        </div>
      }
      cancelLabel={t('common.cancel')}
      confirmLabel={t('member.transferModal.button')}
      confirmDisabled={loading}
      confirmLoading={loading}
      onClose={onClose}
      onCancel={onClose}
      onConfirm={handleConfirm}
    />
  )
}
