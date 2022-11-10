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

  type NextPageFunction = (context: NextPageContext) => Promise<{ props: AnyMap<any> }>

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
    content: string
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

  type BlockType =
    | 'group'
    | 'payment'
    | 'slide-gallery'
    | 'feature'
    | 'heading'
    | 'list'
    | 'paragraph'
    | 'image'

  interface Block {
    id: string
    type: BlockType
    deletable?: boolean
  }

  interface BlockLocation extends Block {
    path: string[]
  }

  interface GroupBlock<T extends Block[]> extends Block {
    type: 'group'
    blocks: T
  }

  interface ParagraphBlock extends Block {
    type: 'paragraph'
    html: string
    placeholder?: string
    multiple?: boolean
    enableCommand?: boolean
    enableTextFormat?: boolean
    enterBehavior?: 'createBlock' | 'focusNextBlock'
  }

  interface HeadingBlock extends Omit<ParagraphBlock, 'enableCommand' | 'enableTextFormat'> {
    type: 'heading'
    level: number
  }

  interface ListBlock extends Block {
    type: 'list'
    ordered?: boolean
    blocks: ParagraphBlock[]
  }

  interface ImageBlock extends Block {
    type: 'image'
    width?: number
    height?: number
    source?: string
    caption?: string
    align?: 'left' | 'center' | 'right'
  }

  interface FeatureBlock extends Block {
    type: 'feature'
    align: 'left' | 'right'
    blocks: [ImageBlock, GroupBlock<[HeadingBlock, ParagraphBlock]>]
  }

  interface SlideGallerySource {
    type: 'image' | 'video'
    caption?: string
    url: string
  }

  interface SlideGalleryBlock extends Block {
    type: 'slide-gallery'
    sources: SlideGallerySource[]
  }

  interface PaymentBlock extends Block {
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
    blocks: [HeadingBlock, ParagraphBlock, ListBlock]
  }
}
