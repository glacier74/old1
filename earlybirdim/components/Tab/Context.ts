import { useContext } from 'react'

import { createIContext, createIReducer } from '../Context'
import { TabState } from './TabProps'

const actions = {
  setActiveKey(state: TabState, activeKey?: string): TabState {
    return {
      ...state,
      activeKey
    }
  }
}

export const TabContext = createIContext<TabState>({} as TabState)

export const useTabContext = () => {
  return useContext(TabContext)
}

export const TabReducer = createIReducer<TabState>(actions, (_, newState) => {
  return newState
})
