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

  interface Contact {
    id: number
    name: string
    email: string
    avatar: string
    createdAt: string
    updatedAt: string
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
    | 'paragraph'
    | 'image'
    | 'list'
    | 'header'
    | 'heroSection'
    | 'footer'
    | 'feature'
    | 'payment'
    | 'slideGallery'
    | 'emailCapture'
    | 'faq'

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

  interface ParagraphBlock extends Block {
    type: 'paragraph'
    heading: HeadingBlock
    description: TextBlock
  }

  interface ButtonBlockAction {
    type: 'block' | 'link'
    value?: string
    blockId?: string
  }

  interface ButtonBlock extends TextBlock {
    action?: ButtonBlockAction
  }

  interface HeadingBlock extends Omit<TextBlock, 'type'> {
    type: 'heading'
    level: number
  }

  interface ImageBlock extends Pick<Block, 'id' | 'type'> {
    type: 'image'
    mediaType: 'image' | 'video'
    source: string
    caption?: string
    width?: number
    height?: number
    align?: 'left' | 'center' | 'right'
  }

  interface ListBlock<B = TextBlock> extends Pick<Block, 'id' | 'type'> {
    type: 'list'
    ordered?: false
    content: B[]
  }

  interface HeroSectionBlock extends Pick<Block, 'id' | 'type'> {
    type: 'heroSection'
    layout?: 'left' | 'center'
    name: HeadingBlock
    tagline: TextBlock
    image: Omit<ImageBlock, 'align'>
    buttons: ButtonBlock[]
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
    button: ButtonBlock
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
    isOpen?: boolean
  }

  interface HeaderBlock extends Pick<Block, 'id' | 'type'> {
    type: 'header'
    links: NavigationLink[]
  }

  interface FaqBlock extends Pick<Block, 'id' | 'type'> {
    type: 'faq'
    heading: HeadingBlock
    description: TextBlock
    content: ListBlock<ParagraphBlock>
  }

  interface SocialMedia {
    id: string
    type: 'twitter' | 'facebook' | 'instagram' | 'linkedin' | 'youtube' | 'telegram' | 'github'
    value: string
    openInNewTab?: boolean
    isOpen?: boolean
  }

  interface FooterBlock extends Pick<Block, 'id' | 'type'> {
    type: 'footer'
    socialMedias: SocialMedia[]
  }

  interface Integration {
    type: 'webhook' | 'mailchimp' | 'sendy'

    // Webhook
    webhookId: number
    webhookType: string
    webhookUrl: string

    // OAuth apps
    oauthAccountName: string
    oauthAccountId: string
    lastConfiguredAt: number
    lastSyncedAt: number

    isEnabled: boolean
    settings: IntegrationSettings
  }

  interface IntegrationSettings {
    // Mailchimp
    audienceId: string

    // Sendy
    serverUri: string
    apiKey: string
    brandId: string
    listId: string
  }

  interface WebhookLog {
    id: number
    productId: number
    webhookId: number
    webhookUrl: string
    eventId: number
    eventType: string
    payload: string
    statusCode: number
    response: string
    deliveryStatus: string
    createdAt: string
    updatedAt: string
  }

  interface MailchimpAudience {
    id: string
    name: string
  }

  interface SendyBrand {
    id: string
    name: string
  }

  interface SendySettings {
    serverUri: string
    apiKey: string
    brandId: string
    listId: string
  }
}
