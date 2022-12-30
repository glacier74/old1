import { FC } from 'react'

import { BlockProps } from './Block'
import { EmailCapture, EmailCaptureProps } from './EmailCapture'
import { Faq, FaqProps } from './Faq'
import { Feature, FeatureProps } from './Feature'
import { Footer, FooterProps } from './Footer'
import { Header, HeaderProps } from './Header'
import { Heading, HeadingProps } from './Heading'
import { HeroSection, HeroSectionProps } from './HeroSection'
import { Image, ImageProps } from './Image'
import { List, ListProps } from './List'
import { Payment, PaymentProps } from './Payment'
import { SlideGallery, SlideGalleryProps } from './SlideGallery'
import { Text, TextProps } from './Text'

export const BlockWrapper: FC<BlockProps> = props => {
  switch (props.block.type) {
    case 'header':
      return <Header key={props.block.id} {...(props as HeaderProps)} />

    case 'heroSection':
      return <HeroSection key={props.block.id} {...(props as HeroSectionProps)} />

    case 'footer':
      return <Footer key={props.block.id} {...(props as FooterProps)} />

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

    case 'faq':
      return <Faq key={props.block.id} {...(props as FaqProps)} />

    default:
      return <Text key={props.block.id} {...(props as TextProps)} />
  }
}
