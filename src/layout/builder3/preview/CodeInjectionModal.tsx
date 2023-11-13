import { Modal } from '@heyforms/ui'

import { CodeInjection } from '~/layout/builder3/rightSidebar/CodeInjection'
import { useStore } from '~/store'

const ModalComponent = () => {
  return (
    <div className="h-[450px] p-8">
      <div className="text-sm text-slate-700">
        <h1 className="text-2xl leading-6 font-bold text-slate-900">Code injection</h1>
        <div className="mt-8 space-y-6 -mx-4">
          <CodeInjection />
        </div>
      </div>
    </div>
  )
}

export const CodeInjectionModal = () => {
  const { isCodeInjectionModalOpen, closeCodeInjectionModal } = useStore()

  return (
    <Modal
      contentClassName="ai-modal"
      visible={isCodeInjectionModalOpen}
      onClose={closeCodeInjectionModal}
      maskClosable={false}
      showCloseIcon={true}
    >
      {isCodeInjectionModalOpen && <ModalComponent />}
    </Modal>
  )
}
