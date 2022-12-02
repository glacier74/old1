import {
  IconBrandSafari,
  IconCreditCard,
  IconHeading,
  IconLetterT,
  IconRocket,
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
    label: 'builder.navigation.name',
    textColor: '#0369a1',
    backgroundColor: '#e0f2fe'
  },
  {
    type: 'heroSection1',
    icon: IconHeroSection,
    label: 'builder.heroSection.name',
    textColor: '#0369a1',
    backgroundColor: '#e0f2fe'
  },
  {
    type: 'footer',
    icon: IconFooter,
    label: 'builder.footer.name',
    textColor: '#0369a1',
    backgroundColor: '#e0f2fe'
  },
  {
    type: 'heading',
    icon: IconHeading,
    label: 'builder.heading.name',
    textColor: '#0369a1',
    backgroundColor: '#e0f2fe'
  },
  {
    type: 'text',
    icon: IconLetterT,
    label: 'builder.text.name',
    textColor: '#0369a1',
    backgroundColor: '#e0f2fe'
  },

  // Feature
  {
    type: 'feature',
    icon: IconRocket,
    label: 'builder.feature.name',
    textColor: '#b91c1c',
    backgroundColor: '#fee2e2'
  },
  {
    type: 'slideGallery',
    icon: IconSlideshow,
    label: 'builder.slideGallery.name',
    textColor: '#b91c1c',
    backgroundColor: '#fee2e2'
  },

  // Payment
  {
    type: 'payment',
    icon: IconCreditCard,
    label: 'builder.payment.name',
    textColor: '#a16207',
    backgroundColor: '#fef9c3'
  }
]

export const BLOCK_GROUP_OPTIONS: Array<Pick<BlockGroupOptions, 'label' | 'types'>> = [
  {
    label: 'builder.recommended',
    types: ['feature', 'slideGallery', 'payment']
  },
  {
    label: 'builder.basic',
    types: ['navigation', 'heroSection1', 'footer', 'heading', 'text']
  },
  {
    label: 'builder.feature.name',
    types: ['feature', 'slideGallery']
  },
  {
    label: 'builder.payment.name',
    types: ['payment']
  }
]

export const BLOCK_WITH_SETTINGS = ['heroSection1', 'navigation', 'footer', 'feature', 'payment']
