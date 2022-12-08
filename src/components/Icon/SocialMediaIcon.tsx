import { FC } from 'react'

import {
  IconFacebook,
  IconGithub,
  IconInstagram,
  IconLinkedin,
  IconTelegram,
  IconTwitter,
  IconYoutube
} from '~/components'

interface SocialMediaIconProps extends ComponentProps {
  type: SocialMedia['type']
}

export const SocialMediaIcon: FC<SocialMediaIconProps> = ({ type, ...restProps }) => {
  switch (type) {
    case 'facebook':
      return <IconFacebook {...restProps} />

    case 'instagram':
      return <IconInstagram {...restProps} />

    case 'linkedin':
      return <IconLinkedin {...restProps} />

    case 'youtube':
      return <IconYoutube {...restProps} />

    case 'telegram':
      return <IconTelegram {...restProps} />

    case 'github':
      return <IconGithub {...restProps} />

    default:
      return <IconTwitter {...restProps} />
  }
}
