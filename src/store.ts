import { createStoreContext, createStoreReducer } from '@heyforms/ui'
import { deepEqual } from 'fast-equals'
import { useContext } from 'react'
import { Team, User } from '@/service'

interface IState {
  authEmail?: string
  isReady?: boolean
  teams: Team[]
  user?: User
}

const actions: any = {
  setAuthEmail(state: IState, authEmail: string): IState {
    return { ...state, authEmail }
  },

  setInitialData(state: IState, payload: AnyMap<any>): IState {
    return { ...state, ...payload }
  },

  setTeams(state: IState, teams: Team[]): IState {
    return { ...state, teams }
  },

  setUser(state: IState, user: any): IState {
    return { ...state, user }
  }
}

export const StoreContext = createStoreContext<IState>({} as IState)

export const StoreReducer = createStoreReducer<IState>(actions, (state, newState) => {
  return deepEqual(state, newState) ? state : newState
})

export const useStoreContext = () => {
  return useContext(StoreContext)
}
