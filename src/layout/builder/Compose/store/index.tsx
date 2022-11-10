import { deepClone } from '@nily/utils'
import { deepEqual } from 'fast-equals'
import { FC, ReactNode, createContext, useContext, useMemo, useReducer } from 'react'

import { RichTextSelection, blocksToLocations } from '../utils'
import * as Actions from './actions'

export interface IState {
  blocks: Block[]
  locations: BlockLocation[]

  // Selected block
  selectedBlockId?: string

  // RichText
  textSelection?: RichTextSelection
  searchKeyword?: string

  //  BubbleMenu
  isBubbleMenuOpen: boolean
  bubbleMenuRange?: Range

  // CommandMenu
  isCommandMenuOpen: boolean

  // StripeConnectModal
  stripeConnectBlock?: PaymentBlock
  stripeProduct?: StripeProduct
  stripeConnectStep?: string
}

export interface UpdateAction {
  type: 'update'
  payload: Partial<IState>
}

export interface SetBlocksAction {
  type: 'setBlocks'
  payload: Block[]
}

export interface MoveBlockAction {
  type: 'moveBlock'
  payload: {
    blockId: string
    afterId: string
  }
}

export interface AddBlockAction {
  type: 'addBlock'
  payload: {
    block: Block | any
    afterId?: string
  }
}

export interface UpdateBlockAction {
  type: 'updateBlock'
  payload: {
    blockId: string
    updates: any
  }
}

export interface DeleteBlockAction {
  type: 'deleteBlock'
  payload: {
    blockId: string
    backspaceEvent?: boolean
  }
}

export interface FocusBlockAction {
  type: 'focusBlock'
  payload: {
    blockId: string
    direction?: 'up' | 'down'
  }
}

export interface UpdateStripeConnectAction {
  type: 'updateStripeConnect'
  payload: {
    stripeConnectBlock: Partial<PaymentBlock>
    stripeConnectStep: string
  }
}

type IAction =
  | UpdateAction
  | SetBlocksAction
  | MoveBlockAction
  | AddBlockAction
  | UpdateBlockAction
  | DeleteBlockAction
  | FocusBlockAction
  | UpdateStripeConnectAction

interface IContext {
  state: IState
  dispatch: (action: IAction) => void
}

const context = createContext<IContext>({
  state: {} as IState,
  dispatch: () => {
    //
  }
})

export function useComposeStore(): IContext {
  return useContext(context)
}

interface ComposeStoreProviderProps {
  blocks: Block[]
  children?: ReactNode
}

function updateState(state: IState, action: IAction): IState {
  const clonedState = deepClone(state)
  const newState: IState = (Actions as any)[action.type](clonedState as any, action.payload as any)

  return deepEqual(newState, state) ? state : newState
}

const reducer = (state: IState, action: IAction) => {
  switch (action.type) {
    case 'update':
    case 'setBlocks':
    case 'moveBlock':
    case 'addBlock':
    case 'updateBlock':
    case 'deleteBlock':
    case 'focusBlock':
    case 'updateStripeConnect':
      return updateState(state, action)

    default:
      throw new Error()
  }
}

export const ComposeStoreProvider: FC<ComposeStoreProviderProps> = ({ blocks, children }) => {
  const initialState: IState = useMemo(() => {
    return {
      blocks,
      locations: blocksToLocations(blocks),
      selection: {} as Selection,
      isBubbleMenuOpen: false,
      isCommandMenuOpen: false,
      isStripeConnectModalOpen: false
    }
  }, [blocks])
  const [state, dispatch] = useReducer(reducer, initialState)
  const value = useMemo(() => ({ state, dispatch }), [state])

  return <context.Provider value={value}>{children}</context.Provider>
}
