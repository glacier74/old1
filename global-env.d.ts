import { FC, ReactNode } from 'react'

export {}

declare global {
  import type { NextSeoProps } from 'next-seo'
  import type { ReactNode, CSSProperties } from 'react'
  import type { NextPageContext } from 'next'

  type AnyMap<V, K = string> = Record<K, T>
  type StringMap = AnyMap<string>

  interface ComponentProps {
    className?: string
    style?: CSSProperties
    children?: ReactNode
  }

  interface LayoutProps extends ComponentProps {
    seo?: NextSeoProps
    children: ReactNode
  }

  interface PublicSiteLayoutProps extends LayoutProps {
    favicon?: string
    shortName?: string
  }

  type NextPageFunction = (
    context: NextPageContext
  ) => Promise<{ props?: AnyMap<any>; notFound?: boolean }>

  interface IModalProps {
    visible?: boolean
    onClose?: () => void
    onComplete?: () => void
  }

  interface User {
    id: number
    name: string
    email: string
    emailVerifiedAt: number
    isEmailVerified: boolean
    avatar: string
    role: string
    isDeletionScheduled: boolean
    deletionScheduledAt: any
    isSocialAccount: boolean
    createdAt: string
    updatedAt: string
  }

  interface SiteSettings {
    productId: number
    blocks: Block[]
    twitter: string
    facebook: string
    instagram: string
    youtube: string
    telegram: string
    linkedin: string
    github: string
  }

  interface Product {
    id: number
    name: string
    logo: string
    tagline: string
    domain: string
    analyticId: string
    language: string
    isSitePrivate: boolean
    sitePassword: string
    removeBranding: boolean
    metaTitle: string
    metaDescription: string
    openGraphImage: string
    tempOpenGraphImage: string
    inviteCode: string
    inviteExpiredAt: number
    users: User[]
    siteSetting: SiteSettings
    createdAt: string
    updatedAt: string
  }

  interface Payment {
    id: number
    productId: number
    blockId: string
    provider: string
    name?: string
    email: string
    avatar: string
    currency: string
    amount: number
    transactionId?: string
    paymentType: string
    receiptUrl?: string
    failureMessage: any
    paidAt?: number
    status: string
    createdAt: string
    updatedAt: string
  }

  interface Invitation {
    inviter: string
    productId: number
    productName: string
    productLogo: string
  }

  interface UnsplashImage {
    id: string
    url: string
    thumbUrl: string
    downloadUrl: string
    author: string
    authorUrl: string
  }

  interface StripeProduct {
    id: string
    name: string
    description: string
    prices: StripePrice[]
  }

  interface StripePrice {
    id: string
    active: boolean
    billing_scheme: string
    currency: string
    custom_unit_amount: any
    livemode: boolean
    lookup_key: any
    nickname?: string
    recurring?: {
      aggregate_usage: any
      interval: string
      interval_count: number
      trial_period_days: any
      usage_type: string
    }
    tax_behavior: string
    tiers_mode: any
    transform_quantity?: {
      divide_by: number
      round: string
    }
    type: 'one_time' | 'recurring'
    unit_amount: number
  }

  type BlockEnterBehavior = 'focusBlock' | 'newBlock'

  interface SlideGallerySource {
    type: 'image' | 'video'
    source: string
    caption?: string
  }

  type BlockType =
    | 'text'
    | 'heading'
    | 'image'
    | 'list'
    | 'navigation'
    | 'heroSection1'
    | 'footer'
    | 'feature'
    | 'payment'
    | 'slideGallery'
    | 'emailCapture'

  interface BlockOption {
    type: BlockType
    icon: FC<any>
    label: string
  }

  interface BlockGroupOptions {
    label: string
    types: BlockType[]
    options: BlockOption[]
  }

  interface Block {
    id: string
    type: BlockType
  }

  interface TextBlock extends Block {
    type: 'text'
    html: string
  }

  interface HeadingBlock extends Omit<TextBlock, 'type'> {
    type: 'heading'
    level: number
  }

  interface ImageBlock extends Pick<Block, 'id' | 'type'> {
    type: 'image'
    source: string
    caption?: string
    width?: number
    height?: number
    align?: 'left' | 'center' | 'right'
  }

  interface ListBlock extends Pick<Block, 'id' | 'type'> {
    type: 'list'
    ordered?: false
    content: TextBlock[]
  }

  interface HeroSectionBlock extends Pick<Block, 'id' | 'type'> {
    type: 'heroSection1'
    layout?: 'left' | 'center'
    logo: Omit<ImageBlock, 'align'>
    name: HeadingBlock
    tagline: TextBlock
  }

  interface FeatureBlock extends Pick<Block, 'id' | 'type'> {
    type: 'feature'
    layout?: 'left' | 'right'
    image: Omit<ImageBlock, 'align'>
    heading: HeadingBlock
    content: TextBlock
  }

  interface PaymentBlock extends Pick<Block, 'id' | 'type'> {
    type: 'payment'
    provider: string
    productId?: string
    productName?: string
    productDescription?: string
    priceId?: string
    currency: string
    amount: number
    stripeAccount?: string
    stripeEmail?: string
    heading: HeadingBlock
    description: TextBlock
    content: ListBlock
  }

  interface SlideGalleryBlock extends Pick<Block, 'id' | 'type'> {
    type: 'slideGallery'
    sources: SlideGallerySource[]
  }

  interface EmailCaptureBlock extends Pick<Block, 'id' | 'type'> {
    type: 'emailCapture'
    isNameRequired?: boolean
    heading: HeadingBlock
    description: TextBlock
    button: TextBlock
  }

  interface FlattedBlock extends Pick<Block, 'id'> {
    rootId?: string
    path: (string | number)[]
    deletable?: boolean
  }

  interface NavigationLink {
    id: string
    title: string
    url: string
    openInNewTab?: boolean
  }

  interface NavigationBlock extends Pick<Block, 'id' | 'type'> {
    type: 'navigation'
    links: NavigationLink[]
  }
}
