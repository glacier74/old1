import { objectPath } from '@nily/utils'

export interface IState {
  isBuilderMode: boolean
  blocks: BlockData<any>[]
  selectedBlockId?: string
  version: number

  isSyncing: boolean
  lastSyncedAt: number

  // View the desktop or mobile version of the landing page
  previewMode: 'desktop' | 'mobile'

  // Left sidebar
  activeTabName?: string
  isCreateBlockModalOpen?: boolean
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
    blockId?: string
  }
}

export interface SetBlocksAction {
  type: 'setBlocks'
  payload: {
    blocks: BlockData<any>[]
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

export interface DeleteBlockAction {
  type: 'deleteBlock'
  payload: {
    blockId?: string
  }
}

export function updateState(state: IState, payload: UpdateStateAction['payload']): IState {
  return {
    ...state,
    ...payload.updates
  }
}

export function setBlocks(state: IState, payload: SetBlocksAction['payload']): IState {
  state.blocks = payload.blocks

  return state
}

export function addBlock(state: IState, payload: AddBlockAction['payload']) {
  const { blocks, selectedBlockId } = state
  const index = blocks.findIndex(b => b.id === selectedBlockId)

  if (index > -1) {
    blocks.splice(index + 1, 0, payload.block)
  } else {
    blocks.push(payload.block)
  }

  state.blocks = blocks
  return state
}

export function selectBlock(state: IState, payload: SelectBlockAction['payload']) {
  state.selectedBlockId = payload.blockId

  return state
}

export function deleteBlock(state: IState, payload: DeleteBlockAction['payload']) {
  state.blocks = state.blocks.filter(b => b.id !== payload.blockId)

  return state
}

export function updateBlock(state: IState, payload: UpdateBlockAction['payload']) {
  const blockData = state.blocks.find(b => b.id === payload.blockId)

  if (blockData) {
    Object.keys(payload.updates).forEach(path => {
      objectPath.set(blockData, path, payload.updates[path])
    })
  }

  return state
}
