import { AriaAttributes, CSSProperties, FC, ReactNode } from 'react'

export {}

declare global {
  import type { NextSeoProps } from 'next-seo'
  import type { ReactNode, CSSProperties } from 'react'
  import type { NextPageContext } from 'next'

  type AnyMap<V, K = string> = Record<K, T>
  type StringMap = AnyMap<string>

  interface ComponentProps extends AriaAttributes {
    id?: string
    className?: string
    style?: CSSProperties
    children?: ReactNode
  }

  interface SharedProps {
    _key: string
    index: number
  }

  interface LayoutProps extends ComponentProps {
    seo?: NextSeoProps & { url?: string }
    children: ReactNode
  }

  interface PublicSiteLayoutProps extends LayoutProps {
    favicon?: string
    shortName?: string
    schema?: number
    theme?: Theme
    integrations?: Integration[]
  }

  type NextPageFunction = (
    context: NextPageContext
  ) => Promise<{ props?: AnyMap<any>; notFound?: boolean }>

  interface IModalProps {
    visible?: boolean
    onClose?: () => void
    onComplete?: () => void
  }

  interface Subscription {
    id: number
    planId: string
    plan: Plan
    price: Price
    canceledAt: any
    endsAt: number
    isActive: boolean
    isCancelled: boolean
  }

  interface SubscriptionUsageValue {
    used: number
    quota: number
    percent: number
  }

  export interface SubscriptionUsage {
    landingPage: SubscriptionUsageValue
    conversion: SubscriptionUsageValue
    visit: SubscriptionUsageValue
  }

  interface Plan {
    id: string
    name: string
    landingPages: number
    visitsPerMonth: number
    conversions: number
    commissionRate: number
    customDomain: boolean
    removeBranding: boolean
    customCss: boolean
    teamCollaboration: boolean
    isFree: boolean
    status: string
  }

  interface Price {
    id: number
    stripePriceId: string
    price: number
    currency: string
    interval: string
    isArchived: boolean
  }

  interface Receipt {
    id: number
    type: string
    planId: string
    amount: number
    currency: string
    paidAt: number
    receiptUrl: string
    createdAt: string
    updatedAt: string
  }

  interface User {
    id: number
    name: string
    email: string
    emailVerifiedAt: number
    isEmailVerified: boolean
    avatar: string
    role: string
    subscription: Subscription
    plans: Plan[]
    isDeletionScheduled: boolean
    deletionScheduledAt: any
    isSocialAccount: boolean
    createdAt: string
    updatedAt: string
  }

  interface Theme {
    fontFamily: string
    fontSize: string
    lineHeight: string | number
    primary: string
    text: string
    textLight: string
    border: string
    buttonBackground: string
    buttonText: string
    background: string
  }

  interface SiteSettings {
    productId: number
    template: string
    blocks: any
    draft: any
    completions: string[]
    version: number
    theme: Theme
    customCode: string
    schema: number
    canPublish?: boolean
  }

  interface CustomDomain {
    id: number
    productId: number
    domain: string
    isPrimary: boolean
    status: string
    createdAt: string
    updatedAt: string
  }

  interface Product {
    id: number
    name: string
    logo: string
    tagline: string
    category: string
    customer: string
    template: string
    domainType: 'sub_domain' | 'custom_domain'
    domain: string
    customDomains?: CustomDomain[]
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
    ownerId: number
    subscription?: Subscription
    siteSetting: SiteSettings
    integrations?: Integration[]
    canonicalURL: string
    isRestricted: boolean
    isBrandingRemoved: boolean
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
    subscriptionId: string
    interval: string
    canceledAt: number
    endsAt: number
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

  interface ProducthuntPost {
    id: string
    name: string
    slug: string
    tagline: string
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
    | 'testimonial'
    | 'image_gallery'

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

  interface ProducthuntTopPostBadge {
    period: 'daily' | 'weekly' | 'monthly'
    topicName?: string
  }

  interface ProducthuntBadgeInfo extends ProducthuntTopPostBadge {
    id: number
    name: string
    tagline: string
    slug: string
    url: string
    type: 'top-post-badge' | 'featured'
    theme: 'light' | 'neutral' | 'dark'
    topPostBadges: ProducthuntTopPostBadge[]
    topPostTopicBadges: ProducthuntTopPostBadge[]
  }

  interface HeroSectionBlock extends Pick<Block, 'id' | 'type'> {
    type: 'heroSection'
    layout?: 'left' | 'center'
    name: HeadingBlock
    tagline: TextBlock
    image: Omit<ImageBlock, 'align'>
    buttons: ButtonBlock[]
    producthuntBadge?: ProducthuntBadgeInfo
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
    priceType?: string
    currency: string
    amount: number
    interval?: string
    enableEmailNotification: boolean
    emailNotificationSubject: string
    emailNotificationMessage: string
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
    enableEmailNotification: boolean
    emailNotificationSubject: string
    emailNotificationMessage: string
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

  interface TestimonialBlock extends Pick<Block, 'id' | 'type'> {
    type: 'testimonial'
    heading: HeadingBlock
    description: TextBlock
    embedCode: string
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

  interface MailchimpSettings {
    audienceId: string
  }

  interface SendySettings {
    serverUri: string
    apiKey: string
    brandId: string
    listId: string
  }

  interface CrispSettings {
    websiteId: string
  }

  type IntegrationSettings = MailchimpSettings | SendySettings | CrispSettings

  interface Integration {
    type:
      | 'webhook'
      | 'mailchimp'
      | 'sendy'
      | 'crisp'
      | 'zapier'
      | 'airtable'
      | 'notion'
      | 'google-sheets'
      | 'excel'
      | 'hubspot'
      | 'slack'
      | 'active-campaign'
      | 'salesforce'

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

  interface OpenApp {
    id: number
    name: string
    shortName: string
    createdAt: Date
    updatedAt: Date
  }

  type BlockStyle = Pick<CSSProperties, 'background' | 'paddingTop' | 'paddingBottom'>

  interface BlockData<T extends object> {
    id: string
    type:
      | 'header'
      | 'hero'
      | 'feature'
      | 'cta'
      | 'email_capture'
      | 'testimonial'
      | 'image_gallery'
      | 'faq'
      | 'payment'
      | 'footer'
    componentId: string
    setting: T
    style?: BlockStyle
  }

  interface Template {
    id: string
    name: string
    url: string
    blocks: BlockData<any>[]
    createdAt: string
    updatedAt: string
  }

  interface Template_V3 {
    id: string
    name: string
    thumbnail: string
    categoryId: string
  }

  interface CollectionRecord {
    _id: string
    URL: string
    Name: string
    Slug: string
    Description: string
    Category: string
    'Design style': string
    'Target audience': string
    tableId: string
    'Auto ID': number
    'Created At': Date
    'Updated At': Date
    LowerCaseCategory: string
    Thumbnail: string
    Screenshot: string
  }

  interface TemplateRecord {
    _id: string
    Name: string
    slug: string
    Background: string
    'Preview URL': string
    Category: string
    Price: string
    Description: string
    'CTA title': string
    tableId: string
    'Auto ID': number
    'Created At': string
    'Updated At': string
    type: string
    createdAt: string
    updatedAt: string
    'Created By': Array<{
      _id: string
      primaryDisplay: string
    }>
    'Updated By': Array<{
      _id: string
      primaryDisplay: string
    }>
    'CTA Description'?: string
    LowerCaseCategory: string
    Thumbnail: string
  }

  interface IntegrationRecord {
    _id: string
    Name: string
    Logo?: string
    slug: string
    Headline: string
    Subheadline: string
    Intro: string
    'Product Homepage': string
    'Product Support Page': string
    tableId: string
    'Auto ID': number
    'Created At': string
    'Updated At': string
    type: string
    Category: string
    createdAt: string
    updatedAt: string
    'Created By': Array<{
      _id: string
      primaryDisplay: string
    }>
    'Updated By': Array<{
      _id: string
      primaryDisplay: string
    }>
    GuideURL: string
    LowerCaseCategory: string
  }

  interface TestimonialRecord {
    Name: string
    Avatar?: string
    Title: string
    Testimonial: string
    Platform: string
    URL: string
    tableId: string
    'Auto ID': number
    'Created At': string
    'Updated At': string
    type: string
    Date: string
    createdAt: string
    updatedAt: string
    'Created By': Array<{
      _id: string
      primaryDisplay: string
    }>
    'Updated By': Array<{
      _id: string
      primaryDisplay: string
    }>
  }
}
