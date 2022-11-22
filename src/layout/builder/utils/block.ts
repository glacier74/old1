import { isValidArray } from '@nily/utils'
import { v4 as uuidv4 } from 'uuid'

export function blockByType(type: BlockType, blockId?: string): Block {
  let block = {
    id: blockId || uuidv4(),
    type
  } as Block

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
        heading: {
          id: uuidv4(),
          type: 'heading',
          level: 3,
          html: ''
        },
        description: {
          id: uuidv4(),
          type: 'text',
          html: ''
        },
        content: {
          id: uuidv4(),
          type: 'list',
          content: [
            {
              id: uuidv4(),
              type: 'text',
              html: ''
            }
          ]
        }
      } as PaymentBlock
      break

    case 'slideGallery':
      ;(block as SlideGalleryBlock).sources = []
      break

    case 'feature':
      block = {
        ...block,
        align: 'left',
        image: {
          id: uuidv4(),
          type: 'image',
          source: ''
        },
        heading: {
          id: uuidv4(),
          type: 'heading',
          level: 3,
          html: ''
        },
        content: {
          id: uuidv4(),
          type: 'text',
          html: ''
        }
      } as FeatureBlock
      break

    case 'heading':
      block = {
        ...block,
        level: 3
      } as HeadingBlock
      break
  }

  return block
}

export function getBlockIndex(blocks: any[], id: string): number {
  return blocks.findIndex(b => b.id === id)
}

function featureBlockPaths(
  block: FeatureBlock,
  flattedBlocks: FlattedBlock[],
  focusableBlockMap: Record<string, string[]>,
  path: Array<string | number>
) {
  // Feature Block
  flattedBlocks.push({
    id: block.id,
    path
  })

  // Image
  flattedBlocks.push({
    id: block.image.id,
    rootId: block.id,
    path: [...path, 'image']
  })

  // Heading
  flattedBlocks.push({
    id: block.heading.id,
    rootId: block.id,
    path: [...path, 'heading']
  })

  // Content
  flattedBlocks.push({
    id: block.content.id,
    rootId: block.id,
    path: [...path, 'content']
  })

  // Add to focusable blocks
  focusableBlockMap[block.id] = [block.heading.id, block.content.id]
}

function paymentBlockPaths(
  block: PaymentBlock,
  flattedBlocks: FlattedBlock[],
  focusableBlockMap: Record<string, string[]>,
  path: Array<string | number>
) {
  // Payment Block
  flattedBlocks.push({
    id: block.id,
    path
  })

  // Heading
  flattedBlocks.push({
    id: block.heading.id,
    rootId: block.id,
    path: [...path, 'heading']
  })

  // Description
  flattedBlocks.push({
    id: block.description.id,
    rootId: block.id,
    path: [...path, 'description']
  })

  // Add to focusable blocks
  focusableBlockMap[block.id] = [block.heading.id, block.description.id]

  // List
  listBlockPaths(block.content, flattedBlocks, focusableBlockMap, [...path, 'content'], block.id)
}

function listBlockPaths(
  block: ListBlock,
  flattedBlocks: FlattedBlock[],
  focusableBlockMap: Record<string, string[]>,
  path: Array<string | number>,
  rootId?: string
) {
  // List Block
  flattedBlocks.push({
    id: block.id,
    rootId,
    path
  })

  // List content
  const length = block.content.length

  // Initial
  if (!rootId) {
    focusableBlockMap[block.id] = []
  }

  block.content.forEach((textBlock, index) => {
    flattedBlocks.push({
      id: textBlock.id,
      rootId: rootId || block.id,
      deletable: index > 0 || length > 1,
      path: [...path, index]
    })

    // Add to focusable blocks
    focusableBlockMap[rootId || block.id].push(textBlock.id)
  })
}

export function flattenBlocks(blocks: Block[]) {
  const length = blocks.length
  const flattedBlocks: FlattedBlock[] = []
  const rootBlocks: string[] = []
  const focusableBlockMap: Record<string, string[]> = {}

  blocks.forEach((block, index) => {
    switch (block.type) {
      case 'feature':
        featureBlockPaths(block as FeatureBlock, flattedBlocks, focusableBlockMap, [index])
        break

      case 'payment':
        paymentBlockPaths(block as PaymentBlock, flattedBlocks, focusableBlockMap, [index])
        break

      case 'list':
        listBlockPaths(block as ListBlock, flattedBlocks, focusableBlockMap, [index])
        break

      case 'image':
      case 'slideGallery':
        flattedBlocks.push({
          id: block.id,
          path: [index]
        })
        break

      default:
        flattedBlocks.push({
          id: block.id,
          path: [index],
          deletable: index > 0 || length > 1
        })
        focusableBlockMap[block.id] = [block.id]
        break
    }

    rootBlocks.push(block.id)
  })

  return {
    flattedBlocks,
    focusableBlockMap,
    rootBlocks
  }
}

export function getBlockByPath(blocks: any, path: Array<string | number>): Block | undefined {
  const [p, ...subPath] = path
  const block = blocks[p]

  if (block) {
    if (isValidArray(subPath)) {
      return getBlockByPath(block.type === 'list' ? block.content : block, subPath)
    }

    return block
  }
}

export function stripeConnectStep(block: PaymentBlock) {
  return block.productId ? 'selectPrice' : block.stripeAccount ? 'product' : 'connect'
}

export function copyBlock(block: any) {
  block.id = uuidv4()

  switch (block.type) {
    case 'payment':
      block.heading.id = uuidv4()
      block.description.id = uuidv4()
      block.content.id = uuidv4()
      block.content.content.forEach((row: Block) => {
        row.id = uuidv4()
      })
      break

    case 'feature':
      block.image.id = uuidv4()
      block.heading.id = uuidv4()
      block.content.id = uuidv4()
      break
  }

  return block
}
