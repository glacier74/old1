import { objectPath } from '@nily/utils'

export interface IState {
  blockDatalist: BlockData<any>[]
  selectedBlockId?: string

  // View the desktop or mobile version of the landing page
  previewMode: 'desktop' | 'mobile'

  // Left sidebar
  isBlocksOpen?: boolean
  isBlockModalOpen?: boolean
}

export interface InitStateAction {
  type: 'initState'
  payload: {
    blockDatalist: BlockData<any>[]
  }
}

export interface UpdateStateAction {
  type: 'updateState'
  payload: {
    updates: Partial<IState>
  }
}

export interface SelectBlockAction {
  type: 'selectBlock'
  payload: {
    blockId: string
  }
}

export interface SetBlocksAction {
  type: 'setBlocks'
  payload: {
    blockDatalist: BlockData<any>[]
  }
}

export interface AddBlockAction {
  type: 'addBlock'
  payload: {
    block: any
  }
}

export interface UpdateBlockAction {
  type: 'updateBlock'
  payload: {
    blockId: string
    updates: AnyMap<any>
  }
}

export function initState(state: IState, payload: InitStateAction['payload']): IState {
  state.blockDatalist = payload.blockDatalist

  return state
}

export function updateState(state: IState, payload: UpdateStateAction['payload']): IState {
  return {
    ...state,
    ...payload.updates
  }
}

export function setBlocks(state: IState, payload: SetBlocksAction['payload']): IState {
  state.blockDatalist = payload.blockDatalist

  return state
}

export function addBlock(state: IState, payload: AddBlockAction['payload']) {
  state.blockDatalist.push(payload.block)
  return state
}

export function selectBlock(state: IState, payload: SelectBlockAction['payload']) {
  state.selectedBlockId = payload.blockId

  return state
}

export function updateBlock(state: IState, payload: UpdateBlockAction['payload']) {
  const blockData = state.blockDatalist.find(b => b.id === payload.blockId)

  if (blockData) {
    Object.keys(payload.updates).forEach(path => {
      objectPath.set(blockData, path, payload.updates[path])
    })
  }

  return state
}
