import { Modal } from '@heyforms/ui'
import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'

export const UpgradeModal: FC<IModalProps> = ({ visible, onClose }) => {
  return (
    <Modal
      className="upgrade-modal"
      visible={visible}
      maskClosable={false}
      showCloseIcon
      onClose={onClose}
      style={{ height: '100vh', width: '100vw', overflow: 'hidden' }}
    >
      <div className="flex flex-col justify-center items-center h-full">
        <div className="my-2">
          <Image
            src="/static/upgrade.png"
            alt="Upgrade EarlyBird plan"
            width={288}
            height={288}
            className="w-64 h-64 mx-auto"
          />
          <h1 className="max-w-xl mx-auto font-bold text-slate-900 text-4xl text-center">
            Page quota limit reached
          </h1>
          <p className="max-w-3xl mx-auto mt-4 text-lg text-slate-500 text-center">
            You have reached the maximum page limit. Upgrade your plan to increase it.
          </p>
        </div>
        <div className="p-4">
          <div className="flex items-center justify-center">
            <Link className="py-2.5 px-6 bg-[#10b981] rounded-md text-white" href="/account/plan">
              Upgrade plan
            </Link>
          </div>
        </div>
      </div>
    </Modal>
  )
}
