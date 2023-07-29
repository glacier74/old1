import type { Context } from 'react'
import { createContext } from 'react'

export interface IAction {
  type: string
  payload?: any
}

export type IFunction<T> = (state: T, payload?: IAction['payload']) => T

export interface IContext<T> {
  state: T
  dispatch: (action: IAction) => void
}

export function createIContext<T>(initialState: T): Context<IContext<T>> {
  return createContext<IContext<T>>({
    state: initialState,
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    dispatch: (() => {}) as (action: IAction) => void
  })
}

export function createIReducer<T>(
  actions: Record<string, IFunction<T>>,
  callback: (state: T, newState: T) => T
) {
  return (state: T, action: IAction) => {
    return callback(state, actions[action.type](state, action.payload))
  }
}
