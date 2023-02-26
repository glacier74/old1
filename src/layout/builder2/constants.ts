export const BLOCKS = [
  {
    type: 'header',
    label: 'Header'
  },
  {
    type: 'hero',
    label: 'Hero'
  },
  {
    type: 'feature',
    label: 'Feature'
  },
  {
    type: 'email_capture',
    label: 'Email capture'
  },
  {
    type: 'testimonial',
    label: 'Testimonials'
  },
  {
    type: 'pricing_table',
    label: 'Pricing table'
  },
  {
    type: 'faq',
    label: 'FAQs'
  },
  {
    type: 'footer',
    label: 'Footer'
  }
]

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
