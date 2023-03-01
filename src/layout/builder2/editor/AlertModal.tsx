import { Modal } from '@heyforms/ui'
import { ModalProps } from '@heyforms/ui/types/modal/Modal'
import { FC } from 'react'

export const AlertModal: FC<ModalProps> = ({ visible }) => {
  function handleConfirm() {
    window.location.reload()
  }

  return (
    <Modal.Confirm
      type="danger"
      visible={visible}
      title="The page has been updated by someone"
      maskClosable={false}
      description={
        <div className="space-y-2">
          <p>
            This page has been updated with changes that are not currently displayed, and they may
            have been made by you.
          </p>
          <p>
            Please click on the 'Refresh page' button to refresh with the latest changes and
            continue editing. Note that any unsaved changes made during this session will be lost.
          </p>
        </div>
      }
      confirmLabel="Refresh page"
      onConfirm={handleConfirm}
    />
  )
}
