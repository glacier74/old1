import { createStoreContext, createStoreReducer } from '@heyforms/ui'

interface Step {
  value: string
  isAllowToPrev: boolean
  isNextButtonShow: boolean
  isHidden?: boolean
}

interface IState {
  steps: Step[]
  active: string
  sectionRange: 'all' | 'partial'
  answers: string[]
  sections: string[]
  isGenerating?: boolean
}

const actions: any = {
  toPrev(state: IState) {
    const steps = state.steps.filter(s => !s.isHidden)
    const index = steps.findIndex(s => s.value === state.active)

    if (index > 0) {
      return {
        ...state,
        active: steps[index - 1].value
      }
    }

    return state
  },

  toNext(state: IState) {
    const steps = state.steps.filter(s => !s.isHidden)
    const index = steps.findIndex(s => s.value === state.active)

    if (index < steps.length - 1) {
      return {
        ...state,
        active: steps[index + 1].value
      }
    }

    return state
  },

  setState(state: IState, updates: Partial<IState>) {
    return {
      ...state,
      ...updates
    }
  },

  setSectionRange(state: IState, sectionRange: 'all' | 'partial') {
    state.sectionRange = sectionRange
    state.steps = state.steps.map(s =>
      s.value === 'sections' ? { ...s, isHidden: sectionRange === 'all' } : s
    )

    return actions.toNext(state)
  }
}

export const AIStoreContext = createStoreContext<IState>({} as IState)
export const AIStoreReducer = createStoreReducer<IState>(
  actions,
  (_prevState, newState) => newState
)
