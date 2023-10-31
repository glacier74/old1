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
  widgetList = 'widget_list'
}

const URL_TYPES: AnyMap<string> = {
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
  google_map: 'Map',
  group_title: 'Group Title',
  image: 'Image',
  video: 'Video',
  website: 'Website'
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
  google_map: 'Map',
  group_title: 'Group Title',
  image: 'Image',
  video: 'Video',
  website: 'Website'
}

export const CREATE_WIDGET_LABELS: AnyMap<string> = {
  website: 'Add Link',
  google_map: 'Add Location',
  image: 'Add Image',
  group_title: 'Add Group Title'
}

export const WIDGET_SIZE_OPTIONS = [
  {
    label: (
      <div className="flex items-center gap-2.5">
        <span className="w-2.5 h-2.5 rounded-[2px] bg-slate-300"></span>
        <span className="ml-3">1x1</span>
      </div>
    ),
    value: '1x1'
  },
  {
    label: (
      <div className="flex items-center gap-2.5">
        <span className="w-5 h-2.5 rounded-[2px] bg-slate-300"></span>
        <span>2x1</span>
      </div>
    ),
    value: '2x1'
  },
  {
    label: (
      <div className="flex items-center gap-2.5">
        <span className="w-5 h-5 rounded-[2px] bg-slate-300"></span>
        <span>2x2</span>
      </div>
    ),
    value: '2x2'
  },
  {
    label: (
      <div className="flex items-center gap-2.5">
        <span className="w-5 h-1 rounded-[2px] bg-slate-300"></span>
        <span>2x0.5</span>
      </div>
    ),
    value: '2x0.5'
  }
]
