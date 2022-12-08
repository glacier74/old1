import {
  IconBrandSafari,
  IconBulb,
  IconCreditCard,
  IconHeading,
  IconLetterT,
  IconMail,
  IconSlideshow
} from '@tabler/icons'

import { IconFooter, IconHeroSection } from '~/components'

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

export const PAYMENT_TYPES: AnyMap<string> = {
  one_time: 'engagements.oneTime',
  recurring: 'engagements.recurring'
}

export const BLOCK_OPTIONS: BlockOption[] = [
  // Basic
  {
    type: 'navigation',
    icon: IconBrandSafari,
    label: 'builder.navigation.name'
  },
  {
    type: 'heroSection1',
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
    icon: IconHeading,
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
    icon: IconBulb,
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
    types: ['navigation', 'heroSection1', 'footer', 'heading', 'text']
  },
  {
    label: 'builder.feature.name',
    types: ['feature', 'slideGallery', 'emailCapture']
  },
  {
    label: 'builder.payment.name',
    types: ['payment']
  }
]

export const BLOCK_WITH_SETTINGS = [
  'heroSection1',
  'navigation',
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
