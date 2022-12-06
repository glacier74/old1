import { FC } from 'react'

import { BlockProps } from './Block'
import { EmailCapture, EmailCaptureProps } from './EmailCapture'
import { Feature, FeatureProps } from './Feature'
import { Footer } from './Footer'
import { Heading, HeadingProps } from './Heading'
import { HeroSection, HeroSectionProps } from './HeroSection'
import { Image, ImageProps } from './Image'
import { List, ListProps } from './List'
import { Navigation, NavigationProps } from './Navigation'
import { Payment, PaymentProps } from './Payment'
import { SlideGallery, SlideGalleryProps } from './SlideGallery'
import { Text, TextProps } from './Text'

export const BlockWrapper: FC<BlockProps> = props => {
  switch (props.block.type) {
    case 'navigation':
      return <Navigation key={props.block.id} {...(props as NavigationProps)} />

    case 'heroSection1':
      return <HeroSection key={props.block.id} {...(props as HeroSectionProps)} />

    case 'footer':
      return <Footer key={props.block.id} {...(props as FeatureProps)} />

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

    case 'emailCapture':
      return <EmailCapture key={props.block.id} {...(props as EmailCaptureProps)} />

    default:
      return <Text key={props.block.id} {...(props as TextProps)} />
  }
}
