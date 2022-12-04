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
    icon: IconRocket,
    label: 'builder.feature.name'
  },
  {
    type: 'slideGallery',
    icon: IconSlideshow,
    label: 'builder.slideGallery.name'
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
    types: ['feature', 'slideGallery']
  },
  {
    label: 'builder.payment.name',
    types: ['payment']
  }
]

export const BLOCK_WITH_SETTINGS = ['heroSection1', 'navigation', 'footer', 'feature', 'payment']
