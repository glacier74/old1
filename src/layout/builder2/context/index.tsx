import { IComponentProps } from '@heyforms/ui/types/typing'
import { deepClone, isValid, objectPath } from '@nily/utils'
import { deepEqual } from 'fast-equals'
import {
  FC,
  createContext,
  startTransition,
  useCallback,
  useContext,
  useMemo,
  useReducer
} from 'react'

import { getObjectPath } from '~/layout/builder2/utils'

import * as Actions from './actions'
import {
  AddBlockAction,
  DeleteBlockAction,
  IState,
  InitStateAction,
  SelectBlockAction,
  SetBlocksAction,
  UpdateBlockAction,
  UpdateStateAction
} from './actions'

type IAction =
  | InitStateAction
  | UpdateStateAction
  | SetBlocksAction
  | AddBlockAction
  | SelectBlockAction
  | UpdateBlockAction
  | DeleteBlockAction

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

export function useBlockData() {
  const { state } = useBuilderContext()

  if (isValid(state.selectedBlockId)) {
    return state.blockDatalist.find(b => b.id === state.selectedBlockId)
  }
}

export function useBlockSetting<T extends object>(path: string, defaults?: T) {
  const { dispatch } = useBuilderContext()
  const blockData = useBlockData()

  const rootPath = useMemo(() => getObjectPath('setting', path), [path])
  const setting = useMemo(
    () => (isValid(blockData) ? (objectPath.get(blockData, rootPath, defaults) as T) : defaults),
    [blockData, rootPath, defaults]
  )

  const updateSetting = useCallback(
    (value: any, key?: string) => {
      startTransition(() => {
        if (blockData?.id) {
          const _key = key ? getObjectPath(rootPath, key) : rootPath

          dispatch({
            type: 'updateBlock',
            payload: {
              blockId: blockData.id,
              updates: {
                [_key]: value
              }
            }
          })
        }
      })
    },
    [blockData?.id, dispatch, rootPath]
  )

  return {
    setting,
    updateSetting
  }
}

function updateState(state: IState, action: IAction): IState {
  const clonedState = deepClone(state)
  const newState: IState = (Actions as any)[action.type](clonedState as any, action.payload as any)

  if (deepEqual(newState, state)) {
    return state
  }

  return newState
}

const reducer = (state: IState, action: IAction) => {
  switch (action.type) {
    case 'initState':
    case 'updateState':
    case 'selectBlock':
    case 'addBlock':
    case 'updateBlock':
    case 'setBlocks':
    case 'deleteBlock':
      return updateState(state, action)

    default:
      throw new Error()
  }
}

export const BuilderProvider: FC<IComponentProps> = ({ children }) => {
  const initialState: IState = useMemo(
    () => ({
      blockDatalist: [],
      previewMode: 'desktop'
    }),
    []
  )
  const [state, dispatch] = useReducer(reducer, initialState)
  const value = useMemo(() => ({ state, dispatch }), [state])

  return <Context.Provider value={value}>{children}</Context.Provider>
}
