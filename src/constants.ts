import {
  IconCreditCard,
  IconLetterH,
  IconLetterT,
  IconMail,
  IconSlideshow,
  IconThumbUp
} from '@tabler/icons'

import { IconFaq, IconFeature, IconFooter, IconHeader, IconHeroSection } from '~/components'

export const LANGUAGE_OPTIONS = [
  {
    label: 'English',
    value: 'en'
  },
  {
    label: '简体中文',
    value: 'zh-cn'
  }
]

export const PAYMENT_STATUS: AnyMap<string> = {
  pending: 'engagements.pending',
  succeeded: 'engagements.succeeded'
}

export const SUBSCRIPTION_STATUS: AnyMap<string> = {
  trialing: 'engagements.trialing',
  active: 'engagements.active',
  incomplete: 'engagements.incomplete',
  incompleteExpired: 'engagements.incomplete_expired',
  pastDue: 'engagements.past_due',
  canceled: 'engagements.canceled',
  unpaid: 'engagements.unpaid'
}

export const PAYMENT_TYPES: AnyMap<string> = {
  one_time: 'engagements.oneTime',
  recurring: 'engagements.recurring'
}

export const BLOCK_OPTIONS: BlockOption[] = [
  // Basic
  {
    type: 'header',
    icon: IconHeader,
    label: 'builder.header.name'
  },
  {
    type: 'heroSection',
    icon: IconHeroSection,
    label: 'builder.heroSection.name'
  },
  {
    type: 'footer',
    icon: IconFooter,
    label: 'builder.footer.name'
  },
  {
    type: 'heading',
    icon: IconLetterH,
    label: 'builder.heading.name'
  },
  {
    type: 'text',
    icon: IconLetterT,
    label: 'builder.text.name'
  },

  // Feature
  {
    type: 'feature',
    icon: IconFeature,
    label: 'builder.feature.name'
  },
  {
    type: 'slideGallery',
    icon: IconSlideshow,
    label: 'builder.slideGallery.name'
  },
  {
    type: 'emailCapture',
    icon: IconMail,
    label: 'builder.emailCapture.name'
  },
  {
    type: 'testimonial',
    icon: IconThumbUp,
    label: 'builder.testimonial.name'
  },
  {
    type: 'faq',
    icon: IconFaq,
    label: 'builder.faq.name'
  },

  // Payment
  {
    type: 'payment',
    icon: IconCreditCard,
    label: 'builder.payment.name'
  }
]

export const BLOCK_GROUP_OPTIONS: Array<Pick<BlockGroupOptions, 'label' | 'types'>> = [
  {
    label: 'builder.basic',
    types: ['header', 'heroSection', 'footer', 'heading', 'text']
  },
  {
    label: 'builder.feature.name',
    types: ['feature', 'testimonial', 'emailCapture', 'faq', 'slideGallery']
  },
  {
    label: 'builder.payment.name',
    types: ['payment']
  }
]

export const BLOCK_WITH_SETTINGS = [
  'heroSection',
  'header',
  'footer',
  'feature',
  'emailCapture',
  'payment'
]

