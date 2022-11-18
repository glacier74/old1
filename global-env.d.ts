import { ReactNode } from 'react'

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
    seo: NextSeoProps
    children: ReactNode
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
    content: Block[]
    metaTitle: string
    metaDescription: string
    twitter: string
    enableTwitter: boolean
    facebook: string
    enableFacebook: boolean
    instagram: string
    enableInstagram: boolean
    youtube: string
    enableYoutube: boolean
    telegram: string
    enableTelegram: boolean
    linkedin: string
    enableLinkedin: boolean
    github: string
    enableGithub: boolean
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
    removeBranding: boolean
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

  type BlockType = 'text' | 'heading' | 'image' | 'list' | 'feature' | 'payment' | 'slideGallery'

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

  interface FeatureBlock extends Pick<Block, 'id' | 'type'> {
    type: 'feature'
    align?: 'left' | 'right'
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

  interface FlattedBlock extends Pick<Block, 'id'> {
    rootId?: string
    path: (string | number)[]
    deletable?: boolean
  }
}
