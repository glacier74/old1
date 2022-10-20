import { createStoreContext, createStoreReducer } from '@heyforms/ui'
import { deepEqual } from 'fast-equals'

interface IState {
  email: string | undefined
}

const actions: any = {
  setEmail(state: IState, email: string) {
    console.log('actions setEmail: %s', email)
    return { ...state, email }
  }
}

export const AuthStoreContext = createStoreContext<IState>({
  email: undefined
})

export const AuthStoreReducer = createStoreReducer<IState>(actions, (state, newState) => {
  return deepEqual(state, newState) ? state : newState
})
