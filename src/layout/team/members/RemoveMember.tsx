import { Modal } from '@heyforms/ui'
import type { FC } from 'react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

interface RemoveMemberProps extends IModalProps {
  user?: User
}

export const RemoveMember: FC<RemoveMemberProps> = ({ visible, user, onClose }) => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)
  const { t } = useTranslation()

  async function handleConfirm() {
    setLoading(true)
    setError(null)

    try {
      // await WorkspaceService.removeMember(workspaceId, user!.id)
      // workspaceStore.deleteMember(workspaceId, user!.id)

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
