import { IconCreditCard, IconHeading, IconLetterT, IconRocket, IconSlideshow } from '@tabler/icons'

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

export const BLOCK_OPTIONS: BlockOption[] = [
  {
    type: 'heading',
    icon: IconHeading,
    label: 'builder.heading.name',
    textColor: '#334155',
    backgroundColor: '#e5e7eb'
  },
  {
    type: 'text',
    icon: IconLetterT,
    label: 'builder.text.name',
    textColor: '#334155',
    backgroundColor: '#e5e7eb'
  },
  {
    type: 'heroSection',
    icon: IconHeroSection,
    label: 'builder.heroSection.name',
    textColor: '#b91c1c',
    backgroundColor: '#fee2e2'
  },
  {
    type: 'footer',
    icon: IconFooter,
    label: 'builder.footer.name',
    textColor: '#b91c1c',
    backgroundColor: '#fee2e2'
  },
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
    types: ['heading', 'text']
  },
  {
    label: 'builder.feature.name',
    types: ['heroSection', 'feature', 'slideGallery', 'footer']
  },
  {
    label: 'builder.payment.name',
    types: ['payment']
  }
]

export const BLOCK_WITH_SETTINGS = [/*'heroSection'*/ 'footer', 'feature', 'payment']
