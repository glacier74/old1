import { Modal } from '@heyforms/ui'
import { isEmpty, isValid } from '@nily/utils'
import { FC, useMemo } from 'react'

export const ContactModal: FC<{ contact?: Contact; onClose: () => void }> = ({
  contact,
  onClose
}) => {
  const children = useMemo(() => {
    if (isEmpty(contact)) {
      return null
    }

    return (
      <div className="space-y-8 text-sm">
        <div className="text-lg leading-6 font-medium text-slate-900">Email Capture Details</div>

        <div className="space-y-1.5">
          <div className="text-slate-800 font-medium">Name</div>
          <div className="text-slate-500">{contact!.name || '-'}</div>
        </div>

        <div className="space-y-1.5">
          <div className="text-slate-800 font-medium">Email address</div>
          <div className="text-slate-500">{contact!.email}</div>
        </div>

        <div className="space-y-1.5">
          <div className="text-slate-800 font-medium">Subject</div>
          <div className="text-slate-500">{contact!.subject || '-'}</div>
        </div>

        <div className="space-y-1.5">
          <div className="text-slate-800 font-medium">Message</div>
          <div className="text-slate-500 whitespace-pre-line">{contact!.message || '-'}</div>
        </div>
      </div>
    )
  }, [contact])

  return (
    <Modal visible={isValid(contact)} showCloseIcon={true} onClose={onClose}>
      {children}
    </Modal>
  )
}
