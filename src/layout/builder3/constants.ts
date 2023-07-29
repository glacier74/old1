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
  payment = 'payment',
  textList = 'text_list',
  list = 'list'
}