export const SOCIAL_MEDIA_SETTINGS = [
  {
    value: 'twitter',
    label: 'Twitter',
    prefixUri: 'https://twitter.com/',
    placeholder: '@elonmusk'
  },
  {
    value: 'facebook',
    label: 'Facebook',
    prefixUri: 'https://www.facebook.com/',
    placeholder: 'elonmusk'
  },
  {
    value: 'instagram',
    label: 'Instagram',
    prefixUri: 'https://www.instagram.com/',
    placeholder: 'elonmusk'
  },
  {
    value: 'linkedin',
    label: 'LinkedIn',
    prefixUri: 'https://www.linkedin.com/in/',
    placeholder: 'elonmusk'
  },
  {
    value: 'youtube',
    label: 'Youtube',
    prefixUri: 'https://www.youtube.com/',
    placeholder: '@elonmusk'
  },
  {
    value: 'telegram',
    label: 'Telegram',
    prefixUri: 'https://t.me/',
    placeholder: 'elonmusk'
  },
  {
    value: 'github',
    label: 'GitHub',
    prefixUri: 'https://github.com/',
    placeholder: 'elonmusk'
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

export const THEME_COLOR_KEYS = [
  {
    label: 'builder.design.headline',
    value: 'text'
  },
  {
    label: 'builder.design.content',
    value: 'textLight'
  },
  { label: 'builder.design.primary', value: 'primary' },
  { label: 'builder.design.buttonBackground', value: 'buttonBackground' },
  { label: 'builder.design.buttonText', value: 'buttonText' },
  { label: 'builder.design.border', value: 'border' },
  { label: 'builder.design.background', value: 'background' }
]

export const THEME_PRESET_COLORS = [
  '#ffffff',
  '#fef2f2',
  '#fff7ed',
  '#fefce8',
  '#f0fdf4',
  '#ecfeff',
  '#eff6ff',
  '#faf5ff',

  '#e4e4e7',
  '#fecaca',
  '#fed7aa',
  '#fef08a',
  '#bbf7d0',
  '#a5f3fc',
  '#bfdbfe',
  '#e9d5ff',

  '#a1a1aa',
  '#f87171',
  '#fb923c',
  '#facc15',
  '#4ade80',
  '#22d3ee',
  '#60a5fa',
  '#c084fc',

  '#71717a',
  '#ef4444',
  '#f97316',
  '#eab308',
  '#22c55e',
  '#06b6d4',
  '#3b82f6',
  '#a855f7',

  '#52525b',
  '#dc2626',
  '#ea580c',
  '#ca8a04',
  '#16a34a',
  '#0891b2',
  '#2563eb',
  '#9333ea'
]

export const THEMES: Theme[] = [
  {
    fontFamily: 'Inter',
    fontSize: '16px',
    lineHeight: 1.5,
    primary: '#22c55e',
    text: '#111827',
    textLight: '#6b7280',
    border: '#d1d5db',
    buttonBackground: '#22c55e',
    buttonText: '#fff',
    background: '#fff'
  },
  {
    fontFamily: 'Inter',
    fontSize: '16px',
    lineHeight: 1.5,
    primary: '#2563eb',
    text: '#111827',
    textLight: '#6b7280',
    border: '#d1d5db',
    buttonBackground: '#2563eb',
    buttonText: '#fff',
    background: '#fff'
  },
  {
    fontFamily: 'Inter',
    fontSize: '16px',
    lineHeight: 1.5,
    primary: '#000',
    text: '#000',
    textLight: '#666',
    border: '#666',
    buttonBackground: '#000',
    buttonText: '#fff',
    background: '#f9fafb'
  },
  {
    fontFamily: 'Inter',
    fontSize: '16px',
    lineHeight: 1.5,
    primary: '#ef4444',
    text: '#ef4444',
    textLight: '#6b7280',
    border: '#d1d5db',
    buttonBackground: '#dc2626',
    buttonText: '#fff',
    background: '#fef2f2'
  },
  {
    fontFamily: 'Inter',
    fontSize: '16px',
    lineHeight: 1.5,
    primary: '#ca8a04',
    text: '#111827',
    textLight: '#6b7280',
    border: '#d1d5db',
    buttonBackground: '#ca8a04',
    buttonText: '#fff',
    background: '#fef3c7'
  },
  {
    fontFamily: 'Inter',
    fontSize: '16px',
    lineHeight: 1.5,
    primary: '#075985',
    text: '#075985',
    textLight: '#334155',
    border: '#0369a1',
    buttonBackground: '#075985',
    buttonText: '#fff',
    background: '#bae6fd'
  },
  {
    fontFamily: 'Inter',
    fontSize: '16px',
    lineHeight: 1.5,
    primary: '#a855f7',
    text: '#fff',
    textLight: '#e5e7eb',
    border: '#d1d5db',
    buttonBackground: '#a855f7',
    buttonText: '#fff',
    background: '#581c87'
  },
  {
    fontFamily: 'Inter',
    fontSize: '16px',
    lineHeight: 1.5,
    primary: '#22c55e',
    text: '#e2e8f0',
    textLight: '#9ca3af',
    border: '#888',
    buttonBackground: '#22c55e',
    buttonText: '#fff',
    background: '#0f172a'
  }
]

export const PLAN_LEVELS: AnyMap<number> = {
  plan_free: 0,
  plan_starter: 1,
  plan_superior: 2,
  plan_shipper: 3,

  // Jingle Bio
  jinglebio_free: 0,
  jinglebio_melody: 1,
  jinglebio_harmony: 2,
  jinglebio_crescendo: 3
}

export const PLAN_NAMES: AnyMap<string, number | string> = {
  plan_free: 'Free',
  plan_starter: 'Starter',
  plan_superior: 'Superior',
  plan_shipper: 'Shipper',

  // Jingle Bio
  jinglebio_free: 'Hum',
  jinglebio_melody: 'Melody',
  jinglebio_harmony: 'Harmony',
  jinglebio_crescendo: 'Crescendo'
}

export const PLAN_LEVEL_NAME_MAPS = {
  earlybird: {
    [PLAN_LEVELS.plan_free]: 'Free',
    [PLAN_LEVELS.plan_starter]: 'Starter',
    [PLAN_LEVELS.plan_superior]: 'Superior',
    [PLAN_LEVELS.plan_shipper]: 'Shipper'
  },
  jinglebio: {
    [PLAN_LEVELS.jinglebio_free]: 'Hum',
    [PLAN_LEVELS.jinglebio_melody]: 'Melody',
    [PLAN_LEVELS.jinglebio_harmony]: 'Harmony',
    [PLAN_LEVELS.jinglebio_crescendo]: 'Crescendo'
  }
}

export const PLAN_INTERVALS: AnyMap<string> = {
  month: 'Monthly',
  year: 'Yearly'
}
