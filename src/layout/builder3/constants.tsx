import { IconSize1x1, IconSize2x05, IconSize2x1, IconSize2x2 } from 'earlybirdim/internalIcons'

export const GOOGLE_FONTS = [
  'Inter',
  'Public Sans',
  'Karla',
  'Crimson Text',
  'Cairo',
  'Alegreya Sans',
  'Roboto',
  'Poppins',
  'Montserrat',
  'Ubuntu',
  'JetBrains Mono',
  'Source Sans Pro',
  'Noto Sans',
  'Lato',
  'Mulish',
  'Georgia',
  'Arimo',
  'Alegreya',
  'Varela',
  'Vollkorn',
  'IBM Plex Mono',
  'Open Sans',
  'B612',
  'Muli',
  'Lora',
  'Rubik',
  'Work Sans',
  'Arvo',
  'PT Serif',
  'Courier Prime',
  'Josefin Sans',
  'Nunito'
]

export const GOOGLE_FONTS_OPTIONS = [
  {
    value:
      '-apple-system, BlinkMacSystemFont, Helvetica, Roboto, Tahoma, Arial, "PingFang SC", "Hiragino Sans GB", "Heiti SC", STXihei, "Microsoft YaHei", SimHei, "WenQuanYi Micro Hei", serif',
    label: 'System Fonts'
  },
  ...GOOGLE_FONTS.map(value => ({
    value,
    label: value
  }))
]

export enum SchemaTypeEnum {
  text = 'text',
  image = 'image',
  icon = 'icon',
  select = 'select',
  html = 'html',
  object = 'object',
  emailCapture = 'email_capture',
  contact = 'contact',
  payment = 'payment',
  textList = 'text_list',
  list = 'list',
  widgetList = 'widget_list',
  segment = 'segment'
}

export const WIDGET_URL_PROVIDERS: AnyMap<string> = {
  behance: 'Behance',
  dribbble: 'Dribbble',
  figma: 'Figma',
  instagram: 'Instagram',
  steam_profiles: 'Steam',
  steam_id: 'Steam',
  tiktok: 'TikTok',
  youtube: 'YouTube',
  github: 'GitHub',
  twitter: 'Twitter',
  spotify_album: 'Spotify Album',
  spotify_artist: 'Spotify Artist',
  spotify_playlist: 'Spotify Playlist',
  spotify_track: 'Spotify Track',
  google_map: 'Location',
  group_title: 'Group Title',
  image: 'Image',
  video: 'Video',
  website: 'Link',
  payment: 'Payment',
  email_capture: 'Email Capture',
  skills: 'Skills'
}

export const CREATE_WIDGET_LABELS: AnyMap<string> = {
  website: 'Add Link',
  google_map: 'Add Location'
}

export const MAP_MEDIA_SIZE_OPTIONS = [
  {
    label: (
      <div className="flex items-center gap-2.5">
        <IconSize1x1 className="w-5 h-5" />
        <span>1x1</span>
      </div>
    ),
    value: '1x1'
  },
  {
    label: (
      <div className="flex items-center gap-2.5">
        <IconSize2x1 className="w-5 h-5" />
        <span>2x1</span>
      </div>
    ),
    value: '2x1'
  },
  {
    label: (
      <div className="flex items-center gap-2.5">
        <IconSize2x2 className="w-5 h-5" />
        <span>2x2</span>
      </div>
    ),
    value: '2x2'
  }
]

export const WIDGET_SIZE_OPTIONS = [
  ...MAP_MEDIA_SIZE_OPTIONS,
  {
    label: (
      <div className="flex items-center gap-2.5">
        <IconSize2x05 className="w-5 h-5" />
        <span>2x0.5</span>
      </div>
    ),
    value: '2x0.5'
  }
]
