import { FC } from 'react'

import { BlockProps } from './Block'
import { Feature } from './Feature'
import { Group } from './Group'
import { Heading } from './Heading'
import { Image } from './Image'
import { List } from './List'
import { Paragraph } from './Paragraph'
import { Payment } from './Payment'
import { SlideGallery } from './SlideGallery'

interface BlockWrapperProps
  extends Pick<
    BlockProps,
    'enableCommand' | 'enableAction' | 'enableDropZone' | 'enableTextFormat' | 'enterBehavior'
  > {
  block: any
}

export const BlockWrapper: FC<BlockWrapperProps> = props => {
  switch (props.block.type) {
    case 'group':
      return <Group key={props.block.id} {...props} />

    case 'slide-gallery':
      return <SlideGallery key={props.block.id} {...props} />

    case 'payment':
      return <Payment key={props.block.id} {...props} />

    case 'feature':
      return <Feature key={props.block.id} {...props} />

    case 'list':
      return <List key={props.block.id} {...props} />

    case 'heading':
      return <Heading key={props.block.id} {...props} />

    case 'image':
      return <Image key={props.block.id} {...props} />

    default:
      return <Paragraph key={props.block.id} {...props} />
  }
}
