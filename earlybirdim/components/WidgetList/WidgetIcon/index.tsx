import {
  isAppleMusic,
  isApplePodcasts,
  isAppleStore,
  isBehance,
  isBuyMeCoffee,
  isDiscord,
  isDribbble,
  isFacebook,
  isFigma,
  isGithub,
  isGooglePlay,
  isGumroad,
  isInstagram,
  isKofi,
  isLayers,
  isLinkedin,
  isMedium,
  isProducthunt,
  isReddit,
  isSpotify,
  isSteam,
  isStripe,
  isSubstack,
  isTiktok,
  isTwitch,
  isTwitter,
  isYoutube,
  toCustomURL
} from '@tinaryan/dp'
import clsx from 'clsx'
import { FC, useMemo } from 'react'

import { WidgetIconProps } from '../WidgetProps'
import { IconAppStore } from './IconAppStore'
import { IconAppleMusic } from './IconAppleMusic'
import { IconBehance } from './IconBehance'
import { IconBuyMeCoffee } from './IconBuyMeCoffee'
import { IconDiscord } from './IconDiscord'
import { IconDribbble } from './IconDribbble'
import { IconEarlyBird } from './IconEarlyBird'
import { IconEmailCapture } from './IconEmailCapture'
import { IconFacebook } from './IconFacebook'
import { IconFigma } from './IconFigma'
import { IconGithub } from './IconGithub'
import { IconGooglePlay } from './IconGooglePlay'
import { IconGumroad } from './IconGumroad'
import { IconInstagram } from './IconInstagram'
import { IconKofi } from './IconKofi'
import { IconLayers } from './IconLayers'
import { IconLinkedin } from './IconLinkedin'
import { IconMedium } from './IconMedium'
import { IconPodcast } from './IconPodcast'
import { IconProductHunt } from './IconProductHunt'
import { IconReddit } from './IconReddit'
import { IconSpotify } from './IconSpotify'
import { IconSteam } from './IconSteam'
import { IconStripe } from './IconStripe'
import { IconSubstack } from './IconSubstack'
import { IconTiktok } from './IconTiktok'
import { IconTwitch } from './IconTwitch'
import { IconTwitter } from './IconTwitter'
import { IconYouTube } from './IconYouTube'

const earlyBirdDomains = ['help.earlybird.im', 'earlybird.im']

function isEarlyBird(href: string) {
  const customURL = toCustomURL(href)

  if (customURL && earlyBirdDomains.includes(customURL.hostname)) {
    return customURL
  }
}

const websites = [
  {
    match: isAppleMusic,
    icon: IconAppleMusic
  },
  {
    match: isAppleStore,
    icon: IconAppStore
  },
  {
    match: isBehance,
    icon: IconBehance
  },
  {
    match: isBuyMeCoffee,
    icon: IconBuyMeCoffee
  },
  {
    match: isDiscord,
    icon: IconDiscord
  },
  {
    match: isDribbble,
    icon: IconDribbble
  },
  {
    match: isEarlyBird,
    icon: IconEarlyBird
  },
  {
    match: isFacebook,
    icon: IconFacebook
  },
  {
    match: isFigma,
    icon: IconFigma
  },
  {
    match: isGithub,
    icon: IconGithub
  },
  {
    match: isGooglePlay,
    icon: IconGooglePlay
  },
  {
    match: isGumroad,
    icon: IconGumroad
  },
  {
    match: isInstagram,
    icon: IconInstagram
  },
  {
    match: isKofi,
    icon: IconKofi
  },
  {
    match: isLayers,
    icon: IconLayers
  },
  {
    match: isLinkedin,
    icon: IconLinkedin
  },
  {
    match: isMedium,
    icon: IconMedium
  },
  {
    match: isApplePodcasts,
    icon: IconPodcast
  },
  {
    match: isProducthunt,
    icon: IconProductHunt
  },
  {
    match: isReddit,
    icon: IconReddit
  },
  {
    match: isSpotify,
    icon: IconSpotify
  },
  {
    match: isSteam,
    icon: IconSteam
  },
  {
    match: isStripe,
    icon: IconStripe
  },
  {
    match: isSubstack,
    icon: IconSubstack
  },
  {
    match: isTiktok,
    icon: IconTiktok
  },
  {
    match: isTwitch,
    icon: IconTwitch
  },
  {
    match: isTwitter,
    icon: IconTwitter
  },
  {
    match: isYoutube,
    icon: IconYouTube
  }
]

export const WidgetIcon: FC<WidgetIconProps> = ({
  className,
  type,
  url,
  faviconUrl,
  ...restProps
}) => {
  const children = useMemo(() => {
    if (type) {
      switch (type) {
        case 'payment':
          return <IconStripe className="h-full w-full" />

        case 'email_capture':
          return <IconEmailCapture className="h-full w-full" />
      }
    } else if (url) {
      const website = websites.find(row => row.match(url))

      if (website) {
        return <website.icon className="h-full w-full" />
      }

      return (
        <div className="p-1.5">
          <img className="block h-full w-full object-cover" src={faviconUrl} />
        </div>
      )
    }
  }, [faviconUrl, type, url])

  return (
    <div
      className={clsx('relative flex h-10 w-10 items-center justify-center rounded-lg', className)}
      {...restProps}
    >
      {children}
      <div className="pointer-events-none absolute inset-0 border border-black/10 rounded-lg"></div>
    </div>
  )
}
