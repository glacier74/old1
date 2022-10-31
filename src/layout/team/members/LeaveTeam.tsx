import { Modal } from '@heyforms/ui'
import type { FC } from 'react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useRouter } from 'next/router'

export const LeaveTeam: FC<IModalProps> = ({ visible, onClose }) => {
  const router = useRouter()

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)
  const { t } = useTranslation()

  async function handleConfirm() {
    setLoading(true)
    setError(null)

    try {
      // await WorkspaceService.leave(workspaceId)
      // workspaceStore.deleteWorkspace(workspaceId)

      router.replace('/')
    } catch (err: any) {
      setError(err)
    }

    setLoading(false)
  }

  return (
    <Modal.Confirm
      type="danger"
      visible={visible}
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
