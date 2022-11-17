import { isFalse, isValidArray } from '@nily/utils'

import {
  blockByType,
  blocksToLocations,
  getBlockByPath,
  getBlockIndex,
  nextFocusableBlock,
  previousFocusableBlock
} from '../utils'
import {
  AddBlockAction,
  DeleteBlockAction,
  FocusBlockAction,
  IState,
  MoveBlockAction,
  UpdateAction,
  UpdateBlockAction,
  UpdateStripeConnectAction
} from './index'

export function update(state: IState, updates: UpdateAction['payload']): IState {
  return { ...state, ...updates }
}

export function setBlocks(state: IState, blocks: Block[]): IState {
  if (blocks.length < 1 || blocks.at(-1)!.type !== 'paragraph') {
    blocks.push(blockByType('paragraph'))
  }

  state.blocks = blocks
  state.locations = blocksToLocations(blocks)

  return state
}

export function moveBlock(state: IState, payload: MoveBlockAction['payload']): IState {
  const { blocks } = state
  const { blockId, afterId } = payload

  // Don't swap self
  if (blockId === afterId) {
    return state
  }

  const originalIndex = getBlockIndex(blocks, blockId)
  let toIndex = getBlockIndex(blocks, afterId)

  if (toIndex < originalIndex) {
    toIndex += 1
  }

  const _blocks = blocks.splice(originalIndex, 1)
  blocks.splice(toIndex, 0, ..._blocks)

  return setBlocks(state, blocks)
}

export function addBlock(state: IState, payload: AddBlockAction['payload']): IState {
  const { blocks, locations } = state

  if (payload.afterId) {
    const location = locations.find(l => l.id === payload.afterId)

    if (location) {
      // Nested blocks
      if (isValidArray(location.path)) {
        const parent = getBlockByPath(blocks, location.path) as GroupBlock

        if (parent) {
          const index = getBlockIndex(parent.blocks, payload.afterId)

          index > -1 && parent.blocks.splice(index + 1, 0, payload.block)
        }
      } else {
        const index = getBlockIndex(blocks, payload.afterId)

        index > -1 && blocks.splice(index + 1, 0, payload.block)
      }
    }
  } else {
    blocks.push(payload.block)
  }

  state.selectedBlockId = payload.block.id

  return setBlocks(state, blocks)
}

export function updateBlock(state: IState, payload: UpdateBlockAction['payload']): IState {
  const { blocks, locations } = state
  const location = locations.find(l => l.id === payload.blockId)

  if (!location) {
    return state
  }

  if (isValidArray(location!.path)) {
    const parent = getBlockByPath(blocks, location!.path) as GroupBlock
    const index = getBlockIndex(parent.blocks, payload.blockId)

    if (index > -1) {
      parent.blocks[index] = {
        ...parent.blocks[index],
        ...payload.updates
      }
    }
  } else {
    const index = getBlockIndex(blocks, payload.blockId)

    if (index > -1) {
      blocks[index] = {
        ...blocks[index],
        ...payload.updates
      }
    }
  }

  return setBlocks(state, blocks)
}

export function deleteBlock(state: IState, payload: DeleteBlockAction['payload']): IState {
  const { blocks, locations } = state
  const location = locations.find(l => l.id === payload.blockId)

  if (payload.backspaceEvent && isFalse(location?.deletable)) {
    return state
  }

  const blockIndex = getBlockIndex(blocks, payload.blockId)
  const prevLocation = previousFocusableBlock(locations, blockIndex)

  if (prevLocation) {
    state.selectedBlockId = prevLocation?.id
  }

  if (isValidArray(location?.path)) {
    const parent = getBlockByPath(blocks, location!.path) as GroupBlock
    const index = getBlockIndex(parent.blocks, payload.blockId)

    index > -1 && parent.blocks.splice(index, 1)
  } else {
    blockIndex > -1 && blocks.splice(blockIndex, 1)
  }

  return setBlocks(state, blocks)
}

export function focusBlock(state: IState, payload: FocusBlockAction['payload']): IState {
  const { locations } = state

  let blockId: string | undefined = payload.blockId
  const index = getBlockIndex(locations, blockId)

  if (index < 0) {
    return state
  }

  if (payload.direction) {
    switch (payload.direction) {
      case 'up':
        blockId = previousFocusableBlock(locations, index)?.id
        break

      case 'down':
        blockId = nextFocusableBlock(locations, index)?.id
        break
    }
  } else {
    const location = locations[index]

    // Focus block with root id
    if (isValidArray(location.path)) {
      blockId = location.path[0]
    }
  }

  if (blockId) {
    state.selectedBlockId = blockId
  }

  return state
}

export function updateStripeConnect(
  state: IState,
  payload: UpdateStripeConnectAction['payload']
): IState {
  return {
    ...state,
    stripeConnectBlock: {
      ...state.stripeConnectBlock,
      ...payload.stripeConnectBlock
    } as PaymentBlock,
    stripeConnectStep: payload.stripeConnectStep
  }
}
