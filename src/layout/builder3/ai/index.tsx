import { Modal } from '@heyforms/ui'
import { isFalse } from '@nily/utils'
import { useContext, useEffect, useMemo, useReducer } from 'react'

import { useStore } from '~/store'

import { AIProgress, QUESTIONS } from './AIProgress'
import { AIQuestion } from './AIQuestion'
import { AISections } from './AISections'
import { AISetup } from './AISetup'
import { AIStoreContext, AIStoreReducer } from './context'

const STEPS: any[] = [
  {
    value: 'initial',
    component: AISetup,
    isAllowToPrev: false
  },
  {
    value: 'sections',
    component: AISections,
    isHidden: true
  },
  ...QUESTIONS.map((data, index) => ({
    value: `question-${index}`,
    component: AIQuestion,
    data: {
      ...data,
      index
    }
  }))
]

const AIComponent = () => {
  const { state } = useContext(AIStoreContext)
  const step = useMemo(() => STEPS.find(s => s.value === state.active), [state.active])

  if (state.isGenerating) {
    return <AIProgress />
  }

  if (step) {
    return <step.component data={step.data} />
  }

  return null
}

const ModalComponent = () => {
  const [state, dispatch] = useReducer(AIStoreReducer, {
    steps: STEPS.map((s: any) => ({
      value: s.value,
      isAllowToPrev: !isFalse(s.isAllowToPrev),
      isNextButtonShow: !isFalse(s.isNextButtonShow)
    })),
    answers: Array.from({ length: QUESTIONS.length }) as string[],
    sections: [],
    sectionRange: 'all',
    active: STEPS[0].value,
    isGenerating: false
  })
  const value = useMemo(() => ({ state, dispatch }), [state])

  return (
    <AIStoreContext.Provider value={value}>
      <AIComponent />
    </AIStoreContext.Provider>
  )
}

export const AIModal = () => {
  const { siteSettings, isAIModalOpen, openAIModal, closeAIModal } = useStore()

  useEffect(() => {
    if (siteSettings.version === 0) {
      openAIModal()
    }
  }, [])

  return (
    <Modal
      contentClassName="ai-modal"
      visible={isAIModalOpen}
      onClose={closeAIModal}
      maskClosable={false}
      showCloseIcon={true}
    >
      {isAIModalOpen && <ModalComponent />}
    </Modal>
  )
}
