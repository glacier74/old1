import { isFalse, isValidArray } from '@nily/utils'
import { v4 as uuidv4 } from 'uuid'

export function blockByType(type: BlockType, blockId?: string): Block {
  let block = {
    id: blockId || uuidv4(),
    type
  } as any

  switch (type) {
    case 'payment':
      block = {
        ...block,
        provider: 'stripe',
        productId: undefined,
        productName: undefined,
        productDescription: undefined,
        priceId: undefined,
        currency: 'USD',
        amount: 0,
        stripeAccount: undefined,
        stripeEmail: undefined,
        blocks: [
          {
            id: uuidv4(),
            type: 'heading',
            level: 3,
            placeholder: 'Heading'
          },
          {
            id: uuidv4(),
            type: 'paragraph',
            enableCommand: false,
            deletable: false,
            placeholder: 'Description',
            enterBehavior: 'focusNextBlock'
          },
          {
            id: uuidv4(),
            type: 'list',
            enableCommand: false,
            deletable: false,
            blocks: [
              {
                id: uuidv4(),
                type: 'paragraph',
                enableCommand: false,
                placeholder: 'Feature'
              }
            ]
          }
        ]
      }
      break

    case 'slide-gallery':
      block.sources = []
      break

    case 'feature':
      block = {
        ...block,
        align: 'left',
        blocks: [
          {
            id: uuidv4(),
            type: 'image',
            align: 'left'
          },
          {
            id: uuidv4(),
            type: 'group',
            blocks: [
              {
                id: uuidv4(),
                type: 'heading',
                level: 3,
                placeholder: 'Heading'
              },
              {
                id: uuidv4(),
                type: 'paragraph',
                enableCommand: false,
                deletable: false,
                placeholder: 'Description'
              }
            ]
          }
        ]
      }
      break
  }

  return block
}

export function getBlockIndex(blocks: Block[], id: string): number {
  return blocks.findIndex(b => b.id === id)
}

export function getBlockByPath(blocks: Block[], path: string[]): Block | undefined {
  const [p0, ...subPath] = path

  const block = blocks.find(b => b.id === p0)

  if (block) {
    if (subPath.length > 0) {
      return getBlockByPath((block as GroupBlock<any>).blocks, subPath)
    } else {
      return block
    }
  }
}

export const NESTED_DELETABLE_TYPES = ['list', 'group']
export const FOCUSABLE_TYPES = ['heading', 'paragraph']
export const DELETABLE_TYPES = [...NESTED_DELETABLE_TYPES, ...FOCUSABLE_TYPES]

export function blocksToLocations(blocks: Block[], parent?: BlockLocation): BlockLocation[] {
  let result: BlockLocation[] = []

  blocks.forEach((b, index) => {
    let deletable = false

    if (DELETABLE_TYPES.includes(b.type) && !isFalse(b.deletable)) {
      if (!parent) {
        deletable = index > 0
      } else if (NESTED_DELETABLE_TYPES.includes(parent.type)) {
        deletable = parent.deletable || index > 0
      }
    }

    const location = {
      id: b.id,
      type: b.type,
      path: parent?.path || [],
      deletable
    }

    result.push(location)

    // Child blocks
    if (isValidArray((b as GroupBlock<any>).blocks)) {
      result = [
        ...result,
        ...blocksToLocations((b as GroupBlock<any>).blocks, {
          ...{},
          ...location,
          path: [...location.path, b.id]
        })
      ]
    }
  })

  return result
}

export function previousFocusableBlock(blocks: Block[], index: number) {
  return blocks
    .slice(0, index)
    .filter(b => FOCUSABLE_TYPES.includes(b.type))
    .at(-1)
}

export function nextFocusableBlock(blocks: Block[], index: number) {
  return blocks
    .slice(index + 1)
    .filter(b => FOCUSABLE_TYPES.includes(b.type))
    .at(0)
}

export function stripeConnectStep(block: PaymentBlock) {
  return block.productId ? 'selectPrice' : block.stripeAccount ? 'product' : 'connect'
}
