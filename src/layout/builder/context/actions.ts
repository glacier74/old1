import { deepClone, isEmpty, isFalse, isValidArray } from '@nily/utils'
import { deepEqual } from 'fast-equals'

import {
  copyBlock,
  flattenBlocks,
  getBlockByPath,
  getBlockIndex,
  removeBlocksProperties
} from '../utils'
import {
  AddBlockAction,
  DeleteBlockAction,
  DuplicateBlockAction,
  FocusBlockAction,
  IState,
  MoveBlockAction,
  SelectBlockAction,
  UpdateAction,
  UpdateBlockAction,
  UpdateStripeConnectAction
} from './index'

export function update(state: IState, updates: UpdateAction['payload']): IState {
  return { ...state, ...updates }
}

export function initBlocks(state: IState, blocks: Block[]): IState {
  // Remove invalid property
  removeBlocksProperties(blocks, ['chosen'])

  state.lastSyncedBlocks = deepClone(blocks)
  state = setBlocks(state, blocks)
  state.isBlocksChanged = false

  // Select first block
  if (isEmpty(state.selectBlockId) && isValidArray(blocks)) {
    state = selectBlock(state, {
      blockId: blocks[0].id
    })
  }

  return state
}

export function setBlocks(state: IState, blocks: Block[]): IState {
  // Remove invalid property
  removeBlocksProperties(blocks, ['chosen'])

  const { flattedBlocks, rootBlocks, focusableBlockMap } = flattenBlocks(blocks)

  state.blocks = blocks
  state.flattedBlocks = flattedBlocks
  state.focusableBlockMap = focusableBlockMap
  state.rootBlocks = rootBlocks
  state.isBlocksChanged = !deepEqual(state.lastSyncedBlocks, blocks)

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
  const { blocks, flattedBlocks } = state

  if (payload.afterId) {
    const fb = flattedBlocks.find(fb => fb.id === payload.afterId)

    if (fb) {
      const parent = getBlockByPath(blocks, fb.path.slice(0, -1)) as any

      if (parent) {
        if (parent.type === 'list') {
          const index = getBlockIndex(parent.content, payload.afterId)

          if (index > -1) {
            parent.content.splice(index + 1, 0, payload.block)
          }
        }
      }

      // Add root block after `payload.afterId`
      else {
        const index = getBlockIndex(blocks, payload.afterId)

        if (index > -1) {
          blocks.splice(index + 1, 0, payload.block)
        }
      }
    }
  }

  // Add root block
  else {
    blocks.push(payload.block)
  }

  state = setBlocks(state, blocks)

  return selectBlock(state, {
    blockId: payload.block.id
  })
}

export function duplicateBlock(state: IState, payload: DuplicateBlockAction['payload']): IState {
  const { blockId } = payload
  const block = state.blocks.find(b => b.id === blockId)

  if (!block) {
    return state
  }

  return addBlock(state, {
    block: copyBlock(deepClone(block)),
    afterId: blockId
  })
}

export function updateBlock(state: IState, payload: UpdateBlockAction['payload']): IState {
  const { blocks, flattedBlocks } = state
  const fb = flattedBlocks.find(l => l.id === payload.blockId)

  if (!fb) {
    return state
  }

  if (fb.rootId) {
    const parent = getBlockByPath(blocks, fb.path.slice(0, -1)) as any

    if (parent) {
      if (parent.type === 'list') {
        const index = getBlockIndex(parent.content, payload.blockId)

        if (index > -1) {
          parent.content[index] = {
            ...parent.content[index],
            ...payload.updates
          }
        }
      } else {
        let key: string | undefined

        Object.keys(parent).forEach(k => {
          if (parent[k]?.id === fb.id) {
            key = k
          }
        })

        if (key) {
          Object.keys(payload.updates).forEach(k => {
            parent[key!][k] = payload.updates[k]
          })
        }
      }
    }
  }

  // Update root block
  else {
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
  const { blocks, flattedBlocks } = state
  const fb = flattedBlocks.find(bp => bp.id === payload.blockId)

  if (!fb || (payload.backspaceEvent && isFalse(fb.deletable))) {
    return state
  }

  if (fb.rootId) {
    const parent = getBlockByPath(blocks, fb.path.slice(0, -1)) as any

    if (parent?.type === 'list') {
      const index = getBlockIndex(parent.content, payload.blockId)

      if (index > -1) {
        parent.content.splice(index, 1)

        const focusIndex = Math.max(0, index - 1)

        // Focus on previous block
        state = selectBlock(state, {
          blockId: parent.content[focusIndex].id
        })
      }
    }
  }

  // Delete root block
  else {
    const index = getBlockIndex(blocks, payload.blockId)

    if (index > -1) {
      const focusIndex = Math.max(0, index - 1)

      // Focus on previous root block
      state = selectBlock(state, {
        blockId: blocks[focusIndex].id
      })

      blocks.splice(index, 1)
    }
  }

  return setBlocks(state, blocks)
}

function getFocusableBlocks(rootBlocks: string[], focusableBlockMap: AnyMap<string[]>): string[] {
  return rootBlocks.reduce(
    (prev: string[], curr) => [...prev, ...(focusableBlockMap[curr] || [])],
    []
  )
}

export function selectBlock(state: IState, payload: SelectBlockAction['payload']): IState {
  const { flattedBlocks, selectBlockId, focusableBlockMap } = state
  const { blockId } = payload

  if (selectBlockId === blockId) {
    return state
  }

  const index = getBlockIndex(flattedBlocks, blockId)

  if (index < 0) {
    return state
  }

  if (focusableBlockMap[blockId]) {
    state.focusBlockId = focusableBlockMap[blockId][0]
  }

  state.selectBlockId = blockId
  return state
}

export function focusBlock(state: IState, payload: FocusBlockAction['payload']): IState {
  const { flattedBlocks, rootBlocks, focusableBlockMap } = state

  const { blockId } = payload
  let index = getBlockIndex(flattedBlocks, blockId)

  if (index < 0) {
    return state
  }

  if (!payload.direction) {
    const fb = flattedBlocks[index]
    const selectBlockId = fb?.rootId || blockId

    if (index > -1) {
      state.focusBlockId = blockId
    } else if (focusableBlockMap[selectBlockId]) {
      state.focusBlockId = focusableBlockMap[selectBlockId][0]
    }

    state.selectBlockId = selectBlockId
    return state
  }

  const fbIds = getFocusableBlocks(rootBlocks, focusableBlockMap)
  const length = fbIds.length

  let focusId: string | undefined = blockId
  index = fbIds.indexOf(blockId)

  switch (payload.direction) {
    case 'up':
      focusId = fbIds[index > 0 ? index - 1 : 0]
      break

    case 'down':
      focusId = fbIds[index < length - 1 ? index + 1 : length - 1]
      break
  }

  const fb = flattedBlocks.find(fb => fb.id === focusId)

  state.selectBlockId = fb?.rootId || blockId
  state.focusBlockId = focusId

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
