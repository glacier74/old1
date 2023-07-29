import { IComponentProps } from '@heyforms/ui/types/typing'
import { deepClone, isArray, isEmpty, isNil, isObject, objectPath } from '@nily/utils'
import { deepEqual } from 'fast-equals'
import { FC, createContext, useCallback, useContext, useMemo, useReducer } from 'react'

import * as Actions from './actions'
import { IState, UpdateOptionsAction, UpdateStateAction, updateOptions } from './actions'

type IAction = UpdateStateAction | UpdateOptionsAction

interface IContext {
  state: IState
  dispatch: (action: IAction) => void
}

const Context = createContext<IContext>({
  state: {} as IState,
  dispatch: () => {
    //
  }
})

export function useBuilderContext(): IContext {
  return useContext(Context)
}

function getOptions<T>(options: AnyMap<any>, path: string): T {
  return objectPath.get(options, path) as T
}

interface UseOptionsResult<T> {
  value: T
  update: (newValue: T) => void
}

export function useOptions<T>(path: string): UseOptionsResult<T | undefined>
export function useOptions<T>(path: string, defaultValue: T): UseOptionsResult<T>
export function useOptions<T>(...args: unknown[]) {
  const { state, dispatch } = useBuilderContext()

  const [path, defaultValue] = args as [string, T | undefined]
  const value = useMemo(
    () => getOptions<T>(state.options, path) || defaultValue,
    [defaultValue, path, state.options]
  )

  const update = useCallback(
    (newValue?: T) => {
      dispatch({
        type: 'updateOptions',
        payload: {
          options: {
            [path]: newValue
          }
        }
      })
    },
    [dispatch, path]
  )

  return {
    value,
    update
  }
}

export function useMergeOptions() {
  const { dispatch } = useBuilderContext()

  function flatObject(values: any, list: AnyMap<string> = {}, parentName: string) {
    if (isArray(values)) {
      values.forEach((v, index) => {
        const name = [parentName, index].join('.')

        if (isObject(v)) {
          flatObject(v, list, name)
        } else if (!isNil(v)) {
          list[name] = v
        }
      })

      return list
    }

    Object.keys(values).forEach(key => {
      const name = [parentName, key].join('.')
      const v = values[key]

      if (isArray(v) || isObject(v)) {
        return flatObject(v, list, name)
      } else if (!isNil(v)) {
        list[name] = v
      }
    })

    return list
  }

  return useCallback(
    (name: string, values: AnyMap<any>) => {
      if (isEmpty(values) || !(isObject(values) || isArray(values))) {
        return
      }

      const options: AnyMap<string> = {}
      flatObject(values, options, name)

      dispatch({
        type: 'updateOptions',
        payload: {
          options
        }
      })
    },
    [dispatch]
  )
}

const SYNC_ACTION_TYPES = ['updateOptions']

function updateState(state: IState, action: IAction): IState {
  const clonedState = deepClone(state)
  const newState: IState = (Actions as any)[action.type](clonedState as any, action.payload as any)

  if (deepEqual(newState, state)) {
    return state
  }

  if (SYNC_ACTION_TYPES.includes(action.type)) {
    newState.version += 1
  }

  return newState
}

const reducer = (state: IState, action: IAction) => {
  switch (action.type) {
    case 'updateState':
    case 'updateOptions':
      return updateState(state, action)

    default:
      throw new Error()
  }
}

interface BuilderProviderProps extends IComponentProps {
  initialState?: Partial<IState>
}

export const BuilderProvider: FC<BuilderProviderProps> = ({
  initialState: rawInitialState,
  children
}) => {
  const initialState: IState = useMemo(
    () => ({
      isBuilderMode: true,
      options: {},
      selectedOptionName: undefined,
      completions: [],
      selectedCompletionName: undefined,
      previewMode: 'desktop',
      version: 0,
      isSyncing: false,
      lastSyncedAt: 0,
      ...rawInitialState
    }),
    []
  )
  const [state, dispatch] = useReducer(reducer, initialState)
  const value = useMemo(() => ({ state, dispatch }), [state])

  return <Context.Provider value={value}>{children}</Context.Provider>
}
