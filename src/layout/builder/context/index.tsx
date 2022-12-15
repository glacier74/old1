import { IComponentProps } from '@heyforms/ui/types/typing'
import { deepClone } from '@nily/utils'
import { deepEqual } from 'fast-equals'
import { FC, createContext, useContext, useMemo, useReducer } from 'react'

import { RichTextSelection } from '../utils'
import * as Actions from './actions'
import { setBlocks } from './actions'

export interface IState {
  lastSyncedBlocks: Block[]
  blocks: Block[]
  flattedBlocks: FlattedBlock[]
  focusableBlockMap: AnyMap<string[]>
  rootBlocks: string[]

  previewMode: 'desktop' | 'mobile'
  isBlocksChanged?: boolean
  isBlocksSidebarOpen: boolean
  isSettingsSidebarOpen: boolean

  // Selected block
  focusBlockId?: string
  selectBlockId?: string

  // RichText
  textSelection?: RichTextSelection
  searchKeyword?: string

  //  BubbleMenu
  isBubbleMenuOpen: boolean
  bubbleMenuRange?: Range
  enableFormats?: Array<'basic' | 'align'> | null

  // StripeConnectModal
  stripeConnectBlock?: PaymentBlock
  stripeProduct?: StripeProduct
  stripeConnectStep?: string

  // Social media
  isSocialMediaOpen: boolean

  // Header
  isHeaderOpen: boolean
}

export interface UpdateAction {
  type: 'update'
  payload: Partial<IState>
}

export interface InitBlocksAction {
  type: 'initBlocks'
  payload: Block[]
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

export interface DuplicateBlockAction {
  type: 'duplicateBlock'
  payload: {
    blockId: string
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

export interface SelectBlockAction {
  type: 'selectBlock'
  payload: {
    blockId: string
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
  | InitBlocksAction
  | SetBlocksAction
  | MoveBlockAction
  | AddBlockAction
  | DuplicateBlockAction
  | UpdateBlockAction
  | DeleteBlockAction
  | SelectBlockAction
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

export function useBuilderContext(): IContext {
  return useContext(context)
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
    case 'update':
    case 'initBlocks':
    case 'setBlocks':
    case 'moveBlock':
    case 'addBlock':
    case 'duplicateBlock':
    case 'updateBlock':
    case 'deleteBlock':
    case 'selectBlock':
    case 'focusBlock':
    case 'updateStripeConnect':
      return updateState(state, action)

    default:
      throw new Error()
  }
}

export const BuilderProvider: FC<IComponentProps> = ({ children }) => {
  const initialState: IState = useMemo(
    () => ({
      lastSyncedBlocks: [],
      blocks: [],
      flattedBlocks: [],
      focusableBlockMap: {},
      rootBlocks: [],
      previewMode: 'desktop',
      isBlocksChanged: false,
      isBlocksSidebarOpen: false,
      isSettingsSidebarOpen: false,
      isBubbleMenuOpen: false,
      isCommandMenuOpen: false,
      isSocialMediaOpen: false,
      isHeaderOpen: false
    }),
    []
  )
  const [state, dispatch] = useReducer(reducer, initialState)
  const value = useMemo(() => ({ state, dispatch }), [state])

  return <context.Provider value={value}>{children}</context.Provider>
}
