import { FC } from 'react'

import { BlockProps } from './Block'
import { Feature, FeatureProps } from './Feature'
import { Heading, HeadingProps } from './Heading'
import { Image, ImageProps } from './Image'
import { List, ListProps } from './List'
import { Payment, PaymentProps } from './Payment'
import { SlideGallery, SlideGalleryProps } from './SlideGallery'
import { Text, TextProps } from './Text'

export const BlockWrapper: FC<BlockProps> = props => {
  switch (props.block.type) {
    case 'slideGallery':
      return <SlideGallery key={props.block.id} {...(props as SlideGalleryProps)} />

    case 'payment':
      return <Payment key={props.block.id} {...(props as PaymentProps)} />

    case 'feature':
      return <Feature key={props.block.id} {...(props as FeatureProps)} />

    case 'list':
      return <List key={props.block.id} {...(props as ListProps)} />

    case 'heading':
      return <Heading key={props.block.id} {...(props as HeadingProps)} />

    case 'image':
      return <Image key={props.block.id} {...(props as ImageProps)} />

    default:
      return <Text key={props.block.id} {...(props as TextProps)} />
  }
}
