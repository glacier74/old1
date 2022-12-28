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

    case 'image':
      ;(block as ImageBlock).mediaType = 'image'
      break

    case 'slideGallery':
      ;(block as SlideGalleryBlock).sources = []
      break

    case 'feature':
      block = {
        ...block,
        layout: 'left',
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

    case 'heroSection':
      block = {
        ...block,
        layout: 'center',
        name: {
          id: uuidv4(),
          type: 'heading',
          level: 1,
          html: ''
        },
        tagline: {
          id: uuidv4(),
          type: 'text',
          html: ''
        },
        buttons: [
          {
            id: uuidv4(),
            type: 'text',
            html: ''
          }
        ],
        image: {
          id: uuidv4(),
          type: 'image'
        }
      } as HeroSectionBlock
      break

    case 'header':
      block = {
        ...block,
        links: []
      } as HeaderBlock
      break

    case 'footer':
      block = {
        ...block,
        socialMedias: []
      } as FooterBlock
      break

    case 'emailCapture':
      block = {
        ...block,
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
        button: {
          id: uuidv4(),
          type: 'text',
          html: ''
        }
      } as EmailCaptureBlock
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

function heroSectionBlockPaths(
  block: HeroSectionBlock,
  flattedBlocks: FlattedBlock[],
  focusableBlockMap: Record<string, string[]>,
  path: Array<string | number>
) {
  // HeroSection Block
  flattedBlocks.push({
    id: block.id,
    path
  })

  // Name
  flattedBlocks.push({
    id: block.name.id,
    rootId: block.id,
    path: [...path, 'name']
  })

  // Tagline
  flattedBlocks.push({
    id: block.tagline.id,
    rootId: block.id,
    path: [...path, 'tagline']
  })

  // Image
  flattedBlocks.push({
    id: block.image.id,
    rootId: block.id,
    path: [...path, 'image']
  })

  // Add to focusable blocks
  focusableBlockMap[block.id] = [block.name.id, block.tagline.id]

  // Buttons
  block.buttons.forEach((buttonBlock, index) => {
    flattedBlocks.push({
      id: buttonBlock.id,
      rootId: block.id,
      deletable: false,
      path: [...path, 'buttons', index]
    })

    // Add to focusable blocks
    focusableBlockMap[block.id].push(buttonBlock.id)
  })
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

function contactBlockPaths(
  block: EmailCaptureBlock,
  flattedBlocks: FlattedBlock[],
  focusableBlockMap: Record<string, string[]>,
  path: Array<string | number>
) {
  // Feature Block
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

  // Button
  flattedBlocks.push({
    id: block.button.id,
    rootId: block.id,
    path: [...path, 'button']
  })

  // Add to focusable blocks
  focusableBlockMap[block.id] = [block.heading.id, block.description.id, block.button.id]
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
      case 'heroSection':
        heroSectionBlockPaths(block as HeroSectionBlock, flattedBlocks, focusableBlockMap, [index])
        break

      case 'feature':
        featureBlockPaths(block as FeatureBlock, flattedBlocks, focusableBlockMap, [index])
        break

      case 'payment':
        paymentBlockPaths(block as PaymentBlock, flattedBlocks, focusableBlockMap, [index])
        break

      case 'list':
        listBlockPaths(block as ListBlock, flattedBlocks, focusableBlockMap, [index])
        break

      case 'emailCapture':
        contactBlockPaths(block as EmailCaptureBlock, flattedBlocks, focusableBlockMap, [index])
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
    case 'heroSection':
      block.logo.id = uuidv4()
      block.name.id = uuidv4()
      block.tagline.id = uuidv4()
      break

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

    case 'emailCapture':
      block.heading.id = uuidv4()
      block.description.id = uuidv4()
      block.button.id = uuidv4()
      break

    case 'header':
      block.links.forEach((row: Block) => {
        row.id = uuidv4()
      })
      break
  }

  return block
}

export function removeBlocksProperties(
  blocks: any[],
  properties = ['chosen', 'selected', 'isOpen']
) {
  blocks.forEach(b => {
    properties.forEach(p => {
      delete (b as any)[p]
    })
  })
}
