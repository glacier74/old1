import { useContext } from 'react'

import { createIContext, createIReducer } from '../Context'
import { CollapseState } from './CollapseProps'

const actions = {
  open(state: CollapseState, key: string): CollapseState {
    return {
      ...state,
      activeKeys: state.accordion ? new Set(key) : new Set(state.activeKeys.add(key))
    }
  },

  close(state: CollapseState, key: string): CollapseState {
    return {
      ...state,
      activeKeys: new Set([...state.activeKeys].filter(x => x !== key))
    }
  }
}

export const CollapseContext = createIContext<CollapseState>({} as CollapseState)

export const useCollapseContext = () => {
  return useContext(CollapseContext)
}

export const CollapseReducer = createIReducer<CollapseState>(actions, (_, newState) => {
  return newState
})
