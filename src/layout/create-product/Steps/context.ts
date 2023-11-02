import { createStoreContext, createStoreReducer } from '@heyforms/ui'

interface Step {
  value: string
  isAllowToPrev: boolean
  isNextButtonShow: boolean
}

interface IState {
  isTemplateLoading?: boolean
  templates: Template_V3[]
  categories: string[]
  steps: Step[]
  active: string
  type: string
}

const actions: any = {
  toPrev(state: IState) {
    const index = state.steps.findIndex(s => s.value === state.active)

    if (index > 0) {
      return {
        ...state,
        active: state.steps[index - 1].value
      }
    }

    return state
  },

  toNext(state: IState) {
    const index = state.steps.findIndex(s => s.value === state.active)

    if (index < state.steps.length - 1) {
      return {
        ...state,
        active: state.steps[index + 1].value
      }
    }

    return state
  },

  setState(state: IState, updates: Partial<IState>) {
    return {
      ...state,
      ...updates
    }
  }
}

export const StepsStoreContext = createStoreContext<IState>({} as IState)
export const StepsStoreReducer = createStoreReducer<IState>(
  actions,
  (_prevState, newState) => newState
)
