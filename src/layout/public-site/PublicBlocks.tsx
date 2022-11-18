import { FC } from 'react'

import { FeaturePreview } from '~/layout/builder/Compose/blocks/Feature'
import { HeadingPreview } from '~/layout/builder/Compose/blocks/Heading'
import { ImagePreview } from '~/layout/builder/Compose/blocks/Image'
import { ListPreview } from '~/layout/builder/Compose/blocks/List'
import { PaymentPreview } from '~/layout/builder/Compose/blocks/Payment'
import { SlideGalleryPreview } from '~/layout/builder/Compose/blocks/SlideGallery'
import { TextPreview } from '~/layout/builder/Compose/blocks/Text'

const BlockWrapper: FC<{ productId?: number; block: any }> = ({ productId, block }) => {
  switch (block.type) {
    case 'slideGallery':
      return <SlideGalleryPreview key={block.id} block={block} />

    case 'payment':
      return <PaymentPreview key={block.id} productId={productId!} block={block} />

    case 'feature':
      return <FeaturePreview key={block.id} block={block} />

    case 'list':
      return <ListPreview key={block.id} block={block} />

    case 'heading':
      return <HeadingPreview key={block.id} block={block} />

    case 'image':
      return <ImagePreview key={block.id} block={block} />

    default:
      return <TextPreview key={block.id} block={block} />
  }
}

export const PublicBlocks: FC<{ productId: number; blocks: Block[] }> = ({
  productId,
  blocks = []
}) => (
  <div className="blocks">
    {blocks.map(block => (
      <BlockWrapper key={block.id} productId={productId} block={block} />
    ))}
  </div>
)
