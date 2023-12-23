import { FC } from 'react'

export type WidgetSize = '1x1' | '2x1' | '2x2' | '2x0.5' | 'full'
export type WidgetType = 'group_title' | 'payment' | 'email_capture' | 'image' | 'video' | string

export interface WidgetGridData {
  id: string
  type?: WidgetType
  size: WidgetSize
  url: string
  data?: WidgetData
  overrides?: {
    imageUrl?: string
    title?: string
  }
}

export interface WidgetGridProps extends ComponentProps {
  itemSize?: number
  gapSize?: number
  list: WidgetGridData[]
}

export type WidgetItemProps<T = WidgetData> = WidgetConfig<T> & ComponentProps

export interface WidgetIconProps extends ComponentProps {
  type?: WidgetType
  url?: string
  title?: string
  faviconUrl?: string
}

export interface WidgetContainerProps extends ComponentProps {
  config: WidgetConfig
  component: FC<WidgetConfig>
}

export interface WidgetFollowButtonProps extends ComponentProps {
  followers: number
  followText?: string
}

export interface WidgetPostListProps extends ComponentProps {
  itemClassNames?: string | string[]
  imageClassName?: string
  imageAlt?: string
  imageWidth: number
  imageHeight: number
  maxCount: number
  posts: WidgetPost[]
}

export interface WidgetStyles {
  padding?: string
  compactPadding?: string
  bgColor?: string
  bgHoverColor?: string
  bgActiveColor?: string
  followBorderColor?: string
  followBgColor?: string
  followBgHoverColor?: string
  followBgActiveColor?: string
  followTextColor?: string
  followersColor?: string
  scale?: number
  darkBgColor?: string
  darkBgHoverColor?: string
}

export interface WidgetExtra extends AnyMap<any> {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  styles?: WidgetStyles
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  getComputedData?: (config: WidgetConfig) => AnyMap
}

export interface WidgetConfig<T = any> {
  id: string
  type?: WidgetType
  size: WidgetSize
  url: string
  disableMetadata?: boolean
  data: T
  extra?: WidgetExtra
}

export interface WidgetPost {
  title: string
  thumbnail: string
  url: string
}

export interface WidgetOverrides {
  title?: string
  imageUrl?: string
}

export interface WidgetData {
  name: string
  followers: number
  description?: string
  imageUrl: string
  posts: WidgetPost[]
  overrides?: WidgetOverrides
}

export interface GithubData extends Omit<WidgetData, 'posts'> {
  numContributions: number
  contributions: Array<
    Array<{
      date: string
      count: number
    }>
  >
}

export interface GithubContributionRect {
  x: number
  y: number
  className?: string
  label?: string
}

export interface GithubContributionProps extends Pick<GithubData, 'contributions'>, ComponentProps {
  blockSize?: number
  columnSize?: number
  isMonthShow?: boolean
}

export interface SpotifySong {
  name: string
  artists: string[]
  duration: number
  previewUrl: string
  thumbnail: string
}

export interface SpotifyPlaylistData extends Pick<WidgetData, 'name' | 'imageUrl' | 'overrides'> {
  artists: string[]
  numSongs: number
  songs: SpotifySong[]
}

export interface SpotifyArtistData extends Omit<WidgetData, 'posts'> {
  albums: Array<{
    url: string
    name: string
    thumbnail: string
  }>
  numAlbums: number
}

export interface WidgetPlayButtonProps extends ComponentProps {
  playText?: string
  pauseText?: string
}

export interface SteamData extends Omit<WidgetData, 'posts'> {
  numGames: number
  games: WidgetPost[]
}

export interface YoutubeData extends Omit<WidgetData, 'posts'> {
  videos: WidgetPost[]
}

export interface WebsiteData extends Pick<WidgetData, 'description' | 'imageUrl' | 'overrides'> {
  title: string
  faviconUrl?: string
}

export interface SkillsData {
  title: string
  icon: {
    type: 'svg' | 'image'
    svgName: string
    imageUrl: string
  }
  rating: number
}

export interface WorkExperience {
  workName: string
  workRole: string
  workDate: [string, string | undefined]
}

export interface EducationExperience {
  educationName: string
  educationField: string
  educationDate: [string, string | undefined]
}

export type ExperienceData = (WorkExperience | EducationExperience) & {
  experienceType: string
  imageUrl?: string
}

export interface MapData {
  latitude: number
  longitude: number
  zoom: number
  location?: string
  overrides?: Pick<WidgetOverrides, 'title'>
}

export interface MediaData {
  imageUrl?: string
  title?: string
  overrides?: Pick<WidgetOverrides, 'title' | 'imageUrl'>
}

interface EmailCapture {
  blockId: string
  buttonText: string
  successMessage: string
  isNameRequired?: boolean
  // Automated email
  emailNotificationSubject: string
  emailNotificationMessage: string
  enableEmailNotification: boolean
}

interface Payment extends Omit<EmailCapture, 'isNameRequired'> {
  // Stripe
  priceId: string
  stripeAccount: string
  stripeEmail: string
}

export interface PaymentData extends Payment {
  overrides?: Pick<WidgetOverrides, 'title' | 'imageUrl'>
}

export interface EmailCaptureData extends EmailCapture {
  overrides?: Pick<WidgetOverrides, 'title' | 'imageUrl'> & EmailCapture
}

export interface WidgetPaymentButtonProps extends ComponentProps {
  config: WidgetConfig<PaymentData>
  onLoading: (loading: boolean) => void
}

export interface WidgetPaymentTextProps extends ComponentProps {
  text?: string
  loading?: boolean
}

export interface WidgetEmailCaptureButtonProps extends ComponentProps {
  config: WidgetConfig<EmailCaptureData>
}

export interface WidgetEmailCaptureModalProps extends WidgetEmailCaptureButtonProps {
  visible?: boolean
  onSubmitted: () => void
  onClose: () => void
}

export type WidgetActionsProps = Omit<WidgetContainerProps, 'size' | 'component'>

export interface WidgetActionItemDivide {
  type: 'divide'
}

export interface WidgetActionItemButton {
  name: string
  label: string
  icon: FC<ComponentProps>
}

export interface WidgetActionItemProps {
  item: WidgetActionItemDivide | WidgetActionItemButton
  onClick: (name: string) => void
}
