import clsx from 'clsx'
import {
  IconBehance,
  IconBuyMeCoffee,
  IconDribbble,
  IconFigma,
  IconGithub,
  IconGumroad,
  IconInstagram,
  IconKofi,
  IconLayers,
  IconLinkedin,
  IconMedium,
  IconProductHunt,
  IconReddit,
  IconSubstack,
  IconTiktok,
  IconTwitch,
  IconTwitter,
  IconYouTube
} from 'earlybirdim/internalIcons'
import { FC } from 'react'

import { OptionsContainer } from '../OptionsContainer'
import { AddLinkProps } from './AddLink'

const SOCIALS = [
  {
    name: 'twitter',
    label: 'Twitter',
    url: 'https://twitter.com/@{username}',
    icon: IconTwitter
  },
  {
    name: 'tiktok',
    label: 'TikTok',
    url: 'https://www.tiktok.com/@{username}',
    icon: IconTiktok
  },
  {
    name: 'linkedin',
    label: 'LinkedIn',
    url: 'https://www.linkedin.com/in/{username}',
    icon: IconLinkedin
  },
  {
    name: 'instagram',
    label: 'Instagram',
    url: 'https://www.instagram.com/{username}',
    icon: IconInstagram
  },
  {
    name: 'youtube',
    label: 'YouTube',
    url: 'https://www.youtube.com/{username}',
    icon: IconYouTube
  },
  {
    name: 'twitch',
    label: 'Twitch',
    url: 'https://www.twitch.tv/{username}',
    icon: IconTwitch
  },
  {
    name: 'reddit',
    label: 'Reddit',
    url: 'https://www.reddit.com/user/{username}',
    icon: IconReddit
  },
  {
    name: 'buymecoffee',
    label: 'Buy Me a Coffee',
    url: 'https://www.buymeacoffee.com/{username}',
    icon: IconBuyMeCoffee,
    className: '!text-[11px]'
  },
  {
    name: 'gumroad',
    label: 'Gumroad',
    url: 'https://www.gumroad.com/{username}',
    icon: IconGumroad
  },
  {
    name: 'medium',
    label: 'Medium',
    url: 'https://medium.com/{username}',
    icon: IconMedium
  },
  {
    name: 'producthunt',
    label: 'Product Hunt',
    url: 'https://www.producthunt.com/products/{username}',
    icon: IconProductHunt
  },
  {
    name: 'dribbble',
    label: 'Dribbble',
    url: 'https://dribbble.com/{username}',
    icon: IconDribbble
  },
  {
    name: 'figma',
    label: 'Figma',
    url: 'https://www.figma.com/@{username}',
    icon: IconFigma
  },
  {
    name: 'behance',
    label: 'Behance',
    url: 'https://www.behance.net/{username}',
    icon: IconBehance
  },
  {
    name: 'github',
    label: 'Github',
    url: 'https://github.com/{username}',
    icon: IconGithub
  },
  {
    name: 'layers',
    label: 'Layers',
    url: 'https://layers.to/{username}',
    icon: IconLayers
  },
  {
    name: 'substack',
    label: 'Substack',
    url: 'https://{username}.substack.com',
    icon: IconSubstack
  },
  {
    name: 'kofi',
    label: 'Kofi',
    url: 'https://ko-fi.com/{username}',
    icon: IconKofi
  }
]

export const SOCIAL_TYPES = SOCIALS.map(s => s.name)
export const SOCIAL_MAPS = SOCIALS.reduce((prev, next) => {
  return {
    ...prev,
    [next.name]: next
  }
}, {} as AnyMap)

interface SocialItemProps {
  item: (typeof SOCIALS)[0]
  onClick?: (name: string) => void
}

const SocialItem: FC<SocialItemProps> = ({ item, onClick }) => {
  function handleClick() {
    onClick?.(item.name)
  }

  return (
    <li className="px-3">
      <button
        className="flex flex-col items-center justify-center gap-2 py-4 w-full h-full rounded-lg hover:bg-slate-50"
        onClick={handleClick}
      >
        <div className="relative w-9 h-9">
          <item.icon className="w-9 h-9 rounded-lg" />
          <div className="pointer-events-none absolute inset-0 border border-black/10 rounded-lg"></div>
        </div>
        <span className={clsx('text-[13px] -mx-3 text-slate-700', item.className)}>
          {item.label}
        </span>
      </button>
    </li>
  )
}

export const SocialList: FC<Omit<AddLinkProps, 'onCreate'>> = ({
  onGoBack,
  onGoNext,
  ...restProps
}) => {
  return (
    <OptionsContainer title="Add a social profile" onGoBack={onGoBack} {...restProps}>
      <ul className="grid grid-cols-3 px-2">
        {SOCIALS.map(s => (
          <SocialItem key={s.name} item={s} onClick={onGoNext} />
        ))}
      </ul>
    </OptionsContainer>
  )
}
